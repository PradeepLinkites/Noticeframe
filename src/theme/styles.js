import Colors from './colors';
import Fonts from './fonts';
import Sizes from './sizes';
import { Dimensions, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
  // container: {
  //   flex: 1,
  // },

  // navTitle: {
  //   fontSize: Sizes.verticalScale(22),
  //   fontFamily: Fonts.NBlack,
  //   color: '#000',
  //   alignSelf: 'center',
  //   letterSpacing: 0.5,
  //   marginTop: 5
  // },

  // navTitleForgot: {
  //   fontSize: Sizes.verticalScale(18),
  //   fontFamily: Fonts.NBlack,
  //   color: '#000',
  //   alignSelf: 'center',
  //   letterSpacing: 0.5,
  //   marginTop: 5
  // },

  // authContainer: {
  //   flex: 1,
  //   paddingVertical: 20,
  //   paddingHorizontal: 30
  // },

  // textBoxView: {
  //   height: Sizes.verticalScale(75)
  // },

  // textInputBox: {
  //   height: Sizes.verticalScale(32),
  //   paddingLeft: 5,
  //   backgroundColor: '#FFFFFF',
  //   borderRadius: 10,
  //   borderColor: '#e1e1e1',
  //   borderWidth: 1,
  //   fontFamily: Fonts.NRegular,
  //   fontSize: Sizes.verticalScale(12),
  //   color: '#000',
  //   // shadowOpacity: 0.5,
  //   // shadowRadius: 3,
  //   // shadowOffset: { height: 3, width: 0 },
  //   // elevation: 1,
  //   // shadowColor: '#455B6314'
  // },

  // authDetails: {
  //   color: Colors.app.textLabel,
  //   fontSize: Sizes.verticalScale(14),
  //   textAlign: 'center',
  //   marginVertical: 20
  // },

  // authLabel: {
  //   color: Colors.app.textLabel,
  //   fontSize: Sizes.verticalScale(12),
  //   marginLeft: 5,
  //   marginBottom: 2
  // },

  // error: {
  //   color: 'red',
  //   fontSize: Sizes.verticalScale(10),
  //   marginLeft: 5,
  //   marginTop: 2,
  //   fontFamily: Fonts.NRegular
  // },

  
  // Style for NoticeFrame
  // Auth
  
  container: {
    flex: 1,
    backgroundColor:'#3b5261'
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  scrollContainer: {
    backgroundColor:'#fff'
  },
  top: {
    height: hp(35), 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  topRegister:{
    height: hp(26), 
    justifyContent: 'center', 
    alignItems: 'center',
 },
  logoStyle:{
    height: hp(10),
    width: wp(20)
  },
  text:{
    marginTop: hp(3),
    color: '#939393',  
    fontSize: Platform.OS === 'android' ? Sizes.verticalScale(16) : Sizes.verticalScale(14),
    fontFamily: Fonts.NRegular,
    letterSpacing: 0.6
  },
  authContainer:{
    paddingLeft: 30,
    paddingRight: 30,
  },
  textinput: {
    fontSize: Platform.OS === 'android' ? Sizes.verticalScale(16) : Sizes.verticalScale(14),
    color: 'black',
    marginTop: 12,
    borderBottomColor: '#A2a2a2',
    borderBottomWidth: 1.5,
    height:hp(6.5)
  },
  loginButton: {
    backgroundColor: '#ff6600',
    justifyContent:'center',
    alignItems:'center',
    height: Platform.OS === 'android' ? hp(7): hp(5),
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 30
  },
  submitButtonText:{
    color: 'white',
    fontSize: Platform.OS === 'android' ? Sizes.verticalScale(18) : Sizes.verticalScale(16),
    fontWeight: '900',
    letterSpacing: 1
  },
  forgotText:{
    color: '#939393',  
    fontSize: Platform.OS === 'android' ? Sizes.verticalScale(16) : Sizes.verticalScale(14),
    letterSpacing: 0.6,
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: Fonts.NRegular
  },
  SignupView:{
    marginTop: 8,
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
 },
  signupText:{
    color: '#939393',  
    fontSize: Platform.OS === 'android' ? Sizes.verticalScale(16) : Sizes.verticalScale(14),
    letterSpacing: 0.6,
    fontFamily: Fonts.NRegular
  },
  signupStyle: {
    marginLeft: 5, 
    textDecorationLine: 'underline', 
    textDecorationColor: '#ff6227', 
    fontFamily: Fonts.NRegular,
    fontSize: Platform.OS === 'android' ? Sizes.verticalScale(16) : Sizes.verticalScale(14),
    color: '#ff6600'
  },
  error: {
    color: 'red',
    fontSize: Platform.OS === 'android' ? Sizes.verticalScale(15) : Sizes.verticalScale(14),
    // marginLeft: 5,
    fontFamily: Fonts.NRegular
  },
  button: {
    marginTop: 45, 
    backgroundColor:'#ff6600',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Platform.OS === 'android' ? 5 : 6,
    marginLeft: 5,
    marginRight: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: Platform.OS === 'android' ? Sizes.verticalScale(12) : Sizes.verticalScale(10),
    fontFamily: Fonts.NRegular,
    letterSpacing:.2
 },

  // Style for GridView
  gridView: {
    paddingLeft: 25,
    borderBottomWidth: .3,
    borderBottomColor: '#A2a2a2'
  },
  itemContainer: {
    borderRadius: 22,
    borderWidth: 4,
    height: Platform.OS === 'android' ? Sizes.verticalScale(140) : Sizes.verticalScale(120),
    width:  Platform.OS === 'android' ? Sizes.verticalScale(140) : Sizes.verticalScale(120),
    marginBottom: 2
  },
  playButton: {
    position:'absolute',
    top: Platform.OS === 'android' ? 6 : 6,
    right: Platform.OS === 'android' ? 35 : 30,
  },
  eventBottomBar:{
    width: Platform.OS === 'android' ? Sizes.verticalScale(135) : Sizes.verticalScale(115),
    position:'absolute',
    bottom : 5,
    left: 4,
    paddingLeft: 12,
    paddingVertical: 3,
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    backgroundColor: '#000000'
  },
  eventNameText:{
    marginBottom: 4,
    color:'#fff',
    fontSize: Platform.OS === 'android' ? 12 : 16,
    fontWeight:'800'
  },
  eventTimeText: {
    color:'#fff',
    fontSize: Platform.OS === 'android' ? 10 : 12,
    fontWeight:'500',
    marginBottom: 2,
  },
};
