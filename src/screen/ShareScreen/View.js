import React from 'react'
import { Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'

const socialArray = [
	{
	  title: 'Youtube Channel',
	  icon: require('../../assets/Social/youtube.png')
	},
	{
	  title: 'Facebook',
	  icon: require('../../assets/Social/facebook.png')
	},
	{
	  title: 'Instagram',
	  icon: require('../../assets/Social/instagram.png')
	},
	{
	  title: 'Twitter',
	  icon: require('../../assets/Social/twitter.png')
	},
	{
	  title: 'Whatsapp',
	  icon: require('../../assets/Social/whatsapp.png')
	},
	{
		title: 'Email',
	  icon: require('../../assets/Social/Mail.png')
	},
	{
		title: 'Other',
	  icon: require('../../assets/Social/Other.png')
	},
	{
		title: 'Newslatter',
	  icon: require('../../assets/Social/Newsletter.png')
	}
  ]

export default class Share extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { getUserData } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Share' ? 'Share' : ''
    return (
      <SafeAreaView style={AppStyles.container}>
        <ScrollView style={styles.container}>
        <Navbar 
          navigation={this.props.navigation} 
          navTitle={route} 
          style={{ height: this.state.height }}
          routeKey={'Share'} 
        />
          <Text style={styles.text}>Join us on</Text>
          {socialArray.map((item, ind)=>{
            return(
              <View style={styles.socialContainer} key={ind}>
                <TouchableOpacity
                  style={{flexDirection:'row'}}
                  onPress={() => alert('call')}
                >
                  <Image source={item.icon} style={{height: 25, width: 25 }}/>
                  <Text style={styles.socialText}>{item.title}</Text>
                </TouchableOpacity>
              </View>  
            )})
          }
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  text: {
    marginLeft : 20, 
    marginTop: 30,
    letterSpacing: .2,
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    color: '#A2a2a2',
    marginBottom: Platform.OS === 'android' ? 20 : 18
  },
  socialContainer: {
    paddingVertical: Platform.OS === 'android' ? 12 : 14	,
    justifyContent: 'center',
    paddingLeft: Platform.OS === 'android' ? 35 : 40	,
    marginBottom: 2
  },
  socialText: {
    marginLeft: 15,
	  color: '#A2a2a2',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    fontWeight:'600',
    letterSpacing: .2

  }
})