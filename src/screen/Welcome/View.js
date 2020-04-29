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

  signup = () => {
    setTimeout(() => {
      this.props.navigation.navigate('Signup')
    }, 100)
  }

  login = () => {
    setTimeout(() => {
      AsyncStorage.getItem('@user').then((user) => {
        const user1 = JSON.parse(user)
        if(!isEmpty(user1)){
          this.props.navigation.navigate('Signup')
        } else {
          this.props.navigation.navigate('Login')
        }
      })
    }, 100)
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <FastImage 
            source={require('../../assets/logo/icon3x.png')} 
            resizeMode={'contain'}
            style={styles.logo}
          />
        </View>
        <View style={{ padding: 20, alignItems: 'center' }}>
          <AwesomeButton
            type="primary"
            color={'#FFFFFF'}
            backgroundColor={AppColors.app.button}
            backgroundDarker={AppColors.app.buttonShadow}
            height={50}
            width={340}
            textSize={16}
            onPress={this.login}
            borderRadius={5}
          >
            <Text style={styles.buttonText}>Sign-In / Sign-Up</Text>            
          </AwesomeButton>
          <View style={{ marginVertical: 10 }} />
          <AwesomeButton
            type="primary"
            color={'#FFFFFF'}
            backgroundColor={AppColors.app.button}
            backgroundDarker={AppColors.app.buttonShadow}
            height={50}
            width={340}
            textSize={16}
            onPress={this.signup}
            borderRadius={5}
          >
            <Text style={styles.buttonText}>Non-Profit Sign-Up</Text>            
          </AwesomeButton>
        </View>
        <View style={{ marginTop: 20, padding: 20, alignItems: 'center' }}>
          <TouchableOpacity style={styles.button} onPress={this.login}>
            <Text style={styles.buttonText}>Sign-In / Sign-Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={this.signup}>
            <Text style={styles.buttonText}>Non-Profit Sign-Up</Text>
          </TouchableOpacity>
        </View>
        <AwesomeButton
            type="primary"
            color={'#FFFFFF'}
            backgroundColor={AppColors.app.button}
            backgroundDarker={AppColors.app.buttonShadow}
            height={50}
            width={340}
            textSize={16}
            onPress={() => this.props.navigation.navigate('Tour')}
            borderRadius={5}
            style={{ position: 'absolute', bottom: 200, alignSelf: 'center' }}
          >
            <Text style={styles.buttonText}>Start Tour</Text>
          </AwesomeButton>
      </View>
    )
  } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  logoContainer: {
    width: '100%',
    position: 'absolute',
    top: AppSizes.verticalScale(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: { 
    height: 121, 
    width: 121,
    resizeMode: 'contain', 
    alignSelf: 'center' 
  },
  slogan: {
    color: '#454F63',
    fontSize: 14,
    letterSpacing: 1.4,
    fontWeight: '400'
  },
  button: {
    backgroundColor: AppColors.app.button,
    height: 50,
    width: 340,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: AppSizes.verticalScale(16),
    letterSpacing: 0.8,
    fontWeight: '400'
  },

  underline: {
    marginLeft: 5, 
    textDecorationLine: 'underline', 
    textDecorationColor: '#ff6227', 
    fontFamily: AppFonts.NBlack, 
    fontSize: AppSizes.verticalScale(14), 
    color: AppColors.app.textHighlight 
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