import React, {useState} from 'react';
import { Text, Dimensions, StyleSheet, Platform, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer'
import { StackActions, NavigationActions } from 'react-navigation'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Navbar from '../screen/Common/TabNavbar'
import TopNavigator from '../screen/Common/TopTabNavigator'


import Home from '../screen/HomeScreen/Container'
import Events from '../screen/EventListScreen/Container'
import SlideShow from '../screen/SlideShowScreen/Container'
import Setting from '../screen/SettingScreen/Container'
import Support from '../screen/SupportScreen/Container'
import Share from '../screen/ShareScreen/Container'
import CreateEvent from '../screen/CreateEvent/Container'
import AsyncStorage from '@react-native-community/async-storage'
import { get } from 'lodash'
import { AppFonts, AppSizes, AppColors } from '../theme'
// import { LoginManager } from 'react-native-fbsdk'
// import Calender from '../screen/Common/Calender';
// import CheckBox from 'react-native-checkbox';
// import Icon from 'react-native-vector-icons/Ionicons';

//Tabs Screens
import DailyScreen from '../screen/DailyScreen/Container'
import WeeklyScreen from '../screen/WeeklyScreen/Container' 
import MonthlyScreen from '../screen/MonthlyScreen/Container' 
// import SlideShowScreen from '../SlideShowScreen/Container' 
import EventsComponent from '../screen/EventsScreen/Container' 
import ListViewScreen from '../screen/EventListScreen/Container'

const data = ['Daily', 'Weekly','Monthly', 'Calender List']

const drawerStacks = [
	{
	  key: 1,
	  route: 'Home',
	  title: 'Home',
	  icon: require('../assets/sidemenuAssets/Home.png')
	},
	{
	  key: 2,
	  route: 'Events',
	  title: 'Events',
	  icon: require('../assets/sidemenuAssets/Event.png')
	},
	{
	  key: 3,
	  route: 'Calendars',
	  title: 'Calendars',
	  icon: require('../assets/sidemenuAssets/Calender.png')
	},
	{
	  key: 4,
	  route: 'SlideShow',
	  title: 'SlideShow',
	  icon: require('../assets/sidemenuAssets/Slideshow.png')
	},
	{
	  key: 5,
	  route: 'Setting',
	  title: 'Setting',
	  icon: require('../assets/sidemenuAssets/Setting.png')
	},
	{
		key: 6,
		route: 'Support',
		title: 'Support',
		icon: require('../assets/sidemenuAssets/Support.png')
	},
	{
		key: 7,
		route: 'Share',
		title: 'Share the app',
		icon: require('../assets/sidemenuAssets/Share.png')
	},
	{
		key: 8,
		route: 'Logout',
		title: 'Logout',
		icon: require('../assets/sidemenuAssets/Logout.png')
	}
  ]

  const styles = StyleSheet.create({
	appIcon: {
	  width: '100%',
	  alignSelf: 'center',
	  alignItems: 'center',
	  bottom: 0,
	  position: 'absolute',
	  height: 100,
	  justifyContent: 'center',
	  backgroundColor: '#FFF'
	},
	navbarHead: {
	  borderBottomWidth: 0,
	  elevation: 0
	},
	drawerContainer: {
	  flex: 1
	},
	drawerHead: {
      flexDirection: 'row',
	  backgroundColor: '#3b5261',
	  paddingTop: Platform.OS === 'android' ? 30 : 65,
	  paddingBottom: Platform.OS === 'android' ? 30 : 48,
	  paddingLeft: 15
	},
	drawerIcon: {
	  resizeMode: 'contain',
	  width: 16, //AppSizes.verticalScale(16),
	  height: 16 //AppSizes.verticalScale(16)
	},
	logoStyle: {
		width: Platform.OS === 'android' ? 70 : 80, 
		height: Platform.OS === 'android' ? 70 : 80,
		resizeMode: 'contain', 
	},
	userView: {
		flexDirection:'column', 
		marginLeft: 8 ,
		marginTop: 10
	},
	userName: {
	  color: '#fff',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
	  fontFamily: AppFonts.NBlack
	},
	drawerEmailText: {
	  color: '#fff',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
	  fontFamily: AppFonts.NRegular
	},
	drawerText: {
	  color: '#000',
	  fontSize: AppSizes.verticalScale(16),
	  fontFamily: AppFonts.NRegular
	},
	calenderListView: {
		paddingLeft: Platform.OS === 'android' ? 100 : 110	
	},
	calenderListText: {
		color: '#000',
		fontSize: AppSizes.verticalScale(14),
		fontFamily: AppFonts.NRegular,
		marginBottom:2
	 },
	drawerSubHead: {
	  flexDirection: 'row',
	  marginTop: 6,
	  alignItems: 'center'
	},
	drawerHeadBottomBorder: {
	  backgroundColor: 'lightgray',
	  height: 2
	},
	drawerContentContainer: {
	  backgroundColor: '#FFF',
	  paddingTop: 15,
	  paddingBottom: 100 //AppSizes.verticalScale(100)
	},
	drawerContentItem: {
	  flexDirection: 'row',
	  alignItems: 'center',
	  paddingLeft: 41,
	  height: AppSizes.verticalScale(60)
	},
	drawerContentItemIcon: {
	  marginRight: 20,
	  width: AppSizes.verticalScale(40),
	  height: AppSizes.verticalScale(40),
	  resizeMode: 'contain'
	},
	trackDetailHeader: {
	  height: 115
	},
	trackNavTitle: {
	  fontSize: 32, //AppSizes.verticalScale(32),
	  fontFamily: 'NunitoSans-Black',
	  color: 'red' //AppColors.app.textColor
	}
  })

  const DrawerContent = ((props => 
  	{
	const loginUser = AsyncStorage.getItem('@user')
	const loginUser1 = JSON.parse(JSON.stringify(loginUser))

	const [value, setValue] = useState(false)
	const [isSelected , handleSelected] = useState(false)
	const handleToggleValue = () => {
		const newValue = !value
		setValue(newValue);
	 }

	return (
	  <View style={styles.drawerContainer}>
		<View style={styles.drawerHead}>
		  <Image source={require('../assets/sidemenuAssets/Logo_white.png')} style={styles.logoStyle}/>
		<View style={styles.userView}>
		  <Text style={styles.userName}>
			{get(props, `screenProps.user.name`, 'Your Name here')}
		  </Text>
		  <Text style={[styles.drawerEmailText]}>{get(props, 'screenProps.user.email', 'Example@example.com')}</Text>
		</View>
		</View>
		<View style={styles.drawerHeadBottomBorder} />
		<ScrollView
		  contentContainerStyle={styles.drawerContentContainer}
		  showsVerticalScrollIndicator={false}
		>
		  {drawerStacks.map(item => {
			return(
			item.title === 'Calendars' 
			?
			<View style={{ flex: 1}}>
			   <View style={{flexDirection:'row', alignItems:'center'}}>
					<TouchableOpacity
						key={item.key}
						style={styles.drawerContentItem}
						onPress={() => {
						props.navigation.navigate(item.route)
						props.navigation.dispatch(DrawerActions.closeDrawer())
						}}
					>
					<Image
						source={item.icon}
						style={[
							styles.drawerContentItemIcon
						]}
					/>
					   <Text style={styles.drawerText}>{item.title}</Text>
					</TouchableOpacity>				
					<TouchableOpacity style={{right: 15, position:'absolute'}} onPress={handleToggleValue}>
						{!value ?
						<Image source={require('../assets/sidemenuAssets/Arrow_down.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} />                   
						:
						<Image source={require('../assets/sidemenuAssets/Arrow_up.png')} style={{ height: 20, width: 20, resizeMode: 'contain' }} /> 
						}
					</TouchableOpacity>
			   </View>
				{value &&
					<View style={styles.calenderListView}>
						{data.map((item, ind) => {
							return(
							<TouchableOpacity key={ind} 
							   style={{justifyContent:'center', width:'100%',marginBottom:.5}}
                               onPress={()=>props.navigation.navigate(item)}
							>
								<Text style={styles.calenderListText}>{item}</Text>
							    {props.navigation.state.routes[props.navigation.state.index] === item && <Image source={require('../assets/sidemenuAssets/Tick.png')} style={{right: 15, position:'absolute', height: 20, width: 20, resizeMode: 'contain' }} />} 
							</TouchableOpacity>
						)})
						}
					</View>
				}
			</View>
			:
			  <TouchableOpacity
				key={item.key}
				style={styles.drawerContentItem}
				onPress={() => {
				  props.navigation.navigate(item.route)
				  props.navigation.dispatch(DrawerActions.closeDrawer())
				}}
			  >
				<Image
				  source={item.icon}
				  style={[
					styles.drawerContentItemIcon
				  ]}
				/>
				<Text style={styles.drawerText}>{item.title}</Text>
			  </TouchableOpacity>
			)
		  })}
		</ScrollView>
		{/* <View style={styles.appIcon}>
		  <Image
			source={require('../assets/drawer/appIcon.png')}
			style={{
			  width: AppSizes.verticalScale(140),
			  height: AppSizes.verticalScale(250),
			  resizeMode: 'contain'
			}}
		  />
		</View> */}
	  </View>
	)})
  )

class Logout extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		AsyncStorage.removeItem('@user');
		this.props.screenProps.updateUser({})
		LoginManager.logOut()
		this.props.navigation.navigate('AuthStack')
	}

	render() {
		return <View><React.Fragment /></View>
	}
}

const HomeScreen = createStackNavigator({
	Home: {
	  screen: Home
	},
},{
	headerMode: 'none',
})

const EventsScreen = createStackNavigator({
	Events: {
	  screen: Events,
	  navigationOptions: () => ({
		headerShown: false
	  })
	}
})
const SlideShowScreen = createStackNavigator({
	SlideShow: {
	  screen: SlideShow,
	  navigationOptions: () => ({
		headerShown: false
	  })
	}
})
const SupportScreen = createStackNavigator({
	Support: {
	  screen: Support,
	  navigationOptions: () => ({
		headerShown: false
	  })
	}
})
const SettingScreen = createStackNavigator({
	Setting: {
	  screen: Setting,
	  navigationOptions: () => ({
		headerShown: false
	  })
	}
})
const ShareScreen = createStackNavigator({
	Share: {
	  screen: Share,
	  navigationOptions: () => ({
		headerShown: false
	  })
	}
})

const TabNavigator = createMaterialTopTabNavigator(
	{
	  Daily: {
		screen: DailyScreen,
	  },
	  Weekly: {
		screen: WeeklyScreen,
	  },
	  Monthly: {
		screen: MonthlyScreen,
	  },
	  SlideShow: {
		screen: SlideShow,
	  },
	  Events: {
		screen: EventsComponent,
	  },
	  ListView: {
		screen: ListViewScreen,
	  },
	},
	{
		navigationOptions: ({ navigation }) => {
		  const { routeName } = navigation.state.routes[navigation.state.index];
		  return {
			header: props => 
			<Navbar 
				navigation={navigation} 
				navTitle={routeName} 
				routeKey={routeName}
		   />,		
		  }		  
		},	
		tabBarOptions: {
			activeTintColor: 'blue',
	        inactiveTintColor: 'grey',
	    style: {
		    backgroundColor: 'red',
		 },
		labelStyle: {
		   fontSize: 11,
	    },
	   },

	//    tabBarIcon: ({ focused, horizontal, tintColor }) => {
    //     const { routeName } = navigation.state;
    //     if (routeName === 'Daily') {
    //       return (
    //         <Image
    //           source={
    //             focused
    //               ? require('../assets/Home_assets/Daily_select.png')
    //               : require('../assets/Home_assets/Daily_select.png')
    //           }
    //           style={{
    //             width: 20,
    //             height: 20,
    //             borderRadius: 40 / 2,
    //           }}
    //         />
    //       );
    //     } else if (routeName === 'Settings') {
    //       return (
    //         <Image
    //           source={
    //             focused
    //               ? require('../assets/Home_assets/Daily_select.png')
    //               : require('../assets/Home_assets/Daily_select.png')
    //           }
    //           style={{
    //             width: 20,
    //             height: 20,
    //             borderRadius: 40 / 2,
    //           }}
    //         />
    //       );
    //     }
    //   },
	},

	// {
	//   defaultNavigationOptions: ({navigation}) => ({
	// 	tabBarIcon: ({horizontal, tintColor}) => {
	// 	  const {routeName} = navigation.state;
	// 	  let iconName;
	// 	  if (routeName === 'DAILY') {
	// 		iconName = 'ios-home';
	// 	  } else if (routeName === 'Chat') {
	// 		iconName = 'ios-chatboxes';
	// 	  } else if (routeName === 'Settings') {
	// 		iconName = 'ios-settings';
	// 	  }
	// 	  return (
	// 		<Ionicons
	// 		  name={iconName}
	// 		  size={horizontal ? 20 : 25}
	// 		  color={tintColor}
	// 		/>
	// 	  );
	// 	},
	//   }),
	// },
)

const HomeStackNavigator = createStackNavigator({
	TabNavigator: TabNavigator
   });

export default DrawerNavigator = createDrawerNavigator({	
	Home: {
	 	screen: HomeStackNavigator
	},
	Events: {
     	screen: EventsComponent
	},
	SlideShow: {
		screen: SlideShowScreen
	},
	Setting: {
		screen: SettingScreen
   },
   Support: {
		 screen: SupportScreen
   },
   Share: {
	screen: ShareScreen
  },
   CreateEvent:{
	screen: CreateEvent
   },
	Logout: {
		screen: Logout,
		navigationOptions: {
		  drawerLabel: 'Logout',
		  headerShown: false
		}
	}
},{
		contentComponent: DrawerContent,
		overlayColor: 'rgba(0, 0, 0, 0.7)',
		drawerWidth: Dimensions.get('screen').width - Dimensions.get('screen').width / 4,
		contentOptions: {
		  labelStyle: {
			fontFamily: 'NunitoSans-Regular',
			fontSize: 18,
			color: '#454F63'
		  }
		}
	  })