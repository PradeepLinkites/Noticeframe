import React from 'react'
import {Alert, ActivityIndicator, Picker, TextInput, Switch, Platform, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get , isEmpty } from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'
import {NavigationEvents} from 'react-navigation';
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import moment from "moment"

const SlideShowOff = require('../../assets/icons/Off.png')
const SlideShowOn = require('../../assets/icons/On.png')

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      userId: '',
      getEventDetailData: {}
    }
  }

  onFocusFunction = () => {
    const {state} = this.props.navigation
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.eventDetails(state.params.id)
        this.props.getSetting(user1._id)
        this.props.getGroupListForShow(user1._id)
        this.setState({ userId: user1._id})
      }
    })
  }

  componentDidMount(){
    this.setState({ isLoading: true })
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  componentWillUnmount(){
    this.focusListener.remove()
  }

  componentDidUpdate(prevProps){
    if (this.props.getEventDetailData !== prevProps.getEventDetailData) {
      if(this.props.getEventDetailPhase){
        this.props.resetEventPhase()
        this.setState({ getEventDetailData: this.props.getEventDetailData , isLoading: false })
      }
    }
    if(this.props.deleteEventPhase){
      this.props.resetEventPhase()
      this.setState({isLoading: false })
      alert('Event deleted Successfully')
      this.props.navigation.navigate('Home')
      this.props.getEvent(this.state.userId)     
    }
  }

  onDelete =()=>{
    let eventId = get(this.state, 'getEventDetailData._id', '')
    Alert.alert(
      'Alert Title',
      'You want to delete this event ?',
      [{
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
        },
        { text: 'OK', onPress: () => this.props.deleteEvent(eventId)}
      ],
      { cancelable: false }
    )
  }

  render() {
    const { isLoading, getEventDetailData } = this.state
    const { state } = this.props.navigation
    const selectedColor = get(this.state, 'getEventDetailData.defaultFillColor','')
    const route = get(state, 'routeName', '')  === 'EventDetail' ? 'Event Detail' : ''
    const date = moment(get(this.state, 'getEventDetailData.eventDate','')).format("DD MMM, YYYY")
    const start_time = moment(get(this.state, 'getEventDetailData.startTime','')).format("h:mm A")
    const end_time = moment(get(this.state, 'getEventDetailData.endTime','')).format("h:mm A")
    return (
        <SafeAreaView style={[styles.container,{backgroundColor: '#fff'}]}>
          {isLoading ?
            <ActivityIndicator animating = {isLoading} color = 'red' size = "large" style = {styles.activityIndicator} />
            :
          <ScrollView style={styles.container}>
            <Navbar 
              navigation={this.props.navigation} 
              navTitle={route} 
              style={{ height: this.state.height }}
              routeKey={'EventDetail'} 
            />       
              <View style={styles.topContainer}>
                <Image style={styles.avatar} source={require('../../assets/icons/Image_slideshow.png')} />
                  <View style={styles.textWrapper}>
                    <Text style={styles.eventTitleText}>{get(getEventDetailData, 'eventName', '')}</Text>
                    <Text style={styles.eventDateText}>{date}</Text>
                    <Text style={styles.eventDateText}>{start_time} to {end_time} </Text>
                  </View>
              </View>
              <View style={[styles.viewContainer,{borderBottomWidth: .3}]}>
                <Text style={styles.titleText}>{get(getEventDetailData, 'category', '')}</Text>
              </View>
              {get(getEventDetailData, 'category', '') === 'Group' && 
                <View style={styles.viewContainer}>
                  <Text style={styles.titleText}>Contacts</Text>
                  <Text style={styles.nameText}>David Williams</Text>
                  <Text style={styles.nameText}>Steve James</Text>
                </View>
              }
              <View style={styles.colorContainer}>
                <Text style={[styles.titleText,{marginTop:9}]}>Default Fill colour </Text>
                <View style={{flexDirection:'row'}}> 
                  <View style={ [styles.roundColorView,{marginRight: 8, backgroundColor : selectedColor=== 'White' ? '#ffffff' : selectedColor === 'Hawkes Blue' ? '#d5d6ea' : selectedColor === 'Milk Punch' ? '#f4e3c9' 
                      : selectedColor === 'Coral Candy' ? '#f5d5cb': selectedColor === 'Cruise' ? '#b5dce1': selectedColor === 'Swirl' ? '#d6cdc8': selectedColor === 'Tusk' ? '#d7e0b1': ''}]}/>
                  <Text style={[styles.subTitleText,{marginTop: 12}]}>{get(getEventDetailData, 'defaultFillColor', '')}</Text>
                </View>
              </View>
              <View style={[styles.reminderContainer,{marginTop: 5,borderBottomWidth: 0}]}>
                <Text style={styles.titleText}>Reminder</Text>
                <Text style={styles.subTitleText}>{get(getEventDetailData, 'setTime', '')}</Text>
              </View>
              <View style={styles.reminderContainer}>
                <Text style={styles.titleText}>Event Recurrence</Text>
                <Text style={styles.subTitleText}>{get(getEventDetailData, 'eventRecurrence.repeat', '')}</Text>
              </View>            
              <View style={styles.notesContainer}>
                <Text style={styles.titleText}>Note</Text>
                <Text style={[styles.subTitleText,{marginTop: 8}]}>{get(getEventDetailData, 'note', '')}</Text>
              </View>
              <View style={styles.notesContainer}>
                <Text style={styles.titleText}>Location</Text>
                <Text style={[styles.subTitleText,{marginTop: 8}]}>{get(getEventDetailData, 'location', '')}</Text>
              </View>
              <View style={[styles.reminderContainer,{marginTop:5,borderBottomWidth:0}]}>
                <Text style={[styles.subTitleText,{marginTop:9}]}>Show Event in SlideShow</Text>
                 <Image source={get(getEventDetailData, 'showEventInSlideShow', false) ? SlideShowOn: SlideShowOff }/>
              </View>
              {/* <View style={[styles.reminderContainer,{borderBottomWidth:0}]}>
                <Text style={styles.titleText}>Availability</Text>
                <Text style={styles.subTitleText}>BUSY</Text>
              </View> */}
              <View style={styles.reminderContainer}>
                <Text style={styles.titleText}>Privacy</Text>
                <Text style={styles.subTitleText}>{get(getEventDetailData, 'private', false) ? 'PRIVATE': get(getEventDetailData, 'public', false) ? 'PUBLIC': ''}</Text>
              </View>
              <View style={styles.bottomContainer}>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditEvent',{id : get(getEventDetailData, '_id', '')})}>
                  <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onDelete}> 
                  <Image source={require('../../assets/icons/Delete.png')} style={styles.imageStyle}/>
                </TouchableOpacity>
              </View>
          </ScrollView>
          }
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  topContainer:{
    height: deviceHeight *.25 ,
    width: '100%'
  },
  eventTitleText: {
    fontSize: Platform.OS === 'android' ? hp(2.8) : hp(2.3),
    fontWeight:'900',
    letterSpacing: .7,
    color: '#fff',
  },
  eventDateText: {
    fontSize: hp(1.7),
	  fontFamily: AppFonts.NRegular,
    marginTop: 5,
    letterSpacing: .8,
    color: '#fff'
  },
  avatar: {
    height: deviceHeight *.25 ,
    width: '100%',
  },
  textWrapper: {
    position:'absolute', left:20, bottom: 10
  },
  viewContainer: {
    paddingLeft: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    backgroundColor:'#fff',
    borderBottomColor:'#A2a2a2',
  },
  titleText: {
    fontSize: Platform.OS === 'android' ? hp(1.8) : hp(1.5),
	  fontFamily: AppFonts.NRegular,
    letterSpacing: .2,
    fontWeight:'600'
  },
  nameText: {
    fontSize: Platform.OS === 'android' ? hp(1.5) : hp(1.3),
	  fontFamily: AppFonts.NRegular,
    letterSpacing: .3,
    marginTop: 8
  },
  subTitleText: {
    fontSize: Platform.OS === 'android' ? hp(1.8) : hp(1.5),
	  fontFamily: AppFonts.NRegular,
    letterSpacing: .2,
    fontWeight:'600',
    color:'#A2a2a2'
  },
  roundColorView: {
    marginTop: 14, 
    height:16, 
    width:16, 
    borderRadius: 10, 
    marginLeft: 86,
  },
  colorContainer: {
    paddingLeft: wp(5),
    paddingRight: wp(5),
    paddingTop: hp(1),
    paddingBottom: hp(2),
    backgroundColor:'#fff',
    borderBottomColor:'#A2a2a2',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  reminderContainer: {
    paddingLeft: wp(5),
    paddingRight: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    backgroundColor:'#fff',
    borderBottomColor:'#A2a2a2',
    borderBottomWidth:.3,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  notesContainer: {
    paddingLeft: wp(5),
    paddingRight: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(2),
    backgroundColor:'#fff',
    borderBottomColor:'#A2a2a2',
    borderBottomWidth:.3,
  },
  imageStyle: {
    width: wp(9),
    height: hp(5)
  },
  bottomContainer: {
    paddingTop: hp(2),
    paddingBottom: hp(2),
    backgroundColor:'#fff',
    borderBottomColor:'#A2a2a2',
    borderBottomWidth:.3,
    flexDirection:'row',
    justifyContent:'space-around'
  }
})