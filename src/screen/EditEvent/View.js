import React from 'react'
import {ActivityIndicator, Modal, FlatList, TextInput, Picker, Platform, Alert, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get ,isEmpty, size } from 'lodash'
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
import { Button } from 'react-native-paper';
import { RNS3 } from 'react-native-s3-upload';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

let index = 0
export default class EditEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      event_id: '',
      eventPicture: '',
      eventName: '',
      eventNameError: false,
      category: '',
      personal: false,
      business: false,
      group: true,
      groupList:[],
      groupListName: [],
      groupNameShow:[],
      memberList: [],
      defaultFillColor: '',
      eventDate: '',
      eventDate1: '',
      groupName: '',
      startTime: '',
      start_time: '',
      isStartPickerVisible: false,
      endTime: '',
      end_time: '',
      isEndPickerVisible: false,
      isDatePickerVisible: false,
      setReminderAlarm: false,
      repeat: '',
      notes: '',
      // notesError: false,
      location: '',
      showNotesInSlideShow: false,
      showEventInSlideShow: false,
      private: false,
      public: false,
      modalVisible: false,
      checked: false,
      getEventDetailData: {},
      texts: [],
      count: 0,
      setTime: '',
      userEmail: '',
      imageOpenModal: false,
      imageUploadModal: false,
      imageList: [],
      // imageLibary: [
      //   { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/event9.jpeg", index: 1 },
      //   { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/event4.jpeg", index: 2 },
      //   { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/homerightbg.jpg", index: 3 },
      //   { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/event10.jpeg", index: 4 },
      //   { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/event3.jpeg", index: 5 },
      //   { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/event6.jpeg", index: 6 },
      // ],
    }
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this)
    this.onSelectCategory = this.onSelectCategory.bind(this)
    this.onSelectRecurrence = this.onSelectRecurrence.bind(this)
  }

  onFocusFunction = () => {
    this.setState({ isLoading: true })
    const {state} = this.props.navigation
    this.setState({ isLoading: true, eventPicture: [] })
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
  
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  componentWillUnmount () {
    this.focusListener.remove()
  }

  componentDidUpdate = async (prevProps, prevState) => {
    if(this.props.getEventDetailPhase){
      this.props.resetEventPhase()    
      let arr = []
      get(this.props, 'getEventDetailData.selectContacts', '').map(item=>{
      let obj = {}
      obj['value'] = get(item, 'groupName', '')
      arr.push(obj)
      this.setState({ groupNameShow: arr, groupName: get(item, 'groupName', '') })
    })
      this.setState({
        event_id: get(prevProps, 'getEventDetailData._id', ''),
        eventPicture: get(prevProps, 'getEventDetailData.eventPicture', []),
        eventName: get(prevProps, 'getEventDetailData.eventName', ''),
        memberList: get(prevProps, 'getEventDetailData.selectContacts', ''),
        texts: get(prevProps, 'getEventDetailData.texts', ''),
        defaultFillColor: get(prevProps, 'getEventDetailData.defaultFillColor', ''),
        eventDate: get(prevProps, 'getEventDetailData.eventDate', ''),
        startTime: get(prevProps, 'getEventDetailData.startTime', ''),
        endTime: get(prevProps, 'getEventDetailData.endTime', ''),
        checked: get(prevProps, 'getEventDetailData.setReminderAlarm', ''),  
        notes: get(prevProps, 'getEventDetailData.note', ''),
        location: get(prevProps, 'getEventDetailData.location', ''),
        personal: get(prevProps, 'getEventDetailData.personal', ''),
        business: get(prevProps, 'getEventDetailData.business', ''),
        group: get(prevProps, 'getEventDetailData.group', ''),
        setReminderAlarm: get(prevProps, 'getEventDetailData.setReminderAlarm', false),
        showNotesInSlideShow: get(prevProps, 'getEventDetailData.showNotesInSlideShow', ''),
        showEventInSlideShow: get(prevProps, 'getEventDetailData.showEventInSlideShow', ''),
        setTime: get(prevProps, 'getEventDetailData.setTime', ''),
        category: get(prevProps, 'getEventDetailData.category', ''),
        userEmail: get(prevProps, 'getEventDetailData.userEmail', ''),
        repeat: get(prevProps, 'getEventDetailData.eventRecurrence.repeat', ''),
        count: get(prevProps, 'getEventDetailData.count', ''),
        private: get(prevProps, 'getEventDetailData.private', false),
        public: get(prevProps, 'getEventDetailData.public', false),
        isLoading: false
      })
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
    if (this.props.updateEventPhase) {
      this.props.getEvent(this.state.userId)
      this.props.resetEventPhase()
      this.setState({ isLoading: false })
      alert('Event Updated Successfully')
      this.props.navigation.navigate('Home')
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
    let newDate = moment(date).utcOffset('+05:30').format('DD-MM-YYYY')
    this.setState({ eventDate: date , isDatePickerVisible : false, eventDate1: newDate , startTime: ''  , endTime : '' })
  } 

  handleStartTime = (date) => { 
    if(date >= moment()._d){
      this.setState({ startTime: date , isStartPickerVisible: false,  startTimeError: false})
    }else{
      this.setState({ startTime: moment()._d , isStartPickerVisible: false, startTime1: moment()._d})
    }
  }
  
  handleEndTime = (date) => {   
    if((date >= moment()._d && date > moment(this.state.startTime)._d )){
      this.setState({ endTime : date , isEndPickerVisible: false, endTimeError: false})
    }else{
      this.setState({ endTimeError: true , isEndPickerVisible: false })
    }
  }

  onReminder(value){
    this.setState({ checked: !this.state.checked, modalVisible: this.state.checked ? this.state.modalVisible : !this.state.modalVisible })
    if(value){
      this.setState({ setTime: '',  setReminderAlarm: false })
    }
  }

  onLocationChange = (text) => {
     this.setState({ location: text })
  }

  onNotesChange = (text) => {
    this.setState({ notes: text })
  }
  onEventChange = (text) => {
    this.setState({ eventName: text })
  }

  selectGroupName = (name) => {
    const { groupList } = this.state
    const newArray = groupList.filter(item =>item.groupName === name)
    this.setState({ memberList: newArray, groupName: name  })
  }
 
  toggleSwitch1 = (value) => {
    this.setState({showNotesInSlideShow: value})
  }
  toggleSwitch2 = (value) => {
    this.setState({showEventInSlideShow: value})
  }

  openImageModal(){
    this.setState({ imageOpenModal: !this.state.imageOpenModal})
  }

  selectFolder(data){
    this.setState({ imageUploadModal: !this.state.imageUploadModal, imageList: data.imageLibary })
  }

  onSelectImage(item){
    let obj = {}
    let newArray = []
    obj.uri = item.imageUrl
    newArray.push(obj)
    this.setState({ imageUploadModal: false, imageOpenModal: false ,eventPicture: newArray})
  }

  selectPhotoTapped() {
    this.setState({ isLoading: true, imageOpenModal: false })
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    }
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.imageUpload(response)
      }
    })
  }

  imageUpload(data){
    const file = {
      uri: data.uri,
      name: "image.png",
      type: "image/png"
    }    
    const options = {
      // keyPrefix: "",
      // bucket: "noticeframe",
      // region: "eu-west-2",
      // accessKey: "AKIA27YYELXRINJ7KB6U",
      // secretKey: "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",
      // successActionStatus: 201
    }   
    RNS3.put(file, options).then(response => {
      if (response.status !== 201)
        throw new Error("Failed to upload image to S3")
        let obj = {}
        let newArray = []
        obj.uri = get(response.body, 'postResponse.location', '')
        newArray.push(obj)
        this.setState({ eventPicture: newArray, isLoading: false })
    })
  }

  updateEvent(){
    const{ event_id, isLoading, eventPicture, eventName, memberList, defaultFillColor, eventDate, eventDate1, startTime, endTime, notes, userEmail,
        location, personal, business, group, setReminderAlarm, showNotesInSlideShow, showEventInSlideShow, setTime,
        category, repeat, duration } = this.state
    var error = true
    this.setState({
      eventNameError: false,
      // notesError: false,
      isLoading: true
    })
    if(eventName.trim() === ''){
      error = false
      this.setState({ eventNameError: true })
    } 
    // if(notes.trim() === ''){
    //   error = false
    //   this.setState({ notesError: true })
    // } 
    if(error){
    const data = {}
      data.eventPicture = eventPicture
      data.eventName = eventName
      data.selectContacts = memberList
      data.defaultFillColor = defaultFillColor
      data.frameBoundaryColor = defaultFillColor
      data.eventDateLocal = moment(eventDate).format('DD-MM-YYYY')
      data.eventDate = eventDate
      data.startTime = startTime
      data.endTime = endTime
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
      data.userEmail = userEmail
      // data.texts = this.state.texts
      data.eventRecurrence = {
        repeat: repeat,
        duration: ''
      }
      data.count = this.state.count
      const Details = {
        data: data,
        id: get(this.state, 'event_id','')
      }
      // console.log('Details==>>', Details)
      this.props.updateEvent(Details)
    }
  }

  render() {
  const {eventNameError, notesError, groupListName, isLoading, checked, modalVisible, memberList, repeat, category, isEndPickerVisible, isStartPickerVisible, isDatePickerVisible, startTime, endTime, defaultFillColor  } = this.state
  const { state } = this.props.navigation
  const route = get(state, 'routeName', '')  === 'EditEvent' ? 'Edit Event' : ''
    return (
      <SafeAreaView style={[AppStyles.container,{backgroundColor:'#fff'}]}>
      {isLoading ?
        <ActivityIndicator animating = {isLoading} color = '#3b5261' size = "small" style = {styles.activityIndicator} />
        :
        <ScrollView style={styles.container}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'EditEvent'} 
          />        
            <View style={styles.topContainer}>
             <Image style={styles.avatar} source={size(get(this.state,'eventPicture',[])) == 1 ? get(this.state,'eventPicture',[]): require('../../assets/images/placeholder-event.png')} />
              <TouchableOpacity
                style={styles.addPictureButton}
                onPress={this.openImageModal.bind(this)}
              >
                <Text style={styles.addPictureText}>Add Picture</Text>
              </TouchableOpacity>
            </View> 
            <View style={styles.eventContainer}>
              <Text style={styles.listTitle}>Event Name</Text>
              <View style={{ flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput
                    style={styles.eventInputBox}
                    placeholder = "Event Name"
                    placeholderTextColor="#000"
                    maxLength={20}
                    onChangeText={text => this.onEventChange(text)}
                    value={this.state.eventName}
                  />
                <View style={{ width: Platform.OS === 'android' ? 125 : 135,  marginRight: Platform.OS === 'android' ? 15 : 0, paddingHorizontal: 3}}>
                {Platform.OS === 'android' ? 
                  <Picker
                    selectedValue={get(this.state, 'category', '')}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => this.onSelectCategory(itemValue)}
                  >
                    <Picker.Item label="PERSONAL" value="PERSONAL" />
                    <Picker.Item label="GROUP" value="GROUP" />
                    <Picker.Item label="BUSINESS" value="BUSINESS" />
                  </Picker>
                  :
                  <Dropdown
                    value={category}
                    selectedItemColor = '#000'
                    textColor = '#3293ed'
                    onChangeText={(item)=>this.onSelectCategory(item)}
                    data={categoryList}
                    dropdownOffset={{ top: 10, left: 0}} 
                  />
                }
                </View>
                 {/* <Image source={require('../../assets/sidemenuAssets/Arrow_down.png')} style={styles.DropdownStyle}/> */}
              </View>
              {eventNameError && <Text style={AppStyles.error}>Please enter the event name</Text>}
            </View>
            {category === 'GROUP' &&
              <View style={styles.selectGroupView}>
                <Text style={styles.listTitle}>Select Group</Text>
                <View style={{ marginTop: 10 }}>
                  <Dropdown
                    value={this.state.groupName}
                    selectedItemColor = '#000'
                    textColor = '#000'
                    onChangeText={(item)=>this.selectGroupName(item)}
                    data={groupListName}
                    fontSize={16}
                    dropdownOffset={{ top: 15, left: 0}} 
                  />
                </View>
              </View>
            }
            <View style={styles.colorContainer}>
              <View style={{flexDirection:'row',justifyContent:'space-between',marginTop: 8 ,paddingLeft: 10}}>
                <View>
                  <Text style={[styles.listTitle,{fontWeight:'700',top: 10 }]}>Default Fill colour</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                <View style={ [styles.roundColorView, {backgroundColor : defaultFillColor === 'White' ? '#ffffff' : defaultFillColor === 'Hawkes Blue' ? '#d5d6ea' : defaultFillColor === 'Milk Punch' ? '#f4e3c9' 
                    : defaultFillColor === 'Coral Candy' ? '#f5d5cb': defaultFillColor === 'Cruise' ? '#b5dce1': defaultFillColor === 'Swirl' ? '#d6cdc8': defaultFillColor === 'Tusk' ? '#d7e0b1': ''}]} />
                  <ModalSelector
                    initValueTextStyle={[styles.listTitle,{color: "#000"}]}
                    selectStyle={{borderColor: "black"}}
                    style={{marginTop: 2,marginHorizontal: 10}}
                    selectTextStyle={{color: "blue"}}
                    data={colorItem}
                    initValue={defaultFillColor}
                    onChange={(option)=>this.setState({ defaultFillColor: option.label })} 
                  />                  
                  {/* <Image source={require('../../assets/sidemenuAssets/Arrow_down.png')} style={styles.colorDropdownStyle}/>  */}               
                </View>
              </View>
            </View>
            <View style={[styles.selectGroupView,{marginTop: 10, borderBottomWidth:.3 }]}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text style={[styles.listTitle, {marginTop: 7}]}>Event Date</Text>
                <Button mode="outlined" uppercase = {false}color = '#000' style={{marginLeft: 10 ,width: 127 }}
                  onPress={()=>this.setState({isDatePickerVisible : true})}                 
                >
                  {get(this.state,'eventDate','') !== '' ? moment(get(this.state,'eventDate','')).format('DD-MM-YYYY') : 'Date picker' }
                </Button>
              </View>
              {/* {this.state.eventDateError && <Text style={AppStyles.error}>Please select the event date</Text>} */}
              <DateTimePickerModal
                minimumDate={new Date()}
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={this.handleDate}
                onCancel={()=>this.setState({isDatePickerVisible : false})}
                showIcon={false}
                // locale="es-ES"
               />
              {/* <Text onPress={()=>this.setState({isDatePickerVisible : true})} style={[styles.selectedText,{marginTop: 8}]}>{moment(get(this.state,'eventDate','')).format('DD-MM-YYYY')}</Text> */}
            </View>
            
            <View style={styles.eventContainer}>
              <Text style={styles.listTitle}>Event Time</Text>
              <View style={{flexDirection:'row',marginTop:8,justifyContent:'space-between',marginRight: 5}}>
                <View style={{flexDirection:'row'}} >               
                  <Text style={styles.timeText} >START TIME</Text>
                  <Button mode="outlined" uppercase = {false} color = '#000' style={{width: 122, marginHorizontal: .3 }}
                    onPress={()=>this.setState({isStartPickerVisible : true})}  
                    disabled ={get(this.state,'eventDate','') === '' ? true : false}               
                  >
                    {get(this.state,'startTime','') !== '' ? moment(get(this.state,'startTime','')).format('h:mm A') : 'Time picker' }
                  </Button>
                  <DateTimePickerModal
                    minimumDate={new Date()}
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
                  {/* <Text style={styles.selectedText}>{moment(get(this.state,'startTime','')).format("HH:mm A")}</Text> */}
                </View>
                <View style={{flexDirection:'row'}}> 
                   <Text style={[styles.timeText,{marginLeft: 2}]}>END TIME</Text>
                   <Button mode="outlined" uppercase = {false} color = '#000' style={{width: 120, marginRight: 5}}
                    onPress={()=>this.setState({isEndPickerVisible : true})} 
                    disabled ={get(this.state,'eventDate','') === '' ? true : false}                 
                  >
                    {get(this.state,'endTime','') !== '' ? moment(get(this.state,'endTime','')).format('h:mm A') : 'Time picker' }
                  </Button>
                   <DateTimePickerModal
                      // minimumDate={new Date()}
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
                  {/* <Text style={styles.selectedText}>{moment(get(this.state,'endTime','')).format("HH:mm A")}</Text> */}
                </View>
              </View>
              {this.state.endTimeError && <Text style={AppStyles.error}>Please select the valid end time</Text>}
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  checkboxStyle={{tintColor:'#000'}}
                  label={'send email notification when task is about to start'}
                  labelStyle={styles.checkboxText}
                  checked={checked}
                  onChange={this.onReminder.bind(this)}
                  />
                 {(get(this.state, 'setReminderAlarm', false) && checked ) &&
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
              <Text style={[styles.repeatText,{marginTop: 15}]}>Repeat</Text>
                {/* <View style={{flexDirection:'row'}}>
                   <Text style={[styles.selectedText,{marginLeft:0}]}>Everyday</Text>
                   <Image source={require('../../assets/icons/Arrow.png')} style={{height: 10,width: 10, marginTop: 6}}/>
                </View> */}
                {/* <View style={{ width: 125 }}>
                </View> */}
                {Platform.OS === 'android' ? 
                  <Picker
                    selectedValue={repeat}
                    style={{ width: 140}}
                    onValueChange={(itemValue, itemIndex) => this.onSelectRecurrence(itemValue)}
                  >
                    <Picker.Item label="Everyday" value="Everyday" />
                    <Picker.Item label="Weekly" value="Weekly" />
                    <Picker.Item label="Monthly" value="Monthly" />
                  </Picker>
                  :
                  <Dropdown
                    value={repeat}
                    selectedItemColor = '#000'
                    textColor = '#000'
                    onChangeText={(item)=>this.onSelectRecurrence(item)}
                    data={recurrence}
                    fontSize={16}
                    dropdownOffset={{ top: 10, left: 0 }}
                    containerStyle={{width:120}}
                  />
                }
              </View>
            </View>
            <View style={styles.selectGroupView}>
               <Text style={styles.listTitle}>Note</Text>
              <View style={{flexDirection:'row',marginTop:8,justifyContent:'space-between'}}>
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
              {/* {notesError && <Text style={AppStyles.error}>Please enter the notes</Text>} */}
            </View>
            <View style={styles.selectGroupView}>
              <Text style={styles.listTitle}>Location</Text>
              <View style={{flexDirection:'row',marginTop:8,justifyContent:'space-between'}}>
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
              {/* <View style={styles.statusContainer}>
                <View style={{flexDirection:'row'}}>
                  <TouchableOpacity style={styles.statusButton}>
                    <Text style={[styles.statusButtonText,{color:'#FFF'}]}>BUSY</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.statusButton,{backgroundColor:'#fff',borderRightWidth:.3,borderTopWidth:.3,borderBottomWidth:.3}]}>
                    <Text style={[styles.statusButtonText,{color:'#A2a2a2'}]}>AVAILABLE</Text>
                  </TouchableOpacity>
                </View>
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
              </View> */}
              
              <View style={styles.bottomContainer}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <TouchableOpacity style={[styles.cancelButton, {backgroundColor:'#A2a2a2'}]}
                    onPress={()=>this.props.navigation.goBack(null)}
                  >
                    <Text style={[styles.cancelText,{color:'#000'}]}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.cancelButton, {backgroundColor:'#3b5261'}]}
                    onPress={this.updateEvent.bind(this)}
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
                        onPress={() =>this.setState({ setTime: item, modalVisible: !modalVisible, setReminderAlarm: checked, checked: true })}
                      >
                        <Text style={{color:'#fff'}}>{item}</Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.imageOpenModal}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
              >
              <View style={styles.centeredView}>
                <View style={styles.imageUploadModal}>
                  <View style={{padding: 20,flexDirection:'row',justifyContent:'space-between'}}>
                    <Text style={[styles.cancelText,{color:'#000'}]}>Select Image</Text>
                    <TouchableOpacity onPress={() =>this.setState({ imageOpenModal: false})}><Text>CANCEL</Text></TouchableOpacity>
                  </View>
                  <View style={{ height:.5, backgroundColor:'#A2a2a2'}} />
                    <View style={{ paddingHorizontal: 20, paddingVertical: 50}}>
                      <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={folderLibary}
                        horizontal={true}
                        renderItem={({ item, index }) => {
                          return(
                            <TouchableOpacity style={{margin: 10}} onPress={this.selectFolder.bind(this, item)}>
                            <Image
                              style={{width: 90, height: 100 }}
                              source={require('../../assets/sidemenuAssets/Folder.png')}
                            />
                            <Text>{item.name}</Text>
                            </TouchableOpacity>
                          )
                        }}
                      />
                    </View>
                    <TouchableOpacity style={{padding: 20,backgroundColor:'#3b5261',alignItems:'center' }} onPress={this.selectPhotoTapped.bind(this)}><Text style={[styles.cancelText,{color:'#fff'}]}>Choose Other</Text></TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal
              animationType="slide"
              visible={this.state.imageUploadModal}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
              >
              <View style={{flex: 1 ,backgroundColor:'#fff'}}>
                <View style={{backgroundColor:'#3b5261',alignItems:'center',justifyContent:'center',paddingVertical: 20}}>
                  <Text style={[styles.cancelText,{color:'#fff'}]}>Select Images</Text>
                </View>
                <View style={styles.MainContainer}>
                  <FlatList
                    data={this.state.imageList}
                    renderItem={({ item }) => (
                      <TouchableOpacity onPress={this.onSelectImage.bind(this, item)} style={{ flex: 1, flexDirection: 'column', margin: 1}}>
                        <Image style={styles.imageThumbnail} source={{ uri: item.imageUrl }} />
                      </TouchableOpacity>
                    )}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                  />
                </View>
              </View>
            </Modal>
        </ScrollView>
      }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#e6e1de'
  },
    activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  topContainer:{
    height: deviceHeight *.28 ,
    // backgroundColor:'#A2a2a2',
    alignItems:'center'
  },
  addPictureButton: {
    backgroundColor:'#fff',
    width: deviceWidth *.60 ,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius:18,
    justifyContent:'center',
    alignItems:'center',
    bottom: Platform.OS === 'android' ? AppSizes.verticalScale(60) : AppSizes.verticalScale(60),
  },
  addPictureText: {
    fontSize: 16,
    color:'#A2a2a2'
  },
  avatar: {
    height: deviceHeight *.28 ,
    width: '100%',
  },
  listTitle: {
	  color: '#A2a2a2',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .3,
  },
  selectedText: {
    marginTop: 2,
	  color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .3,
  },
  eventContainer: {
    paddingVertical: Platform.OS === 'android' ? 15 : 20,
    paddingHorizontal: Platform.OS === 'android' ? 15 : 25,
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
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(12),
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
    paddingVertical: Platform.OS === 'android' ? 20 : 20,
    paddingHorizontal: Platform.OS === 'android' ? 15 : 25,
    backgroundColor:'#fff',
  },
  selectGroupBottomLine: {
    marginTop: 8,
    height: 1.8,
    width: deviceWidth * .90 ,
    backgroundColor: '#A2a2a2'
  },
  colorContainer: {
    flex: 1,
    paddingBottom: 15,
    paddingHorizontal: 15,
    backgroundColor:'#fff',
    borderBottomWidth: .3,
    justifyContent:'center'
  },
  roundColorView: {
    marginTop: 13, 
    marginRight: 8,
    height:18, 
    width:18, 
    borderRadius: 9, 
    borderWidth: .2
  },
  roundViewModal: {
    height:18, 
    width:18, 
    borderRadius:9, 
    borderWidth: .2,
    marginLeft: 40, 
    marginRight: 60
  },
  timeText: {
    marginRight: 3,
    marginTop: 12,
    color: '#939393',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(10) : AppSizes.verticalScale(8),
    fontFamily: AppFonts.NRegular,
    fontWeight: '600'
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
  colorModalView: {
    flexDirection: 'row',paddingVertical: 10 
  },
  imageUploadModal: {
    width: '90%',
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },

  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Platform.OS === 'android' ? AppSizes.verticalScale(100) : AppSizes.verticalScale(100),
  },
})

