import React from 'react'
import {ScrollView, Switch,Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { get, isEmpty } from 'lodash'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import { FlatGrid } from 'react-native-super-grid';
import SwitchComponent from '../Common/Switch'
import AsyncStorage from '@react-native-community/async-storage'
import moment from "moment"


const items = [[
  { name: 'Healty Sport', time: '07:30 AM to 08:30 AM', source: require('../../assets/images/image1.jpeg') }, 
  { name: 'Sport', time: '09:30 AM to 10:30 AM', source: require('../../assets/images/image2.jpeg') }],

  [{ name: 'Football', time: '10:30 AM to 11:30 AM', source: require('../../assets/images/image3.jpeg') }, 
  {name: 'Football', time: '10:30 AM to 11:30 AM',source: require('../../assets/images/image4.jpeg') },
  { name: 'Football', time: '10:30 AM to 11:30 AM',source: require('../../assets/images/image5.jpeg') }],
  
  [{ name: 'Football', time: '10:30 AM to 11:30 AM',source: require('../../assets/images/image7.jpeg') }, 
  { name: 'Football', time: '10:30 AM to 11:30 AM',source: require('../../assets/images/image8.jpeg') }]
]

const event_list = require('../../assets/icons/event_list.png')
const event_list_select = require('../../assets/icons/event_list_select.png')
const event_grid = require('../../assets/icons/event_grid.png')
const event_gridSelect = require('../../assets/icons/event_gridSelect.png')

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 'List',
      isGridView: false,
      switchValue: false,
      getEventData:[]
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getEvent(user1._id)
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.getEventData !== prevProps.getEventData) {
      if(this.props.getEventPhase) {
        this.props.resetEventPhase()
        this.setState({ getEventData: get(this.props, 'getEventData', []) })
      }
    }
  }

  toggleSwitch = (value) => {
    this.setState({ switchValue: value })
  }

  toggleButton(name){
    if(name === 'Grid'){
      this.setState({ key : 'List' })
    }
    if(name === 'List'){
      this.setState({ key : 'Grid' })
    }
    this.setState({ isGridView : !this.state.isGridView})
  }

  render() {
    const { getEventData, isGridView, key } = this.state
    return (
      <SafeAreaView style={AppStyles.container}>
        <ScrollView style={styles.container}>
          <View style={{ flexDirection:'row',justifyContent:'space-between',borderBottomWidth: .3, paddingVertical: 15}}> 
            <Text style={{ fontSize: 18, marginLeft: 10 }}>Events</Text>
            <View style={{justifyContent: 'flex-end',flexDirection: 'row'}}>
              <TouchableOpacity onPress={this.toggleButton.bind(this,key)} style={{ marginRight: 10 }}>
                <Image source={key === 'List' ? event_list_select: event_list} style={styles.imageStyle}/>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.toggleButton.bind(this,key)} style={{ marginRight: 10 }}>
                <Image source={key === 'Grid' ? event_gridSelect: event_grid} style={styles.imageStyle}/>
              </TouchableOpacity>
            </View>
          </View>
          {!isGridView ?
          <View style={{marginTop: 15}}>
            {getEventData.map((data, ind)=>{
              let date = moment(data.eventDate).format("DD MMM, YYYY")
              let start_time = moment(data.startTime).format("hh:mm")
              let end_time = moment(data.endTime).format("hh:mm")
              return(
                <TouchableOpacity 
                  onPress={()=> this.props.navigation.navigate('EventDetail',{id : data._id})} 
                  style={[styles.eventListView,{backgroundColor : data.defaultFillColor === 'White' ? '#ffffff' : data.defaultFillColor === 'Hawkes Blue' ? '#d5d6ea' : data.defaultFillColor === 'Milk Punch' ? '#f4e3c9' 
                      : data.defaultFillColor === 'Coral Candy' ? '#f5d5cb': data.defaultFillColor === 'Cruise' ? '#b5dce1': data.defaultFillColor === 'Swirl' ? '#d6cdc8': data.defaultFillColor === 'Tusk' ? '#d7e0b1': ''}]}>
                  <View style={{flex:1}}>
                    <Text style={styles.eventTitleText}>{data.eventName}</Text>
                    <Text style={styles.eventDateText}>{date}</Text>
                    <Text style={styles.eventDateText}>{start_time} to {end_time}</Text>
                  </View>
                  <View>
                  <View style={styles.slideShowView}>
                    <Text style={styles.slideShowText}>Show in SlideShow</Text>
                    <SwitchComponent onChange = {this.toggleSwitch.bind(this)} value = {data.showEventInSlideShow}/>
                  </View>
                  </View>
                    <TouchableOpacity style={styles.editView} onPress={()=>this.props.navigation.navigate('EditEvent')}>
                      <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
                    </TouchableOpacity>
                  <View style={styles.shareView}>
                    <Image source={require('../../assets/icons/Share.png')} style={styles.imageStyle}/>
                  </View>
                </TouchableOpacity>
                )
              })
            }
          </View>
          : 
          <View>
            {items.map( data => {
              return(
              <View style={styles.gridView}>
                <Text style={styles.dateText}>23 Feb 2020</Text>
                <FlatGrid
                  itemDimension={130}
                  items={data}
                  renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('EventDetail')}>
                    <Image source={item.source} style={[styles.itemContainer, { backgroundColor: item.code }]} key={index} />
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate('SlideShow')} style={styles.playButton}>
                      <Image source={require('../../assets/icons/Play.png')} style={{height: 36, width: 36 }}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.eventName}>
                      <Text style={styles.eventNameText}>{item.name}</Text>
                      <Text style={styles.eventTimeText}>{item.time}</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                  )}
                />
              </View>
              )
            })
            }
          </View>
          }
        </ScrollView>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateEvent')} style={styles.plusButtonStyle}>
            <Image source={require('../../assets/icons/Add.png')} style={{height: 52,width: 52}}/>
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  dateView: {
    backgroundColor: '#fff',
    paddingLeft: Platform.OS === 'android' ? 15 : 15 ,
    paddingTop: Platform.OS === 'android' ? 34 : 36	,
    paddingBottom: Platform.OS === 'android' ? 6 : 8 ,
  },
  dateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
    fontWeight: '500',
  },
  eventListView: {
    paddingLeft: Platform.OS === 'android' ? 15 : 15 ,
    paddingTop: Platform.OS === 'android' ? 8 : 12	,
    paddingBottom: Platform.OS === 'android' ? 8 : 12 ,
    marginBottom: 2,
    flexDirection: 'row',
  },
  eventTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    fontWeight:'500',
    letterSpacing: .3,
  },
  eventDateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(10) : AppSizes.verticalScale(8),
	  fontFamily: AppFonts.NRegular,
    marginTop: 4,
    letterSpacing: .2
  },
  slideShowText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    fontWeight: '500',
    marginTop: 4,
    letterSpacing: .2,
  },
  slideShowView: {
    flexDirection:'row',
    justifyContent:'space-between',
    alignSelf:'center',
    marginRight: 8,
  },
  editView: {
    marginTop:4,
    marginRight:8
  },
  imageStyle :{
    height: Platform.OS === 'android' ? AppSizes.verticalScale(28) : AppSizes.verticalScale(22),
    width: 30,
    // backgroundColor:'red'
  },
  shareView: {
    marginTop:4,
    marginRight:8
  },
  plusButtonStyle: {
    width:  Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50), 
    height: Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50),  
    borderRadius: Platform.OS === 'android' ?  25 : 25 ,                                             
    position: 'absolute',                                          
    bottom: Platform.OS === 'android' ? 22 : 32,                                                    
    right: Platform.OS === 'android' ? 26 : 15,  
    // backgroundColor:'red'
  },
  gridView: {
    paddingLeft: 25,
    borderBottomWidth: .3,
    borderBottomColor: '#A2a2a2'
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 22,
    borderWidth: 4,
    borderColor: 'red',
    padding: 10,
    height: Platform.OS === 'android' ? AppSizes.verticalScale(150) : AppSizes.verticalScale(130),
    width:  Platform.OS === 'android' ? AppSizes.verticalScale(150) : AppSizes.verticalScale(130),
    marginBottom: 2
  },
  playButton: {
    position:'absolute',
    top: Platform.OS === 'android' ? 4 : 6,
    right: Platform.OS === 'android' ? 15 : 10,
  },
  eventName:{
    position:'absolute',
    bottom : 10,
    left: 14,
  },
  eventNameText:{
    color:'#fff',
    fontSize: Platform.OS === 'android' ? 14 : 16,
    fontWeight:'800'
  },
  eventTimeText: {
    color:'#fff',
    fontSize: Platform.OS === 'android' ? 10 : 12,
    fontWeight:'500'
  },
})