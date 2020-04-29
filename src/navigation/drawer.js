import React from 'react'
import { Text, Dimensions, StyleSheet, Platform, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer'
import { StackActions, NavigationActions } from 'react-navigation'
import Home from '../screen/Home/Container'
import Setting from '../screen/Setting/Container'
import VideoPlayer from '../screen/VideoPlayer/component'
import WebView from '../screen/WebView/component'
import AsyncStorage from '@react-native-community/async-storage'
import { get } from 'lodash'
import { AppFonts, AppSizes, AppColors } from '../theme'
import { LoginManager } from 'react-native-fbsdk'

const drawerStacks = [
	{
	  key: 1,
	  route: 'Home',
	  title: 'Home',
	  icon: require('../assets/sidemenu/home.png')
	},
	{
	  key: 2,
	  route: 'Setting',
	  title: 'Setting',
	  icon: require('../assets/sidemenu/settings.png')
	},
	// {
	//   key: 3,
	//   route: 'About',
	//   title: 'About',
	//   icon: require('../assets/sidemenu/about.png')
	// },
	// {
	//   key: 4,
	//   route: 'Feedback',
	//   title: 'Feedback',
	//   icon: require('../assets/sidemenu/feedback.png')
	// },
	{
	  key: 5,
	  route: 'Logout',
	  title: 'Logout',
	  icon: require('../assets/drawer/about.png')
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
	//   backgroundColor: '#ff6227',
	  paddingTop: Platform.OS === 'android' ? 30 : 50,
	  paddingBottom: Platform.OS === 'android' ? 20 : 20,
	  paddingLeft: 41
	},
	drawerIcon: {
	  resizeMode: 'contain',
	  width: 16, //AppSizes.verticalScale(16),
	  height: 16 //AppSizes.verticalScale(16)
	},
	userName: {
	  color: '#000',
	  fontSize: AppSizes.verticalScale(20),
	  fontFamily: AppFonts.NBlack
	},
	drawerHeadText: {
	  color: '#000',
	  fontSize: AppSizes.verticalScale(12),
	  fontFamily: AppFonts.NRegular
	},
	drawerText: {
	  color: '#454F63',
	  fontSize: AppSizes.verticalScale(16),
	  fontFamily: AppFonts.NRegular
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
	return (
	  <View style={styles.drawerContainer}>
		<View style={styles.drawerHead}>
		  <Image source={{ uri: get(props, 'screenProps.user.picture', 'http://pluspng.com/img-png/user-png-icon-male-user-icon-512.png')}} style={{ width: 60, height: 60, resizeMode: 'contain', borderRadius: 30 }}/>
		  <Text style={styles.userName}>
			{get(props, `screenProps.user.name`, 'My Name')}
		  </Text>
		  <Text style={[styles.drawerHeadText]}>{get(props, 'screenProps.user.email', 'example@gmail.com')}</Text>
		</View>
		<View style={styles.drawerHeadBottomBorder} />
		<ScrollView
		  contentContainerStyle={styles.drawerContentContainer}
		  showsVerticalScrollIndicator={false}
		>
		  {drawerStacks.map(item => {
			return (
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
		<View style={styles.appIcon}>
		  <Image
			source={require('../assets/drawer/appIcon.png')}
			style={{
			  width: AppSizes.verticalScale(140),
			  height: AppSizes.verticalScale(250),
			  resizeMode: 'contain'
			}}
		  />
		</View>
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
	VideoPlayer: {
		screen: VideoPlayer,
		navigationOptions: () => ({
		  headerShown: false
		})
	},
	WebView: {
		screen: WebView,
		navigationOptions: () => ({
		 headerShown: false
		})
	}
},{
	headerMode: 'none',
	initialRouteName: 'Home',
	mode: 'modal'
})

const SettingScreen = createStackNavigator({
	Setting: {
	  screen: Setting,
	  navigationOptions: () => ({
		headerShown: false
	  })
	}
})

export default DrawerNavigator = createDrawerNavigator({
	Home: {
	  screen: HomeScreen
	},
	Setting: {
      screen: SettingScreen
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