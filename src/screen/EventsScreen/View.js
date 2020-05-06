import React from 'react'
import { Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/Navbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'
import { FlatGrid } from 'react-native-super-grid';
import { FloatingAction } from "react-native-floating-action";

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

const items = [[
  { name: 'TURQUOISE', code: '#1abc9c' }, 
  { name: 'EMERALD', code: '#2ecc71' }],

  [{ name: 'PETER RIVER', code: '#3498db' }, 
  { name: 'AMETHYST', code: '#9b59b6' },
  { name: 'WET ASPHALT', code: '#34495e' },
  { name: 'GREEN SEA', code: '#16a085' }],
  
  [{ name: 'PETER RIVER', code: '#3498db' }, 
  { name: 'AMETHYST', code: '#9b59b6' }]
]

export default class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { getUserData } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Events' ? 'KIKO KIDS' : ''
    return (
      <SafeAreaView style={styles.container}>       
        <ScrollView style={AppStyles.container}>
          {items.map( data => {
            return(
            <View style={styles.gridView}>
              <Text style={styles.dateText}>23 Feb 2020</Text>
              <FlatGrid
                itemDimension={130}
                items={data}
                renderItem={({ item, index }) => (
                  <View style={[styles.itemContainer, { backgroundColor: item.code }]} key={index}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemCode}>{item.code}</Text>
                  </View>
                )}
              />
            </View>
            )
           })
           }
          </ScrollView>
            <FloatingAction
              color={'#ff6600'}
              animated={false}
              actions={actions}
              onPressItem={name => {
                console.log(`selected button: ${name}`);
              }}
            />
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  gridView: {
    // marginTop: 10,
    // marginLeft: 25,
    // backgroundColor:'red',
    paddingLeft: 25,
    borderBottomWidth: .3,
    borderBottomColor: '#A2a2a2'
  },
  dateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(16),
    fontWeight: '500',
    marginTop: 15
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 22,
    borderWidth: 8,
    borderColor: 'red',
    padding: 10,
    height: Platform.OS === 'android' ? AppSizes.verticalScale(125) : AppSizes.verticalScale(110),
    width:Platform.OS === 'android' ? AppSizes.verticalScale(125) : AppSizes.verticalScale(110),
    marginBottom: 2
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