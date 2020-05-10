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
            <View style={styles.mainView}>
              <Text style={styles.text}>Show imported events in slideshow</Text>
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
    height: deviceHeight *.22 ,
    width: '100%',
    backgroundColor:'#fff',
    justifyContent:'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  mainView : {
    height: 30,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  text: {
    color:'#A2a2a2',
    fontSize: 16
  }
})