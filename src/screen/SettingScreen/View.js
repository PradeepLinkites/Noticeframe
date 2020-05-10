import React from 'react'
import { Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'

const settingArray = [
	{ route:'Color',
	  title: 'Frame Color Settings',
	  icon: require('../../assets/icons/Arrow.png')
	},
	{ route:'Import',
	  title: 'Import Settings',
	  icon: require('../../assets/icons/Arrow.png')
	},
	{ route:'Export',
	  title: 'Export Settings',
	  icon: require('../../assets/icons/Arrow.png')
	},
	{ route:'SlideShow',
	  title: 'Slideshow Settings',
	  icon: require('../../assets/icons/Arrow.png')
	},
	{ route:'CalendarSetting',
	  title: 'Calender Settings',
	  icon: require('../../assets/icons/Arrow.png')
  },
  { route:'EventSetting',
	  title: 'Events Settings',
	  icon: require('../../assets/icons/Arrow.png')
	},
  ]

export default class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Setting' ? 'SETTINGS' : ''
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
            {settingArray.map((item, ind)=>{
              return(              
                <TouchableOpacity onPress={()=>this.props.navigation.navigate(item.route)} style={styles.settingListView} key={ind}>
                  <Text style={styles.settingText}>{item.title}</Text>
                  <Image  source={item.icon} style={styles.arrowIconStyle}/>
                </TouchableOpacity>
              )})
            }  
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
    // backgroundColor:'red'
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
    letterSpacing: .8
  },
  arrowIconStyle: {
    height: 14,
    width: 6 
  }
})