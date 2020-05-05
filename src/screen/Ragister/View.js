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
      name: '',
      emailRegister: '',
      passwordRegister: '',
      confirmPassword: '',
      emailError: false,
      emailValidError: false,
      passError: false,
      regEmailError: false,
      regEmailValidError: false,
      regPassError: false,
      RegCPassError: false,
      RegCPassMatchError: false,
      RegNameError: false,
      loading: false
    }
  }

  onFocus =(key)=>{
    if(key === 'name'){
      this.setState({ RegNameError: false })
    }
    if(key === 'email'){
      this.setState({regEmailError: false, regEmailValidError: false })
    }
    if(key === 'password'){
      this.setState({ regPassError : false })
    }
    if(key === 'confirmPassword'){
      this.setState({ RegCPassError: false , RegCPassMatchError: false })
    }
  }

  register = async () => {
    const {
      name,
      emailRegister,
      passwordRegister,
      confirmPassword
    } = this.state

    var error = true
    var validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    this.setState({
      regEmailError: false,
      regEmailValidError: false,
      regPassError: false,
      RegCPassError: false,
      RegNameError: false,
      RegCPassMatchError: false
    })
    if (name.trim() === '') {
      error = false
      this.setState({ RegNameError: true })
    }

    if (emailRegister.trim() === '') {
      error = false
      this.setState({ regEmailError: true })
    } else if (!validateEmail.test(emailRegister.trim())) {
      error = false
      this.setState({ regEmailValidError: true })
    }

    if (passwordRegister.trim() === '') {
      error = false
      this.setState({ regPassError: true })
    }
    if (confirmPassword.trim() === '') {
      error = false
      this.setState({ RegCPassError: true })
    }

    if (passwordRegister.trim() !== confirmPassword.trim()) {
      error = false
      this.setState({ RegCPassMatchError: true })
    }

    if (error) {
      // try {
      //   this.setState({ loading: true })
      //   let result = await registerUser({name, email: emailRegister, password: passwordRegister})
      //   if(result && result.success){
      //     this.props.screenProps.updateUser(result.user)
      //     const resetAction = StackActions.reset({
      //       index: 0,
      //       actions: [NavigationActions.navigate({ routeName: 'AppStack' })]
      //     })
      //     this.props.navigation.dispatch(resetAction)
      //   } else {
      //     alert(result.message)
      //     this.setState({ loading: false })
      //   }
      // } catch (error) {
      //   console.log('new user created err', JSON.stringify(error))
      // }
      this.props.navigation.navigate('SignIn')
    }
  }

  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Signup' ? 'SIGN UP' : ''
     const {
      name,
      emailRegister,
      passwordRegister,
      confirmPassword,
      emailError,
      emailValidError,
      passError,
      regEmailError,
      regEmailValidError,
      regPassError,
      RegCPassError,
      RegCPassMatchError,
      RegNameError,
      loading

    } = this.state
    return (
      <SafeAreaView style={AppStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={AppStyles.container}
        >
        <ScrollView>
        <Navbar navigation={this.props.navigation} navTitle={route} type={'register'} />
        <View style={AppStyles.topRegister}>
          <Image source={require('../../assets/logo/Logo_NF.png')} style={AppStyles.logoStyle} /> 
          <Text style={AppStyles.text}>Enter Your Details</Text>
        </View>
        <View style={AppStyles.authContainer}>
          <TextInput
            style = {AppStyles.textinput}
            underlineColorAndroid = "transparent"
            placeholder = "Your Name here"
            placeholderTextColor = "#A2a2a2"
            placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
            numberOfLines={1}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={name => this.setState({ name })}
            onFocus={this.onFocus.bind(this, 'name')}
            value={name}
          />
          {RegNameError && <Text style={AppStyles.error}>Please enter name</Text>} 

          <TextInput style = {AppStyles.textinput}
            underlineColorAndroid = "transparent"
            placeholder = "Your Email here"
            placeholderTextColor = "#A2a2a2"
            autoCapitalize = "none"
            placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
            numberOfLines={1}
            autoCorrect={false}
            onChangeText={emailRegister => this.setState({ emailRegister })}
            onFocus={this.onFocus.bind(this, 'email')}
            value={emailRegister}
          />
           {regEmailError && (
              <Text style={AppStyles.error}>Please enter email</Text>
            )}
            {regEmailValidError && (
              <Text style={AppStyles.error}>Please enter valid email</Text>
            )} 
          <TextInput style = {AppStyles.textinput}
            underlineColorAndroid = "transparent"
            placeholder = "Your Password here"
            placeholderTextColor = "#A2a2a2"
            autoCapitalize = "none"
            placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
            numberOfLines={1}
            autoCorrect={false}
            onChangeText={passwordRegister => this.setState({ passwordRegister })}
            onFocus={this.onFocus.bind(this, 'password')}
            value={passwordRegister}
          />
          {regPassError && (
            <Text style={AppStyles.error}>Please enter password</Text>
          )}
          <TextInput style = {AppStyles.textinput}
            underlineColorAndroid = "transparent"
            placeholder = "Your Confirm Password here"
            placeholderTextColor = "#A2a2a2"
            autoCapitalize = "none"
            placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
            numberOfLines={1}
            autoCorrect={false}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            onFocus={this.onFocus.bind(this, 'confirmPassword')}
            value={confirmPassword}
          />
          {RegCPassError && (
            <Text style={AppStyles.error}>Please enter confirm password</Text>
          )}
          {RegCPassMatchError && (
            <Text style={AppStyles.error}>Password not matched</Text>
          )}
          <TouchableOpacity
            style = {AppStyles.loginButton}
            onPress={this.register.bind(this)}
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
//      marginTop: 15,
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