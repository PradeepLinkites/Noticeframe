// import React, { Component } from 'react'
// import {StyleSheet, View, Text } from 'react-native'
// import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'

// export default class Switch extends Component {
// 	constructor(props) {
// 	super(props);
// 	this.state = {
// 		text: ''
// 	};
// 	}
// 	render() {
// 	   return (
//         <View style={styles.slideShowView}>
//             <Text style={styles.slideShowText}>Show in SlideShow</Text>
//             <Switch
//                 onValueChange = {this.toggleSwitch1}
//                 value = {this.state.switch1Value}
//                 disabled={false}
//                 // thumbColor='red'
//                 // trackColor="green"
//                 style={
//                 Platform.OS === 'android'
//                     ? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
//                     : { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
//                 }
//                 ios_backgroundColor={'#EBECF0'}
//             />
//         </View>
// 	);
// 	}	
// }

// const styles = StyleSheet.create({
// 	container: {
// 	  flex: 1
// 	},
// 	slideShowText: {
// 	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
// 		fontFamily: AppFonts.NRegular,
// 	  marginTop: 5,
// 	  letterSpacing: .2
// 	},
// 	slideShowView: {
// 	  flexDirection:'row',
// 	  justifyContent:'space-between',
// 	  alignSelf:'center'
// 	}
//  })