import React from 'react'
import {Picker, TextInput, Switch, Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import SwitchComponent from '../Common/Switch'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }
  OnChange=(value)=>{
     this.setState({ value: value})
  }

  render() {
    const { selectedColor  } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'EventSetting' ? 'Event Settings' : ''
    return (
      <SafeAreaView style={[styles.container,{backgroundColor: '#3b5261'}]}>
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
              <Text style={styles.text}>My NoticeFrame Calendar</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
            <Text style={styles.text}>Samsung Calendar</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
            <Text style={styles.text}>Google Calendar</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
            <Text style={styles.text}>Holidays in UK</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Apple Calendar</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Microsoft Outlook Calendar</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Any.do</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
              <Text style={styles.text}>Other Calendar</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
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