import React from 'react'
import {Picker, TextInput, Switch, Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedColor: 'Orange'
    }
  }
  render() {
    const { selectedColor  } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'EventDetail' ? 'Event Detail' : ''
    return (
        <SafeAreaView style={[styles.container,{backgroundColor: '#3b5261'}]}>
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
                  <Text style={styles.eventTitleText}>Board Meeting</Text>
                  <Text style={styles.eventDateText}>20 FEB, 2020</Text>
                  <Text style={styles.eventDateText}>09:30 to 12:30 </Text>
                </View>
            </View>
            <View style={[styles.viewContainer,{borderBottomWidth: .3}]}>
               <Text style={styles.titleText}>PERSONAL</Text>
            </View>
            <View style={styles.viewContainer}>
               <Text style={styles.titleText}>Contacts</Text>
               <Text style={styles.nameText}>David Williams</Text>
               <Text style={styles.nameText}>Steve James</Text>
            </View>
            <View style={styles.colorContainer}>
              <Text style={[styles.titleText,{marginTop:9}]}>Default Fill colour </Text>
              <View style={{flexDirection:'row'}}> 
                <View style={ [styles.roundColorView, {marginRight:8, backgroundColor : selectedColor === 'red' ? 'red' : selectedColor === 'Blue' ? 'blue' : selectedColor === 'Orange' ? 'orange': selectedColor === 'Green' ? 'green': '' }]} />
                <Text style={[styles.subTitleText,{marginTop: 12}]}>Orange</Text>
              </View>
            </View>
            <View style={[styles.reminderContainer,{marginTop: 5,borderBottomWidth: 0}]}>
              <Text style={styles.titleText}>Reminder</Text>
              <Text style={styles.subTitleText}>Everyday 8:00 PM</Text>
            </View>
            <View style={styles.reminderContainer}>
              <Text style={styles.titleText}>Event Recurrence</Text>
              <Text style={styles.subTitleText}>Wed, 23 Feb 2020</Text>
            </View>            
            <View style={styles.notesContainer}>
              <Text style={styles.titleText}>Note</Text>
              <Text style={[styles.subTitleText,{marginTop: 8}]}>Metting is regarding the latest project deadline</Text>
            </View>
            <View style={styles.notesContainer}>
              <Text style={styles.titleText}>Location</Text>
              <Text style={[styles.subTitleText,{marginTop: 8}]}>Str. I Gualdariya, 9, 47890, italy</Text>
            </View>
            <View style={[styles.reminderContainer,{marginTop:5,borderBottomWidth:0}]}>
              <Text style={[styles.subTitleText,{marginTop:9}]}>Show Event in SlideShow</Text>
              <View style={ [styles.roundColorView, {backgroundColor : selectedColor === 'red' ? 'red' : selectedColor === 'Blue' ? 'blue' : selectedColor === 'Orange' ? 'orange': selectedColor === 'Green' ? 'green': '' }]} />
            </View>
            <View style={[styles.reminderContainer,{borderBottomWidth:0}]}>
              <Text style={styles.titleText}>Availability</Text>
              <Text style={styles.subTitleText}>BUSY</Text>
            </View>
            <View style={styles.reminderContainer}>
              <Text style={styles.titleText}>Privacy</Text>
              <Text style={styles.subTitleText}>PRIVATE</Text>
            </View>
            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={()=>this.props.navigation.navigate('EditEvent')}> 
                <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>alert('Notes deleted successfully')}> 
                <Image source={require('../../assets/icons/Delete.png')} style={styles.imageStyle}/>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#e2e9f6'
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
    fontSize: hp(1.5),
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
    borderRadius:8, 
    marginLeft: 86 
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