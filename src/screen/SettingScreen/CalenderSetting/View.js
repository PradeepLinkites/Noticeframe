import React from 'react'
import {Dimensions, ActivityIndicator, Platform, Button, StyleSheet, Text, View,  SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import Navbar from '../../Common/commonNavbar'
import { get , isEmpty } from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
import SwitchComponent from '../../Common/Switch'
import Modal from 'react-native-modal'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class CalendarSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      import: false,
      calendarHeader: '',
      calendarBody: '',
      calendarFont: '',
      isLoading: false,
      isHeaderModalVisible: false,
      isBodyModalVisible: false,
      isFontModalVisible: false,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.setState({ userId: user1._id })
        this.props.getSetting(user1._id)
      }
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.getSettingPhase){
      this.setState({ 
        import: get(this.props,'getSettingData.Calendar.import',false),
        calendarHeader: get(this.props,'getSettingData.Calendar.calendarHeader',''),
        calendarBody: get(this.props,'getSettingData.Calendar.calendarBody',''),
        calendarFont: get(this.props,'getSettingData.Calendar.calendarFont',''),
        isLoading: false
      })
    }
    if(this.props.updateSettingPhase){
      this.setState({ isLoading: false })
      this.props.getSetting(this.state.userId)
    }
    this.props.resetSettingPhase()
  }

  onChange = (value) => {
    this.setState({ import: value},()=>{
     const data = {
       id: this.state.userId,
       value:{
        Calendar: {
          import: this.state.import,
          calendarHeader: this.state.calendarHeader,
          calendarBody: this.state.calendarBody,
          calendarFont: this.state.calendarFont,
         }
       }
     }
     this.props.updateSetting(data)
    })
  }

  toggleHeaderModal = () => {
    this.setState({isHeaderModalVisible: !this.state.isHeaderModalVisible})
  }

  toggleBodyModal = () => {
    this.setState({isBodyModalVisible: !this.state.isBodyModalVisible})
  }

  toggleFontModal = () => {
    this.setState({isFontModalVisible: !this.state.isFontModalVisible})
  }

  onSelect = (name, colorName) => {
    if(name === 'header'){
      this.setState({ calendarHeader: colorName , isHeaderModalVisible: false },() => this.submit())
    }
    if(name === 'body'){
      this.setState({ calendarBody: colorName , isBodyModalVisible: false},() => this.submit())
    }
    if(name === 'font'){
      this.setState({ calendarFont: colorName , isFontModalVisible: false },() => this.submit())
    }
  }

  submit(){
    this.setState({ isLoading: true })
    const data = {
      id: this.state.userId,
      value:{
       Calendar: {
         import: this.state.import,
         calendarHeader: this.state.calendarHeader,
         calendarBody: this.state.calendarBody,
         calendarFont: this.state.calendarFont,
        }
      }
    }
    this.props.updateSetting(data)
  }

  render() {
    const { isLoading, calendarHeader, calendarBody, calendarFont } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'CalendarSetting' ? 'Calendar Settings' : ''
    return (
      <SafeAreaView style={[AppStyles.container,{backgroundColor: '#fff'}]}>
        {isLoading ? 
        <ActivityIndicator color = {'#3b5261'} size = "small" style = {AppStyles.activityIndicator} />
        :
        <ScrollView style={styles.container}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'CalendarSetting'} 
          />
          <View style={styles.topContainer}>
            <View style={styles.firstView}>
              <Text style={styles.text}>Import</Text>
              <SwitchComponent onChange={this.onChange} value={this.state.import}/>
            </View>
            {/* <View style={styles.secondView}>
              <Text style={styles.text}>Export</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.exportValue}/>
            </View> */}
          </View>       
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={this.toggleHeaderModal}
            >
              <Text style={AppStyles.buttonText}>Calendar Header Theme</Text>
            </TouchableOpacity>
            {/* <View style={ [styles.roundColorView, {backgroundColor : calendarHeader === 'White' ? '#ffffff' : calendarHeader === 'Hawkes Blue' ? '#d5d6ea' : calendarHeader === 'Milk Punch' ? '#f4e3c9' 
                    : calendarHeader === 'Coral Candy' ? '#f5d5cb': calendarHeader === 'Cruise' ? '#b5dce1': calendarHeader === 'Swirl' ? '#d6cdc8': calendarHeader === 'Tusk' ? '#d7e0b1': ''}]} 
            /> */}
            <TouchableOpacity
              style={AppStyles.button}
              onPress={this.toggleBodyModal}
            >
              <Text style={AppStyles.buttonText}>Calendar Body Theme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={AppStyles.button}
              onPress={this.toggleFontModal}
            >
              <Text style={AppStyles.buttonText}>Calendar Text Theme</Text>
            </TouchableOpacity>
          </View> 

            <View style={styles.bottomContainer}>
              <View><Text style={styles.label}>HEADER COLOR</Text></View>
              <View style={[styles.colorButton,{backgroundColor : calendarHeader === 'White' ? '#ffffff' : calendarHeader === 'Hawkes Blue' ? '#d5d6ea' : calendarHeader === 'Milk Punch' ? '#f4e3c9' 
                    : calendarHeader === 'Coral Candy' ? '#f5d5cb': calendarHeader === 'Cruise' ? '#b5dce1': calendarHeader === 'Swirl' ? '#d6cdc8': calendarHeader === 'Tusk' ? '#d7e0b1': ''}]} />
            </View>
            <View style={styles.bottomContainer}>
              <View><Text style={styles.label}>BODY COLOR</Text></View>
              <View style={[styles.colorButton,{backgroundColor : calendarBody === 'White' ? '#ffffff' : calendarBody === 'Hawkes Blue' ? '#d5d6ea' : calendarBody === 'Milk Punch' ? '#f4e3c9' 
                    : calendarBody === 'Coral Candy' ? '#f5d5cb': calendarBody === 'Cruise' ? '#b5dce1': calendarBody === 'Swirl' ? '#d6cdc8': calendarBody === 'Tusk' ? '#d7e0b1': ''}]} />
            </View>
            <View style={styles.bottomContainer}>
              <View><Text style={styles.label}>FONT COLOR</Text></View>
              <View style={[styles.colorButton, {backgroundColor : calendarFont === 'White' ? '#ffffff' : calendarFont === 'Black' ? '#000' : ''}]} />
            </View>

            {/* <TouchableOpacity
              style={[AppStyles.button,{backgroundColor: '#3b5261', paddingVertical: Platform.OS === 'android' ? 10  : 12 ,marginLeft: 20,marginRight: 20}]}
              onPress={this.submit.bind(this)}
            >
              {isLoading
                ?
                <ActivityIndicator size="small" color="#fff" />
                :
                <Text style={[AppStyles.buttonText,{fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14)}]}>Save</Text>
              }
            </TouchableOpacity> */}

          <Modal isVisible={this.state.isHeaderModalVisible}>
            <View style={{height: deviceHeight/2, backgroundColor:'#fff'}}>    
              {colorData.map((item,ind) => (
                <TouchableOpacity key={ind} onPress={this.onSelect.bind(this, 'header', item.name)} style={styles.colorModalView}><View style={[styles.roundViewModal, {backgroundColor:item.color}]}/><Text style={styles.selectedText}>{item.name}</Text></TouchableOpacity> 
              ))}
            </View>
            <Button title="Hide modal" onPress={this.toggleHeaderModal} />
          </Modal>   

          <Modal isVisible={this.state.isBodyModalVisible}>
            <View style={{height: deviceHeight/2, backgroundColor:'#fff'}}>    
              {colorData.map((item,ind) => (
                <TouchableOpacity  key={ind} onPress={this.onSelect.bind(this, 'body', item.name)} style={styles.colorModalView}><View style={[styles.roundViewModal, {backgroundColor:item.color}]}/><Text style={styles.selectedText}>{item.name}</Text></TouchableOpacity> 
              ))}
            </View>
            <Button title="Hide modal" onPress={this.toggleBodyModal} />
          </Modal> 

          <Modal isVisible={this.state.isFontModalVisible}>
            <View style={{height: deviceHeight/6, backgroundColor:'#fff', justifyContent:'center'}}>    
              {fontColor.map((item,ind) => (
                <TouchableOpacity  key={ind} onPress={this.onSelect.bind(this, 'font', item.name)} style={styles.colorModalView}><View style={[styles.roundViewModal, {backgroundColor:item.color}]}/><Text style={styles.selectedText}>{item.name}</Text></TouchableOpacity> 
              ))}
            </View>
            <Button title="Hide modal" onPress={this.toggleFontModal} />
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
    backgroundColor:'#fff'
  },
  topContainer:{
    backgroundColor:'#fff',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  firstView : {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  secondView : {
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 20
  },
  text: {
    color:'#A2a2a2',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    top: 5
  },
  buttonContainer:{
    backgroundColor:'#fff',
    paddingHorizontal: 20,
    paddingBottom: 80
  },
  colorModalView: {
    flex: 1,
    flexDirection: 'row',paddingVertical: 10, borderBottomColor: '#A2a2a2',borderBottomWidth: .3
  },
  roundViewModal: {
    height:18, 
    width:18, 
    borderRadius:9, 
    borderWidth: .2,
    marginLeft: 40, 
    marginRight: 60
  },
  selectedText: {
	  color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .3,
    // fontWeight: Platform.OS === 'android' ? '600' : '500'
  },
  bottomContainer : {
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30
  },
  label: {
    marginTop: 5,
    marginBottom: 10, 
    color:'#A2a2a2',
    fontWeight: '700',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .6
  },
  colorButton: {
    marginTop: 5,
    height: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(16),
    width: Platform.OS === 'android' ? AppSizes.verticalScale(100) : AppSizes.verticalScale(90),
    borderRadius: 30,
    borderWidth: .3
 },
  // roundColorView: {
  //   marginTop: 5, 
  //   height:30, 
  //   width:30, 
  //   borderRadius: 15, 
  //   marginLeft: 86,
  //   borderWidth: .2
  // },
})

const colorData = [
  {name: 'White', color: '#ffffff'},
  {name: 'Hawkes Blue', color: '#d5d6ea'},
  {name: 'Milk Punch', color: '#f4e3c9'},
  {name: 'Coral Candy', color: '#f5d5cb'},
  {name: 'Cruise', color: '#b5dce1'},
  {name: 'Swirl', color: '#d6cdc8'},
  {name: 'Tusk', color: '#d7e0b1'},
]
const fontColor = [
  {name: 'White', color: '#ffffff'},
  {name: 'Black', color: '#000'},
]