import React from 'react'
import { Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'
import Swiper from 'react-native-swiper'

export default class SlideShow extends React.Component {
  static navigationOptions = {  
};

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { getUserData } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'SlideShow' ? 'NOTICE FRAME' : ''
    return (
      <SafeAreaView style={AppStyles.container}>
        <Navbar 
          navigation={this.props.navigation} 
          navTitle={route} 
          stylee={{ height: this.state.height }}
          routeKey={'SlideShow'} 
        />
        <View style={styles.container}>
          <Swiper
            style={styles.wrapper}
            autoplay={true}
            dot={<View style={{backgroundColor: '#A2a2a2', width: 14, height: 14, borderRadius: 7, marginLeft: 5, marginRight: 5}} />}
            activeDot={<View style={{backgroundColor: '#ff6600', width: 14, height: 14, borderRadius: 7, marginLeft: 5, marginRight: 5}} />} 
            paginationStyle={{
              bottom: 40
            }}
            autoplayTimeout={2}
            loop={true}
          >
            <View>           
              <Image source={require('../../assets/icons/Image_slideshow.png')} style={styles.backgroundImage}/>
              <View style={styles.BigEventContainer}>
                <View style={styles.eventView}>
                  <Text style={styles.eventTitleText}>Board Meeting</Text>
                  <Text style={styles.eventDateText}>20 FEB, 2020</Text>
                  <Text style={styles.eventDateText}>09:30 to 12:30 </Text>
                </View>
              </View>
              <View style={styles.smallEventContainer}>
                <View style={styles.smallEventView}>
                  <View style={{justifyContent:'flex-end'}}>
                    <Text style={styles.eventDateText}>20 FEB</Text>
                  </View>
                  <View>
                    <Text style={styles.smallEventTitleText}>Board Meeting</Text>
                    <Text style={styles.eventDateText}>09:30 to 12:30 </Text>
                  </View>
                </View>
               </View>
            </View>
            <View>
              <Image source={require('../../assets/icons/Image_slideshow.png')} style={styles.backgroundImage}/>
              <View style={styles.BigEventContainer}>
                <View style={styles.eventView}>
                  <Text style={styles.eventTitleText}>Study Time</Text>
                  <Text style={styles.eventDateText}>22 FEB, 2020</Text>
                  <Text style={styles.eventDateText}>10:30 to 12:20 </Text>
                </View>
              </View>
            </View>
            <View style={styles.slide3}>
              <Image source={require('../../assets/icons/Image_slideshow.png')} style={styles.backgroundImage}/>
            </View>
            <View style={styles.slide2}>
              <Image source={require('../../assets/icons/Image_slideshow.png')} style={styles.backgroundImage}/>
            </View>
            <View style={styles.slide3}>
              <Image source={require('../../assets/icons/Image_slideshow.png')} style={styles.backgroundImage}/>
            </View>

          </Swiper>
          {/* <View style={styles.box2}>
            <View style={styles.box3} />
          </View> */}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'transparent'
  },
  wrapper: {},
  backgroundImage:{
    width: deviceWidth,
    height: deviceHeight,
  },
  BigEventContainer: {
    position: 'absolute',
    top: 220,
    width: '100%',
    // backgroundColor: 'transparent',
    backgroundColor: 'rgba(248, 247, 216, 0.2)',
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
    paddingBottom: 15
  },
  smallEventContainer: {
    position: 'absolute',
    top: 400,
    width: 240,
    right: 15,
    // backgroundColor: 'red',
    backgroundColor: 'rgba(248, 247, 216, 0.2)',
  },
  smallEventView: {
    flexDirection:'row',
    justifyContent:'space-between',
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 5,
    paddingBottom: 5
  },
  smallEventTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14),
    fontFamily: AppFonts.NBlack,
    fontWeight:'800',
    letterSpacing: .5,
    color: '#fff',
  },
  smallEventDateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(10),
	  fontFamily: AppFonts.NRegular,
    letterSpacing: .2,
    color: '#fff'
  },
})