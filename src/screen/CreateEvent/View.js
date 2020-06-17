import React from 'react'
import {Modal, Picker, TextInput, Switch, Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get, isEmpty } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import CheckBox from 'react-native-checkbox'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Dropdown } from 'react-native-material-dropdown';
import SwitchComponent from '../Common/Switch'
import ImagePicker from 'react-native-image-picker'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"
import ModalSelector from 'react-native-modal-selector'
import AsyncStorage from '@react-native-community/async-storage'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

let index = 0;
const colorItem = [
    { key: index++, label: 'White' },
    { key: index++, label: 'Hawkes Blue' },
    { key: index++, label: 'Milk Punch' },
    { key: index++, label: 'Coral Candy'},
    { key: index++, label: 'Cruise' },
    { key: index++, label: 'Swirl'},
    { key: index++, label: 'Tusk' },
]

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
      groupName: '',
      memberList: [],
      groupList:[],
      groupListName: [],
      defaultFillColor: 'Tusk',
      eventDate: moment().format('DD MMMM, YYYY'),
      eventDate1: '',
      startTime: moment().add(1, 'hours').format('hh:mm a'),
      startTime1: '',
      isStartPickerVisible: false,
      endTime: moment().add(3, 'hours').format('hh:mm a'),
      endTime1: '',
      isEndPickerVisible: false,
      isDatePickerVisible: false,
      setReminderAlarm: false,
      repeat: 'Everyday',
      notes: '',
      location: '',
      showNotesInSlideShow: false,
      showEventInSlideShow: false,
      private: false,
      public: false,
      modalVisible: false,
      checked: false,
      userEmail: '',
      getUserData: {},
      getSettingData: {},
      userId: '',
      duration: '',
      setTime: '',
      createEventMessage: '',
      isLoading: false,
      eventNameError :false,
      notesError: false,
      red: 0,
      yellow: 0,
      green: 0,
      redHour: 24,
      yellowHour: 48,
      greenHour: 72,
    }
    this._initState = this.state 
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectRecurrence = this.onSelectRecurrence.bind(this)
    this.createEvent = this.createEvent.bind(this)
  }


  componentDidMount() {
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getUser(user1._id)
        this.props.getSetting(user1._id)
        this.props.getGroupListForShow(user1._id)
        this.setState({ userId: user1._id})
      }
    })
  }

  componentDidUpdate(prevProps) {
    if(this.props.createEventPhase) {
      this.props.resetEventPhase()
      this.setState({ isLoading: false , createEventMessage: this.props.createEventMessage })
      this.props.navigation.navigate('Home')
      alert('Event Created Successfully')
      this.props.getEvent(this.state.userId)
    }
    if (this.props.getUserData !== prevProps.getUserData) {
      if(this.props.getUserPhase) {
        this.props.resetPhase()
        this.setState({ getUserData: this.props.getUserData })
      }
    }
    if (this.props.getSettingData !== prevProps.getSettingData) {
      if(this.props.getSetttingPhase) {
        this.props.resetEventPhase()
        this.setState({
          personal: get(this.props, 'getSettingData.Event.personal', false),
          business: get(this.props, 'getSettingData.Event.business', false),
          red: get(this.props, 'getSettingData.FrameColor.red', []),
          yellow: get(this.props, 'getSettingData.FrameColor.yellow', []),  
          green: get(this.props, 'getSettingData.FrameColor.green', []),
          redHour: get(this.props, 'getSettingData.FrameColor.redHour', []),
          yellowHour: get(this.props, 'getSettingData.FrameColor.yellowHour', []),
          greenHour: get(this.props, 'getSettingData.FrameColor.greenHour', []),
          loading: false
        })
      }
    }
    if (this.props.getGroupListForShowPhase) {
      this.props.resetEventPhase()
      let arr = []
      get(this.props, 'getGroupListForShowData', []).map(item=>{
        let obj = {}
        obj['value'] = get(item, 'groupName', '')
        arr.push(obj)
      })
      this.setState({ groupList: get(this.props, 'getGroupListForShowData', []), groupListName: arr })
    }
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
    this.setState({ eventDate: newDate , isDatePickerVisible : false , eventDate1: date})
  }
 
  handleStartTime = (date) => { 
    let time = moment(date).utcOffset('+05:30').format('hh:mm a')
    this.setState({ startTime: time , isStartPickerVisible: false, startTime1: date})
  }
  
  handleEndTime = (date) => {    
    let time = moment(date).utcOffset('+05:30').format('hh:mm a')
    this.setState({ endTime : time , isEndPickerVisible: false, endTime1: date})
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
  
  selectGroupName =(name)=>{
    const { groupList, memberList } = this.state
    groupList.map(item =>{
      if(item.groupName === name){
        this.setState({ memberList: [...memberList , item ]})
      }
    })
    this.setState({ groupName: name })
  }
 
  toggleSwitch1 = (value) => {
    this.setState({showNotesInSlideShow: value})
  }
  toggleSwitch2 = (value) => {
    this.setState({showEventInSlideShow: value})
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    }
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri}
        this.setState({
          eventPicture: source,
        })
      }
    })
  }

  _resetState = () => {
    this.setState(this._initState)
    this.props.navigation.goBack(null)
    return true
  }

  createEvent(){
    const{ eventPicture, eventName, groupName, memberList, defaultFillColor, eventDate, eventDate1, startTime1, endTime1, notes, 
        location, personal, business, group, setReminderAlarm, showNotesInSlideShow, showEventInSlideShow, setTime,
        category, repeat, duration } = this.state
    var error = true
    // let newArray = []
    // this.state.userList.map(item=>{
    // if(this.state.selectedItems.indexOf(item.id) != -1){
    //   memberList.push(item)
    // }
    // })
    this.setState({
      eventNameError: false,
      notesError: false,
    })
    if (eventName.trim() === '') {
      error = false
      this.setState({ eventNameError: true })
    } 
    if (notes.trim() === '') {
      error = false
      this.setState({ notesError: true })
    } 
    if (error) {
    const data = {}
      data.eventPicture = eventPicture
      data.eventName = eventName
      data.selectContacts = memberList
      data.defaultFillColor = defaultFillColor
      data.frameBoundaryColor = defaultFillColor
      data.eventDateLocal = moment(eventDate).format("DD-MM-YYYY")
      data.eventDate = eventDate1
      data.startTime = startTime1
      data.endTime = endTime1
      data.note = notes
      data.location = location
      data.personal = personal
      data.business = business
      data.group = group
      data.setReminderAlarm = setReminderAlarm
      data.showNotesInSlideShow = showNotesInSlideShow
      data.showEventInSlideShow = showEventInSlideShow
      data.setTime = setTime
      data.category = category
      data.userEmail = get(this.state, 'getUserData.email','')
      // data.texts = this.state.texts
      data.eventRecurrence = {
        repeat: repeat,
        duration: duration
      }
      data.count = 1
      const Details = {
        data: data,
        id: get(this.state, 'userId','')
      }
      this.props.createEvent(Details)
    }
  }

  render() {
    const {eventNameError, notesError, checked, modalVisible, groupListName, repeat, category, isEndPickerVisible, isStartPickerVisible, isDatePickerVisible, startTime, endTime, defaultFillColor  } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'CreateEvent' ? 'Create Event' : ''
    return (
      <SafeAreaView style={[AppStyles.container,{backgroundColor:'#3b5261'}]}>
      <ScrollView style={styles.container}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'CreateEvent'} 
          />        
            <View style={styles.topContainer}>
              {get(this.state, 'eventPicture','') === '' ?
                <TouchableOpacity
                  style={styles.addPictureButton}
                  onPress={this.selectPhotoTapped.bind(this)}
                >
                  <Text style={styles.addPictureText}>Add Picture</Text>
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
              </View>
              {eventNameError && <Text style={AppStyles.error}>Please enter the event name</Text>}
            </View>
              {category === 'GROUP' &&
                <View style={styles.selectGroupView}>
                  <Text style={styles.listTitle}>Select Group</Text>
                  <View style={{ marginTop: 10 }}>
                    <Dropdown
                      value={'Select Group Name'}
                      selectedItemColor = '#000'
                      textColor = '#000'
                      onChangeText={(item)=>this.selectGroupName(item)}
                      data={groupListName}
                      fontSize={14}
                      dropdownOffset={{ top: 0, left: 0 }}
                    />
                </View>
                </View>
              }
            <View style={styles.colorContainer}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop: 8}}>
                <View>
                  <Text style={[styles.listTitle,{fontWeight:'600',top: 10,marginLeft: 10 }]}>Default Fill colour</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={ [styles.roundColorView, {backgroundColor : defaultFillColor === 'White' ? '#ffffff' : defaultFillColor === 'Hawkes Blue' ? '#d5d6ea' : defaultFillColor === 'Milk Punch' ? '#f4e3c9' 
                    : defaultFillColor === 'Coral Candy' ? '#f5d5cb': defaultFillColor === 'Cruise' ? '#b5dce1': defaultFillColor === 'Swirl' ? '#d6cdc8': defaultFillColor === 'Tusk' ? '#d7e0b1': ''}]} />
                  <ModalSelector
                    initValueTextStyle={[styles.listTitle,{color: "#000"}]}
                    selectStyle={{borderColor: "transparent"}}
                    style={{marginTop: 2,marginRight: 25}}
                    // selectTextStyle={{color: "blue"}}
                    data={colorItem}
                    initValue={defaultFillColor}
                    onChange={(option)=>this.setState({ defaultFillColor: option.label })} 
                  />
                 <Image source={require('../../assets/sidemenuAssets/Arrow_down.png')} style={styles.colorDropdownStyle}/>
                 {/* <View style={{ marginTop: 8 , marginLeft: 10, width: 80 }}>
                  <Dropdown
                    value={defaultFillColor}
                    selectedItemColor = '#000'
                    textColor = '#000'
                    onChangeText={(item)=>this.setState({ defaultFillColor: item })}
                    data={colorData}
                    fontSize={14}
                    dropdownOffset={{ top: 0, left: 0 }}
                  />
                </View> */}
                </View>
              </View>
            </View>
            <View style={[styles.selectGroupView,{marginTop: 10}]}>
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
                      date ={new Date(this.state.eventDate)}
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
                      date ={new Date(this.state.eventDate)}
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
                  Set Reminder: {this.state.setTime}
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
              <View style={{flexDirection:'row',marginTop:8, justifyContent:'space-between'}}>
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
              {notesError && <Text style={AppStyles.error}>Please enter the notes</Text>}
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
                  <Text style={[styles.slideShowText,{marginBottom:20}]}>Show Notes in SlideShow</Text>
                </View>
                  <SwitchComponent onChange = {this.toggleSwitch1.bind(this)}  value={this.state.showNotesInSlideShow}/>
              </View>
              <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
                <View style={{justifyContent:'center'}}>
                  <Text style={styles.slideShowText}>Show Event in SlideShow</Text>
                </View>
                  <SwitchComponent onChange = {this.toggleSwitch2.bind(this)}  value={this.state.showEventInSlideShow}/>
              </View>
            </View>
            <View style={styles.statusContainer}>
                {/* <View style={{flexDirection:'row'}}>
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
                </View> */}
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity style={[styles.statusButton, {backgroundColor: this.state.private ? '#ff6600': '#fff'}]}
                    onPress={()=>this.setState({ private: true, public: false })}
                  >
                    <Text style={[styles.statusButtonText,{color: this.state.private ? '#fff': '#A2a2a2'}]}>PRIVATE</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.statusButton, {backgroundColor: this.state.public ? '#ff6600': '#fff'}]}
                    onPress={()=>this.setState({ public: true, private: false })}
                    >
                    <Text style={[styles.statusButtonText,{color: this.state.public ? '#fff': '#A2a2a2'}]}>PUBLIC</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.bottomContainer}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TouchableOpacity style={[styles.cancelButton, {backgroundColor:'#A2a2a2'}]}
                   onPress = {this._resetState}
                  >
                    <Text style={[styles.cancelText,{color:'#000'}]}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.cancelButton, {backgroundColor:'#3b5261'}]}
                    onPress = {this.createEvent}
                  >
                    <Text style={[styles.cancelText,{color:'#fff'}]}>CREATE</Text>
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
                        onPress={() =>this.setState({ modalVisible: !modalVisible, setTime: item, checked: true ,setReminderAlarm: checked })}
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
    // fontWeight: Platform.OS === 'android' ? '600' : '500'
  },
  eventContainer: {
    paddingVertical: Platform.OS === 'android' ? 15 : 20,
    paddingHorizontal: Platform.OS === 'android' ? 25 : 25,
    backgroundColor:'#fff',
    borderBottomWidth: .3,
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
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor:'#fff',
    borderBottomWidth: .3,
    justifyContent:'center'
  },
  roundColorView: {
    marginTop: 13, 
    height:18, 
    width:18, 
    borderRadius:9, 
    marginLeft: 86,
    borderWidth: .2
  },
  timeText: {
    marginRight: 10,
    marginTop: 4,
    color: '#939393',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(10) : AppSizes.verticalScale(8),
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
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
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
    padding: 25,
    backgroundColor:'#fff',
  },
  statusButton: {
    borderWidth: .3,
    width:'50%',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical: Platform.OS === 'android' ? 5 : 6
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
    marginTop: 5,
    color: '#A2a2a2',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    fontWeight: '700'
  },
  checkboxText: {
    color: '#A2a2a2',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    fontWeight: '600'
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
const recurrence = [
  { value: 'Everyday' },
  { value: 'Weekly' },
  { value: 'Monthly' },
]

const alarmData = ['Before 15 Min', 'Before 30 Min', 'Before 45 Min','Before 1 hour']

{/*const colorData =[
  { value: 'White' },
  { value: 'Hawkes Blue' },
  { value: 'Milk Punch' },
  { value: 'Coral Candy' },
  { value: 'Cruise' },
  { value: 'Swirl' },
  { value: 'Tusk' },
]*/}