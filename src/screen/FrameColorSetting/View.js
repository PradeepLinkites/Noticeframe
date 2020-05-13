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

export default class FrameColorSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      animationType : 'Fade-in',
      slideValue: 20
    }
  }
  OnChange=(value)=>{
     this.setState({ value: value})
  }

  render() {
    const { slideValue, animationType, selectedColor  } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'FrameColorSetting' ? 'Frame Color Settings' : ''
    return (
      <SafeAreaView style={[styles.container,{backgroundColor: '#3b5261'}]}>
        <ScrollView style={styles.container}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'FrameColorSetting'} 
          />
          <View style={styles.topContainer}>
            <Text style={styles.headerText}>Show frame color</Text>
            <View style={styles.mainView}>
              <View><Text style={styles.label}>URGENT</Text></View>
              <View style={[styles.colorButton,{backgroundColor:'#ed1c24',marginLeft:48}]}></View>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
              <View><Text style={styles.label}>LESS URGENT</Text></View>
              <View style={[styles.colorButton,{backgroundColor:'#ff9900'}]}></View>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
              <View><Text style={styles.label}>NOT URGENT</Text></View>
              <View style={[styles.colorButton,{backgroundColor:'#00a651'}]}></View>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
          </View> 

          {/* <View style={{marginTop:10,backgroundColor:'pink',height:300}}>
            <View style={[styles.bottomView,{marginTop:10}]}>
              <Text style={[styles.headerText,{marginTop:15,flex:1}]}>Frame colors timing</Text>            
              <View style={[styles.mainView,{justifyContent:'space-around',flex:1}]}>
                <TouchableOpacity style={styles.minitsButton}><Text style={[styles.timeText,{color:'#fff'}]}>MINUTES</Text></TouchableOpacity>
                <TouchableOpacity style={styles.hoursButton}><Text style={[styles.timeText,{color:'#A2a2a2'}]}>HOURS</Text></TouchableOpacity>
              </View>
            </View> 
            <View style={styles.intervalContainer}>
              <View style={{justifyContent:'center'}}>
                <View style={[styles.colorButtonBottom,{backgroundColor:'#ed1c24'}]}/>
              </View>
              <View style={[styles.buttonView,{marginLeft:20}]}>
                <TouchableOpacity onPress={()=>this.setState({ slideValue: this.state.slideValue - 1})} style={styles.slideShowBox}><Text>-</Text></TouchableOpacity>
                <View style={{justifyContent:'center'}}><Text style={styles.number}>{slideValue}</Text></View>
                <TouchableOpacity onPress={()=>this.setState({ slideValue: this.state.slideValue + 1})} style={styles.slideShowBox}><Text>+</Text></TouchableOpacity>
              </View>
            </View> 
            <View style={styles.intervalContainer}>
              <View style={{justifyContent:'center'}}>
                <View style={[styles.colorButtonBottom,{backgroundColor:'#ff9900'}]}/>
              </View>
              <View style={[styles.buttonView,{marginLeft:20}]}>
                <TouchableOpacity onPress={()=>this.setState({ slideValue: this.state.slideValue - 1})} style={styles.slideShowBox}><Text>-</Text></TouchableOpacity>
                <View style={{justifyContent:'center'}}><Text style={styles.number}>{slideValue}</Text></View>
                <TouchableOpacity onPress={()=>this.setState({ slideValue: this.state.slideValue + 1})} style={styles.slideShowBox}><Text>+</Text></TouchableOpacity>
              </View>
            </View> 
            <View style={styles.intervalContainer}>
              <View style={{justifyContent:'center'}}>
                <View style={[styles.colorButtonBottom,{backgroundColor:'#00a651'}]}/>
              </View>
              <View style={[styles.buttonView,{marginLeft:20}]}>
                <TouchableOpacity onPress={()=>this.setState({ slideValue: this.state.slideValue - 1})} style={styles.slideShowBox}><Text>-</Text></TouchableOpacity>
                <View style={{justifyContent:'center'}}><Text style={styles.number}>{slideValue}</Text></View>
                <TouchableOpacity onPress={()=>this.setState({ slideValue: this.state.slideValue + 1})} style={styles.slideShowBox}><Text>+</Text></TouchableOpacity>
              </View>
            </View> 
          </View> */}

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
    paddingHorizontal: 20,
    paddingBottom: 30

  },
  headerText: {
    marginTop: 30,
    marginBottom: 10, 
    color:'#A2a2a2',
    fontSize: Platform.OS === 'android' ? 16 : 18,
  },
  mainView : {
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingVertical: 25
  },

  colorButton: {
     height: Platform.OS === 'android' ? AppSizes.verticalScale(22) : AppSizes.verticalScale(22),
     width: Platform.OS === 'android' ? AppSizes.verticalScale(120) : AppSizes.verticalScale(110),
     borderRadius: 30
  },
  colorButtonBottom: {
     height: Platform.OS === 'android' ? AppSizes.verticalScale(22) : AppSizes.verticalScale(22),
     width: Platform.OS === 'android' ? AppSizes.verticalScale(120) : AppSizes.verticalScale(110),
     borderRadius: 30
  },
  bottomView: {
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: 20
  },
  label: {
    marginTop: 3,
    marginBottom: 10, 
    color:'#000',
    fontSize: Platform.OS === 'android' ? 16 : 18,
    fontWeight: '500'
  }
  // intervalContainer: {
  //   backgroundColor:'#fff',
  //   flexDirection:'row',
  //   justifyContent:'space-between',
  //   paddingVertical: Platform.OS === 'android' ? 20 : 16, 
  //   paddingLeft: 20,
  //   paddingRight: 30
  // },
  // minitsButton: {
  //   backgroundColor:'#3b5261',
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   borderRadius: 7,
  //   shadowOffset: {
  //     width: 0,
  //     height:2,
  //   },
  //   shadowOpacity: .5,
  //   elevation: Platform.OS === 'android' ? 16 : 30,
  // },
  // hoursButton:{
  //   backgroundColor:'#fff',
  //   paddingHorizontal: 15,
  //   paddingVertical: 5,
  //   borderRadius: 7,
  //   shadowOffset: {
  //     width: 0,
  //     height:2,
  //   },
  //   shadowOpacity: .5,
  //   elevation: Platform.OS === 'android' ? 16 : 30,
  // },
  // timeText: {
  //   fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(13) : AppSizes.verticalScale(11),
  //   fontWeight: '600'
  // },
  // slideShowBox: {
  //   shadowOffset: {
  //     width: 0,
  //     height:2,
  //   },
  //   shadowOpacity: .5,
  //   elevation: Platform.OS === 'android' ? 16 : 30,
  //   height:40,
  //   width:40,
  //   borderRadius:10,
  //   backgroundColor:'#fff',
  //   justifyContent:'center',
  //   alignItems:'center'    
  // },
  // buttonView: {
  //   marginVertical: 5,
  //   flexDirection:'row',
  //   justifyContent:'space-between',
  //   flex:1
  // },
  // number: {
  //   justifyContent :'center',
  //   fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(22) : AppSizes.verticalScale(20),
  //   // fontWeight: Platform.OS === 'android' ? '600' : '500'
  // },
  // settingText: {
  //   color:'#A2a2a2',
  //   fontSize: Platform.OS === 'android' ? 16 : 18,
  //   fontWeight:'600',
  //   marginTop: 3
  // },
  // DropdownStyle: {
  //   height: 12, 
  //   width: 12, 
  //   marginTop: Platform.OS === 'android' ? 17 : 15 ,
  //   position:'absolute', 
  //   right: 8 
  // },
  // bottomText: {
  //   flex:1,
  //   paddingRight: 30,
  //   color:'#A2a2a2',
  //   marginTop: Platform.OS === 'android' ? 10 : 3,
  //   fontSize: Platform.OS === 'android' ? 16 : 18,
  //   fontWeight:'600',

  // }
})