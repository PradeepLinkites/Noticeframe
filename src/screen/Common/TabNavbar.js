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
                   <Animated.View style={styles.tabContainer}> 
                        <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ position: 'absolute', left: 23 }}>
                            <Image source={require('../../assets/Home_assets/Menu.png')} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')} style={{ position: 'absolute', left: 60 }}>
                            <Image source={require('../../assets/icons/Home_white.png')} style={styles.homeIconStyle}/>
                        </TouchableOpacity>					  
                        <View style={styles.appTitleView}>
                            <Text style={styles.appTitleText}>
                                {headerTitle}
                            </Text>
                        </View>     
                   </Animated.View> 
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
        paddingTop: 60,
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
        fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(20) : AppSizes.verticalScale(18),
        // fontFamily: AppFonts.NBlack,
        fontWeight:'900',
        letterSpacing: 1
    },
    homeIconStyle: {
        height: Platform.OS === 'android' ? AppSizes.verticalScale(24) : AppSizes.verticalScale(22),
        width: 26,
        // backgroundColor:'red'
    }
})
