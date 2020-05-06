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
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from "react-native-modal";
import CheckBox from 'react-native-checkbox';
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import AwesomeButton from 'react-native-really-awesome-button'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import { ActivityIndicator } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid';
import { FloatingAction } from "react-native-floating-action";

import TopTabBar from '../Common/TopTabNavigator'
import CustomTabBar from '../Common/CustomTabBar'
// import TabView from '../Common/TabView'

//Tabs Screens
import DailyScreen from '../DailyScreen/Container'
import WeeklyScreen from '../WeeklyScreen/Container' 
import MonthlyScreen from '../MonthlyScreen/Container' 
import SlideShowScreen from '../SlideShowScreen/Container' 
import EventsScreen from '../EventsScreen/Container' 
import ListViewScreen from '../ListViewScreen/Container'  


const actions = [
  {
    text: "Accessibility",
    // icon: require("./images/ic_accessibility_white.png"),
    name: "bt_accessibility",
    position: 2
  },
  {
    text: "Language",
    // icon: require("./images/ic_language_white.png"),
    name: "bt_language",
    position: 1
  },
  {
    text: "Location",
    // icon: require("./images/ic_room_white.png"),
    name: "bt_room",
    position: 3
  },
  {
    text: "Video",
    // icon: require("./images/ic_videocam_white.png"),
    name: "bt_videocam",
    position: 4
  }
];

const items = [
  { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
  { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
  { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
];

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
      // console.log('call')
   }
   )}

render() {
  const { state } = this.props.navigation
  const route = get(state, 'routeName', '')  === 'Home' ? 'Home' : ''
  const { isLoading, allVideosData, filterCategoryData, isModalVisible, height, contentHeight, all } = this.state
  const scrollEnabled = contentHeight > (deviceHeight - 150)
  return (
    <SafeAreaView style={AppStyles.container}>
      <Navbar  
        onFilter={this.onFilter}
        navigation={this.props.navigation} 
        navTitle={route} 
        stylee={{ height: height }} 
        routeKey={'Home'}
      />
      <TopTabBar />
      {/* <CustomTabBar changeTab={this.changeTabHandler} tabIndex={this.state.tabIndex} routeName={this.state.routeName}/> */}
      {/* <TabView /> */}


      {/* <Text style={styles.text}>Recent Events</Text>
        <FlatGrid
          itemDimension={130}
          items={items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) => (
            <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemCode}>{item.code}</Text>
            </View>
          )}
        />
        <FloatingAction
          color={'#ff6600'}
          animated={false}
          actions={actions}
          onPressItem={name => {
            console.log(`selected button: ${name}`);
          }}
        /> */}
    </SafeAreaView>
  )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  text:{
    marginLeft:20,
    marginTop:8,
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
	  fontFamily: AppFonts.NBlack
  },
  gridView: {
    // backgroundColor:'red',
    // paddingHorizontal:5,
    marginTop: 12,
    flex: 1,
    marginLeft: 30,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 28,
    borderWidth: 8,
    borderColor: 'red',
    padding: 10,
    height: 150,
    width:150,
    marginBottom:10
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
})