const categoryList = [{ value: 'GROUP' },{ value: 'PERSONAL' },{ value: 'BUSINESS' }]
const recurrence = [{ value: 'Everyday' },{ value: 'Weekly' },{ value: 'Monthly' }]
const alarmData = ['Before 15 Min', 'Before 30 Min', 'Before 45 Min','Before 1 hour']
const colorItem = [
  {
    label: 'White', 
    component:<View style = {styles.colorModalView}><View style={[styles.roundViewModal, {backgroundColor:'#ffffff'}]}/><Text style={styles.selectedText}>White</Text></View> 
  },
  {
    label: 'Hawkes Blue', 
    component:<View style = {styles.colorModalView}><View style={[styles.roundViewModal, {backgroundColor:'#d5d6ea'}]}/><Text style={styles.selectedText}>Hawkes Blue</Text></View> 
  },
  {
    label: 'Milk Punch', 
    component:<View style = {styles.colorModalView}><View style={[styles.roundViewModal, {backgroundColor:'#f4e3c9'}]}/><Text style={styles.selectedText}>Milk Punch</Text></View> 
  },
  {
    label: 'Coral Candy', 
    component:<View style = {styles.colorModalView}><View style={[styles.roundViewModal, {backgroundColor:'#f5d5cb'}]}/><Text style={styles.selectedText}>Coral Candy</Text></View> 
  },
  {
    label: 'Cruise', 
    component:<View style = {styles.colorModalView}><View style={[styles.roundViewModal, {backgroundColor:'#b5dce1'}]}/><Text style={styles.selectedText}>Cruise</Text></View> 
  },
  {
    label: 'Swirl', 
    component:<View style = {styles.colorModalView}><View style={[styles.roundViewModal, {backgroundColor:'#d6cdc8'}]}/><Text style={styles.selectedText}>Swirl</Text></View> 
  },
  {
    label: 'Tusk', 
    component:<View style = {styles.colorModalView}><View style={[styles.roundViewModal, {backgroundColor:'#d7e0b1'}]}/><Text style={styles.selectedText}>Tusk</Text></View> 
  },
]

