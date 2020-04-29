import React from 'react'
import { Platform, Alert, ActivityIndicator, StyleSheet, Text, TextInput, View, Button, Image, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import Navbar from '../Common/Navbar'
import { get ,isEmpty , size} from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
import { AppFonts, AppSizes, AppColors, AppStyles } from '../../theme'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import AsyncStorage from '@react-native-community/async-storage'
import { AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk'
import CreditCardToken from './CreditCardToken';
import CategoryList from './CategoryList'
import StepIndicator from 'react-native-step-indicator';
import moment from 'moment'
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRealUserStatus,
  AppleAuthCredentialState,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication'

const labels = ['Signup', 'Payment', 'Select Category']
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#fe7013'
}

export default class Signup extends React.Component {
  progressSteps
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
      fbloading: false,
      progressTitle:'SIGN UP',
      singupData:{},
      isLoading:false,
      isEmailexist:false,
      currentPosition: 0,
      cardData: { valid: false },
      submitted:false,
      myUser:{},
      planId:'',
      createUserData: {},
      getUserData: {},
      socialLoginData:{},
      tillDate: moment().add(30,'days').format('MMMM D, YYYY')
    }
    this.updateCard = this.updateCard.bind(this)
  }

  componentDidMount(){ 
    AsyncStorage.getItem('@user').then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getUser(user1.userId)
        if(get(user1, 'planId', false) !== ''){
          this.setState({ currentPosition: 2 })
        }else{
          this.setState({ currentPosition: 1 })
        }
      }
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return {  createUserData: nextProps.createUserData, getUserData: nextProps.getUserData, socialLoginData: nextProps.socialLoginData, singupData: nextProps.singupData , editUserData: nextProps.editUserData, userData: nextProps.userData }
 }

 componentDidUpdate(prevProps) {
   
  if(this.props.createUserData !== prevProps.createUserData) {
      if(this.props.createUserPhase) {
        this.props.resetPhase()
        this.setState({ createUserData: this.props.createUserData, isLoading: false, currentPosition: 1 })
        this.props.getUser(this.props.createUserData.userId)
      } else {
        this.setState({ isLoading: false })
        Alert.alert('KIKO',this.props.createUserMessage)
      }
  }
  // else if (!this.props.createUserPhase && isEmpty(this.props.createUserData)) {
  //   alert('vipi ',this.props.createUserMessage)
  // }

  if(this.props.getUserPhase && this.props.getUserData !== prevProps.getUserData) {
    this.props.resetPhase()
    this.setState({ getUserData: this.props.getUserData, isLoading: false })
    this.props.screenProps.updateUser(this.props.getUserData)
    AsyncStorage.setItem('@user',JSON.stringify(this.props.getUserData));
  }

  if(this.props.updateUserPhase) {
    this.props.resetPhase()
    this.props.getUser(this.state.getUserData.userId)
    this.setState({ isLoading: false })
    if(this.state.currentPosition === 1) {
      this.setState({ currentPosition: 2 })
    } else if(this.state.currentPosition === 2) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'AppStack' })]
      })
      this.props.navigation.dispatch(resetAction) 
    }
    // alert(this.props.updateUserMessage)
  }

  if(this.props.socialLoginData !== prevProps.socialLoginData) {
    if(this.props.socialLoginPhase) {
      this.props.resetPhase()
      this.setState({ socialLoginData: this.props.socialLoginData, getUserData: this.props.socialLoginData, fbloading: false })
      this.props.screenProps.updateUser(this.props.socialLoginData)
      AsyncStorage.setItem('@user',JSON.stringify(this.props.socialLoginData));
      if(this.props.socialLoginData.planId === '') {
        this.setState({ currentPosition: 1 })
      } else if (size(this.props.socialLoginData.categoryInterests) === 0) {
        this.setState({ currentPosition: 2 })
      }
      // AsyncStorage.getItem('@user').then((user) => {
      //   const user1 = JSON.parse(user)
      //   if(!isEmpty(user1)){
      //     this.props.getUser(user1.userId)
      //     if(get(user1, 'planId', false) !== ''){
      //       this.setState({ currentPosition: 2 })
      //     }else{
      //       this.setState({ currentPosition: 1 })
      //     }
      //   }
      // })
    } else {
      this.setState({ fbloading: false })
      // Alert.alert('KIKO',this.props.socialLoginMessage)
    }
  }   
}

  removeItemValue = () => {
    AsyncStorage.removeItem('@user');
    this.props.navigation.navigate('Welcome')
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
        this.setState({ isLoading : true })
        const data =  {
          name: name,
          email: emailRegister,
          password: passwordRegister,
        }
        this.props.createUser(data)
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
        errorMessage = ''
      }
      if (error.code === AppleAuthError.FAILED) {
        errorMessage = 'Apple Authentication Failed...'
      }
      if (error.code === AppleAuthError.INVALID_RESPONSE) {
        errorMessage = 'Apple Authentication Invalid Response...'
      }
      if (error.code === AppleAuthError.NOT_HANDLED) {
        errorMessage = 'Apple Authentication Not Handled...'
      }
      if (error.code === AppleAuthError.UNKNOWN) {
        errorMessage = 'Apple Authentication Unauthorize...'
      }
      if(errorMessage !== ''){
        Alert.alert('KIKO',errorMessage)
      }
    }
  }

  updateCard =(data)=>{
    const { getUserData, planId } = this.state
    let obj = {}
    obj.userId = get(getUserData,'userId','')
    obj.planId = planId
    // obj.planId = 'plan_test'
    obj.card_token = data.id
    // console.log('on ======= user update => ', obj)
    this.setState({ isLoading: true })
    this.props.updateUser(obj)
  }
  
  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Signup' ? 'SIGN UP' : ''
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
      RegNameError,
      progressTitle,
      isEmailexist,
      currentPosition,
      isLoading,
      fbloading,
      categoryData,
      submitted,
      cardData,
      planId,
      tillDate
      } = this.state
    return (
      <SafeAreaView style={{flex: 1}}>
        <Image source={require('../../assets/auth/bg.png')} style={{ position: 'absolute', width: deviceWidth, height: deviceHeight }} />
        <Navbar 
          navigation={this.props.navigation} 
          navTitle={route} 
          type={'detail'}
          onLogout={this.removeItemValue}
          stepPosition={this.state.currentPosition}
        />
        {/* {(currentPosition == 1 || currentPosition == 2) &&
          <TouchableOpacity onPress={() => this.removeItemValue()} style={styles.logoutBtnStyle}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        } */}
        <StepIndicator
          // renderStepIndicator={this.renderStepIndicator}
          customStyles={customStyles}
          currentPosition={currentPosition}
          stepCount={3}
          labels={labels}
        /> 
      <ScrollView style={AppStyles.authContainer} contentContainerStyle={{ paddingBottom: 50 }}>
      { currentPosition == 0 &&
        <View style={styles.signupContainer}>
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
              onChangeText={emailRegister => this.setState({ emailRegister, isEmailexist: false })}
              value={emailRegister}
            />
            {regEmailError && (
              <Text style={AppStyles.error}>Please enter email</Text>
            )}
            {regEmailValidError && (
              <Text style={AppStyles.error}>Please enter valid email</Text>
            )}
            {!regEmailError && !regEmailValidError && isEmailexist && (
              <Text style={AppStyles.error}>Email Already Exist</Text>
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
            disabled={isLoading}
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
            { isLoading ?
              <ActivityIndicator size="small" color="#FFF" />
              :
              'Next'
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
      </View>
      }
     
     { currentPosition == 1 &&
      <View style={styles.paymentContainer1}>
          <Text style={{ marginTop:10 }}>We use stripe to securly store and process your payment info. All transaction are secure and encrypted.</Text>              
          <View style={styles.planContainerView}>
            <TouchableOpacity style={get(this.state,'planId','' ) ==='plan_monthly' ? [styles.monthlyPlanConatiner, {backgroundColor: '#fe7013'}]: styles.monthlyPlanConatiner} onPress={()=> this.setState({ planId : 'plan_monthly' })}>
              <Text>Monthly</Text>
              <Text>INR 299.00/mo</Text>
              <Text>(Billed monthly)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={get(this.state,'planId','' ) ==='plan_yearly' ? [styles.monthlyPlanConatiner, {backgroundColor: '#fe7013'}]: styles.monthlyPlanConatiner} onPress={()=> this.setState({ planId : 'plan_yearly' })}>
              <Text>Annual</Text>
              <Text>INR 699.00/year</Text>
              <Text>(Billed annualy)</Text>
            </TouchableOpacity>
          </View>
          <View style={{ justifyContent: 'center', marginTop:20, alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>Due Today <Text style={{ fontSize: 18, fontWeight: 'bold' }}>INR 0.00</Text></Text>
            <Text style={{ fontSize: 18, fontWeight: '600' }}>(Free trial till {tillDate})</Text>
          </View>
          <View style={{ marginTop:20, flex: 1 }}>
            <CreditCardToken 
              isLoading={this.state.isLoading}  
              updateCard={this.updateCard} 
              emailRegister={emailRegister} 
              ref ={(node)=>this._creditCard = node } 
              {...this.state}
            />
          </View>
      </View>
      }

      { currentPosition == 2 &&
        <View style={styles.categoryContiner}>
          <CategoryList ref={(C)=>this.category = C} {...this.props} onSubmit={this.onSubmit}/>
        </View>
      }
      </ScrollView>
      {(currentPosition == 2 ) &&
        <AwesomeButton
          // disabled={isLoading}
          type='primary'
          color={'#FFF'}
          backgroundColor={AppColors.app.button}
          backgroundDarker={AppColors.app.buttonShadow}
          height={AppSizes.verticalScale(40)}
          width={deviceWidth - 200}
          textSize={AppSizes.verticalScale(14)}
          onPress={()=> {
            this.category.onSubmit()
          }}
          borderRadius={50}
          style={{position:'absolute', alignSelf: 'center', bottom: 25}}
          // disabled={!(this.state.cardData.valid || this.state.submitted) }
        >
          { isLoading ?
              <ActivityIndicator size="small" color="#FFF" />
            :
            'Submit' 
          }
        </AwesomeButton>
      }
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  signupContainer: {
    flex: 1
  },
  paymentContainer1: {
    flex: 1, 
    paddingHorizontal: 20,
    justifyContent: 'center'
  },
  paymentTextStyle: {
    fontSize: 20 ,
    fontWeight: '700'
  },
  planContainerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  monthlyPlanConatiner: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10
  },
  annuallyPlanContiner: {
    paddingLeft: 15 ,
    paddingRight: 15 ,
    paddingTop: 10 ,
    paddingBottom: 10 ,
    borderWidth: 1 ,
    borderRadius: 8 ,
    justifyContent: 'center',
    alignItems: 'center'
  },
  categoryContiner: {
    flex: 1 ,
    paddingLeft: 20,
    height: deviceHeight/1.4
  },
  categoryTextStyle : {
    fontSize: 20 ,
    fontWeight: '700'
  }
});