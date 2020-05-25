// import React from 'react'
// import {Image, View, Text } from 'react-native' 
// import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
// import { createAppContainer } from 'react-navigation'
// import Icon from 'react-native-vector-icons/Ionicons';
// //Tabs Screens
// import DailyScreen from '../DailyScreen/Container'
// import WeeklyScreen from '../WeeklyScreen/Container' 
// import MonthlyScreen from '../MonthlyScreen/Container' 
// import SlideShowScreen from '../SlideShowScreen/Container' 
// import EventsScreen from '../EventsScreen/Container' 
// import EventListScreen from '../EventListScreen/Container'   

//   export default TopNavigator = createMaterialTopTabNavigator({
//     Daily: {
//       screen: DailyScreen,
//       navigationOptions: ({navigation}) => ({
//         tabBarIcon:({tintColor, focused})=>(  
//           focused ?
//           <Image source={require('../../assets/Home_assets/Daily_select.png')} />
//           :
//           <Image source={require('../../assets/Home_assets/Daily.png')} />
//         ),
//         // tabBarOnPress: ({ navigation, defaultHandler }) => {
//         //   console.log('pradeep',navigation)
//         // }
//     })
//     },
//     Weekly: {
//       title: 'Weekly',
//       screen: WeeklyScreen,
//       navigationOptions: () => ({
//         tabBarIcon:({tintColor, focused})=>(  
//           focused ?
//           <Image source={require('../../assets/Home_assets/Weekly_select.png')} />
//           :
//           <Image source={require('../../assets/Home_assets/Weekly.png')} />
//         )  
//     })
//     },
//     Monthly: {
//       title: 'Monthly',
//       screen: MonthlyScreen,
//       navigationOptions: () => ({
//         tabBarIcon:({tintColor, focused})=>(  
//           focused ?
//           <Image source={require('../../assets/Home_assets/Monthly_select.png')} />
//           :
//           <Image source={require('../../assets/Home_assets/Monthly.png')} />  
//         )  
//     })
//     },
//     SlideShow: {
//       title: 'SlideShow',
//       screen: SlideShowScreen,
//       navigationOptions: () => ({
//         tabBarLabel: "SlideShow",
//         tabBarIcon:({tintColor, focused})=>(  
//           focused ?
//           <Image source={require('../../assets/Home_assets/slideshow_select.png')} />
//           :
//           <Image source={require('../../assets/Home_assets/slideshow.png')} /> 
//         )  
//     })
//     },
//     Events: {
//         title: 'Events',
//         screen: EventsScreen,
//         navigationOptions: () => ({
//           tabBarIcon:({tintColor, focused})=>(  
//             focused ?
//             <Image source={require('../../assets/Home_assets/event_select.png')} />
//             :
//             <Image source={require('../../assets/Home_assets/event.png')} /> 
//         )  
//       })
//       },     
//     ListView: {
//       title: 'ListView',
//       screen: EventListScreen,
//       navigationOptions: (navigation) => ({
//         tabBarIcon:({tintColor, focused})=>(  
//           focused ?
//           <Image source={require('../../assets/Home_assets/list_select.png')} />
//           :
//           <Image source={require('../../assets/Home_assets/list.png')} /> 
//         )  
//     })
//     },
//   },
//   {  
//     tabBarOptions: {    
//       allowFontScaling: true,  
//       upperCaseLabel: false,
//       showLabel: false,
//       showIcon: true,
//       tabBarComponent: ({navigation}) => alert('calll'),
//       // pressColor: "#3293ed",
//       // activeColor: '#f0edf6',
//       // inactiveColor: '#3e2465'
//       // activeTintColor: "#3293ed",
//       // labelStyle: {
//       //   fontSize: 8,
//       //   textAlign: "center",
//       //   color: '#939393'
//       // },
//       // tabBarLabelActive: {
//       //   color: 'red'
//       // },
//       style: {
//         backgroundColor: "#fff",
//         tabBarButtonColor: "#000",
//         tabFontFamily: "Avenir-Medium",
//         paddingBottom: 15,
//         paddingRight: 10
//       }
//     }
//   },{
//       navigationOptions: ({ navigation }) => {
//         const { routeName } = navigation.state.routes[navigation.state.index];
//         return {
//         headerTitle: routeName,
//         headerLeft:()=><Text>kkM</Text>
//         };
//       }
//     }
//   )