import React from 'react'
import {KeyboardAvoidingView, ScrollView, Platform, ActivityIndicator, Alert, StyleSheet, Text, View, Image, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import { get, isEmpty , size} from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles } from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CheckBox from 'react-native-checkbox'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      licenseKeyNumber: '',
      emailError: false,
      emailValidError: false,
      passError: false,
      loading: false,
      loginUserData: {},
      rememberLicenceKey: false
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('@LicenceKey')
    .then((licenceKey) => {
      if(!isEmpty(licenceKey)){
        const isRemember = true
        this.setState({ rememberLicenceKey: true , licenseKeyNumber : JSON.parse(licenceKey) })
      }
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return { loginUserData: nextProps.loginUserData }
  }

  componentDidUpdate(prevProps) {
    if(this.props.loginUserData !== prevProps.loginUserData) {
      if(this.props.loginUserPhase) {
        this.props.resetPhase()
        this.setState({ loginUserData: this.props.loginUserData, loading: false, email: '', password: '' })
        this.props.screenProps.updateUser(this.props.loginUserData)
        AsyncStorage.setItem('@user',JSON.stringify(this.props.loginUserData))
        if(this.state.rememberLicenceKey){
          AsyncStorage.setItem('@LicenceKey',JSON.stringify(this.props.loginUserData.licenseKeyNumber))
        }
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
    const { email, password,licenseKeyNumber } = this.state
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
      licenseKeyNumber,
      emailError,
      emailValidError,
      passError,
      rememberLicenceKey,
      loading
    } = this.state
    return (
      <SafeAreaView style={[AppStyles.container,{backgroundColor:'#fff'}]}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : null}
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
              secureTextEntry={true}
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

            <TextInput 
              style = {[AppStyles.textinput, rememberLicenceKey ? { color: '#A2a2a2' } : {color: '#000'} ]} 
              secureTextEntry={false}
              underlineColorAndroid = "transparent"
              placeholder = "License Key Number"
              placeholderTextColor = "#A2a2a2"
              autoCapitalize = "none"
              placeholderStyle={{ fontSize: 16 ,fontWeight: '500'}}
              numberOfLines={1}
              autoCorrect={false}
              onChangeText={licenseKeyNumber => this.setState({ licenseKeyNumber })}
              editable={!rememberLicenceKey}
              value={licenseKeyNumber}
            />
             <View style={styles.remember}>
                <CheckBox 
                  label="Remember Details"
                  labelBefore={true}
                  value={rememberLicenceKey}
                  onChange={(value)=>this.setState({ rememberLicenceKey: value })}
                  checkboxStyle={styles.checkboxStyle}
                  labelStyle={{ fontFamily: AppFonts.NRegular }}
                />
             </View>
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

const styles = StyleSheet.create({
  remember: {
    marginTop: 10, 
    flexDirection: 'row', 
    justifyContent:'flex-end'  
  },
  checkboxStyle: {
    fontFamily: AppFonts.NRegular,
    height: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(18),
    width:  Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(18),
  }
})