import * as React from 'react'
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Animated,
  Text
} from 'react-native'
import AwesomeButton from 'react-native-really-awesome-button'
import { DrawerActions } from 'react-navigation-drawer'
import { get } from 'lodash'
import Icon from 'react-native-vector-icons/Ionicons';
import { AppFonts, AppSizes, AppColors } from '../../theme'

export default class Navbar extends React.Component {
    constructor(props) {
        super(props)
    }
		
    back(){
        setTimeout(() => {
          this.props.navigation.goBack()
        }, 100)
    }

    render() {
        const from = get(this.props,'type','') === 'register' || get(this.props,'type','') === 'forgot' ? true : false
        const sty = get(this.props,'stylee','') ? this.props.stylee : {}
        const headerTitle = get(this.props, 'routeKey','') === 'Events' ? 'Events List' : get(this.props, 'routeKey','') === 'ListView' ? 'Active Events List' : get(this.props, 'routeKey','') === 'SlideShow' ? 'NOTICE FRAME': 'Calendar'
        return ( 
            <SafeAreaView style={styles.container}>
					{  get(this.props, 'routeKey','') === 'Home' ?
					   <Animated.View style={styles.tabContainer}> 
							<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ position: 'absolute', left: 20 }}>
								<Image source={require('../../assets/Home_assets/Menu.png')} />
							</TouchableOpacity>
							{/* <View style={styles.appTitleView}> */}
								<Text style={styles.text1}>Notice Frame</Text>
								<Text style={styles.text2}>Increasing productivity frame by frame</Text>
							{/* </View>      */}
						</Animated.View> 
						:
						<Animated.View style={styles.tabContainer}> 
							<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ position: 'absolute', left: 20 }}>
								<Image source={require('../../assets/Home_assets/Menu.png')} />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{ position: 'absolute', left: 56 }}>
								<Image source={require('../../assets/icons/Home_white.png')} style={styles.homeIconStyle}/>
							</TouchableOpacity>					  
							<View style={styles.appTitleView}>
								<Text style={styles.appTitleText}>
										{headerTitle}
								</Text>
							</View>     
						</Animated.View> 
               }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // height: Platform.OS === 'android' ? 100 : 110,
		backgroundColor: '#3b5261',
     },
     tabContainer: {
        justifyContent:'center',
        paddingTop: Platform.OS === 'android' ? 58 : 60,
	 },
    appTitleView: {
        position: 'absolute',
        right: 20,
        top: 20  
    },
    appTitleText: {
        marginBottom:20,
        right: 0 ,
        color: '#fff',
        fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(16),
        fontFamily: AppFonts.NBlack,
        letterSpacing: .5
	 },
	 text1: {
		position: 'absolute',
		right: 20,
		top: 15 , 
		marginBottom:20,
		color: '#fff',
		fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(16),
		fontFamily: AppFonts.NBlack,
		letterSpacing: .2
	 },
	 text2: {
		position: 'absolute',
		top: Platform.OS === 'android' ? 38 : 40,
		right: 20 ,
		color: '#fff',
		fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
		fontFamily: AppFonts.NRegular,
		fontWeight: '500',
		letterSpacing: .2
	},
    homeIconStyle: {
        height: Platform.OS === 'android' ? AppSizes.verticalScale(20) : AppSizes.verticalScale(18),
        width: 22,
        resizeMode: 'contain', 
        // background
    }
})
