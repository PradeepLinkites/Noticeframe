import React from 'react'
import {Picker, TextInput, Switch, Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'
import CheckBox from 'react-native-checkbox'
// import SwitchComponent from '../Common/Switch'
import ImagePicker from 'react-native-image-picker'
import { Dropdown } from 'react-native-material-dropdown'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"
import ModalSelector from 'react-native-modal-selector'

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switch1Value: false,
      switch2Value: false,
      location: 'Str. I Gualdariya, 9, 47890, italy',
      notes: 'Metting is regarding the latest project deadline',
      avatarSource: null,
      selectedValue: 'Group',
      eventName: 'Board Meeting',
      groupName: 'Type Group name or select from list',
      selectedColor: 'Orange',
      startTime: moment().utcOffset('+05:30').format('hh:mm a'),
      isStartPickerVisible: false,
      endTime: '',
      isEndPickerVisible: false,
      eventDate: moment().utcOffset('+05:30').format('DD MMMM, YYYY'),
      isDatePickerVisible: false,
      selectValue:'Group'
    }
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  // onChange = (event, selectedDate) => {
  //   const currentDate = selectedDate || date;
  //   this.setState({ date : currentDate, show : Platform.OS === 'ios' })
  // };

  // showMode = currentMode => {
  //   alert('call')
  //   this.setState({ show: true, mode: currentMode })
  // };

  // showDatepicker = () => {
  //   this.showMode('date')
  // };

  // showTimepicker = () => {
  //   this.showMode('time')
  // };

  handleDate = (date) => {
    let newDate = moment(date).utcOffset('+05:30').format('DD-MMMM-YYYY')
    this.setState({ eventDate: newDate , isDatePickerVisible : false})
  }
 
  handleStartTime = (date) => {       
    let time = moment(date).utcOffset('+05:30').format('hh:mm a')
    this.setState({ startTime: time , isStartPickerVisible: false})
  }
  
  handleEndTime = (date) => {       
    let time = moment(date).utcOffset('+05:30').format('hh:mm a')
    this.setState({ endTime : time , isEndPickerVisible: false})
  }

  onLocationChange =(text)=>{
     this.setState({ location: text })
  }

  onNotesChange =(text)=>{
    this.setState({ notes: text })
 }
  onEventChange =(text)=>{
    this.setState({ eventName: text })
  }
  onGroupNameChange =(text)=>{
    this.setState({ groupName: text })
  }
 
  toggleSwitch = (value, name) => {
    if(name === 'switch1'){
       this.setState({switch1Value: value})
     }
     if(name === 'switch2'){
       this.setState({switch2Value: value})
     }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri};

        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    let index = 0;
    const data = [
        { key: index++, label: 'Group' },
        { key: index++, label: 'Personal' },
        { key: index++, label: 'Business' },
    ]
    const colorData = [
      { key: index++, label: 'Orange' },
      { key: index++, label: 'Red' },
      { key: index++, label: 'Green' },
      { key: index++, label: 'Blue' },
  ]
    const {selectValue, isEndPickerVisible, isStartPickerVisible, isDatePickerVisible, startTime, endTime, getUserData , selectedValue, selectedColor  } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'EventDetail' ? 'Event Detail' : ''
    return (
        <SafeAreaView style={AppStyles.container}>
        <ScrollView style={styles.container}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'Share'} 
          />
          
            <View style={styles.topContainer}>
              <Image style={styles.avatar} source={require('../../assets/icons/Image_slideshow.png')} />
                <View style={{position:'absolute',left:20,bottom:10}}>
                  <Text style={styles.eventTitleText}>Board Meeting</Text>
                  <Text style={styles.eventDateText}>20 FEB, 2020</Text>
                  <Text style={styles.eventDateText}>09:30 to 12:30 </Text>
                </View>
            </View>
            <View style={styles.viewContainer}>
               <Text style={styles.titleText}>PERSONAL</Text>
            </View>
            <View style={[styles.viewContainer,{paddingBottom: 20}]}>
               <Text style={[styles.titleText,{fontSize:20}]}>Contacts</Text>
               <Text style={styles.nameText}>David Williams</Text>
               <Text style={styles.nameText}>Steve James</Text>
            </View>
            <View style={styles.colorContainer}>
              <Text style={[styles.titleText,{marginTop:9}]}>Default Fill colour </Text>
              <View style={ [styles.roundColorView, {backgroundColor : selectedColor === 'red' ? 'red' : selectedColor === 'Blue' ? 'blue' : selectedColor === 'Orange' ? 'orange': selectedColor === 'Green' ? 'green': '' }]} />
              <Text style={[styles.subTitleText,{marginTop: 12}]}>Orange</Text>
            </View>
            <View style={[styles.reminderContainer,{marginTop:6}]}>
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
            <View style={[styles.reminderContainer,{marginTop:6}]}>
              <Text style={[styles.subTitleText,{marginTop:9}]}>Show Event in SlideShow</Text>
              <View style={ [styles.roundColorView, {backgroundColor : selectedColor === 'red' ? 'red' : selectedColor === 'Blue' ? 'blue' : selectedColor === 'Orange' ? 'orange': selectedColor === 'Green' ? 'green': '' }]} />
              {/* <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/> */}
            </View>
            <View style={styles.reminderContainer}>
              <Text style={styles.titleText}>Availability</Text>
              <Text style={styles.subTitleText}>BUSY</Text>
            </View>
            <View style={styles.reminderContainer}>
              <Text style={styles.titleText}>Privacy</Text>
              <Text style={styles.subTitleText}>PRIVATE</Text>
            </View>
            <View style={[styles.bottomContainer,{marginTop:4}]}>
              <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
              <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
            </View>
          </ScrollView>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#e6e1de'
  },
  topContainer:{
    height: deviceHeight *.25 ,
    backgroundColor:'#A2a2a2',
    justifyContent:'center',
    alignItems:'center'
  },
  eventTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(24) : AppSizes.verticalScale(22),
    // fontFamily: AppFonts.NBlack,
    fontWeight:'800',
    letterSpacing: 1,
    color: '#fff',
    // marginBottom: 5
  },
  eventDateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14),
	  fontFamily: AppFonts.NRegular,
    marginTop: 5,
    letterSpacing: .8,
    color: '#fff'
  },
  avatar: {
    height: deviceHeight *.25 ,
    width: '100%',
  },
  viewContainer: {
    paddingLeft:25,
    paddingRight:25,
    paddingTop:15,
    paddingBottom:15,
    backgroundColor:'#fff',
    borderBottomColor:'#A2a2a2',
    borderBottomWidth:.3
  },
  titleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
	  fontFamily: AppFonts.NRegular,
    letterSpacing: .2,
    fontWeight:'700'
  },
  nameText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
	  fontFamily: AppFonts.NRegular,
    letterSpacing: .3,
    marginTop: 8
  },
  subTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(12),
	  fontFamily: AppFonts.NRegular,
    letterSpacing: .2,
    fontWeight:'600',
    color:'#A2a2a2'
  },
  roundColorView: {
    marginTop: 15, 
    height:18, 
    width:18, 
    borderRadius:9, 
    marginLeft: 86 
  },
  colorContainer: {
    paddingLeft:25,
    paddingRight:25,
    paddingTop:22,
    paddingBottom:25,
    backgroundColor:'#fff',
    borderBottomColor:'#A2a2a2',
    borderBottomWidth:.3,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  reminderContainer: {
    paddingLeft:25,
    paddingRight:25,
    paddingTop:22,
    paddingBottom:22,
    backgroundColor:'#fff',
    borderBottomColor:'#A2a2a2',
    borderBottomWidth:.3,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  notesContainer: {
    paddingLeft:25,
    paddingRight:25,
    paddingTop:22,
    paddingBottom:22,
    backgroundColor:'#fff',
    borderBottomColor:'#A2a2a2',
    borderBottomWidth:.3,
  },
  imageStyle: {
    width: 45,
    height: 45
  },
  bottomContainer: {
    paddingLeft: deviceWidth * .28,
    paddingRight: deviceWidth * .28,
    paddingTop:22,
    paddingBottom:22,
    backgroundColor:'#fff',
    borderBottomColor:'#A2a2a2',
    borderBottomWidth:.3,
    flexDirection:'row',
    justifyContent:'space-between'
  }
})