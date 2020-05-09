import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import DrawerScreen from './drawerScreen'
import Welcome from '../screen/Welcome/Container'
import Ragister from '../screen/Ragister/Container'
import SignIn from '../screen/SignIn/Container'
import ForgotPassword from '../screen/ForgotScreen/Container'	
import HomePage from '../screen/HomeScreen/Container'
import CreateEvent from '../screen/CreateEvent/Container'
import EditEvent from '../screen/EditEvent/Container'
import Signup from '../screen/Signup/Container'
import Forgot from '../screen/Forgot/Container'
import Tour from '../screen/Tour/Container'
import Home from '../screen/Home/Container'
import VideoPlayer from '../screen/VideoPlayer/component'
import { get, size } from 'lodash'

const AuthStack = createStackNavigator({
	Welcome: {
		screen: Welcome
	},
	Tour: {
		screen: Tour
	},
	Forgot: {
		screen: Forgot,
	},
	SignIn: {
		screen: SignIn,
	  },
	Ragister:{
		screen: Ragister,
	},
	ForgotPassword:{
		screen: ForgotPassword,
	}
},{
    headerMode: 'true',
	initialRouteName: 'SignIn',
    // mode: 'modal'
});

const SignupStack = createStackNavigator({
	Signup:{
		screen: Signup,
	},
},{
	initialRoute: 'Signup',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const AppStack = createStackNavigator({
	Home:{
		screen: DrawerScreen
	},
	CreateEvent:{
		screen: CreateEvent
	},
	
},{
	initialRoute: 'HomePage',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
});

const mainStack = createStackNavigator({
	AuthStack:{
		screen: AuthStack,
		navigationOptions: {
			headerShown: false
		}
	},
	AppStack:{
		screen: AppStack,
	},
	SignupStack:{
		screen: SignupStack,
	}

},{
    headerMode: 'none',
	initialRoute: 'AppStack',
});

// const AppContainer = createAppContainer(mainStack);
const AppContainer = createAppContainer(AppStack);
const AppContainerHome = createAppContainer(AppStack);

export default class App extends React.Component {
	render() {
		const isLogin = (get(this.props,'user.email','') && get(this.props,'user.planId','') !== '' && size(get(this.props,'user.categoryInterests',[])) > 0) ? true : false
		return (
			isLogin ? <AppContainerHome screenProps={{...this.props}} /> : <AppContainer screenProps={{...this.props}} />
	  );
	}
  }