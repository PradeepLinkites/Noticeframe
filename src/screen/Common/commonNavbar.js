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
        console.log('routeKey==>>', this.props.navigation)
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
							{/* <Animated.Image source={require('../../assets/welcome/logo.png')} style={{ height: 60, width: 160, resizeMode: 'contain' }} />                    */}
							{/* {this.props.routeKey === 'Home' &&
									<TouchableOpacity onPress={() => this.props.onFilter()} style={{ position: 'absolute', right: 5, width: 70, justifyContent:'center',alignItems:'center'}}>
										<Image source={require('../../assets/sidemenu/filter.png')} style={{ height: 28, resizeMode: 'contain'}} />
									</TouchableOpacity>
							}          */}						  
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

              {this.props.routeKey === 'Setting' &&
					<Animated.View style={styles.container}>
						<Animated.View style={{ flexDirection: 'row', top: 30, alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop: 10 }}>
							<TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ position: 'absolute', left: 23 }}>
									<Image source={require('../../assets/Home_assets/Menu.png')} />
							</TouchableOpacity>
							<TouchableOpacity style={{ position: 'absolute', left: 60 }}>
									<Image source={require('../../assets/sidemenuAssets/Home.png')} />
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
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'android' ? 68 : 114,
		  backgroundColor: '#3b5261',
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
        fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(16),
        fontFamily: AppFonts.NBlack
    },
    appDiscriptionView: {
		  top: 14,
        position: 'absolute',
        right: 20,  
    },
    appDiscriptionText: {
        right: 0,
        color: '#fff',
        fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
        fontFamily: AppFonts.NRegular
    }
})
