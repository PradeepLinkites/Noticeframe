import React from 'react'
import { Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'

const supportArray = [
	{
	  title: 'Contact Us',
	  icon: require('../../assets/icons/Arrow.png')
	},
	{
	  title: 'Software Version',
	  icon: require('../../assets/icons/Arrow.png')
	},
	{
	  title: 'Check for Updates',
	  icon: require('../../assets/icons/Arrow.png')
	},
	{
	  title: 'Account',
	  icon: require('../../assets/icons/Arrow.png')
	},
	{
	  title: 'Privacy & terms',
	  icon: require('../../assets/icons/Arrow.png')
	},
  ]

export default class Support extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  // componentDidMount(){
  //   console.log('callll')
  // }

  render() {
    const { getUserData } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Support' ? 'Support' : ''
    return (
      <SafeAreaView style={AppStyles.container}>
        <ScrollView style={styles.container}>
        <Navbar 
          navigation={this.props.navigation} 
          navTitle={route} 
          style={{ height: this.state.height }}
          routeKey={'Support'} 
        />
        <View style={styles.container}>
          <View style={styles.mainView}>
            <TouchableOpacity
              style={AppStyles.button}
              onPress={()=>alert('call')}
            >
              <Text style={AppStyles.buttonText}>USER MANUAL</Text>
            </TouchableOpacity>
            {supportArray.map((item, ind)=>{
              return(
                <View style={styles.settingListView} key={ind}>
                  <Text style={styles.settingText}>{item.title}</Text>
                  <Image  source={item.icon} style={{ height: 14,width: 6 }}/>
                </View>
              )})
            } 
          </View>
        </View>
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
  mainView: {
    flex: 1,  
    paddingLeft: 18,
    paddingRight: 18,
  },
  settingListView :{
    marginTop: 2,
    // height: Platform.OS === 'android' ? 70 : 110,
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