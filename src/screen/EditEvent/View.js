import React from 'react'
import {Picker, TextInput, Switch, Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import CheckBox from 'react-native-checkbox'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

// import SwitchComponent from '../Common/Switch'
import ImagePicker from 'react-native-image-picker'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import moment from "moment"
import ModalSelector from 'react-native-modal-selector'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


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
      contactName: '',
      selectedColor: 'Orange',
      startTime: moment().utcOffset('+05:30').format('hh:mm a'),
      isStartPickerVisible: false,
      endTime: '',
      isEndPickerVisible: false,
      eventDate: moment().utcOffset('+05:30').format('DD MMMM, YYYY'),
      isDatePickerVisible: false,
      selectValue:'GROUP'
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
  onContactNameChange =(text)=>{
    this.setState({ contactName: text })
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
    let index = 0
    const data = [
        { key: index++, label: 'GROUP' },
        { key: index++, label: 'PERSONAL' },
        { key: index++, label: 'BUSINESS' },
    ]
    const colorData = [
      { key: index++, label: 'Orange' },
      { key: index++, label: 'Red' },
      { key: index++, label: 'Green' },
      { key: index++, label: 'Blue' },
  ]
    const {selectValue, isEndPickerVisible, isStartPickerVisible, isDatePickerVisible, startTime, endTime, getUserData , selectedValue, selectedColor  } = this.state
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
              {this.state.avatarSource === null ?
                <TouchableOpacity
                  style={styles.addPictureButton}
                  onPress={this.selectPhotoTapped.bind(this)}
                >
                  <Text style={styles.addPictureText}>Change Picture</Text>
                </TouchableOpacity>
                :
                <Image style={styles.avatar} source={this.state.avatarSource} />
              }
            </View>
            <View style={styles.eventContainer}>
              <Text style={styles.listTitle}>Event Name</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <TextInput
                    multiline
                    style={styles.eventInputBox}
                    maxLength={40}
                    placeholderTextColor="red"
                    onChangeText={text => this.onEventChange(text)}
                    value={this.state.eventName}
                  />
                 <ModalSelector
                    initValueTextStyle={[styles.listTitle,{color: "#3293ed"}]}
                    selectStyle={{borderColor: "transparent"}}
                    style={{right:20}}
                    // selectTextStyle={{color: "blue"}}
                    data={data}
                    initValue={selectValue}
                    onChange={(option)=>this.setState({ selectValue: option.label })} 
                  />
                 <Image source={require('../../assets/sidemenuAssets/Arrow_down.png')} style={styles.DropdownStyle}/>
              </View>
            </View>
              {this.state.selectValue === 'GROUP' &&
                <View style={styles.selectGroupView}>
                  <Text style={styles.listTitle}>Select Group</Text>
                  <TextInput
                    multiline
                    style={styles.inputBox}
                    maxLength={40}
                    placeholderTextColor="red"
                    onChangeText={text => this.onGroupNameChange(text)}
                    value={this.state.groupName}
                  />
                </View>
              }
             {this.state.selectValue === 'PERSONAL' &&
                <View style={styles.selectGroupView}>
                  <Text style={styles.listTitle}>Select Contact</Text>
                  <TextInput
                    multiline
                    style={styles.inputBox}
                    maxLength={40}
                    placeholderTextColor="red"
                    onChangeText={text => this.onContactNameChange(text)}
                    value={this.state.contactName}
                  />
                </View>
              }

            <View style={styles.colorContainer}>
              <View style={{flexDirection:'row'}}>
                <View>
                  <Text style={[styles.listTitle,{fontWeight:'700',top: 10,marginLeft: 10 }]}>Default Fill colour</Text>
                </View>
                  <View style={ [styles.roundColorView, {backgroundColor : selectedColor === 'Red' ? 'red' : selectedColor === 'Blue' ? 'blue' : selectedColor === 'Orange' ? 'orange': selectedColor === 'Green' ? 'green': '' }]} />
                  {/* <Picker
                      selectedValue={selectedColor}
                      style={{ width: 120 ,marginLeft: 5 }}
                      onValueChange={(item, itemIndex) => this.setState({selectedColor : item})}
                    >
                    <Picker.Item label="Orange" value="Orange" />
                    <Picker.Item label="Blue" value="Blue" />
                    <Picker.Item label="Green" value="Green" />
                    <Picker.Item label="red" value="red" />
                  </Picker> */}
                  <ModalSelector
                    initValueTextStyle={[styles.listTitle,{color: "#3293ed"}]}
                    selectStyle={{borderColor: "transparent"}}
                    style={{marginTop: 2}}
                    // selectTextStyle={{color: "blue"}}
                    data={colorData}
                    initValue={selectedColor}
                    onChange={(option)=>this.setState({ selectedColor: option.label })} 
                  />
                 <Image source={require('../../assets/sidemenuAssets/Arrow_down.png')} style={styles.colorDropdownStyle}/>
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
                <View style={{flexDirection:'row'}}>               
                  <Text style={styles.timeText} onPress={()=>this.setState({isStartPickerVisible : true})}>START TIME</Text>
                  {/* <Button title="Show Date Picker" onPress={this.showDatePicker} color='#fff'/> */}
                    <DateTimePickerModal
                      isVisible={isStartPickerVisible}
                      mode="time"
                      onConfirm={this.handleStartTime}
                      onCancel={()=>this.setState({isStartPickerVisible : false})}
                      showIcon={false}
                      locale="es-ES"
                    />
                  <Text style={styles.selectedText}>{get(this.state,'startTime','')}</Text>
                </View>
                <View style={{flexDirection:'row'}}> 
                   <Text style={styles.timeText} onPress={()=>this.setState({isEndPickerVisible : true})}>END TIME</Text>
                   <DateTimePickerModal
                      isVisible={isEndPickerVisible}
                      mode="time"
                      onConfirm={this.handleEndTime}
                      onCancel={()=>this.setState({isEndPickerVisible : false})}
                      showIcon={false}
                      locale="es-ES"
                    />
                  <Text style={styles.selectedText}>{get(this.state,'endTime','')}</Text>
                </View>
              </View>
              <View style={styles.checkBoxContainer}>
                <CheckBox
                  checkboxStyle={{tintColor:'#000'}}
                  label={'send email notification when task is about to start'}
                  labelStyle={styles.checkboxText}
                  // checked={all ? true : false}
                  // onChange={(e)=>this.toggleAllCheckbox(!all)}
                />
            </View>
            </View>
            <View style={styles.reminderContainer}>
              <TouchableOpacity
                style={styles.reminderButton}
                onPress={()=>alert('call')}
              >
                <Text style={AppStyles.buttonText}>Set Reminder Alarm</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.eventContainer,{borderBottomWidth: .3}]}>
               <Text style={styles.listTitle} >Every Recurrence</Text>
              <View style={{flexDirection:'row',marginTop:10,justifyContent:'space-between'}}>
                <View>
                  <Text style={styles.repeatText}>Repeat</Text>
                </View>
                <View>
                   <Text style={styles.selectedText}>Everyday</Text>
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
                    maxLength={40}
                    placeholderTextColor="red"
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
                    style={styles.inputBox}
                    maxLength={40}
                    placeholderTextColor="red"
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
                    value = {this.state.switch1Value}
                    disabled={false}
                    thumbColor={this.state.switch1Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
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
                      value = {this.state.switch2Value}
                      disabled={false}
                      thumbColor={this.state.switch2Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
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
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
    // fontFamily: AppFonts.NRegular,
    letterSpacing: .5,
    fontWeight: '500'
  },
  selectedText: {
	  color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14),
    // fontFamily: AppFonts.NBlack,
    letterSpacing: 1,
    fontWeight: Platform.OS === 'android' ? '600' : '500'
  },
  eventContainer: {
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor:'#fff',
    // borderBottomWidth: .3
  },
  eventInputBox: {
    flex: 1,
    marginRight: 30,
    paddingTop: 10,
    borderColor: 'gray', 
    borderBottomWidth: 1.8,
    color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14),
    letterSpacing: 1,
    fontWeight: Platform.OS === 'android' ? '600' : '500'

  },
  // eventBottomLine: {
  //   marginTop: 8,
  //   height: 1.8,
  //   width: deviceWidth * .60,
  //   backgroundColor: '#A2a2a2'
  // },
  DropdownStyle: {
    height: 12, 
    width: 12, 
    marginTop: Platform.OS === 'android' ? 17 : 15 ,
    position:'absolute', 
    right: 8 
  },
  colorDropdownStyle: {
    height: 12, 
    width: 12, 
    marginTop: Platform.OS === 'android' ? 18 : 16 ,
    position:'absolute', 
    right: Platform.OS === 'android' ? 35 : 28 ,
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
    paddingTop: 20,
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
    borderBottomWidth: 1.8,
    color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14),
    letterSpacing: 1,
    fontWeight: Platform.OS === 'android' ? '600' : '500'
  },

  slideShowText: {
	  color: '#A2a2a2',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
    // fontFamily: AppFonts.NRegular,
    letterSpacing: .5,
    fontWeight: '600',
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
    paddingTop: 15,
    paddingBottom: 15,
  },
  statusButtonText: {
	  color: '#fff',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(17) : AppSizes.verticalScale(13),
    // fontFamily: AppFonts.NRegular,
    letterSpacing: .5,
    fontWeight: '600',
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
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 35,
    paddingRight: 35,
    borderRadius: 24
  },
  repeatText: {
    color: '#939393',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    fontWeight: '700'
  },
  checkboxText: {
    color: '#939393',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    fontWeight: '700'
  },
  cancelText: {
    color: '#fff',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(22) : AppSizes.verticalScale(16),
    // fontFamily: AppFonts.NRegular,
    letterSpacing: .5,
    fontWeight: '600',
  }
})