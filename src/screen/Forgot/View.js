import React from 'react'
import {Alert, StyleSheet, Text, View, Button, Image, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
import Navbar from '../Common/Navbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
import { AppStyles, AppSizes, AppFonts, AppColors } from '../../theme'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class Forgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiMessage: {},
      email: '',
      emailError: false,
      emailValidError: false,
      forgetData: {}
    }
    this._addFriend = this._addFriend.bind(this)
    this._callApi = this._callApi.bind(this)
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    return {forgetData: nextProps.forgetData}
  }

  componentDidUpdate(prevProps) {
    if (this.props.forgetData !== prevProps.forgetData) {
      if(get(this.props.forgetData, 'success', false)){
        this.setState({forgetData: this.props.forgetData , isLoading: false});
        Alert.alert(this.props.forgetData.message)
      }else{
        this.setState({ isEmailexist : true ,isLoading: false })
        Alert.alert(this.props.forgetData.message)
      }
    }
  }

  _callApi(){
    this.props.submit()  
  }

  _addFriend(){
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'AppStack' })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  forgotPassword(){
    const { navigation, store } = this.props
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
      // try {
      //  this.setState({ email: '' })
      // } catch (error) {
      //   console.log('new user created err', JSON.stringify(error))
      // }
      this.props.forgotPassword(email)
    }
  }

  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Forgot' ? 'FORGOT PASSWORD' : ''
     const {
      email,
      emailError,
      emailValidError,
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
              // onSubmitEditing={() => this.passwordInput.focus()}
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
          <AwesomeButton
            type="primary"
            color={'#FFF'}
            backgroundColor={AppColors.app.button}
            backgroundDarker={AppColors.app.buttonShadow}
            height={AppSizes.verticalScale(40)}
            width={deviceWidth - 60}
            textSize={AppSizes.verticalScale(14)}
            onPress={this.forgotPassword.bind(this)}
            borderRadius={50}
            style={{ marginTop: 48 }}
          >
            SUBMIT
          </AwesomeButton>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  container: {
    flex: 1,
    backgroundColor: 'lightgray'
  },
  authContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30
  },
  textBoxView: {
    height: 80
  },
  textInputBox: {
    height: 45, //AppSizes.verticalScale(42),
    paddingLeft: 16,
    backgroundColor: '#FFFFFF',
    // marginTop: 24,
    borderRadius: 10,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { height: 3, width: 0 },
    elevation: 1,
    // shadowColor: '#455B6314',
    borderColor: '#454F63',
    borderWidth: 0.4,
    // fontFamily: AppFonts.NBlack,
    fontSize: 16, //AppSizes.verticalScale(14),
    color: '#454F63'
  },
  error: {
    color: 'red',
    fontSize: 12, //AppSizes.verticalScale(10),
    marginLeft: 8,
    marginTop: 5,
    // fontFamily: AppFonts.NRegular
  }
})