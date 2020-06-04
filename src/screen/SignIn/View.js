import React from 'react'
import {KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator, Alert, StyleSheet, Text, View, Button, Image, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { get, isEmpty , size} from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles } from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import styles from '../../theme/styles'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiMessage: {},
      email: '',
      password: '',
      emailError: false,
      emailValidError: false,
      passError: false,
      loading: false,
      loginUserData:{},
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return { loginUserData: nextProps.loginUserData }
  }

  componentDidUpdate(prevProps) {
    if(this.props.loginUserData !== prevProps.loginUserData) {
      if(this.props.loginUserPhase) {
        // this.props.resetPhase()
        this.setState({ loginUserData: this.props.loginUserData, loading: false })
        // this.props.screenProps.User(this.props.loginUserData)
        AsyncStorage.setItem('@user',JSON.stringify(this.props.loginUserData))
        this.props.navigation.navigate('Home')
      } else {
        this.setState({ loading: false })
        Alert.alert('NOTICFRAME',this.props.loginUserMessage)
      }
    } 
  }

  onFocus =(key)=>{
    if(key === 'email'){
      this.setState({ emailError: false , emailValidError: false })
    }
    if(key === 'password'){
      this.setState({ passwordError : false })
    }
  }

  login = async () => {
    const { navigation, store } = this.props
    const { email, password } = this.state
    var error = true
    var validateEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    this.setState({
      emailError: false,
      emailValidError: false,
      passError: false
    })
    if (email.trim() === '') {
      error = false
      this.setState({ emailError: true })
    } else if (!validateEmail.test(email.trim())) {
      error = false
      this.setState({ emailValidError: true })
    }

    if (password.trim() === '') {
      error = false
      this.setState({ passError: true })
    }

    if (error) {
      this.setState({ loading: true })
      this.props.loginUser({ email, password })
    }
  }

  render() {
     const {
      email,
      password,
      emailError,
      emailValidError,
      passError,
      loading,
    } = this.state
    return (
      <SafeAreaView style={AppStyles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={AppStyles.container}
        >
        <ScrollView style={AppStyles.scrollContainer}>
        <View style={AppStyles.top}>
          <Image source={require('../../assets/logo/Logo_NF.png')} style={AppStyles.logoStyle} /> 
          <Text style={AppStyles.text}>Enter Your Details</Text>
        </View>
        <View style={[AppStyles.authContainer,{ marginTop: 5 }]}>
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
            <TextInput style = {AppStyles.textinput}
              underlineColorAndroid = "transparent"
              placeholder = "Your Password here"
              placeholderTextColor = "#A2a2a2"
              autoCapitalize = "none"
              placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
              numberOfLines={1}
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
              onFocus={this.onFocus.bind(this, 'password')}
              value={password}
            />
            {passError && <Text style={AppStyles.error}>Please enter password</Text>}  
            <TouchableOpacity
               style = {AppStyles.loginButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password)
               }
            >
            {loading
              ?
              <ActivityIndicator size="small" color="#FFF" />
              :
              // <Text style = {AppStyles.submitButtonText} onPress={() => this.props.navigation.navigate('Home')}> LOGIN </Text>
              <Text style = {AppStyles.submitButtonText}> LOGIN </Text>
            }
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              <Text style={AppStyles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
            <View style={AppStyles.SignupView}>
              <Text style={AppStyles.signupText}>Not registered Yet? </Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Ragister')}>
              <Text style={AppStyles.signupStyle}>Sign Up</Text>
            </TouchableOpacity>
            </View>
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
//     height: deviceHeight-400, 
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