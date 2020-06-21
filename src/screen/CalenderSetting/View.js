import React from 'react'
import {ActivityIndicator, Platform, StyleSheet, Text, View,  SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get , isEmpty } from 'lodash'
import AsyncStorage from '@react-native-community/async-storage'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import SwitchComponent from '../Common/Switch'

export default class CalendarSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      import: false,
      calendarHeader: '',
      calendarBody: '',
      calendarFont: '',
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
        import: get(this.props,'getSettingData.Calendar.import',false),
        calendarHeader: get(this.props,'getSettingData.Calendar.calendarHeader',''),
        calendarBody: get(this.props,'getSettingData.Calendar.calendarBody',''),
        calendarFont: get(this.props,'getSettingData.Calendar.calendarFont',''),
        isLoading: false
      })
    }
    // if(this.props.updateSettingPhase){
    //   this.props.getSetting(this.state.userId)
    //   this.setState({ isLoading: false })
    // }
    this.props.resetSettingPhase()
  }

  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'CalendarSetting' ? 'Calendar Settings' : ''
    return (
      <SafeAreaView style={[AppStyles.container,{backgroundColor: '#fff'}]}>
        {this.state.isLoading ? 
        <ActivityIndicator color = {'#3b5261'} size = "large" style = {AppStyles.activityIndicator} />
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
              <SwitchComponent onChange={(value)=>this.setState({ import: value})} value={this.state.import}/>
            </View>
            {/* <View style={styles.secondView}>
              <Text style={styles.text}>Export</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.exportValue}/>
            </View> */}
          </View>       
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={()=>alert('call')}
            >
              <Text style={AppStyles.buttonText}>Calendar Header Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={()=>alert('call')}
            >
              <Text style={AppStyles.buttonText}>Calendar Body Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={()=>alert('call')}
            >
              <Text style={AppStyles.buttonText}>Calendar Text Theme</Text>
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
  bottomContainer:{
    backgroundColor:'#fff',
    paddingHorizontal: 20,
    paddingBottom: 80
  },
})