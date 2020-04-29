import React from 'react'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import DrawerScreen from './drawer'
import Welcome from '../screen/Welcome/Container'
import Login from '../screen/Login/Container'
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
	Login: {
		screen: Login,
	  },
	Signup:{
		screen: Signup,
	},
	Forgot:{
		screen: Forgot,
	}
},{
    headerMode: 'none',
	initialRouteName: 'Welcome',
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
		screen: DrawerScreen,
	}
},{
	initialRoute: 'Home',
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
	initialRoute: 'AuthStack',
});

const AppContainer = createAppContainer(mainStack);
const AppContainerHome = createAppContainer(AppStack);

export default class App extends React.Component {
	render() {
		const isLogin = (get(this.props,'user.email','') && get(this.props,'user.planId','') !== '' && size(get(this.props,'user.categoryInterests',[])) > 0) ? true : false
		return (
			isLogin ? <AppContainerHome screenProps={{...this.props}} /> : <AppContainer screenProps={{...this.props}} />
	  );
	}
  }