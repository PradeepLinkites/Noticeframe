import React from 'react'
import {Picker, TextInput, Switch, Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import SwitchComponent from '../Common/Switch'
import ModalSelector from 'react-native-modal-selector'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

let index = 0
const data = [
  { key: index++, label: 'Fade-in' },
  { key: index++, label: 'Fade-out' },
  { key: index++, label: 'Flip' },
]

export default class SlideShowSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectValue: '',
      animationType : 'Fade-in',
      slideValue: 3
    }
  }
  OnChange=(value)=>{
     this.setState({ selectValue: value})
  }

  onChangeMinus =()=>{
    if(this.state.slideValue > 3){
      this.setState({ slideValue: this.state.slideValue - 1})
    }
  }
  onChangePlus =()=>{
    if(this.state.slideValue < 15){
      this.setState({ slideValue: this.state.slideValue + 1 })
    }
  }

  render() {
    const { selectValue, slideValue, animationType, selectedColor  } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'SlideShowSetting' ? 'SlideShow Settings' : ''
    return (
      <SafeAreaView style={[styles.container,{backgroundColor: '#3b5261'}]}>
        <ScrollView style={styles.container}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'SlideShowSetting'} 
          />
            <View style={[styles.transitionView,{borderBottomWidth:.3}]}>
              <Text style={styles.transitionText}>Transition</Text>
              <View style={{flexDirection:'row'}}>
                <ModalSelector
                  initValueTextStyle={{color:'#000',fontSize:14,marginTop:2}}
                  selectStyle={{borderColor: "transparent"}}
                  style={{right:20}}
                  // selectTextStyle={{color: "blue"}}
                  data={data}
                  initValue={animationType}
                  onChange={(option)=>this.setState({ selectValue: option.label })} 
                  />
                <Image source={require('../../assets/sidemenuAssets/Arrow_down.png')} style={styles.DropdownStyle}/>
              </View>
            </View>
            <View style={styles.transitionView}>
              <View style={{flex:1,paddingRight:50,marginTop:5}}><Text style={styles.transitionText}>No.of events in slideShow</Text></View>
              <View style={styles.buttonView}>
                {/* <TouchableOpacity onPress={this.onChangeMinus} style={styles.slideShowBox}> */}
               <TouchableOpacity onPress={this.onChangeMinus}><Image source={require('../../assets/icons/-.png')} style={styles.image} /></TouchableOpacity>
                {/* </TouchableOpacity> */}
                <View style={{justifyContent:'center'}}><Text style={styles.number}>{slideValue}</Text></View>
                <TouchableOpacity onPress={this.onChangePlus}><Image source={require('../../assets/icons/+.png')} style={styles.image} /></TouchableOpacity>
                {/* <TouchableOpacity onPress={this.onChangePlus} style={styles.slideShowBox}><Text>+</Text></TouchableOpacity> */}
              </View>
            </View>
            <View style={styles.topContainer}>
            <Text style={styles.headerText}>Slideshow Features to display</Text>
            <View style={styles.mainView}>
              <Text style={styles.settingText}>Event Name</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
            <Text style={styles.settingText}>Event Date</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
            <Text style={styles.settingText}>Event Start Time</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
            <Text style={styles.settingText}>Event End Time</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={[styles.mainView ,{paddingBottom: 20}]}>
              <Text style={styles.settingText}>Summary Event box</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
          </View> 
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>Allow Slideshow to act as screen saver when device is locked</Text>
            <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
          </View>      
        </ScrollView>
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
  },
  transitionView: {
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: Platform.OS === 'android' ? 5 : 10, 
    paddingHorizontal: 20
  },
  transitionText: {
    color:'#A2a2a2',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    // fontWeight:'600',
    marginTop: 10
  },
  mainView : {
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: 15
  },
  slideShowBox: {
    shadowOffset: {
      width: 0,
      height:2,
    },
    shadowOpacity: .5,
    elevation: Platform.OS === 'android' ? 16 : 30,
    height:40,
    width:40,
    borderRadius:10,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'    
  },
  buttonView: {
    marginVertical: 5,
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1
  },
  number: {
    justifyContent :'center',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(20) : AppSizes.verticalScale(18),
    // fontWeight: Platform.OS === 'android' ? '600' : '500'
  },
  headerText: {
    marginBottom: 10, 
    color:'#A2a2a2',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(12),
  },
  settingText: {
    color:'#A2a2a2',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontWeight:'600',
  },
  DropdownStyle: {
    height: 12, 
    width: 12, 
    marginTop: Platform.OS === 'android' ? 17 : 15 ,
    position:'absolute', 
    right: 8 
  },
  bottomView: {
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: Platform.OS === 'android' ? 12 : 25,
    paddingHorizontal: 25,
  },
  bottomText: {
    flex:1,
    paddingRight: 30,
    color:'#A2a2a2',
    marginTop: Platform.OS === 'android' ? 10 : 3,
    fontSize: Platform.OS === 'android' ? 12 : 14,

  },
  image: {
    height: Platform.OS === 'android' ? 56 : 60,
    width: Platform.OS === 'android' ? 56 : 60,
  }
})