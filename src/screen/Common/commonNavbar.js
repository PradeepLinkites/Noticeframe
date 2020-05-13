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
// import Icon from 'react-native-vector-icons/Ionicons';
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
        return ( from ?
            <View style={[styles.container]}>
					<View style={{flexDirection: 'row', height: 55, width: '100%', paddingHorizontal: 15, paddingTop:5, position: 'absolute', top: 0, justifyContent: 'space-between',  }}>       
						<View>
							<Icon name="ios-arrow-back" onPress={this.back.bind(this)} size={50} color="#ff6600" />
						</View>
						{ get(this.props,'navTitle','') === 'SIGN UP' && (get(this.props,'stepPosition','') === 1 || get(this.props,'stepPosition','') === 2) &&
							<TouchableOpacity onPress={() => this.props.onLogout()} style={styles.logoutBtnStyle}>
									<Text style={styles.logoutText}>Logout</Text>
							</TouchableOpacity>
						}
					</View>
            </View>
            :
            <SafeAreaView style={styles.container}>
					{this.props.routeKey === 'Home' &&
					<Animated.View style={styles.container}>
						<Animated.View style={{ flexDirection: 'row', top: 30, alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop: 10 }}>
							<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ position: 'absolute', left: 23 }}>
									<Image source={require('../../assets/Home_assets/Menu.png')} />
							</TouchableOpacity>
							<View style={styles.appTitleView}>
								<Text style={styles.appTitleText}>
									Notice Frame
								</Text>
							</View>
							<View style={styles.appDiscriptionView}>
								<Text style={styles.appDiscriptionText} adjustsFontSizeToFit>
									Increasing productivity frame by frame 
								</Text>
							</View>     
						</Animated.View>      
					</Animated.View>
	            }

              { (get(this.props,'routeKey','') === 'SlideShow' || get(this.props,'routeKey','') === 'Support' || get(this.props,'routeKey','') === 'Share' || 
                get(this.props,'routeKey','') === 'EventDetail' || get(this.props,'routeKey','') === 'CreateEvent' || get(this.props,'routeKey','') === 'EditEvent' || 
                get(this.props,'routeKey','') === 'EventSetting' || get(this.props,'routeKey','') === 'CalendarSetting' || get(this.props,'routeKey','') === 'CreateGroup' || 
                get(this.props,'routeKey','') === 'SlideShowSetting') &&
			    <SafeAreaView style={styles.slideShowcontainer}>
					<Animated.View style={styles.mainContainer}>
						<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ position: 'absolute', left: 23 }}>
							<Image source={require('../../assets/Home_assets/Menu.png')} />
						</TouchableOpacity>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{ position: 'absolute', left: 60 }}>
							<Image source={require('../../assets/icons/Home_white.png')} style={styles.homeIconStyle}/>
						</TouchableOpacity>					  
						<View style={styles.appTitleView}>
							<Text style={styles.appTitleText}>
								{this.props.navTitle}
							</Text>
						</View>   
					</Animated.View>      
				</SafeAreaView>
	            }
				{(get(this.props,'routeKey','') === 'Setting' || get(this.props,'routeKey','') === 'FrameColorSetting' || get(this.props,'routeKey','') === 'ImportSetting' || get(this.props,'routeKey','') === 'ExportSetting' ) &&
			    <SafeAreaView style={styles.slideShowcontainer}>
					<Animated.View style={styles.mainContainer}>
						<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{ position: 'absolute', left: 25 }}>
							<Image source={require('../../assets/icons/Home_white.png')} style={styles.homeIconStyle}/>
						</TouchableOpacity>					  
						<View style={styles.appTitleView}>
							<Text style={styles.appTitleText}>
								{this.props.navTitle}
							</Text>
						</View>   
					</Animated.View>      
				</SafeAreaView>
	            }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      height: Platform.OS === 'android' ? 60 : 62,
		backgroundColor: '#3b5261',
	 },
	 slideShowcontainer: {
		height: Platform.OS === 'android' ? 45 : 55,
   },
    mainContainer: {
        flexDirection: 'row', 
        top: Platform.OS === 'android' ? 28 : 28 ,
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '100%', 
        paddingTop: Platform.OS === 'android' ? 12 : 18
    },
    checkBoxContainer:{
        marginTop:5,
        backgroundColor : 'green'
    },
    buttonStyle: {
        color: 'red',
        marginTop: 20,
        padding: 20,
        backgroundColor: 'green'
    },
    logoutBtnStyle: {
        // position: 'absolute', 
        // top: 20 , 
        // alignSelf: 'flex-end',
        // paddingRight: 15
    },
    logoutText: {
        fontSize: 20,
        fontWeight: '600'
    },
    appTitleView: {
        position: 'absolute',
        right: 20,  
    },
    appTitleText: {
        right: 0 ,
        color: '#fff',
        fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(20) : AppSizes.verticalScale(18),
        fontFamily: AppFonts.NBlack
    },
    appDiscriptionView: {
		top:  Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(16),
        position: 'absolute',
        right: 20,
    },
    appDiscriptionText: {
        right: 0,
        color: '#fff',
        fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
        fontFamily: AppFonts.NRegular
    },
    homeIconStyle: {
        height: Platform.OS === 'android' ? AppSizes.verticalScale(24) : AppSizes.verticalScale(20),
        width: 22,
    }
})
