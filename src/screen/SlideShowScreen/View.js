import React from 'react'
import { Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import Swiper from 'react-native-swiper'
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
  static navigationOptions = {  
};

  constructor(props) {
    super(props);
    this.state = {
      swiperIndex: 0
    }
  }

  render() {
    const { swiperIndex } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'SlideShow' ? 'NOTICE FRAME' : ''
    return (
      <SafeAreaView style={AppStyles.container}>
        {/* <ScrollView> */}
        {/* <Navbar 
          navigation={this.props.navigation} 
          navTitle={route} 
          stylee={{ height: this.state.height }}
          routeKey={'SlideShow'} 
        /> */}
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
                      <Text style={styles.eventTitleText}>{item.eventName}</Text>
                      <Text style={styles.eventDateText}>{item.fullDate}</Text>
                      <Text style={styles.eventDateText}>{item.timeDuration} </Text>
                    </View>
                {data.map((item, ind)=>{
                 return(
                  <View style={{top : 80 }}>
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
        {/* </ScrollView> */}
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
    top: 200,
    width: '100%',
    height: deviceHeight,
    backgroundColor: 'transparent',
    // backgroundColor: 'rgba(248, 247, 216, 0.3)',
  },
  eventTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(28) : AppSizes.verticalScale(26),
    fontFamily: AppFonts.NBlack,
    fontWeight:'900',
    letterSpacing: 1,
    color: '#fff',
    marginBottom: 5
  },
  eventDateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14),
	  fontFamily: AppFonts.NRegular,
    marginTop: 5,
    letterSpacing: .8,
    color: '#fff'
  },
  eventView: {
    paddingLeft: 30,
    paddingTop: 10,
    paddingBottom: 15,
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