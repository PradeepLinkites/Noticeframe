import React from 'react'
import { Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/Navbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  componentDidMount(){
    console.log('callll')
  }

  render() {
    const { getUserData } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Setting' ? 'KIKO KIDS' : ''
    return (
      <SafeAreaView style={AppStyles.container}>
        <Navbar 
          navigation={this.props.navigation} 
          navTitle={route} 
          style={{ height: this.state.height }}
          routeKey={'Setting'} 
        />
        <View style={styles.container}>
          <View style={styles.container2}>
             <View style={styles.settingListView}>
                <Text style={styles.settingText}>Frame Color Settings</Text>
                <Image  source={require('../../assets/sidemenuAssets/Arrow_up.png')} style={{ height: 15,width: 15 }}/>
             </View>
             <View style={styles.settingListView}>
                <Text style={styles.settingText}>Import Settings</Text>
                <Image  source={require('../../assets/sidemenuAssets/Arrow_up.png')} style={{ height: 15,width: 15 }}/>
             </View>
             <View style={styles.settingListView}>
                <Text style={styles.settingText}>Export Settings</Text>
                <Image  source={require('../../assets/sidemenuAssets/Arrow_up.png')} style={{ height: 15,width: 15 }}/>
             </View>
             <View style={styles.settingListView}>
                <Text style={styles.settingText}>Slideshow Settings</Text>
                <Image  source={require('../../assets/sidemenuAssets/Arrow_up.png')} style={{ height: 15,width: 15 }}/>
             </View>
             <View style={styles.settingListView}>
                <Text style={styles.settingText}>Calendra Settings</Text>
                <Image  source={require('../../assets/sidemenuAssets/Arrow_up.png')} style={{ height: 15,width: 15 }}/>
             </View>
             <View style={styles.settingListView}>
                <Text style={styles.settingText}>Events Settings</Text>
                <Image  source={require('../../assets/sidemenuAssets/Arrow_up.png')} style={{ height: 15,width: 15 }}/>
             </View>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 18,
  },
  container2: {
    flex: 1,  
  },
  settingListView :{
    height: Platform.OS === 'android' ? 70 : 110,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    paddingLeft: Platform.OS === 'android' ? 22 : 24	,
    paddingRight: Platform.OS === 'android' ? 22 : 24,
    paddingTop: Platform.OS === 'android' ? 34 : 30,
    paddingBottom: Platform.OS === 'android' ? 34 : 30,
    borderBottomWidth: .3,
    borderBottomColor: '#A2a2a2'
  },
  settingText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
	  fontFamily: AppFonts.NRegular,
  }
})