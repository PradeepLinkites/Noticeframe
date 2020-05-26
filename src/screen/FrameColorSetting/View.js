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
      slideValue1: 20,
      slideValue2: 20,
      slideValue3: 20
    }
  }
  OnChange=(value)=>{
     this.setState({ value: value})
  }

  render() {
    const { slideValue1,slideValue2,slideValue3, animationType, selectedColor  } = this.state
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
              <View style={[styles.colorButton,{backgroundColor:'#ed1c24',marginLeft: Platform.OS === 'android' ? 35: 40}]}></View>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
              <View><Text style={styles.label}>LESS URGENT</Text></View>
              <View style={[styles.colorButton,{backgroundColor:'#ff9900'}]}></View>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
            <View style={styles.mainView}>
              <View><Text style={styles.label}>NOT URGENT</Text></View>
              <View style={[styles.colorButton,{backgroundColor:'#00a651',marginLeft: Platform.OS === 'android' ? 5: 2}]}></View>
              <SwitchComponent OnChange={this.OnChange} value={this.state.value}/>
            </View>
          </View> 
          {/* Frame color timing */}
          <View style={{backgroundColor:'#e2e9f6',flex: 1}}>
            <View style={[styles.bottomView,{marginTop:10}]}>
              <Text style={[styles.headerText,{marginTop:15,flex:1}]}>Frame colors timing</Text>            
              <View style={[styles.mainView,{justifyContent:'space-around',flex:1}]}>
                <TouchableOpacity style={styles.minitsButton}><Text style={[styles.timeText,{color:'#fff'}]}>MINUTES</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.minitsButton,{paddingHorizontal:15,backgroundColor:'#fff'}]}><Text style={[styles.timeText,{color:'#A2a2a2'}]}>HOURS</Text></TouchableOpacity>
              </View>
            </View> 
            <View style={styles.intervalContainer}>
              <View style={{justifyContent:'center'}}>
                <View style={[styles.colorButtonBottom,{backgroundColor:'#ed1c24'}]}/>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity onPress={()=>this.setState({ slideValue1: this.state.slideValue1 - 1})} style={styles.slideShowBox}><Text>-</Text></TouchableOpacity>
                <View style={{justifyContent:'center'}}><Text style={styles.number}>{slideValue1}</Text></View>
                <TouchableOpacity onPress={()=>this.setState({ slideValue1: this.state.slideValue1 + 1})} style={styles.slideShowBox}><Text>+</Text></TouchableOpacity>
              </View>
            </View> 
            <View style={styles.intervalContainer}>
              <View style={{justifyContent:'center'}}>
                <View style={[styles.colorButtonBottom,{backgroundColor:'#ff9900'}]}/>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity onPress={()=>this.setState({ slideValue2: this.state.slideValue2 - 1})} style={styles.slideShowBox}><Text>-</Text></TouchableOpacity>
                <View style={{justifyContent:'center'}}><Text style={styles.number}>{slideValue2}</Text></View>
                <TouchableOpacity onPress={()=>this.setState({ slideValue2: this.state.slideValue2 + 1})} style={styles.slideShowBox}><Text>+</Text></TouchableOpacity>
              </View>
            </View> 
            <View style={styles.intervalContainer}>
              <View style={{justifyContent:'center'}}>
                <View style={[styles.colorButtonBottom,{backgroundColor:'#00a651'}]}/>
              </View>
              <View style={styles.buttonView}>
                <TouchableOpacity onPress={()=>this.setState({ slideValue3: this.state.slideValue3 - 1})} style={styles.slideShowBox}><Text>-</Text></TouchableOpacity>
                <View style={{justifyContent:'center'}}><Text style={styles.number}>{slideValue3}</Text></View>
                <TouchableOpacity onPress={()=>this.setState({ slideValue3: this.state.slideValue3 + 1})} style={styles.slideShowBox}><Text>+</Text></TouchableOpacity>
              </View>
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
    backgroundColor:'#fff'
  },
  topContainer:{
    backgroundColor:'#fff',
    paddingHorizontal: 20,
    paddingBottom: 30

  },
  headerText: {
    marginTop: 20,
    marginBottom: 20, 
    color:'#A2a2a2',
    fontSize: Platform.OS === 'android' ? 14 : 14,
  },
  mainView : {
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent: 'space-between',
    paddingVertical: 15
  },

  colorButton: {
     marginTop: 5,
     height: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(16),
     width: Platform.OS === 'android' ? AppSizes.verticalScale(100) : AppSizes.verticalScale(90),
     borderRadius: 30
  },
  colorButtonBottom: {
     height: Platform.OS === 'android' ? AppSizes.verticalScale(22) : AppSizes.verticalScale(16),
     width: Platform.OS === 'android' ? AppSizes.verticalScale(120) : AppSizes.verticalScale(100),
     borderRadius: 30
  },
  bottomView: {
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: 20
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
  intervalContainer: {
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical: Platform.OS === 'android' ? 5 : 16, 
    paddingLeft: 20,
    paddingRight: 25
  },
  minitsButton: {
    backgroundColor:'#3b5261',
    justifyContent:'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    shadowOffset: {
      width: 0,
      height:2,
    },
    shadowOpacity: .5,
    elevation: Platform.OS === 'android' ? 16 : 30,
  },
  timeText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(11) : AppSizes.verticalScale(9),
    fontWeight: '600'
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
    marginLeft: Platform.OS === 'android' ? 50 : 30,
    marginVertical: 5,
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1
  },
  number: {
    justifyContent :'center',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(16),
    // fontWeight: Platform.OS === 'android' ? '600' : '500'
  },
  settingText: {
    color:'#A2a2a2',
    fontSize: Platform.OS === 'android' ? 16 : 18,
    fontWeight:'600',
    marginTop: 3
  },
  DropdownStyle: {
    height: 12, 
    width: 12, 
    marginTop: Platform.OS === 'android' ? 17 : 15 ,
    position:'absolute', 
    right: 8 
  },
  bottomText: {
    flex:1,
    paddingRight: 30,
    color:'#A2a2a2',
    marginTop: Platform.OS === 'android' ? 10 : 3,
    fontSize: Platform.OS === 'android' ? 16 : 18,
    fontWeight:'600',

  }
})