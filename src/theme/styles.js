import Colors from './colors';
import Fonts from './fonts';
import Sizes from './sizes';
import { Dimensions, Platform } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default {
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
    marginTop: 15,
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
    top: Platform.OS === 'android' ? Sizes.verticalScale(6) : Sizes.verticalScale(6),
    right: Platform.OS === 'android' ? Sizes.verticalScale(34) : Sizes.verticalScale(24),
  },
  eventBottomBar:{
    width: Platform.OS === 'android' ? Sizes.verticalScale(134) : Sizes.verticalScale(115),
    position:'absolute',
    bottom : 4.8,
    left: 3.5,
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
  noEventImageStyle: {
    height : Platform.OS === 'android' ? Sizes.verticalScale(50) : Sizes.verticalScale(50),
    width: Platform.OS === 'android' ? Sizes.verticalScale(50) : Sizes.verticalScale(50),
  }
};
