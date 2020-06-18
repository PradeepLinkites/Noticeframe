import React from 'react'
import { ActivityIndicator, Platform, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions,TouchableOpacity } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get, isEmpty } from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import SwitchComponent from '../Common/Switch'
import AsyncStorage from '@react-native-community/async-storage'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class FrameColorSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      settingDetails:[],
      urgent: false,
      lessUrgent: false,
      notUrgent: false,
      urgentHours: 24,
      lessUrgentHours: 48,
      notUrgentHours: 72,
      userId: '',   
      isLoading: true
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getSetting(user1._id)
        this.setState({ userId: user1._id})
      }
    })
  }

  componentDidUpdate(prevProps, prevState){
      if(this.props.getSettingPhase){
        this.props.resetEventPhase()
        this.setState({ 
          settingDetails: get(this.props,'getSettingData',''),
          urgent: get(this.props,'getSettingData.FrameColor.red',''),
          lessUrgent: get(this.props,'getSettingData.FrameColor.yellow',''),
          notUrgent: get(this.props,'getSettingData.FrameColor.green',''),
          urgentHours: get(this.props,'getSettingData.FrameColor.redHour',''), 
          lessUrgentHours: get(this.props,'getSettingData.FrameColor.yellowHour',''), 
          notUrgentHours: get(this.props,'getSettingData.FrameColor.greenHour',''),
          isLoading: false
        })
      }
    if(this.props.updateSettingPhase){
      this.props.resetEventPhase()
      this.setState({ isLoading : false })
      this.props.getSetting(this.state.userId)
    }
  }
  
  onChange(name, value){
    if(name === 'urgent'){
      this.setState({ urgent: value})
    }
    if(name === 'lessUrgent'){
      this.setState({ lessUrgent: value})
    }
    if(name === 'notUrgent'){
      this.setState({ notUrgent: value})
    }
  }

  _decrementHours(name){
    const { urgentHours, lessUrgentHours, notUrgentHours } = this.state
    if(name === 'urgent'){
      if(urgentHours > 12 && urgentHours <= 24 ){
        this.setState({ urgentHours : urgentHours - 1 })
      }
    }
    if(name === 'lessUrgent'){
      if(lessUrgentHours > 24 && lessUrgentHours <= 72 ){
        this.setState({ lessUrgentHours : lessUrgentHours - 1 })
      }
    }
    if(name === 'notUrgent'){
      if(notUrgentHours > 72 ){
        this.setState({ notUrgentHours : notUrgentHours - 1 })
      }
    }
  }

  _incrementHours(name){
    const { urgentHours, lessUrgentHours, notUrgentHours } = this.state
    if(name === 'urgent'){
      if(urgentHours >= 12 && urgentHours < 24 ){
        this.setState({ urgentHours : urgentHours  + 1 })
      }
    }
    if(name === 'lessUrgent'){
      if(lessUrgentHours >= 24 && lessUrgentHours < 72 ){
        this.setState({ lessUrgentHours : lessUrgentHours + 1 })
      }
    }
    if(name === 'notUrgent'){
      if(notUrgentHours >= 72 ){
        this.setState({ notUrgentHours : notUrgentHours + 1 })
      }
    }
  }

  submit(){
    this.setState({ isLoading: true })
    const data = {
      id: this.state.userId,
      value:{
        FrameColor: {
          red: this.state.urgent,
          yellow: this.state.lessUrgent,
          green: this.state.notUrgent,
          redHour: this.state.urgentHours,
          yellowHour: this.state.lessUrgentHours,
          greenHour: this.state.notUrgentHours,
          frameColorsObj: [
            { color:'#ed1c24', sign:'Urgent', type: this.state.urgent },
            { color:'#ff9900', sign:'Less-Urgent', type: this.state.lessUrgent },
            { color:'#3cb878', sign:'Not-Urgent', type: this.state.notUrgent }
          ]
        }
      }
    }
    this.props.updateSetting(data)
  }

  render() {
    const { isLoading,  urgent, lessUrgent, notUrgent, urgentHours, lessUrgentHours, notUrgentHours,slideValue1,slideValue2,slideValue3 } = this.state
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
              <SwitchComponent onChange={this.onChange.bind(this, 'urgent')} value={urgent}/>
            </View>
            <View style={styles.mainView}>
              <View><Text style={styles.label}>LESS URGENT</Text></View>
              <View style={[styles.colorButton,{backgroundColor:'#ff9900'}]}></View>
              <SwitchComponent onChange={this.onChange.bind(this, 'lessUrgent')} value={lessUrgent}/>
            </View>
            <View style={styles.mainView}>
              <View><Text style={styles.label}>NOT URGENT</Text></View>
              <View style={[styles.colorButton,{backgroundColor:'#00a651',marginLeft: Platform.OS === 'android' ? 5: 2}]}></View>
              <SwitchComponent onChange={this.onChange.bind(this, 'notUrgent')}  value={notUrgent}/>
            </View>
          </View> 
          {/* Frame color timing */}
          <View style={{backgroundColor:'#e2e9f6',flex: 1 ,marginBottom: 20}}>
            <View style={[styles.bottomView,{marginTop:10}]}>
              <Text style={[styles.headerText,{marginTop:15,flex:1}]}>Frame colors timing</Text>            
              <View style={[styles.mainView,{justifyContent:'space-around'}]}>
                {/* <TouchableOpacity style={styles.minitsButton}><Text style={[styles.timeText,{color:'#fff'}]}>MINUTES</Text></TouchableOpacity> */}
                <View style={[styles.minitsButton,{paddingHorizontal:15 }]}><Text style={[styles.timeText,{color:'#fff'}]}>HOURS</Text></View>
              </View>
            </View> 
            <View style={styles.intervalContainer}>
              <View style={{justifyContent:'center'}}>
                <View style={[styles.colorButtonBottom,{backgroundColor:'#ed1c24'}]}/>
              </View>
              <View style={styles.buttonView}>
                {urgentHours !== 12 ? 
                  <TouchableOpacity onPress={this._decrementHours.bind(this,'urgent')} style={styles.slideShowBox}><Text>-</Text></TouchableOpacity>
                  :                
                  <View style={[styles.slideShowBox,{backgroundColor:'#E9E9E9'}]}><Text></Text></View>
                  }
                  <View style={{justifyContent:'center'}}><Text style={styles.number}>{urgentHours}</Text></View>
                {urgentHours !== 24 ? 
                  <TouchableOpacity onPress={this._incrementHours.bind(this,'urgent')} style={styles.slideShowBox}><Text>+</Text></TouchableOpacity>
                  :                
                  <View style={[styles.slideShowBox,{backgroundColor:'#E9E9E9'}]}><Text></Text></View>
                }
              </View>
            </View> 
            <View style={styles.intervalContainer}>
              <View style={{justifyContent:'center'}}>
                <View style={[styles.colorButtonBottom,{backgroundColor:'#ff9900'}]}/>
              </View>
              <View style={styles.buttonView}>
                {lessUrgentHours !== 24 ? 
                  <TouchableOpacity onPress={this._decrementHours.bind(this,'lessUrgent')} style={styles.slideShowBox}><Text>-</Text></TouchableOpacity>
                  :                
                  <View style={[styles.slideShowBox,{backgroundColor:'#E9E9E9'}]}><Text></Text></View>
                  }
                  <View style={{justifyContent:'center'}}><Text style={styles.number}>{lessUrgentHours}</Text></View>
                {lessUrgentHours !== 72 ? 
                  <TouchableOpacity onPress={this._incrementHours.bind(this,'lessUrgent')} style={styles.slideShowBox}><Text>+</Text></TouchableOpacity>
                  :                
                  <View style={[styles.slideShowBox,{backgroundColor:'#E9E9E9'}]}><Text></Text></View>
                }              
              </View>
            </View> 
            <View style={styles.intervalContainer}>
              <View style={{justifyContent:'center'}}>
                <View style={[styles.colorButtonBottom,{backgroundColor:'#00a651'}]}/>
              </View>
              <View style={styles.buttonView}>
                {notUrgentHours !== 72 ? 
                  <TouchableOpacity onPress={this._decrementHours.bind(this,'notUrgent')} style={styles.slideShowBox}><Text>-</Text></TouchableOpacity>
                  :                
                  <View style={[styles.slideShowBox,{backgroundColor:'#E9E9E9'}]}><Text></Text></View>
                }                
                <View style={{justifyContent:'center'}}><Text style={styles.number}>{notUrgentHours}</Text></View>
                <TouchableOpacity onPress={this._incrementHours.bind(this,'notUrgent')} style={styles.slideShowBox}><Text>+</Text></TouchableOpacity>
              </View>
            </View> 
            <TouchableOpacity
              style={[AppStyles.button,{backgroundColor: '#3b5261', paddingVertical: Platform.OS === 'android' ? 10  : 12 ,marginLeft: 20,marginRight: 20}]}
              onPress={this.submit.bind(this)}
            >
              {isLoading
                ?
                <ActivityIndicator size="small" color="#fff" />
                :
                <Text style={[AppStyles.buttonText,{fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14)}]}>Save</Text>
              }
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