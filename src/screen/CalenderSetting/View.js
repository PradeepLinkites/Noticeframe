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
      value: '',
      importValue: true,
      exportValue: true
    }
  }
  OnChange=(value)=>{
    this.setState({ value: value, importValue: value, exportValue: value})
  }

  render() {
    const { selectedColor  } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'CalendarSetting' ? 'Calendar Settings' : ''
    return (
      <SafeAreaView style={[styles.container,{backgroundColor: '#3b5261'}]}>
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
              <SwitchComponent OnChange={this.OnChange} value={this.state.importValue}/>
            </View>
            <View style={styles.secondView}>
              <Text style={styles.text}>Export</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.exportValue}/>
            </View>
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
    paddingTop: 30,
    paddingBottom: 30,
    borderBottomWidth: .3,
    borderBottomColor: '#A2a2a2'
  },
  firstView : {
    height: 30,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  secondView : {
    height: 30,
    flexDirection:'row',
    justifyContent:'space-between',
    marginTop: 20
  },
  text: {
    color:'#A2a2a2',
    fontSize: 16,
    top: 5
  },
  bottomContainer:{
    backgroundColor:'#fff',
    paddingLeft: 20,
    paddingRight: 20,
    // paddingTop: 20,
    paddingBottom: 80
  },
})