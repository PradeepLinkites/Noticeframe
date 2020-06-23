import React from 'react'
import {ActivityIndicator, StyleSheet, Text, View, SafeAreaView,ScrollView } from 'react-native'
import { get, isEmpty } from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'
import Navbar from '../../Common/commonNavbar'
import SwitchComponent from '../../Common/Switch'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'

// import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// const deviceWidth = Dimensions.get('window').width
// const deviceHeight = Dimensions.get('window').height

export default class ListOfCalendarComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      googleCalendar: 0,
      microsoftOutLookCalendar: 0,
      importCalendar: 0,
      selectCalendar: [],
      importDetails: [],
      listOfCalendar: [],
      userId: '',
      isLoading: false
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
        googleCalendar: get(this.props,'getSettingData.ListOfCalendar.googleCalendar',false),
        microsoftOutLookCalendar: get(this.props,'getSettingData.ListOfCalendar.microsoftOutLookCalendar',false),
        importCalendar: get(this.props,'getSettingData.Import.importCalendar',false),
        selectCalendar: get(this.props,'getSettingData.Import.selectCalendar',[]),
        importDetails: get(this.props,'getSettingData.Import.importDetails',[]),
        listOfCalendar: get(this.props,'getSettingData.Import.listOfCalendar',[]),
        isLoading: false
      })
    }
    if(this.props.updateSettingPhase){
      this.props.getSetting(this.state.userId)
      this.setState({ isLoading: false })
    }
    this.props.resetSettingPhase()
  }

  onChange(name, value){
    if(name === 'google'){
      this.setState({ googleCalendar: value },()=>{
        this.apiHit('Google Calendar', value)
      })
    }
    if(name === 'microsoft'){
      this.setState({ microsoftOutLookCalendar: value },()=>{
        this.apiHit('Microsoft Calendar', value)
      })
    }
  }

  apiHit = (name, value) => {
    const { googleCalendar, microsoftOutLookCalendar, selectCalendar, userId } =this.state
    const list = []
    if(googleCalendar){
      list.push('Google Calendar')
    }
    if(microsoftOutLookCalendar){
      list.push('Microsoft Calendar')
    }
    if(selectCalendar){
      selectCalendar.forEach((val,i)=>{
        list.forEach((value,j)=>{
          if(val === value){
            selectedCalendar.push(value)
          }
        })
      })
    } 
    const data = {
      id: userId,
      value:{
        ListOfCalendar: {
          googleCalendar: this.state.googleCalendar,
          microsoftOutLookCalendar : this.state.microsoftOutLookCalendar,
          listOfCalendar: list
        },
        Import: {
          importCalendar: this.state.importCalendar,
          selectCalendar: selectCalendar,
          importDetails: this.state.importDetails
        }
      }
    }
    this.props.updateSetting(data)
  }

  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'EventSetting' ? 'Event Settings' : ''
    return (
      <SafeAreaView style={[styles.container,{backgroundColor: '#fff'}]}>
        {this.state.isLoading ? 
          <ActivityIndicator color = {'#3b5261'} size = "large" style = {AppStyles.activityIndicator} />
          :
        <ScrollView style={styles.container}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'EventSetting'} 
          />
          <View style={styles.topContainer}>
            <Text style={styles.headerText}>List of calendars</Text>
            <View style={styles.mainView}>
              <Text style={styles.text}>Google Calendar</Text>
              <SwitchComponent onChange={this.onChange.bind(this, 'google')} value={this.state.googleCalendar}/>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Microsoft Outlook Calendar</Text>
              <SwitchComponent onChange={this.onChange.bind(this, 'microsoft')} value={this.state.microsoftOutLookCalendar}/>
            </View>
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
  topContainer:{
    backgroundColor:'#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 35,
    paddingBottom: 45
  },
  mainView : {
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingTop: 15,
    paddingBottom: 15
  },
  headerText: {
    marginBottom: 30,
    color:'#A2a2a2',
    fontSize: 16
  },
  text: {
    color:'#A2a2a2',
    fontSize: 16,
    marginTop: 3
  }
})