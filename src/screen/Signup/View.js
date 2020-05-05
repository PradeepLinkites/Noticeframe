import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, Image, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import Navbar from '../Common/Navbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
import { AppFonts, AppSizes, AppColors, AppStyles } from '../../theme'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import AsyncStorage from '@react-native-community/async-storage'
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'

export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiMessage: {},
      name: '',
      email: '',
      password: '',
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
    // this._addFriend = this._addFriend.bind(this)
    // this._callApi = this._callApi.bind(this)
  }

  // static getDerivedStateFromProps = (nextProps, prevState) => {
  //   return {apiMessage: nextProps.apiMessage}
  // }

  // _callApi(){
  //   this.props.submit()  
  // }

  // _addFriend(){
  //   const resetAction = StackActions.reset({
  //     index: 0,
  //     actions: [NavigationActions.navigate({ routeName: 'AppStack' })]
  //   })
  //   this.props.navigation.dispatch(resetAction)
  // }

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
        try {
          this.setState({ loading: true })
          let result = await registerUser({name, email: emailRegister, password: passwordRegister})
          if(result && result.success){
            this.props.screenProps.updateUser(result.user)
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'AppStack' })]
            })
            this.props.navigation.dispatch(resetAction)
          } else {
            alert(result.message)
            this.setState({ loading: false })
          }
        } catch (error) {
          console.log('new user created err', JSON.stringify(error))
        }
      }
  }

  facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result && result.isCancelled) {
        // handle this however suites the flow of your app
        // throw new Error('User cancelled request'); 
        console.log('User cancelled login', result)
        return 
      }
  
      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        // handle this however suites the flow of your app
        // throw new Error('Something went wrong obtaining the users access token');
        console.log('something went wrong', data)
        return
      }

      const infoRequest = new GraphRequest('/me?fields=name,picture,email',null,async (error, user) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          var obj = {}
          obj.name = get(user,'name','')
          obj.email = get(user,'email','')
          obj.picture = get(user,'picture.data.url','')
          obj.fbId = get(user,'id','')
          obj.loginFrom = 'fbId'
          let result = await socialLogin(obj)
          if(result && result.success){
            this.props.screenProps.updateUser(result.user)
            const resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName: 'AppStack' })]
            })
            this.props.navigation.dispatch(resetAction)  
          } else {
            alert('Something Went Wrong')
          }
        }
      })
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start()
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Ragister' ? 'SIGN UP' : ''
    const {
      name,
      emailRegister,
      passwordRegister,
      confirmPassword,
      regEmailError,
      regEmailValidError,
      regPassError,
      RegCPassError,
      RegCPassMatchError,
      RegNameError
    } = this.state
    return (
      <SafeAreaView style={AppStyles.container}>
        <Image source={require('../../assets/auth/bg.png')} style={{ position: 'absolute', width: deviceWidth, height: deviceHeight }} />
        <Navbar navigation={this.props.navigation} navTitle={route} type={'detail'} />
        <ScrollView style={AppStyles.authContainer} contentContainerStyle={{ paddingBottom: 50 }}>
          <Text style={AppStyles.authDetails}>Enter Your Details</Text>
          <View style={AppStyles.textBoxView}>
            <Text style={AppStyles.authLabel}>Name*</Text>
            <TextInput
              returnKeyType="next"
              onSubmitEditing={() => this.emailInput.focus()}
              style={[AppStyles.textInputBox]}
              numberOfLines={1}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={name => this.setState({ name })}
              value={name}
            />
            {RegNameError && <Text style={AppStyles.error}>Please enter name</Text>}  
          </View>         
          <View style={AppStyles.textBoxView}>
            <Text style={AppStyles.authLabel}>Email*</Text>
            <TextInput
              returnKeyType="next"
              ref={input => (this.emailInput = input)}
              onSubmitEditing={() => this.passwordInput.focus()}
              style={AppStyles.textInputBox}
              numberOfLines={1}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={emailRegister => this.setState({ emailRegister })}
              value={emailRegister}
            />
            {regEmailError && (
              <Text style={AppStyles.error}>Please enter email</Text>
            )}
            {regEmailValidError && (
              <Text style={AppStyles.error}>Please enter valid email</Text>
            )}
          </View>
          <View style={AppStyles.textBoxView}>
            <Text style={AppStyles.authLabel}>Password*</Text>
            <TextInput
              returnKeyType="next"
              ref={input => (this.passwordInput = input)}
              onSubmitEditing={() => this.confirmPasswordInput.focus()}
              style={AppStyles.textInputBox}
              numberOfLines={1}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={passwordRegister =>
                this.setState({ passwordRegister })
              }
              value={passwordRegister}
              secureTextEntry={true}
            />
            {regPassError && (
              <Text style={AppStyles.error}>Please enter password</Text>
            )}
          </View>
          <View style={AppStyles.textBoxView}>
            <Text style={AppStyles.authLabel}>Confirm Password*</Text>
            <TextInput
              returnKeyType="done"
              ref={input => (this.confirmPasswordInput = input)}
              style={AppStyles.textInputBox}
              numberOfLines={1}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={confirmPassword => this.setState({ confirmPassword })}
              value={confirmPassword}
              secureTextEntry={true}
            />
            {RegCPassError && (
              <Text style={AppStyles.error}>Please enter confirm password</Text>
            )}
            {RegCPassMatchError && (
              <Text style={AppStyles.error}>Password not matched</Text>
            )}
          </View>
          <AwesomeButton
            disabled={this.state.loading}
            type="primary"
            color={'#FFF'}
            backgroundColor={AppColors.app.button}
            backgroundDarker={AppColors.app.buttonShadow}
            height={AppSizes.verticalScale(40)}
            width={deviceWidth - 60}
            textSize={AppSizes.verticalScale(14)}
            onPress={this.register.bind(this)}
            borderRadius={50}
            style={{ marginTop: 48 }}
          >
            SIGN UP
          </AwesomeButton>
          <Text
            style={{
              marginVertical: 20,
              alignSelf: 'center',
              alignItems: 'center',
              color: '#959DAD',
              fontSize: AppSizes.verticalScale(14),
              fontFamily: AppFonts.NBlack,
              letterSpacing: 0.5
            }}
          >
            OR
          </Text>
          <AwesomeButton
            type="primary"
            color={'#FFF'}
            backgroundColor={'#3C5A98'}
            backgroundDarker={'#1f3a70'}
            height={AppSizes.verticalScale(40)}
            width={deviceWidth - 60}
            textSize={AppSizes.verticalScale(14)}
            onPress={this.facebookLogin}
            borderRadius={10}
            // style={{ fontFamily: AppFonts.NBlack }}
          >
            FACEBOOK
          </AwesomeButton>
          {/* <AwesomeButton
            type="primary"
            color={'#FFF'}
            backgroundColor={'#E0433A'}
            backgroundDarker={'#8f231d'}
            height={AppSizes.verticalScale(40)}
            width={deviceWidth - 60}
            textSize={AppSizes.verticalScale(14)}
            onPress={this.registerUser.bind(this,'google')}
            borderRadius={10}
            style={{ marginTop: 20, fontFamily: AppFonts.NBlack }}
          >
            GOOGLE
          </AwesomeButton> */}
          <View style={{ flexDirection: 'row', marginTop: 40, alignSelf: 'center' }}>
            <Text style={{ fontFamily: AppFonts.NRegular, fontSize: AppSizes.verticalScale(14), fontWeight: '600', color: '#000' }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <Text style={{ marginLeft: 5, textDecorationLine: 'underline', textDecorationColor: '#ff6227', fontFamily: AppFonts.NBlack, fontSize: AppSizes.verticalScale(14), color: AppColors.app.textHighlight }}>Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
