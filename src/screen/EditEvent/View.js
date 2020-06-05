import React from 'react'
import {Modal, Picker, TextInput, Switch, Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import CheckBox from 'react-native-checkbox'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-material-dropdown';

// import SwitchComponent from '../Common/Switch'
import ImagePicker from 'react-native-image-picker'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"
import ModalSelector from 'react-native-modal-selector'
import AsyncStorage from '@react-native-community/async-storage'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventPicture: '',
      eventName: '',
      category: 'GROUP',
      personal: false,
      business: false,
      group: true,
      memberList: ['','',''],
      defaultFillColor: 'Orange',
      eventDate: moment().format('DD MMMM, YYYY'),
      groupName: '',
      startTime: moment().add(1, 'hours').format('hh:mm a'),
      isStartPickerVisible: false,
      endTime: moment().add(3, 'hours').format('hh:mm a'),
      isEndPickerVisible: false,
      isDatePickerVisible: false,
      setReminderAlarm: '',
      repeat: 'Everyday',
      notes: '',
      location: '',
      showNotesInSlideShow: false,
      showEventInSlideShow: false,
      modalVisible: false,
      checked: false
    }
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectRecurrence = this.onSelectRecurrence.bind(this)
  }


  onSelectCategory(text) {
    if(text === 'PERSONAL'){
      this.setState({ category : text, personal: true, group: false , business: false })
    }
    if(text === 'GROUP'){
      this.setState({ category : text, personal: false, group: true , business: false })
    }
    if(text === 'BUSINESS'){
      this.setState({ category : text, personal: false, group: false , business: true })
    }
  }
  onSelectRecurrence(item){
    this.setState({ repeat : item })
  }

  handleDate = (date) => {
    let newDate = moment(date).utcOffset('+05:30').format('DD-MMMM-YYYY')
    this.setState({ eventDate: newDate , isDatePickerVisible : false })
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
       this.setState({showNotesInSlideShow: value})
     }
     if(name === 'switch2'){
       this.setState({showEventInSlideShow: value})
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
  const {checked, modalVisible, memberList, repeat, category, isEndPickerVisible, isStartPickerVisible, isDatePickerVisible, startTime, endTime, defaultFillColor  } = this.state
  const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'EditEvent' ? 'Edit Event' : ''
    return (
      <SafeAreaView style={[AppStyles.container,{backgroundColor:'#3b5261'}]}>
      <ScrollView style={styles.container}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'EditEvent'} 
          />        
            <View style={styles.topContainer}>
              {get(this.state, 'eventPicture','') === '' ?
                <TouchableOpacity
                  style={styles.addPictureButton}
                  onPress={this.selectPhotoTapped.bind(this)}
                >
                  <Text style={styles.addPictureText}>Change Picture</Text>
                </TouchableOpacity>
                :
                <Image style={styles.avatar} source={this.state.eventPicture} />
              }
            </View>
            <View style={styles.eventContainer}>
              <Text style={styles.listTitle}>Event Name</Text>
              <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput
                    style={styles.eventInputBox}
                    placeholder = "Event Name"
                    placeholderTextColor="#000"
                    maxLength={40}
                    onChangeText={text => this.onEventChange(text)}
                    value={this.state.eventName}
                  />
                <View style={{ width: 125, paddingHorizontal: 5}}>
                  <Dropdown
                    value={category}
                    selectedItemColor = '#000'
                    textColor = '#3293ed'
                    onChangeText={(item)=>this.onSelectCategory(item)}
                    data={categoryList}
                    dropdownOffset={{ top: 10, left: 0 }}
                  />
                </View>
                 {/* <Image source={require('../../assets/sidemenuAssets/Arrow_down.png')} style={styles.DropdownStyle}/> */}
              </View>
            </View>
            {category === 'GROUP' &&
                <View style={styles.selectGroupView}>
                  <Text style={styles.listTitle}>Select Group</Text>
                  <View style={{ marginTop: 10 }}>
                    <Dropdown
                      value={'Select Member list'}
                      selectedItemColor = '#000'
                      textColor = '#000'
                      onChangeText={(item)=>this.onSelectRecurrence(item)}
                      data={memberList}
                      fontSize={14}
                      dropdownOffset={{ top: 0, left: 0 }}
                    />
                </View>
                </View>
              }
            <View style={styles.colorContainer}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop: 8}}>
                <View>
                  <Text style={[styles.listTitle,{fontWeight:'700',top: 10,marginLeft: 10 }]}>Default Fill colour</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <View style={ [styles.roundColorView, {backgroundColor : defaultFillColor === 'Red' ? 'red' : defaultFillColor === 'Blue' ? 'blue' : defaultFillColor === 'Orange' ? 'orange': defaultFillColor === 'Green' ? 'green': '' }]} />
                  <View style={{ marginTop: 8 , marginLeft: 10, marginRight: 25, width: 80 }}>
                    <Dropdown
                      value={defaultFillColor}
                      selectedItemColor = '#000'
                      textColor = '#000'
                      onChangeText={(item)=>this.setState({ defaultFillColor: item })}
                      data={colorData}
                      fontSize={14}
                      dropdownOffset={{ top: 0, left: 0 }}
                    />
                </View>
                </View>
              </View>
            </View>
            <View style={[styles.selectGroupView,{marginTop: 10, borderBottomWidth:.3 }]}>
               <Text style={styles.listTitle}>Event Date</Text>
               <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      onConfirm={this.handleDate}
                      onCancel={()=>this.setState({isDatePickerVisible : false})}
                      showIcon={false}
                      // locale="es-ES"
                    />
               <Text onPress={()=>this.setState({isDatePickerVisible : true})} style={[styles.selectedText,{marginTop: 8}]}>{get(this.state,'eventDate','')}</Text>
            </View>

            <View style={styles.eventContainer}>
               <Text style={styles.listTitle}>Event Time</Text>
              <View style={{flexDirection:'row',marginTop:8,justifyContent:'space-between'}}>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.setState({isStartPickerVisible : true})}>               
                  <Text style={styles.timeText} >START TIME</Text>
                  {/* <Button title="Show Date Picker" onPress={this.showDatePicker} color='#fff'/> */}
                    <DateTimePickerModal
                      isVisible={isStartPickerVisible}
                      mode="time"
                      onConfirm={this.handleStartTime}
                      onCancel={()=>this.setState({isStartPickerVisible : false})}
                      showIcon={false}
                      locale="es-ES"
                      headerTextIOS="START TIME"
                      confirmTextIOS="DONE"
                      cancelTextIOS="CANCEL"

                    />
                  <Text style={styles.selectedText}>{get(this.state,'startTime','')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>this.setState({isEndPickerVisible : true})}> 
                   <Text style={styles.timeText}>END TIME</Text>
                   <DateTimePickerModal
                      isVisible={isEndPickerVisible}
                      mode="time"
                      onConfirm={this.handleEndTime}
                      onCancel={()=>this.setState({isEndPickerVisible : false})}
                      showIcon={false}
                      locale="es-ES"
                      headerTextIOS="END TIME"
                      confirmTextIOS="DONE"
                      cancelTextIOS="CANCEL"

                    />
                  <Text style={styles.selectedText}>{get(this.state,'endTime','')}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.checkBoxContainer}>
                <CheckBox
                    checkboxStyle={{tintColor:'#000'}}
                    label={'send email notification when task is about to start'}
                    labelStyle={styles.checkboxText}
                    checked={checked}
                    onChange={()=>this.setState({ checked: !this.state.checked, modalVisible: checked ? modalVisible : !this.state.modalVisible})}
                  />
                  {(get(this.state, 'setReminderAlarm','') !== '' && checked ) &&
                  <Text style={{marginTop: 5}}>
                    Set Reminder: {this.state.setReminderAlarm}
                  </Text>
                  }
            </View>
            </View>
            <View style={styles.reminderContainer}>
              <TouchableOpacity
                style={styles.reminderButton}
                onPress={()=>this.setState({ modalVisible: !modalVisible })}
              >
                <Text style={AppStyles.buttonText}>Set Reminder Alarm</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.eventContainer,{borderBottomWidth : 0 }]}>
               <Text style={styles.listTitle} >Every Recurrence</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text style={styles.repeatText}>Repeat</Text>
                {/* <View style={{flexDirection:'row'}}>
                   <Text style={[styles.selectedText,{marginLeft:0}]}>Everyday</Text>
                   <Image source={require('../../assets/icons/Arrow.png')} style={{height: 10,width: 10, marginTop: 6}}/>
                </View> */}
                <View style={{ width: 125 }}>
                  <Dropdown
                    value={repeat}
                    selectedItemColor = '#000'
                    textColor = '#000'
                    onChangeText={(item)=>this.onSelectRecurrence(item)}
                    data={recurrence}
                    fontSize={14}
                    dropdownOffset={{ top: 0, left: 0 }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.selectGroupView}>
               <Text style={styles.listTitle}>Note</Text>
              <View style={{flexDirection:'row',marginTop:8,justifyContent:'space-between'}}>
                {/* <View>
                  <Text style={styles.selectedText}>Metting is regarding the latest project deadline</Text>
                  <View style={styles.selectGroupBottomLine} />
                </View> */}
                 <TextInput
                    multiline
                    style={styles.inputBox}
                    placeholder = "Notes"
                    placeholderTextColor = "#000"
                    maxLength={40}
                    onChangeText={text => this.onNotesChange(text)}
                    value={this.state.notes}
                  />
              </View>
            </View>

            <View style={styles.selectGroupView}>
               <Text style={styles.listTitle}>Location</Text>
              <View style={{flexDirection:'row',marginTop:8,justifyContent:'space-between'}}>
                {/* <View>
                  <Text style={styles.selectedText}>Str. I Gualdariya, 9, 47890, italy </Text>
                  <View style={styles.selectGroupBottomLine} />
                </View> */}
                  <TextInput
                    multiline
                    style={[styles.inputBox,{borderBottomWidth:0}]}
                    maxLength={40}
                    placeholder = "Location"
                    placeholderTextColor = "#000"
                    onChangeText={text => this.onLocationChange(text)}
                    value={this.state.location}
                  />
              </View>
            </View>

            <View style={[styles.eventContainer,{marginTop:15}]}>
              <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
              <View style={{justifyContent:'center'}}>
                  <Text style={[styles.slideShowText,{marginBottom:18}]}>Show Notes in SlideShow</Text>
                </View>
                <View>
                <Switch
                    // onValueChange = {() => this.toggleSwitch(item, index)}
                    onValueChange = {(value) => this.toggleSwitch(value ,'switch1')}
                    value = {this.state.showNotesInSlideShow}
                    disabled={false}
                    thumbColor={this.state.showNotesInSlideShow ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
                    trackColor={{ true: '#939393', false : Platform.OS == 'android' ? '#A2a2a2': 'gray' }}
                    trackWidth={10}
                    style={
                      Platform.OS === 'android'
                        ? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
                        : { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
                    }
                    ios_backgroundColor={'#EBECF0'}
                />
                </View>
              </View>
              <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
                <View style={{justifyContent:'center'}}>
                  <Text style={styles.slideShowText}>Show Event in SlideShow</Text>
                </View>
                <Switch
                      // onValueChange = {() => this.toggleSwitch(item, index)}
                      onValueChange = {(value) => this.toggleSwitch(value ,'switch2')}
                      value = {this.state.showEventInSlideShow}
                      disabled={false}
                      thumbColor={this.state.showEventInSlideShow ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
                      trackColor={{ true: '#939393', false : Platform.OS == 'android' ? '#A2a2a2': 'gray' }}
                      trackWidth={10}
                      style={
                        Platform.OS === 'android'
                          ? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
                          : { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
                      }
                      ios_backgroundColor={'#EBECF0'}
                  />
              </View>
            </View>
            <View style={styles.statusContainer}>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity style={styles.statusButton}
                    // onPress={onPress}
                  >
                    <Text style={[styles.statusButtonText,{color:'#FFF'}]}>BUSY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.statusButton,{backgroundColor:'#fff',borderRightWidth:.3,borderTopWidth:.3,borderBottomWidth:.3}]}
                    // onPress={onPress}
                  >
                    <Text style={[styles.statusButtonText,{color:'#A2a2a2'}]}>AVAILABLE</Text>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row', marginTop: 20}}>
                  <TouchableOpacity style={styles.statusButton}
                    // onPress={onPress}
                  >
                    <Text style={[styles.statusButtonText,{color:'#FFF'}]}>PRIVATE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.statusButton,{backgroundColor:'#fff',borderRightWidth:.3,borderTopWidth:.3,borderBottomWidth:.3}]}
                    // onPress={onPress}
                  >
                    <Text style={[styles.statusButtonText,{color:'#A2a2a2'}]}>PUBLIC</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bottomContainer}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity style={[styles.cancelButton, {backgroundColor:'#A2a2a2'}]}
                    // onPress={onPress}
                  >
                    <Text style={[styles.cancelText,{color:'#000'}]}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.cancelButton, {backgroundColor:'#3b5261'}]}
                    onPress={() => this.props.navigation.navigate('ListView')}
                  >
                    <Text style={[styles.cancelText,{color:'#fff'}]}>UPDATE</Text>
                  </TouchableOpacity>
                </View>
              </View>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  {alarmData.map((item,ind)=>{
                    return(
                      <TouchableOpacity
                        key= {ind}
                        style={{ ...styles.openButton  }}
                        onPress={() =>this.setState({ modalVisible: !modalVisible, setReminderAlarm: item, checked: true })}
                      >
                        <Text style={{color:'#fff'}}>{item}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
              </Modal>
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
    height: deviceHeight *.22 ,
    backgroundColor:'#A2a2a2',
    justifyContent:'center',
    alignItems:'center'
  },
  addPictureButton: {
    backgroundColor:'#fff',
    width: deviceWidth *.60 ,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius:18,
    justifyContent:'center',
    alignItems:'center'
  },
  addPictureText: {
    fontSize: 16,
    color:'#A2a2a2'
  },
  avatar: {
    height: deviceHeight *.22 ,
    width: '100%',
  },
  listTitle: {
	  color: '#A2a2a2',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .3,
  },
  selectedText: {
	  color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .3,
  },
  eventContainer: {
    paddingVertical: Platform.OS === 'android' ? 15 : 20,
    paddingHorizontal: Platform.OS === 'android' ? 25 : 25,
    backgroundColor:'#fff',
    borderBottomWidth: .3
  },
  eventInputBox: {
    flex: 1,
    marginRight: 30,
    marginTop: Platform.OS === 'android' ? 1 : 5 ,
    borderColor: 'gray', 
    borderBottomWidth: .6,
    height: 40,
  },
  DropdownStyle: {
    height: 12, 
    width: 12, 
    marginTop: Platform.OS === 'android' ? 15 : 15 ,
    position:'absolute', 
    right: 13 
  },
  colorDropdownStyle: {
    height: 12, 
    width: 12, 
    marginTop: Platform.OS === 'android' ? 18 : 16 ,
    // position:'absolute', 
    right: Platform.OS === 'android' ? 28 : 28 ,
  },
  selectGroupView :{
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor:'#fff',
    // borderBottomWidth: .3
  },
  selectGroupBottomLine: {
    marginTop: 8,
    height: 1.8,
    width: deviceWidth * .90 ,
    backgroundColor: '#A2a2a2'
  },
  colorContainer: {
    // paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 15,
    backgroundColor:'#fff',
    borderBottomWidth: .3
  },
  roundColorView: {
    marginTop: 15, 
    height:18, 
    width:18, 
    borderRadius:9, 
    marginLeft: 86,
  },
  timeText: {
    marginRight: 10,
    marginTop: 4,
    color: '#939393',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .2,
    fontWeight: '700'
  },
  checkBoxContainer: {
    marginTop: 25,
    // backgroundColor:'red',
    // fontSize: 12,
    // height: 44,
  },
  reminderContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor:'#e6e1de',
  },
  reminderButton: {
    width:'100%',
    backgroundColor:'#ff6600',
    alignItems:'center',
    justifyContent:'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(20) : AppSizes.verticalScale(16),
    // fontFamily: AppFonts.NBlack,
    fontWeight: '900',
    letterSpacing:.2
  },
  inputBox: {
    width: '100%',
    justifyContent:'center',
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'gray', 
    borderBottomWidth: .8,
    color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    letterSpacing: 1,
    // fontWeight: Platform.OS === 'android' ? '600' : '500'
  },

  slideShowText: {
	  color: '#A2a2a2',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .5,
    // fontWeight: '600',
  },
  statusContainer: {
    padding: 20,
    marginTop: 10,
    backgroundColor:'#fff',
  },
  statusButton: {
    width:'50%',
    backgroundColor:'#ff6600',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical: Platform.OS === 'android' ? 3 : 6
  },
  statusButtonText: {
	  color: '#fff',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .5,
    // fontWeight: '600',
  },
  bottomContainer: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor:'transparent',
  },
  cancelButton: {
    backgroundColor:'#ff6600',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical: Platform.OS === 'android' ? 6 : 8,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 24
  },
  repeatText: {
    color: '#A2a2a2',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    fontWeight: '700'
  },
  checkboxText: {
    color: '#A2a2a2',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    fontWeight: '700'
  },
  cancelText: {
    color: '#fff',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .5,
    // fontWeight: '600',
  },
   //modal style
   centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 60,
    paddingVertical: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    width: '100%',
    backgroundColor: "#ff6600",
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginBottom: 5,
  },
})

const categoryList = [
  { value: 'GROUP' },
  { value: 'PERSONAL' },
  { value: 'BUSINESS' },
]
const colorData =[
  { value: 'Orange' },
  { value: 'Red' },
  { value: 'Green' },
  { value: 'Blue' },
]
const recurrence = [
  { value: 'Everyday' },
  { value: 'Weekly' },
  { value: 'Monthly' },
]

const alarmData = ['Before 15 Min', 'Before 30 Min', 'Before 45 Min','Before 1 hour']