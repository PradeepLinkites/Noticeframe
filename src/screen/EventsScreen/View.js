import React from 'react'
import {Share, ActivityIndicator, ScrollView, StyleSheet, Text, View, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native'
import { _, get, isEmpty , size} from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import { FlatGrid } from 'react-native-super-grid';
import SwitchComponent from '../Common/Switch'
import AsyncStorage from '@react-native-community/async-storage'
import moment from "moment"
// import Share from "react-native-share"
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


const event_list = require('../../assets/icons/event_list.png')
const event_list_select = require('../../assets/icons/event_list_select.png')
const event_grid = require('../../assets/icons/event_grid.png')
const event_gridSelect = require('../../assets/icons/event_gridSelect.png')

export default class EventScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 'List',
      isGridView: false,
      switchValue: false,
      getEventData:[],
      eventDetails:[],
      isLoading: false,
      userId: '',
      red: 0,
      yellow: 0,
      green: 0,
      redHour: 0,
      yellowHour: 0,
      greenHour: 0,
    }
  }

  onFocusFunction = () => {
    this.setState({ isLoading: true })
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getEvent(user1._id)
        this.props.getSetting(user1._id)
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

  componentDidUpdate(prevProps) {
    if (this.props.getEventData !== prevProps.getEventData) {
      if(this.props.getEventPhase){
        this.props.resetEventPhase()
        this.setState({ getEventData: get(this.props, 'getEventData', []), isLoading: false })
        this.handleEvent(get(this.props, 'getEventData', []))
      }
    }
    if(this.props.updateSlideShowPhase){
      this.props.resetEventPhase()
      this.setState({ isLoading: false })
      this.props.getEvent(this.state.userId)
      this.props.getEventSlideShow(this.state.userId)
    }
    if(this.props.getSettingPhase){
      this.props.resetSettingPhase()
      this.setState({
        red: get(this.props, 'getSettingData.FrameColor.red', 0),
        yellow: get(this.props, 'getSettingData.FrameColor.yellow', 0),
        green: get(this.props, 'getSettingData.FrameColor.green', 0),
        redHour: get(this.props, 'getSettingData.FrameColor.redHour', 0),
        yellowHour: get(this.props, 'getSettingData.FrameColor.yellowHour', 0),
        greenHour: get(this.props, 'getSettingData.FrameColor.greenHour', 0),
      })
    }
  }

  handleEvent(value) {
    const group = _.groupBy(value, 'eventDateLocal')
    const grp = _.map(group, i => i)
    this.setState({
      eventDetails: grp,
      loading: false
    })
  }

  toggleSwitch = (id, index, value) => {
    const { getEventData } = this.state
    const newArray = [...this.state.getEventData]
    newArray[index].showEventInSlideShow = value
    this.setState({ getEventData: newArray })
    const details = {
      data: value,
      id: id
    }
    this.props.updateSlideShow(details)
  }

  toggleButton(name){
    if(name === 'Grid'){
      this.setState({ key : 'List' })
    }
    if(name === 'List'){
      this.setState({ key : 'Grid' })
    }
    this.setState({ isGridView : !this.state.isGridView})
  }

  // onShare = async (data) => {
  //   const shareOptions = {
  //     title: 'Share file',
  //     failOnCancel: false,
  //     saveToFiles: true,
  //   };
  //   // If you want, you can use a try catch, to parse
  //   // the share response. If the user cancels, etc.  
  //   try {
  //     const ShareResponse = await Share.open(shareOptions);
  //     // setResult(JSON.stringify(ShareResponse, null, 2));
  //   } catch (error) {
  //     console.log('Error =>', error);
  //     // setResult('error: '.concat(getErrorString(error)));
  //   }
  // }

  onShare = async (data) => {
    let date = moment(data.eventDate).format("DD MMM, YYYY")
    let start_time = moment(data.startTime).format("h:mm A")
    let end_time = moment(data.endTime).format("h:mm A")
    try {
      const result = await Share.share({
        message:
        `Event Name: ${data.eventName}, Date: ${date}, Start Time: ${start_time}, End Time: ${end_time}`,
        title: 'Notice Frame Event',
        // url: 'www.example.com',
        subject: 'Notice Frame Event'
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  render() {
    const { eventDetails, getEventData, isGridView, key, red, yellow, green, redHour, yellowHour, greenHour, isLoading } = this.state
    return (
      <SafeAreaView style={[AppStyles.container,{backgroundColor:'#fff'}]}>
       {isLoading ?
        <ActivityIndicator color = {'#3b5261'} size = "small" style = {AppStyles.activityIndicator} />
        :
        <>
          <View style={styles.topContainer}> 
            <Text style={{ fontSize: 18, marginLeft: 10 }}>Events</Text>
            <View style={{justifyContent: 'flex-end',flexDirection: 'row'}}>
              <TouchableOpacity onPress={this.toggleButton.bind(this,key)} style={{ marginRight: 10 }}>
                <Image source={key === 'List' ? event_list_select: event_list} style={styles.imageStyle}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleButton.bind(this,key)} style={{ marginRight: 10 }}>
                <Image source={key === 'Grid' ? event_gridSelect: event_grid} style={styles.imageStyle}/>
              </TouchableOpacity>
            </View>
          </View>
          {!isGridView ?
            size(getEventData) > 0 ?
            <ScrollView>
              {getEventData.map((data, ind)=>{
                let date = moment(data.eventDate).format("DD MMM, YYYY")
                let start_time = moment(data.startTime).format("h:mm A")
                let end_time = moment(data.endTime).format("h:mm A")
                return(
                  <TouchableOpacity 
                    key={ind}
                    onPress={()=> this.props.navigation.navigate('EventDetail',{id : data._id})}
                    style={[styles.eventListView,{backgroundColor : data.defaultFillColor === 'White' ? '#ffffff' : data.defaultFillColor === 'Hawkes Blue' ? '#d5d6ea' : data.defaultFillColor === 'Milk Punch' ? '#f4e3c9' 
                        : data.defaultFillColor === 'Coral Candy' ? '#f5d5cb': data.defaultFillColor === 'Cruise' ? '#b5dce1': data.defaultFillColor === 'Swirl' ? '#d6cdc8': data.defaultFillColor === 'Tusk' ? '#d7e0b1': ''}]}>
                    <View style={{flex:1}}>
                      <Text style={styles.eventTitleText}>{data.eventName}</Text>
                      <Text style={styles.eventDateText}>{date}</Text>
                      <Text style={styles.eventDateText}>{start_time} to {end_time}</Text>
                    </View>
                    <View>
                    <View style={styles.slideShowView}>
                      <Text style={styles.slideShowText}>Show in SlideShow</Text>
                      <SwitchComponent onChange = {this.toggleSwitch.bind(this, data._id, ind )} value = {data.showEventInSlideShow}/>
                    </View>
                    </View>
                      <TouchableOpacity style={styles.editView} onPress={()=>this.props.navigation.navigate('EditEvent',{id : data._id})}>
                        <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
                      </TouchableOpacity>
                    <TouchableOpacity style={styles.shareView} onPress={this.onShare.bind(this, data)}>
                      <Image source={require('../../assets/icons/Share.png')} style={styles.imageStyle}/>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  )
                })
              }
            </ScrollView>
            :
            <View style={{alignItems: 'center',marginTop: deviceHeight/4}}>
              <Image source={require('../../assets/images/no_event.png')} alt="No Event" style={AppStyles.noEventImageStyle}/>
              <Text>No Events Created Yet Create One Now!</Text>
            </View>
            : 
            size(eventDetails) > 0 ?
              <ScrollView>
                {eventDetails.map((data,ind) => {
                  return(
                  <View style={AppStyles.gridView} key={ind}>
                    <Text style={styles.dateText}>{moment(data[0].eventDate).format("DD MMM YYYY")}</Text>
                    <FlatGrid
                      itemDimension={130}
                      items={data}
                      keyExtractor={(item, rowItemIndex) => rowItemIndex}
                      renderItem={({ item, index }) => {
                        let uri = get(item, 'eventPicture[0].uri', 'https://oilandgascouncil.com/wp-content/uploads/placeholder-event.png')
                        let start_time = moment(item.startTime).format("h:mm A")
                        let end_time = moment(item.endTime).format("h:mm A")  
                        var diffInHours = Math.floor(Math.abs(new Date(item.startTime) - new Date()) / 36e5)
                        let frameColor = '#ed1c24'
                        if(red && diffInHours <= redHour){
                          console.log('red')
                          frameColor = '#ed1c24'
                        }
                        if(yellow &&  diffInHours >= 24 && diffInHours <= yellowHour){
                          console.log('yellow')
                          frameColor = '#ff9900'
                        }
                        if(green && diffInHours >= 72){
                          console.log('green')
                          frameColor = '#00a651'
                        }    
                        return(
                          <TouchableOpacity  onPress={()=> this.props.navigation.navigate('EventDetail',{id : item._id})}>
                            <Image source={{ uri: uri }} style={[AppStyles.itemContainer, {borderColor: frameColor}]}/>
                              {get(item, 'showEventInSlideShow', false) && 
                              <TouchableOpacity onPress={()=> this.props.navigation.navigate('SlideShow',{id : item._id})} style={AppStyles.playButton}>
                                <Image source={require('../../assets/icons/Play.png')} style={{height: 36, width: 36 }}/>
                              </TouchableOpacity>
                              }
                            <View style={AppStyles.eventBottomBar}>
                              <Text style={AppStyles.eventNameText}>{item.eventName}</Text>
                              <Text style={AppStyles.eventTimeText}>{start_time}  to  {end_time}</Text>
                            </View>
                          </TouchableOpacity>
                        )}
                      }
                    />
                  </View>
                  )
                })
                }
              </ScrollView>
              :
              <View style={{alignItems: 'center',marginTop: deviceHeight/4}}>
                <Image source={require('../../assets/images/no_event.png')} alt="No Event" style={AppStyles.noEventImageStyle}/>
                <Text>No Events Created Yet Create One Now!</Text>
              </View>
          }
        </>
        }
        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateEvent')} style={styles.plusButtonStyle}>
          <Image source={require('../../assets/icons/Add.png')} style={{height: 52, width: 52}}/>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#fff'
  },
  topContainer: {
    flexDirection:'row', justifyContent:'space-between', borderBottomWidth: .3, paddingVertical: 15
  },
  dateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14), fontWeight: '500', marginTop: 5
  },
  eventListView: {
    paddingLeft: Platform.OS === 'android' ? 13 : 12 ,
    paddingTop: Platform.OS === 'android' ? 8 : 12	,
    paddingBottom: Platform.OS === 'android' ? 5 : 12 ,
    marginBottom: 2,
    flexDirection: 'row',
  },
  eventTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    fontWeight:'500',
    letterSpacing: .3,
    marginBottom: 5
  },
  eventDateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(10) : AppSizes.verticalScale(8),
	  fontFamily: AppFonts.NRegular,
    letterSpacing: .2
  },
  slideShowText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: .2,
  },
  slideShowView: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'center',
    marginRight: 8,
  },
  editView: {
    marginTop:4, marginRight:8
  },
  imageStyle :{
    height: Platform.OS === 'android' ? AppSizes.verticalScale(32) : AppSizes.verticalScale(22),  width: 30,
  },
  shareView: {
    marginTop:4, marginRight:8
  },
  plusButtonStyle: {
    width:  Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50), 
    height: Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50),  
    borderRadius: Platform.OS === 'android' ?  25 : 25 ,                                             
    position: 'absolute',                                          
    bottom: Platform.OS === 'android' ? 22 : 32,                                                    
    right: Platform.OS === 'android' ? 26 : 15,  
  },
})