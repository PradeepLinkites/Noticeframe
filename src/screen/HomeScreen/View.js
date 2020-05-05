import React from 'react'
import { 
  Alert,
  FlatList,
  StyleSheet, 
  Text, 
  View, 
  Button, 
  SafeAreaView, 
  Dimensions, 
  Animated, 
  Easing, 
  TouchableOpacity, 
} from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get, find, isEmpty, size } from 'lodash'
import MasonryList from "../../lib/masonrylist"
import Lightbox from '../../lib/lightbox'
import data from '../../data'
import { ViewPager } from 'react-native-viewpager-carousel'
import { AppStyles } from '../../theme'
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from "react-native-modal";
import CheckBox from 'react-native-checkbox';
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import AwesomeButton from 'react-native-really-awesome-button'
import { AppColors, AppSizes } from '../../theme'
import { ActivityIndicator } from 'react-native-paper'
// import TopTabBar from '../Common/TopTabNavigator'
import CustomTabBar from '../Common/CustomTabBar'
// import TabView from '../Common/TabView'

//Tabs Screens
import DailyScreen from '../DailyScreen/Container'
import WeeklyScreen from '../WeeklyScreen/Container' 
import MonthlyScreen from '../MonthlyScreen/Container' 
import SlideShowScreen from '../SlideShowScreen/Container' 
import EventsScreen from '../EventsScreen/Container' 
import ListViewScreen from '../ListViewScreen/Container'  


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideNavbar: true,
      tabIndex: 0,
      routeName: ''
    }
  }

changeTabHandler =(index, route )=>{
   console.log( index, '===', route)
   this.setState({ tabIndex: index, routeName: route },()=>{
      console.log('call')
   }
   )}

render() {
  const { state } = this.props.navigation
  const route = get(state, 'routeName', '')  === 'Home' ? 'Home' : ''
  const { isLoading, allVideosData, filterCategoryData, isModalVisible, height, contentHeight, all } = this.state
  const scrollEnabled = contentHeight > (deviceHeight - 150)
  return (
    <View style={styles.container}>
      <Navbar  
        onFilter={this.onFilter}
        navigation={this.props.navigation} 
        navTitle={route} 
        stylee={{ height: height }} 
        routeKey={'Home'}
      />
      {/* <TopTabBar /> */}
      <CustomTabBar changeTab={this.changeTabHandler} tabIndex={this.state.tabIndex} routeName={this.state.routeName}/>
      {/* <TabView /> */}

      {this.state.routeName === 'Daily'
        && <DailyScreen />
      }
    </View>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})