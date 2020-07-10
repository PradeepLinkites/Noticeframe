import React from 'react'
import {ActivityIndicator, Platform, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../../Common/commonNavbar'
import { get , isEmpty, size } from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
import SwitchComponent from '../../Common/Switch'
import ModalSelector from 'react-native-modal-selector'
import AsyncStorage from '@react-native-community/async-storage'
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
      transitions: 'Fade-in',
      settingDetails:[],
      eventName: 0,
      eventDate: 0,
      startTime: 0,
      endTime: 0,
      note: 0,
      importedInSlideShow: 0,
      screensaver: 0,
      personal : '',
      business : '',
      group : '',
      numberOfEventsInSlideshow: 6,
      status: 0,
      isLoading: false,
      userId: '',
      loading: false
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
        settingDetails: get(this.props,'getSettingData',''),
        eventName: get(this.props,'getSettingData.SlideShow.eventName',''),
        eventDate: get(this.props,'getSettingData.SlideShow.eventDate',''),
        startTime: get(this.props,'getSettingData.SlideShow.startTime',''),
        endTime: get(this.props,'getSettingData.SlideShow.endTime',''),
        note: get(this.props,'getSettingData.SlideShow.note',''),
        importedInSlideShow: get(this.props,'getSettingData.SlideShow.importedInSlideShow',''),
        screensaver: get(this.props,'getSettingData.SlideShow.screensaver',''),
        transitions: get(this.props,'getSettingData.SlideShow.transitions',''),
        personal : get(this.props,'getSettingData.SlideShow.personal',''),
        business : get(this.props,'getSettingData.SlideShow.business',''),
        group : get(this.props,'getSettingData.SlideShow.group',''),
        numberOfEventsInSlideshow: get(this.props,'getSettingData.SlideShow.numberOfEventsInSlideshow',''),
        isLoading: false
      })
    }
    if(this.props.updateSettingPhase){
      this.props.getSetting(this.state.userId)
      this.setState({ loading: false })
    }
    this.props.resetSettingPhase()
  }

  onChange(name, value){
    if(name === 'eventName'){
      this.setState({ eventName: value})
    }
    if(name === 'eventDate'){
      this.setState({ eventDate: value})
    }
    if(name === 'startTime'){
      this.setState({ startTime: value})
    }
    if(name === 'endTime'){
      this.setState({ endTime: value})
    }
    if(name === 'note'){
      this.setState({ note: value})
    }
    if(name === 'screensaver'){
      this.setState({ screensaver: value})
    }
  }

  onChangeMinus =()=>{
    if(this.state.numberOfEventsInSlideshow > 5){
      this.setState({ numberOfEventsInSlideshow: this.state.numberOfEventsInSlideshow - 1})
    }
  }
  onChangePlus =()=>{
    if(this.state.numberOfEventsInSlideshow < 15){
      this.setState({ numberOfEventsInSlideshow: this.state.numberOfEventsInSlideshow + 1 })
    }
  }

  onSubmit(){
    this.setState({ loading: true })
    const data = {
      id: this.state.userId,
      value:{
        SlideShow: {
          note: this.state.note,
          group : this.state.group,
          endTime: this.state.endTime,
          personal : this.state.personal,
          business : this.state.business,
          eventName: this.state.eventName,
          eventDate: this.state.eventDate,
          startTime: this.state.startTime,
          transitions: this.state.transitions,
          screensaver: this.state.screensaver,
          importedInSlideShow: this.state.importedInSlideShow,
          numberOfEventsInSlideshow: this.state.numberOfEventsInSlideshow
        }
      }
    }
    // console.log(data,'data')
    this.props.updateSetting(data)
  }

  render() {
    const { isLoading, numberOfEventsInSlideshow, transitions  } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'SlideShowSetting' ? 'SlideShow Settings' : ''
    return (
      <SafeAreaView style={[styles.container,{backgroundColor: '#fff'}]}>
        {isLoading ?
        <ActivityIndicator color = {'#3b5261'} size = "small" style = {AppStyles.activityIndicator} />
        :
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
                  data={data}
                  initValue={transitions}
                  onChange={(option)=>this.setState({ transitions: option.label })} 
                  />
                <Image source={require('../../../assets/sidemenuAssets/Arrow_down.png')} style={styles.DropdownStyle}/>
              </View>
            </View>
            <View style={styles.transitionView}>
              <View style={{flex:1,paddingRight:50,marginTop:5}}><Text style={styles.transitionText}>No.of events in slideShow</Text></View>
              <View style={styles.buttonView}>
                {numberOfEventsInSlideshow == 5 ? <View style={{marginRight: 55}} />
                :
                <TouchableOpacity onPress={this.onChangeMinus}><Image source={require('../../../assets/icons/-.png')} style={styles.image} /></TouchableOpacity>
                }
                  <View style={{justifyContent:'center'}}><Text style={styles.number}>{numberOfEventsInSlideshow}</Text></View>
                {numberOfEventsInSlideshow == 15 ? <View style={{marginLeft: 55}} />
                :
                <TouchableOpacity onPress={this.onChangePlus}><Image source={require('../../../assets/icons/+.png')} style={styles.image} /></TouchableOpacity>
                }
              </View>
            </View>
            <View style={styles.topContainer}>
            <Text style={styles.headerText}>Slideshow Features to display</Text>
            <View style={styles.mainView}>
              <Text style={styles.settingText}>Event Name</Text>
              <SwitchComponent onChange={this.onChange.bind(this, 'eventName')} value={this.state.eventName}/>
            </View>
            <View style={styles.mainView}>
            <Text style={styles.settingText}>Event Date</Text>
            <SwitchComponent onChange={this.onChange.bind(this, 'eventDate')} value={this.state.eventDate}/>
            </View>
            <View style={styles.mainView}>
            <Text style={styles.settingText}>Event Start Time</Text>
            <SwitchComponent onChange={this.onChange.bind(this, 'startTime')} value={this.state.startTime}/>
            </View>
            <View style={styles.mainView}>
            <Text style={styles.settingText}>Event End Time</Text>
            <SwitchComponent onChange={this.onChange.bind(this,'endTime')} value={this.state.endTime}/>
            </View>
            <View style={[styles.mainView ,{paddingBottom: 20}]}>
              <Text style={styles.settingText}>Summary Event box</Text>
              <SwitchComponent onChange={this.onChange.bind(this,'note')} value={this.state.note}/>
            </View>
          </View> 
          <View style={styles.bottomView}>
            <Text style={styles.bottomText}>Allow Slideshow to act as screen saver when device is locked</Text>
            <SwitchComponent onChange={this.onChange.bind(this, 'screensaver')} value={this.state.screensaver}/>
          </View>
          <TouchableOpacity
              style={[AppStyles.button,{backgroundColor: '#3b5261', paddingVertical: Platform.OS === 'android' ? 10  : 12 ,marginLeft: 20,marginRight: 20}]}
              onPress={this.onSubmit.bind(this)}
            >
              {this.state.loading
                ?
                <ActivityIndicator size="small" color="#fff" />
                :
                <Text style={[AppStyles.buttonText,{fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14)}]}>Save</Text>
              }
            </TouchableOpacity>      
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