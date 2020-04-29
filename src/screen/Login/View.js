import React from 'react'
import { Platform, ActivityIndicator, Alert, StyleSheet, Text, View, Button, Image, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import Navbar from '../Common/Navbar'
import { get, isEmpty , size} from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
import { AppColors, AppSizes, AppFonts, AppStyles } from '../../theme'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import AsyncStorage from '@react-native-community/async-storage'
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRealUserStatus,
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'
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
      fbloading: false,
      loginUserData:{},
      socialLoginData:{}
    }
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return { loginUserData: nextProps.loginUserData, socialLoginData: nextProps.socialLoginData }
  }

  componentDidUpdate(prevProps) {
    if(this.props.loginUserData !== prevProps.loginUserData) {
      if(this.props.loginUserPhase) {
        this.props.resetPhase()
        this.setState({ loginUserData: this.props.loginUserData, loading: false })
        this.props.screenProps.updateUser(this.props.loginUserData)
        AsyncStorage.setItem('@user',JSON.stringify(this.props.loginUserData));
        if(get(this.props.loginUserData,'planId','') === '' || size(get(this.props.loginUserData,'categoryInterests',[])) === 0){
          this.props.navigation.navigate('Signup')
        } else {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'AppStack' })]
          })
          this.props.navigation.dispatch(resetAction) 
        }
      } else {
        this.setState({ loading: false })
        Alert.alert('KIKO',this.props.loginUserMessage)
      }
    } 
   
    if(this.props.socialLoginData !== prevProps.socialLoginData) {
      if(this.props.socialLoginPhase) {
        this.props.resetPhase()
        this.setState({ socialLoginData: this.props.socialLoginData, fbloading: false })
        this.props.screenProps.updateUser(this.props.socialLoginData)
        AsyncStorage.setItem('@user',JSON.stringify(this.props.socialLoginData));
        if(get(this.props.socialLoginData,'planId','') === '' || size(get(this.props.socialLoginData,'categoryInterests',[])) === 0){
          this.props.navigation.navigate('Signup')
        } else {
          const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'AppStack' })]
          })
          this.props.navigation.dispatch(resetAction) 
        }
      } else {
        this.setState({ fbloading: false })
        // Alert.alert('KIKO',this.props.socialLoginMessage)
      }
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

  facebookLogin = async () => {
    try {
      this.setState({ fbloading: true })
      if (Platform.OS === "android") {
        LoginManager.setLoginBehavior("web_only")
      }
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result && result.isCancelled) {
        // handle this however suites the flow of your app
        // throw new Error('User cancelled request'); 
        console.log('User cancelled login', result)
        this.setState({ fbloading: false })
        return 
      }
  
      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
  
      if (!data) {
        // handle this however suites the flow of your app
        // throw new Error('Something went wrong obtaining the users access token');
        console.log('something went wrong', data)
        this.setState({ fbloading: false })
        return
      }

      const infoRequest = new GraphRequest('/me?fields=name,picture,email',null,async (error, user) => {
        if (error) {
          console.log('Error fetching data: ' + error.toString());
        } else {
          console.log('user==>>', user)
          var obj = {}
          obj.name = get(user,'name','')
          obj.email = get(user,'email','')
          obj.password = get(user,'id','')
          // obj.picture = get(user,'picture.data.url','')
          // obj.fbId = get(user,'id','')
          // obj.loginFrom = 'fbId'
          
          let result = await this.props.socialLogin(obj)

          // let result = await socialLogin(obj)
          // if(result && result.success){
          //   this.props.screenProps.updateUser(result.user)
          //   const resetAction = StackActions.reset({
          //     index: 0,
          //     actions: [NavigationActions.navigate({ routeName: 'AppStack' })]
          //   })
          //   this.props.navigation.dispatch(resetAction)  
          // } else {
          //   alert('Something Went Wrong')
          // }
        }
      })
      // Start the graph request.
      new GraphRequestManager().addRequest(infoRequest).start()
    } catch (e) {
      console.log(e);
    }
  }

  onAppleButtonPress = async () => {
    try {
      if(appleAuth.isSupported){
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: AppleAuthRequestOperation.LOGIN,
          requestedScopes: [AppleAuthRequestScope.EMAIL, AppleAuthRequestScope.FULL_NAME],
        });
        if(!isEmpty(appleAuthRequestResponse)) {
          let obj = {}
          obj.name = get(appleAuthRequestResponse,'fullName.givenName','')
          obj.email = get(appleAuthRequestResponse,'email','')
          obj.password = get(appleAuthRequestResponse,'nonce','')
          let result = await this.props.socialLogin(obj)
        }
      } else {
        Alert.alert('KIKO','AppleAuth is not supported on the device. Currently Apple Authentication works on iOS devices running iOS 13 or later.')
      }
    } catch (error) {
      let errorMessage = ''
      if (error.code === AppleAuthError.CANCELED) {
        console.log(error.code)
        errorMessage = ''
      }
      if (error.code === AppleAuthError.FAILED) {
        console.log(error.code)
        errorMessage = 'Apple Authintication Failed...'
      }
      if (error.code === AppleAuthError.INVALID_RESPONSE) {
        console.log(error.code)
        errorMessage = 'Apple Authintication Invalid Response...'
      }
      if (error.code === AppleAuthError.NOT_HANDLED) {
        console.log(error.code)
        errorMessage = 'Apple Authintication Not Handled...'
      }
      if (error.code === AppleAuthError.UNKNOWN) {
        console.log('Something went wrong',error.code)
        errorMessage = 'Apple Authintication Unauthorize...'
      }
      if(errorMessage !== ''){
        Alert.alert('KIKO',errorMessage)
      }
    }
  }

  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Login' ? 'LOGIN' : ''
     const {
      email,
      password,
      emailError,
      emailValidError,
      passError,
      loading,
      fbloading
    } = this.state
    return (
      <SafeAreaView style={AppStyles.container}>
        <Image source={require('../../assets/auth/bg.png')} style={{ position: 'absolute', width: deviceWidth, height: deviceHeight }} />
        <Navbar navigation={this.props.navigation} navTitle={route} type={'detail'} />
        <View style={AppStyles.authContainer}>
          <Text style={AppStyles.authDetails}>Enter Your Details</Text>
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
              onChangeText={email => this.setState({ email })}
              value={email}
            />
            {emailError && (
              <Text style={AppStyles.error}>Please enter email</Text>
            )}
            {emailValidError && (
              <Text style={AppStyles.error}>Please enter valid email</Text>
            )}
          </View>
          <View style={AppStyles.textBoxView}>
            <Text style={AppStyles.authLabel}>Password*</Text>
            <TextInput
              returnKeyType="next"
              ref={input => (this.passwordInput = input)}
              // onSubmitEditing={() => this.confirmPasswordInput.focus()}
              style={AppStyles.textInputBox}
              numberOfLines={1}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password =>
                this.setState({ password })
              }
              value={password}
              secureTextEntry={true}
            />
            {passError && (
              <Text style={AppStyles.error}>Please enter password</Text>
            )}
          </View>
          <View style={{ flexDirection: 'row', marginTop: 40, alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Forgot')}>
                <Text style={{ marginLeft: 5, fontFamily: AppFonts.NRegular, fontSize: AppSizes.verticalScale(14), color: '#000' }}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <AwesomeButton
            disabled={loading}
            type="primary"
            color={'#FFF'}
            backgroundColor={AppColors.app.button}
            backgroundDarker={AppColors.app.buttonShadow}
            height={AppSizes.verticalScale(40)}
            width={deviceWidth - 60}
            textSize={AppSizes.verticalScale(14)}
            onPress={this.login.bind(this)}
            borderRadius={50}
            style={{ marginTop: 20 }}
          >       
            {loading 
              ?
              <ActivityIndicator size="small" color="#FFF" />
              :
              'LOGIN'
            }
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
            { fbloading 
              ?
              <ActivityIndicator size="small" color="#FFF" />
              :
              'FACEBOOK'
            }
          </AwesomeButton>
          { Platform.OS === 'ios' &&
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                marginTop: 20,
                width: deviceWidth - 60,
                height: AppSizes.verticalScale(40)
              }}
              onPress={this.onAppleButtonPress}
            />
          }
          <View style={{ flexDirection: 'row', position: 'absolute', bottom: 20, alignSelf: 'center' }}>
            <Text style={{ fontFamily: AppFonts.NRegular, fontSize: AppSizes.verticalScale(14), fontWeight: '600', color: '#000' }}>Not Registered Yet?</Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
              <Text style={{ marginLeft: 5, textDecorationLine: 'underline', textDecorationColor: '#ff6227', fontFamily: AppFonts.NBlack, fontSize: AppSizes.verticalScale(14), color: AppColors.app.textHighlight }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}