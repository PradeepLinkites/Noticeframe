import * as React from 'react'
import {
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
import { AppColors, AppSizes } from '../../theme'

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
        const from = get(this.props,'type','') === 'detail' ? true : false
	    const sty = get(this.props,'stylee','') ? this.props.stylee : {}
        return ( from ?
            <View style={[styles.container]}>
                <View style={{flexDirection: 'row', height: 60, width: '100%', paddingHorizontal: 15, position: 'absolute', top: 0, justifyContent: 'space-between',  }}>
                    <AwesomeButton
                        // type="primary"
                        borderRadius={300}
                        visible={false}
                        // backgroundColor={AppColors.app.button}
                        backgroundColor={'red'}
                        backgroundDarker={AppColors.app.buttonShadow}
                        width={Platform.OS === 'ios' ? 0: AppSizes.verticalScale(38)}
                        height={Platform.OS === 'ios' ? 0: AppSizes.verticalScale(38)}
                        onPress={this.back.bind(this)}
                    >
                        <Image source={require('../../assets/auth/back.png')} style={{width: AppSizes.verticalScale(38), height: AppSizes.verticalScale(38), resizeMode: 'cover' }} />
                    </AwesomeButton>
                    { get(this.props,'navTitle','') === 'SIGN UP' && (get(this.props,'stepPosition','') === 1 || get(this.props,'stepPosition','') === 2) &&
                        <TouchableOpacity onPress={() => this.props.onLogout()} style={styles.logoutBtnStyle}>
                            <Text style={styles.logoutText}>Logout</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            :
            <Animated.View style={[styles.container, sty ]}>
                <Animated.View style={{ flexDirection: 'row', position: 'absolute', top: 0, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} style={{ position: 'absolute', left: 10 }}>
                        <Image source={require('../../assets/drawer/drawer.png')} style={{ height: 80, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <Animated.Image source={require('../../assets/welcome/logo.png')} style={{ height: 60, width: 160, resizeMode: 'contain' }} />                   
                    {this.props.routeKey === 'Home' &&
                        <TouchableOpacity onPress={() => this.props.onFilter()} style={{ position: 'absolute', right: 5, width: 70, justifyContent:'center',alignItems:'center'}}>
                            <Image source={require('../../assets/sidemenu/filter.png')} style={{ height: 28, resizeMode: 'contain'}} />
                        </TouchableOpacity>
                    }         
                </Animated.View>      
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'transparent'
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
        fontSize:  20,
        fontWeight: '600'
    }
})
