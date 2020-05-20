import React from 'react'
import {ScrollView, Switch,Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { get } from 'lodash'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import { FlatGrid } from 'react-native-super-grid';

const items = [[
  { name: 'Healty Sport', time: '07:30 AM to 08:30 AM', source: require('../../assets/images/image1.jpeg') }, 
  { name: 'Sport', time: '09:30 AM to 10:30 AM', source: require('../../assets/images/image2.jpeg') }],

  [{ name: 'Football', time: '10:30 AM to 11:30 AM', source: require('../../assets/images/image3.jpeg') }, 
  {name: 'Football', time: '10:30 AM to 11:30 AM',source: require('../../assets/images/image4.jpeg') },
  { name: 'Football', time: '10:30 AM to 11:30 AM',source: require('../../assets/images/image5.jpeg') }],
  
  [{ name: 'Football', time: '10:30 AM to 11:30 AM',source: require('../../assets/images/image7.jpeg') }, 
  { name: 'Football', time: '10:30 AM to 11:30 AM',source: require('../../assets/images/image8.jpeg') }]
]

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      key: 'Grid',
      isGridView: false,
      switch1Value: false,
      switch2Value: false,
      switch3Value: false,
      switch4Value: false,
    }
  }

  toggleSwitch = (value, name) => {
   if(name === 'switch1'){
      this.setState({switch1Value: value})
    }
    if(name === 'switch2'){
      this.setState({switch2Value: value})
    }
    if(name === 'switch3'){
      this.setState({switch3Value: value})
    }
    if(name === 'switch4'){
      this.setState({switch4Value: value})
    }
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
    const { isGridView, key } = this.state
    return (
      <SafeAreaView style={AppStyles.container}>
        <ScrollView style={styles.container}>
          <View style={{flexDirection:'row',justifyContent:'space-between'}}> 
            <Text></Text>
            <TouchableOpacity onPress={this.toggleButton.bind(this,key)} style={{marginRight: 10,marginTop: 10}}>
              <Text style={{fontSize:16}}>{key} View</Text>
            </TouchableOpacity>
          </View>
          {!isGridView ?
          <View>
          <View style={styles.dateView1}>
            <Text style={styles.dateText}>23 Feb 2020</Text>
          </View>
          <View style={[styles.eventListView,{backgroundColor:'#e2e9f6'}]}>
            <View style={{flex:1}}>
              <Text style={styles.eventTitleText}>Board Meeting</Text>
              <Text style={styles.eventDateText}>23 FEB, 2020</Text>
              <Text style={styles.eventDateText}>09:30 AM to 12:30 PM</Text>
            </View>
            <View>
            <View style={styles.slideShowView}>
              <Text style={styles.slideShowText}>Show in SlideShow</Text>
              <Switch
                // onValueChange = {() => this.toggleSwitch(item, index)}
                onValueChange = {(value) => this.toggleSwitch(value ,'switch1')}
                value = {this.state.switch1Value}
                disabled={false}
                thumbColor={this.state.switch1Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
                trackColor={{ true: '#939393', false : Platform.OS == 'android' ? '#A2a2a2': 'gray' }}
                style={
                  Platform.OS === 'android'
                    ? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
                    : { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
                }
                ios_backgroundColor={'#EBECF0'}
              />
            </View>
            </View>
            <TouchableOpacity style={styles.editView} onPress={()=>this.props.navigation.navigate('EditEvent')}>
                <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
              </TouchableOpacity>
            <View style={styles.shareView}>
              <Image source={require('../../assets/icons/Share.png')} style={styles.imageStyle}/>
            </View>
          </View>
          <View style={[styles.eventListView,{backgroundColor:'#d3eaed'}]}>
            <View style={{flex:1}}>
              <Text style={styles.eventTitleText}>Study Time</Text>
              <Text style={styles.eventDateText}>23 FEB, 2020</Text>
              <Text style={styles.eventDateText}>09:30 AM to 12:30 PM</Text>
            </View>
            <View>
            <View style={styles.slideShowView}>
              <Text style={styles.slideShowText}>Show in SlideShow</Text>
              <Switch
                // onValueChange = {() => this.toggleSwitch(item, index)}
                onValueChange = {(value) => this.toggleSwitch(value ,'switch2')}
                value = {this.state.switch2Value}
                disabled={false}
                thumbColor={this.state.switch2Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
                trackColor={{ true: '#939393', false : Platform.OS == 'android' ? '#A2a2a2': 'gray' }}
                style={
                  Platform.OS === 'android'
                    ? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
                    : { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
                }
                ios_backgroundColor={'#EBECF0'}
              />
            </View>
            </View>
            <TouchableOpacity style={styles.editView} onPress={()=>this.props.navigation.navigate('EditEvent')}>
              <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
            </TouchableOpacity>
            <View style={styles.shareView}>
              <Image source={require('../../assets/icons/Share.png')} style={styles.imageStyle}/>
            </View>
          </View>
          <View style={styles.dateView}>
            <Text style={styles.dateText}>24 Feb 2020</Text>
          </View>
          <View style={[styles.eventListView,{backgroundColor:'#e6e1de'}]}>
            <View style={{flex:1}}>
              <Text style={styles.eventTitleText}>Football Practice</Text>
              <Text style={styles.eventDateText}>24 FEB, 2020</Text>
              <Text style={styles.eventDateText}>09:30 AM to 12:30 PM</Text>
            </View>
            <View>
            <View style={styles.slideShowView}>
              <Text style={styles.slideShowText}>Show in SlideShow</Text>
              <Switch
                // onValueChange = {() => this.toggleSwitch(item, index)}
                onValueChange = {(value) => this.toggleSwitch(value ,'switch3')}
                value = {this.state.switch3Value}
                disabled={false}
                thumbColor={this.state.switch3Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
                trackColor={{ true: '#939393', false : Platform.OS == 'android' ? '#A2a2a2': 'gray' }}
                style={
                  Platform.OS === 'android'
                    ? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
                    : { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
                }
                ios_backgroundColor={'#EBECF0'}
              />
            </View>
            </View>
            <TouchableOpacity  style={styles.editView} onPress={()=>this.props.navigation.navigate('EditEvent')}>
              <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
            </TouchableOpacity>
            <View style={styles.shareView}>
              <Image source={require('../../assets/icons/Share.png')} style={styles.imageStyle}/>
            </View>
          </View>
          <View style={[styles.eventListView,{backgroundColor:'#f8eedf'}]}>
            <View style={{flex:1}}>
              <Text style={styles.eventTitleText}>Study Time</Text>
              <Text style={styles.eventDateText}>24 FEB, 2020</Text>
              <Text style={styles.eventDateText}>09:30 AM to 12:30 PM</Text>
            </View>
            <View>
            <View style={styles.slideShowView}>
              <Text style={styles.slideShowText}>Show in SlideShow</Text>
              <Switch
                // onValueChange = {() => this.toggleSwitch(item, index)}
                onValueChange = {(value) => this.toggleSwitch(value ,'switch4')}
                value = {this.state.switch4Value}
                disabled={false}
                thumbColor={this.state.switch4Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
                trackColor={{ true: '#939393', false : Platform.OS == 'android' ? '#A2a2a2': 'gray' }}
                trackWidth={10}
                style={
                  Platform.OS === 'android'
                    ? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
                    : { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
                }
                ios_backgroundColor={'#EBECF0'}
              />
            </View>
            </View>
              <TouchableOpacity style={styles.editView} onPress={()=>this.props.navigation.navigate('EditEvent')}>
                <Image source={require('../../assets/icons/Edit.png')} style={styles.imageStyle}/>
              </TouchableOpacity>
            <View style={styles.shareView}>
              <Image source={require('../../assets/icons/Share.png')} style={styles.imageStyle}/>
            </View>
          </View>
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
            <Image source={require('../../assets/icons/Add.png')} style={{height: 56,width: 56}}/>
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
  dateView1: {
    backgroundColor: '#fff',
    paddingLeft: Platform.OS === 'android' ? 20 : 20 ,
    paddingTop: Platform.OS === 'android' ? 25 : 25	,
    paddingBottom: Platform.OS === 'android' ? 4 : 6 ,
  },
  dateView: {
    backgroundColor: '#fff',
    paddingLeft: Platform.OS === 'android' ? 20 : 20 ,
    paddingTop: Platform.OS === 'android' ? 52 : 54	,
    paddingBottom: Platform.OS === 'android' ? 6 : 8 ,
  },
  dateText: {
    fontSize: 20,
    fontWeight: '400',
  },
  eventListView: {
    paddingLeft: Platform.OS === 'android' ? 20 : 20 ,
    paddingTop: Platform.OS === 'android' ? 14 : 18	,
    paddingBottom: Platform.OS === 'android' ? 14 : 18 ,
    marginBottom: 1,
    flexDirection: 'row'
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
    height: Platform.OS === 'android' ? AppSizes.verticalScale(35) : AppSizes.verticalScale(26),
    width: 32,
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
    bottom: Platform.OS === 'android' ? 26 : 26,                                                    
    right: Platform.OS === 'android' ? 26 : 26,  
  },
  gridView: {
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
    right: Platform.OS === 'android' ? 35 : 14,
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
  plusButtonStyle: {
    width:  Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50), 
    height: Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50),  
    borderRadius: Platform.OS === 'android' ?  25 : 25 ,                                             
    position: 'absolute',                                          
    bottom: Platform.OS === 'android' ? 26 : 26,                                                    
    right: Platform.OS === 'android' ? 26 : 26,  
  }
})