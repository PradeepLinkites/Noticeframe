import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native'
import { get , isEmpty } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import Swiper from 'react-native-swiper'
import AsyncStorage from '@react-native-community/async-storage'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


const data = [
  {
   eventName: 'Board Meetting',
   date: '20 FEB,',
   fullDate: '20 FEB, 2020',
   timeDuration: '09:30 to 12:30',
   image: require('../../assets/icons/Image_slideshow.png'),
  },
  {
    eventName: 'At Lunch',
    date: '22 FEB,',
    fullDate: '22 FEB, 2020',
    timeDuration: '10:30 to 12:20',
    image: require('../../assets/icons/Image_slideshow.png')
   },
   {
    eventName: 'Site Visit',
    date: '20 FEB,',
    fullDate: '2 FEB, 2020',
    timeDuration: '09:30 to 12:30',
    image: require('../../assets/icons/Image_slideshow.png')
   },
   {
    eventName: 'Dinner Time',
    date: '20 FEB,',
    fullDate: '20 FEB, 2020',
    timeDuration: '09:30 to 12:30',
    image: require('../../assets/icons/Image_slideshow.png')
   }
]

export default class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swiperIndex: 0,
      getEventSlideShowData: {}
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getEventSlideShow(user1._id)
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.getEventSlideShowData !== prevProps.getEventSlideShowData) {
      if(this.props.getEventSlideShowPhase) {
        this.props.resetEventPhase()
        this.setState({ getEventSlideShowData: get(this.props, 'getEventSlideShowData', []) })
      }
    }
  }

  render() {
    const { swiperIndex } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'SlideShow' ? 'NOTICE FRAME' : ''
    return (
      <SafeAreaView style={AppStyles.container}>
        <ScrollView>
        <View style={styles.container}>
          <Swiper
            style={styles.wrapper}
            autoplay={true}
            dot={<View style={{backgroundColor: '#A2a2a2', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />}
            activeDot={<View style={{backgroundColor: '#ff6600', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3}} />} 
            paginationStyle={{
              bottom: 40
            }}
            autoplayTimeout={2}
            loop={true}
            onIndexChanged={(index)=> this.setState({swiperIndex: index})}
          >        
            {data.map((item, ind)=>{
              return(
                <View key={ind}>
                  <Image source={require('../../assets/icons/Image_slideshow.png')} style={styles.backgroundImage}/>
                  <View style={styles.BigEventContainer}>
                    <View style={[styles.eventView,{backgroundColor:'rgba(248, 247, 216, 0.2)'}]}>
                      {/* <Text style={styles.eventTitleText}>{Platform.OS === 'android' ? ind: ind}</Text> */}
                      <Text style={styles.eventTitleText}>{item.eventName}</Text>
                      <Text style={styles.eventDateText}>{item.fullDate}</Text>
                      <Text style={styles.eventDateText}>{item.timeDuration} </Text>
                    </View>
                {data.map((item, ind)=>{
                 return(
                  <View style={{top : Platform.OS === 'android' ? 60 : 80 }}>
                  <View style={swiperIndex == ind ?  [styles.smallEventContainer,{borderRightWidth: 3,borderRightColor: '#ff9900'}] : styles.smallEventContainer}>
                    <View style={styles.smallEventView}>
                      <View style={{justifyContent:'flex-end'}}>
                        <Text style={styles.smallEventDateText}>{item.date}</Text>
                      </View>
                      <View>
                        <Text style={styles.smallEventTitleText}>{item.eventName}</Text>
                        <Text style={styles.smallEventDateText}>{item.timeDuration}  </Text>
                      </View>
                    </View>
                  </View>
                  </View>
                  )
                 })}
                </View>
              </View>
              )
            })}         
          </Swiper>
          {/* <View style={styles.box2}>
            <View style={styles.box3} />
          </View> */}
        </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapper: {},
  backgroundImage:{
    width: '100%',
    height: deviceHeight,
  },
  BigEventContainer: {
    flex:1,
    position: 'absolute',
    top: Platform.OS === 'android' ? 150 : 200 ,
    width: '100%',
    height: deviceHeight,
    backgroundColor: 'transparent',
    // backgroundColor: 'rgba(248, 247, 216, 0.3)',
  },
  eventTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(22) : AppSizes.verticalScale(18),
    fontFamily: AppFonts.NBlack,
    fontWeight:'900',
    letterSpacing: 1,
    color: '#fff',
    marginBottom: Platform.OS === 'android' ? 2 : 5
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
    paddingTop: Platform.OS === 'android' ? 8 : 10,
    paddingBottom: Platform.OS === 'android' ? 12 : 15 ,
  },
  smallEventContainer: {
    width: deviceWidth * .5,
    marginBottom: 3,
    alignSelf:'flex-end',
    right: 20,
    backgroundColor: 'rgba(248, 247, 216, 0.2)',
    // borderRightWidth: 3,
    // borderRightColor: '#ff9900'
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