const folderLibary = [
  { name: "Architecture and Engineering",
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Site%20Visit%202.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Site%20Visit%201.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Construction.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Fabricating.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Design%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Coding%20or%20Price%20Matrix%20Meetig.jpg"},
    ] 
  },
  { name: "Building and Grounds Cleaning and Maintenance", 
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Window%20Cleaning.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Tweaking.png"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Site%20Visit.png"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/site%20visit.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Site%20Clearance.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Construction.png"},
    ] 
  },
  { name: "Business and Financial Operations Occupations",
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Team%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Stocks%20or%20Sales%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Review%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Price%20Matrix%20Meeting.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Negotiations%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Meeting.jpg"},    
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Meeting%202.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Investments%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Interviewing.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Interviewing%202.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Finance%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Finance%20Leadership%20Team%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Contract%20Negotiation%20Meeting%201.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Brain%20Storming%20Meeting%203.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/1-2-1.jpg"},
    ] 
  },
  { name: "Community and Social Services",
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Team%20Away%20Day.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Support%20or%20Contact%20by%20Phone.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Problem%20Solving.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/PPE%20Selection%20Meeting.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/In%20Maths%20Class.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Drugs%20Committee%20Meeting.jpg"},
    ] 
 },
  { name: "Computer and Mathematical",
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Coding%20or%20Price%20Matrix%20Meeting.jpg"},
    ] 
  },
  { name: "Education, Training, and Library",
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Training.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Team%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Study%20Leave.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Study%20%26%20Training.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Lecturing.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Finance%20Leadership%20Team%20Meeting.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Away%20Day%202.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Away%20Day%201.jpg"},
    ] 
 },
  { name: "Entertainment and Media",
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Stage%20Management.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Sound%20Testing.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Rehearsals.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Recording.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Photo%20Shoot.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Overseas.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Stage.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Interview.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Mixing.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/In%20Studio%20Filming.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/In%20Production.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Filming%20on%20Location.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Editing.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Creating.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Concert.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Concert%20Meeting.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Blogging.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/At%20Rock%20Concert.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/At%20Aquarium.jpg"},
    ] 
  },
  { name: "Farming, Fishing, and Forestry",
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Wood%20cutting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Tree%20Felling.png"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Shepherding.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Shearing.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Dive.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Lambing.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Harvesting2.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Harvesting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Fishing2.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Fishing.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/At%20Market.jpg"},
    ] 
  },
  { name: "Office and Administrative", 
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Typing_Dictation_Secretarial.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Filing.jpg"},
    ] 
  },
  { name: "Healthcare",
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Ward%20Round3.png"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/ward%20round2.png"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Ward%20Round.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Vet%20in%20Theatres.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Pharmacist%20Drugs%20Round.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Induction.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Off%20Sick.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Midwife%20on%20Visits.png"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/In%20Theatre.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/In%20Laboratory.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/In%20Laboratory%202.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/In+Delivery+Suite.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/In%20Consultation.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Drugs%20Round.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Doctors%20Appointment.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Diagnostics%20Meeting.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Covid-19%20Meeting.jpg"},
    ] 
  },
  { name: "Informal Meetings", 
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Roof%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Lunch%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Coffee%20Club%20Meeting.jpg"},
  ] 
 },
  { name: "Legal",
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/In%20Court.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Conveyancing.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/At%20Court%20House.jpg"},
    ]   
  },
  { name: "Sales & Retail", 
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Sales%20Strategy%20Meeting.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Presenting.png"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/In%20Consultation.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Forecasting%20Meeting.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Client%20Meeting.jpg"},
    ] 
  },
  { name: "Staff Absence", 
    imageLibary:[
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Study%20leave.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Sick%20leave.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Sick%20Leave%202.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Self-Isolating.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Self-Isolating%202.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Paternity%20Leave%203.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Paternity%20Leave%202.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Paternity%20Leave%201.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Training%20Course.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Holiday.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Annual%20Leave.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Annual%20Leave%203.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/On%20Annual%20Leave%202.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Maternity%20Leave.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Maternity%20Leave%202.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/In%20Hospital.jpg"},
      { imageUrl:  "https://noticeframe.s3.eu-west-2.amazonaws.com/Carers%20Leave.jpg"},
      { imageUrl: "https://noticeframe.s3.eu-west-2.amazonaws.com/Bereavement%20Leave.jpg"},
    ] 
  },
]