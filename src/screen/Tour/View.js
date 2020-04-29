import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions, Platform } from 'react-native'
import Swiper from 'react-native-swiper'
import AwesomeButton from 'react-native-really-awesome-button'
import { StackActions, NavigationActions } from 'react-navigation'
import TimedSlideshow from 'react-native-timed-slideshow'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppFonts, AppSizes } from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'
import FastImage from 'react-native-fast-image'
import { isEmpty } from 'lodash'

export default class Welcome extends React.Component {

  constructor(props) {
    super(props);
  }

  signup(){
    setTimeout(() => {
      this.props.navigation.navigate('Signup')
    }, 100)
  }

  login = () => {
    AsyncStorage.getItem('@user').then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.navigation.navigate('Signup')
      } else {
        this.props.navigation.navigate('Login')
      }
    })
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Swiper
          showsButtons={false}
          autoplay={true}
          showsPagination={false}
          paginationStyle={{ bottom: 500 }}
          activeDot={<View style={{backgroundColor: '#FFF', width: 12, height: 12, borderRadius: 6, marginLeft: 10, marginRight: 10, marginTop: 3, marginBottom: 3}}/>}
          dot={<View style={{backgroundColor:'gray', width: 12, height: 12, borderRadius: 6, marginLeft: 10, marginRight: 10, marginTop: 3, marginBottom: 3}}/>}>
          <View style={styles.slideView}>
            <FastImage source={require('../../assets/welcome/image4.png')} style={{ width: deviceWidth, resizeMode: 'contain', height: deviceHeight }} />
          </View>
          <View style={styles.slideView}>
            <FastImage source={require('../../assets/welcome/image5.png')} style={{ width:  deviceWidth, resizeMode: 'contain', height: deviceHeight }} resizeMode={'contain'} />
          </View>
          <View style={styles.slideView}>
            <FastImage source={require('../../assets/welcome/image6.png')} style={{ width:  deviceWidth, resizeMode: 'contain', height: deviceHeight }} resizeMode={'contain'} />
          </View>
        </Swiper>
        <FastImage source={require('../../assets/welcome/bg.png')} resizeMode={'contain'} style={{ position: 'absolute', bottom: -80, resizeMode: 'contain', width: deviceWidth, height: deviceWidth/1.2, alignSelf: 'center' }} />
        <AwesomeButton
          type="primary"
          color={'#FFF'}
          backgroundColor={AppColors.app.button}
          backgroundDarker={AppColors.app.buttonShadow}
          height={AppSizes.verticalScale(40)}
          width={AppSizes.scale(120)}
          textSize={AppSizes.verticalScale(14)}
          onPress={this.signup.bind(this)}
          borderRadius={50}
          style={{ position: 'absolute', bottom: 100, alignSelf: 'center' }}
        >
          SIGN UP
        </AwesomeButton>
        <View style={{ flexDirection: 'row', position: 'absolute', bottom: 50, alignSelf: 'center' }}>
          <Text style={{ fontFamily: AppFonts.NRegular, fontSize: AppSizes.verticalScale(14), fontWeight: '600', color: '#FFF' }}>Already have an account?</Text>
          <TouchableOpacity onPress={() => this.login()}>
            <Text style={{ marginLeft: 5, textDecorationLine: 'underline', textDecorationColor: '#ff6227', fontFamily: AppFonts.NBlack, fontSize: AppSizes.verticalScale(14), color: AppColors.app.textHighlight }}>Login</Text>
          </TouchableOpacity>
        </View>
        <FastImage source={require('../../assets/welcome/logo.png')} resizeMode={'contain'} style={{ position: 'absolute', top: AppSizes.verticalScale(20), height: AppSizes.verticalScale(80), width: AppSizes.scale(140), resizeMode: 'contain', alignSelf: 'center' }} />
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  slideView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingTop: AppSizes.verticalScale(80)
  },
  text: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold'
  }
});