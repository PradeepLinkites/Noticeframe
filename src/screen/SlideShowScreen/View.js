import React, { useRef, useEffect } from 'react'
import {Animated, ActivityIndicator, StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native'
import { get , isEmpty, size } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage'
import moment from "moment"
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const avtarImage = require('../../assets/icons/Image_slideshow.png')

export default class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperIndex: 0,
      slideShowData: [],
      transitions: '',
      numberOfEventsInSlideshow: 0,
      eventPicture: [],
      eventName: true,
      eventDate: true,
      startTime: true,
      endTime: true,
      note: true,
      count: 0,
      limit: 1,
      isLoading: false
    }
  }

  onFocusFunction = () => {
    this.setState({ isLoading: true })
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getSetting(user1._id)
        this.props.getEventSlideShow(user1._id)
      }
    })
  }

  componentDidMount(){
    this.setState({ isLoading: true })
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  componentWillUnmount(){
    this.focusListener.remove()
  }

  componentDidUpdate(prevProps) { 
      if(this.props.getEventSlideShowPhase) {
        this.props.resetEventPhase()
        let newArray =  get(this.props, 'getEventSlideShowData', [])
        const newArray2 = newArray.filter(item => item.showEventInSlideShow)
        const paramId = get(this.props.navigation.dangerouslyGetParent().state.params, 'id', '')
        newArray2.map((item, ind )=>{
          if(paramId === item._id){
            this.setState({ swiperIndex: ind })
          }
        })
        this.setState({ slideShowData: newArray2, isLoading: false})
      }
    if (this.props.getSettingPhase) {
      this.props.resetSettingPhase()
      this.setState({
        transitions: get(this.props, 'getSettingData.SlideShow.transitions', ''),
        importedInSlideShow: get(this.props, 'getSettingData.SlideShow.importedInSlideShow', 0),
        eventName: get(this.props, 'getSettingData.SlideShow.eventName', true),
        eventDate: get(this.props, 'getSettingData.SlideShow.eventDate', true),
        startTime: get(this.props, 'getSettingData.SlideShow.startTime', true),
        endTime: get(this.props, 'getSettingData.SlideShow.endTime', true),
        note: get(this.props, 'getSettingData.SlideShow.note', true)
      })
    }
  }

  render() {
    const { slideShowData, swiperIndex, isLoading } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'SlideShow' ? 'NOTICE FRAME' : ''
    return (
      <SafeAreaView style={[AppStyles.container, {backgroundColor:'#fff',justifyContent:'center'}]}>
      {isLoading ?
        <ActivityIndicator color = {'#3b5261'} size = "small" style = {AppStyles.activityIndicator} />
        :
        <View style={styles.container}>
          {size(slideShowData) > 0 ?
          <ScrollView>
            <Swiper
            dot={<View style={{backgroundColor: '#A2a2a2', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}
            activeDot={<View style={{backgroundColor: '#ff6600', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />} 
            paginationStyle={{
              bottom: 40
            }}
            autoplay={true}
            autoplayTimeout={6}
            loop={true}
            index={swiperIndex}
            onIndexChanged={(index)=> this.setState({swiperIndex: index})}
            key={this.state.slideShowData.length}
          >        
            {slideShowData.map((item, ind)=>{
              const date = moment(item.eventDate).format("DD MMM, YYYY")
              const start_time = moment(item.startTime).format("h:mm A")
              const end_time = moment(item.endTime).format("h:mm A")
              return(
                <FadeInView key={ind}>
                  <Image source={avtarImage} style={styles.backgroundImage}/>
                  <View style={styles.BigEventContainer}>
                    <View style={[styles.eventView,{backgroundColor:'rgba(248, 247, 216, 0.2)'}]}>
                      <Text style={styles.eventTitleText}>{item.eventName}</Text>
                      <Text style={styles.eventDateText}>{date}</Text>
                    <Text style={styles.eventDateText}>{start_time} to {end_time}</Text>
                    </View>
                    {slideShowData.map((item, ind)=>{
                    const date = moment(item.eventDate).format("DD MMM, YYYY")
                    const start_time = moment(item.startTime).format("hh:mm")
                    const end_time = moment(item.endTime).format("hh:mm")
                    return(
                      <View style={{top : Platform.OS === 'android' ? 60 : 80 }} key={ind}>
                        <View style={swiperIndex == ind ?  [styles.smallEventContainer,{borderRightWidth: 3,borderRightColor: '#ff9900'}] : styles.smallEventContainer}>
                          <View style={styles.smallEventView}>
                            <View style={{justifyContent:'flex-end'}}>
                              <Text style={styles.smallEventDateText}>{date}</Text>
                            </View>
                            <View>
                              <Text style={styles.smallEventTitleText}>{item.eventName}</Text>
                              <Text style={styles.smallEventDateText}>{start_time} to {end_time}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                      )
                  })}
                  </View>
                </FadeInView>
              )
            })}      
          </Swiper>
          </ScrollView>   
          : 
          <View style={{justifyContent: 'center',alignItems: 'center',flex: 1,backgroundColor:'#fff', height: deviceHeight}}>
            <Image source={require('../../assets/images/no_event.png')} alt="No Event" style={AppStyles.noEventImageStyle}/>
            <Text>No Events Created Yet Create One Now!</Text>
          </View>
          }
        </View>
      }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  backgroundImage:{
    width: '100%',
    height: deviceHeight,
  },
  BigEventContainer: {
    flex:1,
    position: 'absolute',
    marginTop: Platform.OS === 'android' ? 100 : 140 ,
    width: '100%',
    height: deviceHeight,
    backgroundColor: 'transparent',
    // backgroundColor: 'rgba(248, 247, 216, 0.3)',
  },
  eventTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(22) : AppSizes.verticalScale(18),
    fontFamily: AppFonts.NBlack,
    // fontWeight:'900',
    letterSpacing: 1,
    color: '#fff',
    marginBottom: Platform.OS === 'android' ? 3 : 5
  },
  eventDateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
	  fontFamily: AppFonts.NRegular,
    marginTop: Platform.OS === 'android' ? 5 : 2,
    letterSpacing: .6,
    color: '#fff'
  },
  eventView: {
    paddingLeft: 30,
    paddingTop: Platform.OS === 'android' ? 6 : 10,
    paddingBottom: Platform.OS === 'android' ? 5 : 15 ,
  },
  smallEventContainer: {
    width: deviceWidth * .5,
    marginBottom: 3,
    alignSelf:'flex-end',
    right: 20,
    backgroundColor: 'rgba(248, 247, 216, 0.2)',
  },
  smallEventView: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal: 8,
    paddingVertical: 5
  },
  smallEventTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(10) : AppSizes.verticalScale(8),
    fontFamily: AppFonts.NBlack,
    fontWeight:'800',
    letterSpacing: .5,
    color: '#fff',
  },
  smallEventDateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(10) : AppSizes.verticalScale(8),
	  fontFamily: AppFonts.NRegular,
    letterSpacing: .2,
    color: '#fff'
  },
})


const FadeInView = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 10000,
      }
    ).start();
  }, [])

  return (
    <Animated.View                 // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim,         // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
}
