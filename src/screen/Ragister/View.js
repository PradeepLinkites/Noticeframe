import React from 'react'
import {KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator, Alert, StyleSheet, Text, View, Button, Image, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import Navbar from '../Common/commonNavbar'
import { get, isEmpty , size} from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles } from '../../theme'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import AsyncStorage from '@react-native-community/async-storage'


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      showConfirmPassword: true,
      firstName: '',
      lastName: '',
      mobileNumber: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      emailValidError: false,
      passwordError: false,
      confirmPassError: false,
      confirmPassMatchError: false,
      icon: 'eye-off',
      passDisplay: true,
      isLoading: false,
      createUserData: {},
    }
  }


  static getDerivedStateFromProps(nextProps, prevState){
    return {  createUserData: nextProps.createUserData }
  }

 componentDidUpdate(prevProps){
  if(this.props.createUserData !== prevProps.createUserData) {
      if(this.props.createUserPhase) {
        this.props.resetPhase()
        this.setState({ createUserData: this.props.createUserData, isLoading: false })
        this.setState({firstName: '',
          lastName: '',
          mobileNumber: '',
          email: '',
          password: '',
          confirmPassword: '' 
        })
        AsyncStorage.setItem('@user',JSON.stringify(this.props.createUserData))
        this.props.navigation.navigate('Home')
      } else {
        this.setState({ isLoading: false })
        Alert.alert('NOTICEFRAME',this.props.createUserMessage)
      }
    }
  }

  onFocus =(key)=>{
    if(key === 'firstName'){
      this.setState({ firstNameError: false })
    }
    if(key === 'lastName'){
      this.setState({ lastNameError: false })
    }
    if(key === 'email'){
      this.setState({ emailError: false , emailValidError: false })
    }
    if(key === 'password'){
      this.setState({ passwordError : false })
    }
    if(key === 'confirmPassword'){
      this.setState({ confirmPassError: false , confirmPassMatchError: false })
    }
  }

  register = async () => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    } = this.state

    var error = true
    var validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    // const validatePassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    const validatePassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/
    this.setState({
      firstNameError: false,
      lastNameError: false,
      emailError: false,
      emailValidError: false,
      passwordError: false,
      confirmPassError: false,
      confirmPassMatchError: false,
    })
    if (firstName.trim() === '') {
      error = false
      this.setState({ firstNameError: true })
    }
    if (lastName.trim() === '') {
      error = false
      this.setState({ lastNameError: true })
    }
    if (email.trim() === '') {
      error = false
      this.setState({ emailError: true })
    } else if (!validateEmail.test(email.trim())) {
      error = false
      this.setState({ emailValidError: true })
    }
    if (password.trim() === '') {
      error = false
      this.setState({ passwordError: true })
    }else if (!validatePassword.test(password.trim())) {
      error = false
      this.setState({ passwordError: true })
    }
    if (confirmPassword.trim() === '') {
      error = false
      this.setState({ confirmPassError: true })
    }
    if (password.trim() !== confirmPassword.trim() && confirmPassword.trim() !== '') {
      error = false
      this.setState({ confirmPassMatchError: true })
    }

    if (error) {
      this.setState({ isLoading: true })
      this.props.createUser({ firstName, lastName, email, password, confirmPassword })
    }
  }

  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Signup' ? 'SIGN UP' : ''
     const {
      showPassword,
      showConfirmPassword,
      firstName,
      lastName,
      mobileNumber,
      email,
      password,
      confirmPassword,
      firstNameError,
      lastNameError,
      emailError,
      emailValidError,
      passwordError,
      confirmPassError,
      confirmPassMatchError,
      isLoading
    } = this.state
    return (
      <SafeAreaView style={AppStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={AppStyles.container}
        >
        <ScrollView style={AppStyles.scrollContainer} showsVerticalScrollIndicator={false} >
        <Navbar navigation={this.props.navigation} navTitle={route} type={'register'} />
        <View style={AppStyles.topRegister}>
          <Image source={require('../../assets/logo/Logo_NF.png')} style={AppStyles.logoStyle} /> 
          <Text style={AppStyles.text}>Enter Your Details</Text>
        </View>
        <View style={AppStyles.authContainer}>
          <TextInput
            style = {AppStyles.textinput}
            underlineColorAndroid = "transparent"
            placeholder = "Enter Your First Name"
            placeholderTextColor = "#A2a2a2"
            placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
            numberOfLines={1}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={name => this.setState({ firstName: name })}
            onFocus={this.onFocus.bind(this, 'firstName')}
            value={firstName}
          />
          {firstNameError && <Text style={AppStyles.error}>Please enter first name</Text>} 
          <TextInput
            style = {AppStyles.textinput}
            underlineColorAndroid = "transparent"
            placeholder = "Enter Your Last Name"
            placeholderTextColor = "#A2a2a2"
            placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
            numberOfLines={1}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={name => this.setState({ lastName: name })}
            onFocus={this.onFocus.bind(this, 'lastName')}
            value={lastName}
          />
          {lastNameError && <Text style={AppStyles.error}>Please enter last name</Text>} 
          <TextInput
            style = {AppStyles.textinput}
            underlineColorAndroid = "transparent"
            placeholder = "Enter Your Mobile"
            placeholderTextColor = "#A2a2a2"
            placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
            numberOfLines={1}
            textContentType='telephoneNumber' 
            dataDetectorTypes='phoneNumber' 
            keyboardType='phone-pad' 
            onChangeText={number => this.setState({ mobileNumber: number })}
            onFocus={this.onFocus.bind(this, 'mobileNumber')}
            value={mobileNumber}
          />
          {/* {RegNameError && <Text style={AppStyles.error}>Please enter mobile</Text>}  */}
          <TextInput style = {AppStyles.textinput}
            underlineColorAndroid = "transparent"
            placeholder = "Your Email here"
            placeholderTextColor = "#A2a2a2"
            autoCapitalize = "none"
            placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
            numberOfLines={1}
            autoCorrect={false}
            onChangeText={email => this.setState({ email })}
            onFocus={this.onFocus.bind(this, 'email')}
            value={email}
            />
          {emailError && <Text style={AppStyles.error}>Please enter email</Text>} 
          {emailValidError && <Text style={AppStyles.error}>Please enter the valid email</Text>}
          <View style={styles.passwordContainer}>
            <TextInput style = {[AppStyles.textinput,{flex: 1}]}
              secureTextEntry={showPassword}
              underlineColorAndroid = "transparent"
              placeholder = "Enter Your Password"
              placeholderTextColor = "#A2a2a2"
              autoCapitalize = "none"
              placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
              numberOfLines={1}
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
              onFocus={this.onFocus.bind(this, 'password')}
              value={password}
            />
            <TouchableOpacity onPress={()=>this.setState({ showPassword: !showPassword })} style={styles.eyeContainer}>
              <Image source={showPassword ? require('../../assets/icons/Eye.png') :require('../../assets/icons/Eye_cross.png') } style={showPassword ? styles.eyeImage : [styles.eyeImage,{ height: 24 }]} />
            </TouchableOpacity>
            </View>
            {passwordError && (
              <Text style={AppStyles.error}>Please enter at least 8 letters which should contain 1 UpperCase, 1 LowerCase, 1 Number and 1 Symbol</Text>
            )}
         <View style={styles.passwordContainer}>
            <TextInput style = {[AppStyles.textinput,{flex: 1}]}
              secureTextEntry={showConfirmPassword}
              underlineColorAndroid = "transparent"
              placeholder = "Re-Enter Your Password"
              placeholderTextColor = "#A2a2a2"
              autoCapitalize = "none"
              placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
              numberOfLines={1}
              autoCorrect={false}
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
              onFocus={this.onFocus.bind(this, 'confirmPassword')}
              value={confirmPassword}
            />
            <TouchableOpacity onPress={()=>this.setState({ showConfirmPassword: !showConfirmPassword })} style={styles.eyeContainer}>
              <Image source={showConfirmPassword ? require('../../assets/icons/Eye.png') :require('../../assets/icons/Eye_cross.png') } style={showConfirmPassword ? styles.eyeImage : [styles.eyeImage,{ height: 24 }]} />
            </TouchableOpacity>
          </View>
          {confirmPassError && (
            <Text style={AppStyles.error}>Please enter confirm password</Text>
          )}
          {confirmPassMatchError && (
            <Text style={AppStyles.error}>Password not matched</Text>
          )}
          <TouchableOpacity
            style = {AppStyles.loginButton}
            onPress={this.register.bind(this)}
          >
          { isLoading ?
              <ActivityIndicator size="small" color="#FFF" />
            :
            <Text style = {AppStyles.submitButtonText}> Sign up </Text>
           }
          </TouchableOpacity>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
  },
  eyeContainer: {
    position: 'absolute',
    marginTop: 25,
    right:10,
    height: Platform.OS === 'android' ? AppSizes.verticalScale(27) : AppSizes.verticalScale(27),
    width: 35,
  },
  eyeImage: {
    position: 'absolute',
    right: 2,
    height: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(20),
    width: 30,
    resizeMode : 'stretch',
  },
})
