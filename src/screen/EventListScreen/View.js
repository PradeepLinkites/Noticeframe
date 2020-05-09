import React from 'react'
import {ScrollView, Switch,Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switch1Value: false,
      switch2Value: false,
      switch3Value: false,
      switch4Value: false,
    }
  }

  toggleSwitch = (value, name) => {
   if(name === 'switch1'){
      this.setState({switch1Value: value})
    }
    if(name === 'switch2'){
      this.setState({switch2Value: value})
    }
    if(name === 'switch3'){
      this.setState({switch3Value: value})
    }
    if(name === 'switch4'){
      this.setState({switch4Value: value})
    }
 }
  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')
    return (
      <SafeAreaView style={AppStyles.container}>
        {/* <Navbar navigation={this.props.navigation} navTitle={route} stylee={{ height: this.state.height }} /> */}
        <ScrollView style={styles.container}>
          <View style={styles.dateView1}>
            <Text style={styles.dateText}>23 Feb 2020</Text>
          </View>
          <View style={[styles.eventListView,{backgroundColor:'#e2e9f6'}]}>
            <View style={{flex:1}}>
              <Text style={styles.eventTitleText}>Board Meeting</Text>
              <Text style={styles.eventDateText}>23 FEB, 2020</Text>
              <Text style={styles.eventDateText}>09:30 AM to 12:30 PM</Text>
            </View>
            <View>
            <View style={styles.slideShowView}>
              <Text style={styles.slideShowText}>Show in SlideShow</Text>
              <Switch
                // onValueChange = {() => this.toggleSwitch(item, index)}
                onValueChange = {(value) => this.toggleSwitch(value ,'switch1')}
                value = {this.state.switch1Value}
                disabled={false}
                thumbColor={this.state.switch1Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
                trackColor={{ true: '#939393', false : Platform.OS == 'android' ? '#A2a2a2': 'gray' }}
                style={
                  Platform.OS === 'android'
                    ? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
                    : { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
                }
                ios_backgroundColor={'#EBECF0'}
              />
            </View>
            </View>
            <View style={styles.editView}>
              <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
            </View>
            <View style={styles.shareView}>
              <Image source={require('../../assets/icons/Share.png')} style={styles.imageStyle}/>
            </View>
          </View>
          <View style={[styles.eventListView,{backgroundColor:'#d3eaed'}]}>
            <View style={{flex:1}}>
              <Text style={styles.eventTitleText}>Study Time</Text>
              <Text style={styles.eventDateText}>23 FEB, 2020</Text>
              <Text style={styles.eventDateText}>09:30 AM to 12:30 PM</Text>
            </View>
            <View>
            <View style={styles.slideShowView}>
              <Text style={styles.slideShowText}>Show in SlideShow</Text>
              <Switch
                // onValueChange = {() => this.toggleSwitch(item, index)}
                onValueChange = {(value) => this.toggleSwitch(value ,'switch2')}
                value = {this.state.switch2Value}
                disabled={false}
                thumbColor={this.state.switch2Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
                trackColor={{ true: '#939393', false : Platform.OS == 'android' ? '#A2a2a2': 'gray' }}
                style={
                  Platform.OS === 'android'
                    ? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
                    : { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
                }
                ios_backgroundColor={'#EBECF0'}
              />
            </View>
            </View>
            <View style={styles.editView}>
              <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
            </View>
            <View style={styles.shareView}>
              <Image source={require('../../assets/icons/Share.png')} style={styles.imageStyle}/>
            </View>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>24 Feb 2020</Text>
          </View>
          <View style={[styles.eventListView,{backgroundColor:'#e6e1de'}]}>
            <View style={{flex:1}}>
              <Text style={styles.eventTitleText}>Football Practice</Text>
              <Text style={styles.eventDateText}>24 FEB, 2020</Text>
              <Text style={styles.eventDateText}>09:30 AM to 12:30 PM</Text>
            </View>
            <View>
            <View style={styles.slideShowView}>
              <Text style={styles.slideShowText}>Show in SlideShow</Text>
              <Switch
                // onValueChange = {() => this.toggleSwitch(item, index)}
                onValueChange = {(value) => this.toggleSwitch(value ,'switch3')}
                value = {this.state.switch3Value}
                disabled={false}
                thumbColor={this.state.switch3Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
                trackColor={{ true: '#939393', false : Platform.OS == 'android' ? '#A2a2a2': 'gray' }}
                style={
                  Platform.OS === 'android'
                    ? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
                    : { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
                }
                ios_backgroundColor={'#EBECF0'}
              />
            </View>
            </View>
            <View style={styles.editView}>
              <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
            </View>
            <View style={styles.shareView}>
              <Image source={require('../../assets/icons/Share.png')} style={styles.imageStyle}/>
            </View>
          </View>
          <View style={[styles.eventListView,{backgroundColor:'#f8eedf'}]}>
            <View style={{flex:1}}>
              <Text style={styles.eventTitleText}>Study Time</Text>
              <Text style={styles.eventDateText}>24 FEB, 2020</Text>
              <Text style={styles.eventDateText}>09:30 AM to 12:30 PM</Text>
            </View>
            <View>
            <View style={styles.slideShowView}>
              <Text style={styles.slideShowText}>Show in SlideShow</Text>
              <Switch
                // onValueChange = {() => this.toggleSwitch(item, index)}
                onValueChange = {(value) => this.toggleSwitch(value ,'switch4')}
                value = {this.state.switch4Value}
                disabled={false}
                thumbColor={this.state.switch4Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
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
            <View style={styles.editView}>
              <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
            </View>
            <View style={styles.shareView}>
              <Image source={require('../../assets/icons/Share.png')} style={styles.imageStyle}/>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  dateView1: {
    backgroundColor: '#fff',
    paddingLeft: Platform.OS === 'android' ? 20 : 20 ,
    paddingTop: Platform.OS === 'android' ? 25 : 25	,
    paddingBottom: Platform.OS === 'android' ? 4 : 6 ,
  },
  dateView: {
    backgroundColor: '#fff',
    paddingLeft: Platform.OS === 'android' ? 20 : 20 ,
    paddingTop: Platform.OS === 'android' ? 52 : 54	,
    paddingBottom: Platform.OS === 'android' ? 6 : 8 ,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '400',
  },
  eventListView: {
    paddingLeft: Platform.OS === 'android' ? 20 : 20 ,
    paddingTop: Platform.OS === 'android' ? 14 : 18	,
    paddingBottom: Platform.OS === 'android' ? 14 : 18 ,
    marginBottom: 1,
    flexDirection: 'row'
  },
  eventTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    fontWeight:'500',
    letterSpacing: .3,
  },
  eventDateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(10) : AppSizes.verticalScale(8),
	  fontFamily: AppFonts.NRegular,
    marginTop: 4,
    letterSpacing: .2
  },
  slideShowText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: .2,
  },
  slideShowView: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'center',
    marginRight: 8,
  },
  editView: {
    marginTop:4,
    marginRight:8
  },
  imageStyle :{
    height: Platform.OS === 'android' ? AppSizes.verticalScale(35) : AppSizes.verticalScale(26),
    width: 32,
    // backgroundColor:'red'
  },
  shareView: {
    marginTop:4,
    marginRight:8
  }
})