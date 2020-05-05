import React from 'react'
import {ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, StyleSheet, Text, View, Button, Image, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
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
      email: '',
      emailError: false,
      emailValidError: false,
      loading: false,
    }
  }

  onFocus =()=>{
    this.setState({ emailError: false, emailValidError: false })
  }

  handleChange =(email)=>{
    this.setState({ email : email })
  }

  forgotPassword(){
    // const { navigation, store } = this.props
    const { email } = this.state
    var error = true
    var validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    this.setState({
      emailError: false,
      emailValidError: false
    })

    if (email.trim() === '') {
      error = false
      this.setState({ emailError: true })
    } else if (!validateEmail.test(email.trim())) {
      error = false
      this.setState({ emailValidError: true })
    }
    if (error) {
      try {
       this.setState({ email: '' })
      } catch (error) {
        console.log('new user created err', JSON.stringify(error))
      }
      // this.props.forgotPassword(email)
      this.props.navigation.navigate('SignIn')
    }
  }

  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'ForgotPassword' ? 'FORGOT PASSWORD' : ''
     const {
      email,
      emailError,
      emailValidError,
      loading,
    } = this.state
    return (
      <SafeAreaView style={AppStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={AppStyles.container}
        >
        <ScrollView>
        <Navbar navigation={this.props.navigation} navTitle={route} type={'forgot'} />
        <View style={AppStyles.top}>
          <Image source={require('../../assets/logo/Logo_NF.png')} style={AppStyles.logoStyle} /> 
          <Text style={AppStyles.text}>Enter Your Details</Text>
        </View>
        <View style={AppStyles.authContainer}>
          <TextInput 
            ref={c => { this.textInput = c}} 
            style = {AppStyles.textinput}
            placeholder = "Your Email here"
            placeholderTextColor = "#A2a2a2"
            placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
            underlineColorAndroid = "transparent"
            numberOfLines={1}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={this.handleChange.bind(this)}
            onFocus={this.onFocus.bind(this)}
            value={email}
          />
            {emailError && (
              <Text style={AppStyles.error}>Please enter email</Text>
            )}
            {emailValidError && (
              <Text style={AppStyles.error}>Please enter valid email</Text>
            )}

          <TouchableOpacity
            style = {AppStyles.loginButton}
            onPress={this.forgotPassword.bind(this)}
          >
            <Text style = {AppStyles.submitButtonText}> SUBMIT </Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    )
  }
}

// const styles = StyleSheet.create({
//   container: {
//      flex: 1,
//   },
//   logoContainer:{
//     height: 250, 
//     justifyContent: 'center', 
//     alignItems: 'center',
//   },
//   logoStyle:{
//     height: 120,
//     width: 120
//   },
//   text:{
//      marginTop: 25,
//      color: '#939393',  
//      fontSize: 18,
//      fontWeight: '700',
//      letterSpacing: 0.6
//   },
//   textinput: {
//     fontSize: 18,
//     color: 'black',
//     marginBottom: 30,
//     borderBottomColor: '#A2a2a2',
//     borderBottomWidth: 1.5
//   },
//   mainContainer:{
//     paddingLeft: 20,
//     paddingRight: 20,
//   },
//   loginButton: {
//      backgroundColor: '#ff6600',
//      justifyContent:'center',
//      alignItems:'center',
//      height: 55,
//      marginTop: 20,
//      borderRadius: 30
//   },
//   submitButtonText:{
//      color: 'white',
//      fontSize: 20,
//      fontWeight: '700',
//      letterSpacing: 1
//   },
//   forgotText:{
//     color: '#939393',  
//     fontSize: 18,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//     alignSelf: 'center',
//     marginTop: 20
//  },
//   SignupView:{
//     marginTop: 8,
//     flexDirection:'row',
//     justifyContent:'center',
//     alignItems: 'center',
//   },
//  signupText:{
//   color: '#939393',  
//   fontSize: 18,
//   fontWeight: '700',
//   letterSpacing: 0.8
// },
// })