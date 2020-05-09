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

  container: {
    flex: 1,
 },
 top:{
   height: hp(45), 
   justifyContent: 'center', 
   alignItems: 'center',
  
 },
 topRegister:{
  height: hp(28), 
  justifyContent: 'center', 
  alignItems: 'center',
},
 logoStyle:{
  height: hp(14),
  width: wp(24)
 },
 text:{
    marginTop: hp(3),
    color: '#939393',  
    fontSize: Sizes.verticalScale(18),
    fontWeight: '700',
    letterSpacing: 0.6
 },
 authContainer:{
  paddingLeft: 30,
  paddingRight: 30,
},
 textinput: {
   fontSize: Sizes.verticalScale(18),
   color: 'black',
   marginBottom: 15,
   borderBottomColor: '#A2a2a2',
   borderBottomWidth: 1.5,
   height:hp(6.5)
 },
 loginButton: {
    backgroundColor: '#ff6600',
    justifyContent:'center',
    alignItems:'center',
    height: hp(7),
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 30
 },
 submitButtonText:{
    color: 'white',
    fontSize: Sizes.verticalScale(20),
    fontWeight: '700',
    letterSpacing: 1
 },
 forgotText:{
   color: '#939393',  
   fontSize: Sizes.verticalScale(18),
   fontWeight: '700',
   letterSpacing: 0.8,
   alignSelf: 'center',
   marginTop: 20
},
 SignupView:{
   marginTop: 8,
   flexDirection:'row',
   justifyContent:'center',
   alignItems: 'center',
 },
signupText:{
 color: '#939393',  
 fontSize: Sizes.verticalScale(18),
 fontWeight: '700',
 letterSpacing: 0.8
},
error: {
  color: 'red',
  fontSize: Sizes.verticalScale(18),
  marginLeft: 5,
  marginTop: 1,
  fontFamily: Fonts.NRegular
},
button: {
  marginTop: 45, 
  backgroundColor:'#ff6600',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: Platform.OS === 'android' ? 10 : 12,
  paddingBottom: Platform.OS === 'android' ? 10 : 12,
  marginLeft: 5,
  marginRight: 5
},
buttonText: {
  color: '#fff',
  fontSize: Platform.OS === 'android' ? Sizes.verticalScale(18) : Sizes.verticalScale(14),
  fontFamily: Fonts.NRegular,
  fontWeight: '500',
  letterSpacing:.5
},

};
