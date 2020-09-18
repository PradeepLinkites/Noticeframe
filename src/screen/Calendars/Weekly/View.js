import React from 'react'
import {BackHandler, Alert, StyleSheet, Text, View,  SafeAreaView,  Dimensions, TouchableOpacity } from 'react-native'
import { AppSizes, AppFonts, AppStyles} from '../../../theme'

// import styles from './styles'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import { _, get , isEmpty, size } from 'lodash'
import {Agenda} from 'react-native-calendars';
import sizes from '../../../theme/sizes';
import { withNavigationFocus } from 'react-navigation';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const testIDs = require('./testIDs')

class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2020-03-23',
      allEvents: {},
      calendarHeader: '',
      calendarBody: '',
      calendarFont: '',
      isLoading: false,
      userId: '',
      getEventCalenderData: []
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      AsyncStorage.getItem('@user')
      .then((user) => {
        const user1 = JSON.parse(user)
        if(!isEmpty(user1)){
          this.props.getSetting(user1._id)
          this.props.getEventCalender(user1._id)
          this.setState({userId: user1._id})
        }
      })
    })
  }

  componentWillUnmount(){
    this.focusListener.remove()
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    if (this.props.isFocused) {
      Alert.alert(
        'Exit App',
        // 'Exiting the application?',
        'Are you sure you want to exit the application?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'OK',
            onPress: () => BackHandler.exitApp()
          }
        ],
        {
          cancelable: false
        }
      );
      return true;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getSettingPhase) {
      this.props.resetSettingPhase()
      this.setState({
        calendarHeader: get(this.props, 'getSettingData.Calendar.calendarHeader', 'default_header'),
        calendarBody: get(this.props, 'getSettingData.Calendar.calendarBody', 'default_body'),
        calendarFont: get(this.props, 'getSettingData.Calendar.calendarFont', 'default_body'),
        isLoading: false
      })
    }
    if(prevProps.getEventCalenderData !== this.props.getEventCalenderData){
      if (this.props.getEventCalenderPhase) {
        let eventList = get(this.props, 'getEventCalenderData',[])
        this.handleEvent(eventList)
        this.props.resetEventPhase()
        // this.setState({ isLoading: false })
      }
    }
  }

  handleEvent(event) {
    const calendarData = []
    const eventData = []
    const group = _.groupBy(event, 'eventDateLocal')
    this.setState({allEvents: group, 
      // isLoading: false 
    })
  }

  onNavigate = (id) => {
    this.setState({isModalVisible: false})
    this.props.navigation.navigate('EventDetail',{id : id})
  }

  onDayPress = (day) => {
    const { allEvents } = this.state
    let eventDate = day.dateString
    let isDate = false
    for (const item in allEvents) {
      if(item === eventDate){
        isDate = true
      }
    }
    if(isDate === false){
      let from = 'calender'
      this.props.navigation.navigate('CreateEvent',{ date: eventDate, time: '', from })
    }
  }

  render() {
    const { allEvents, calendarHeader, calendarBody, isLoading } = this.state
    const { isFocused } = this.props

    let bodyColor = get(this.props, 'getSettingData.Calendar.calendarBody', 'default_body') === 'White' ? '#ffffff' : get(this.props, 'getSettingData.Calendar.calendarBody', 'default_body') === 'Hawkes Blue' ? '#d5d6ea' : get(this.props, 'getSettingData.Calendar.calendarBody', 'default_body') === 'Milk Punch' ? '#f4e3c9' 
    : get(this.props, 'getSettingData.Calendar.calendarBody', 'default_body') === 'Coral Candy' ? '#f5d5cb': get(this.props, 'getSettingData.Calendar.calendarBody', 'default_body') === 'Cruise' ? '#b5dce1': get(this.props, 'getSettingData.Calendar.calendarBody', 'default_body') === 'Swirl' ? '#d6cdc8': get(this.props, 'getSettingData.Calendar.calendarBody', 'default_body') === 'Tusk' ? '#d7e0b1': '#fff'
   
    let headerColor = get(this.props,'getSettingData.Calendar.calendarHeader', 'default_header') === 'White' ? '#ffffff' : get(this.props,'getSettingData.Calendar.calendarHeader', 'default_header') === 'Hawkes Blue' ? '#d5d6ea' : get(this.props,'getSettingData.Calendar.calendarHeader', 'default_header') === 'Milk Punch' ? '#f4e3c9' 
    : get(this.props,'getSettingData.Calendar.calendarHeader', 'default_header') === 'Coral Candy' ? '#f5d5cb': get(this.props,'getSettingData.Calendar.calendarHeader', 'default_header') === 'Cruise' ? '#b5dce1': get(this.props,'getSettingData.Calendar.calendarHeader', 'default_header') === 'Swirl' ? '#d6cdc8': get(this.props,'getSettingData.Calendar.calendarHeader', 'default_header') === 'Tusk' ? '#d7e0b1': '#fff'    
    
    return (
        isFocused && 
          <SafeAreaView style={[AppStyles.container,{backgroundColor:'#fff'}]}>
            {isLoading ?
             <ActivityIndicator color = {'#3b5261'} size = "small" style = {AppStyles.activityIndicator} />
              :
              <>
                <Agenda
                  style={{flex:1, height: 700}}
                  items={allEvents}
                  selected={new Date()}
                  renderItem={this.renderItem.bind(this)}
                  renderEmptyDate={this.renderEmptyDate.bind(this)}
                  hideExtraDays={true}
                  pastScrollRange={10}
                  futureScrollRange={10}
                  renderEmptyData = {this.renderEmptyData.bind(this)}
                  onDayPress={(day) => this.onDayPress(day)}
                  theme={{
                    calendarBackground: headerColor,
                    backgroundColor: bodyColor ,
                    agendaDayTextColor: '#3b5261',
                    textSectionTitleColor:'#000',
                    textDayHeaderFontSize: 16,
                    textDayHeaderFontWeight: '500',
                  }}
                  // onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
                  // rowHasChanged={this.rowHasChanged.bind(this)}
                  // loadItemsForMonth={this.loadItems.bind(this)}
                />
                {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateEvent')} style={styles.plusButtonStyle}>
                  <Image source={require('../../../assets/icons/Add.png')} style={{height: 52, width: 52}}/>
                </TouchableOpacity> */}
              </>
            }
          </SafeAreaView>
      )
    }
    
    loadItems(day) {
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = this.timeToString(time);
          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            const numItems = Math.floor(Math.random() * 3 + 1);
            for (let j = 0; j < numItems; j++) {
              this.state.items[strTime].push({
                name: 'Item for ' + strTime + ' #' + j,
                height: Math.max(50, Math.floor(Math.random() * 150))
              });
            }
          }
        }
        const newItems = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
          items: newItems
        });
      }, 1000);
    } 
  
    renderItem(item) {
      let bodyColor = get(this.state,'calendarBody','') === 'White' ? '#ffffff' : get(this.state,'calendarBody','') === 'Hawkes Blue' ? '#d5d6ea' : get(this.state,'calendarBody','') === 'Milk Punch' ? '#f4e3c9' 
      : get(this.state,'calendarBody','') === 'Coral Candy' ? '#f5d5cb': get(this.state,'calendarBody','') === 'Cruise' ? '#b5dce1': get(this.state,'calendarBody','') === 'Swirl' ? '#d6cdc8': get(this.state,'calendarBody','') === 'Tusk' ? '#d7e0b1': '#fff'  
      let startTime = moment(get(item, 'startTime', '')).format('hh:mm A')
      let endTime = moment(get(item, 'endTime', '')).format('hh:mm A')
      let eventDate = moment(get(item, 'eventDate', '')).format('DD-MM-YYYY')
      return (
        <TouchableOpacity
          testID={testIDs.agenda.ITEM}
          style={[styles.item, {height: item.height, backgroundColor: '#fff'}]} 
          onPress={this.onNavigate.bind(this, get(item, '_id', ''))}
        >
        <View style={{flex:1}}>
          <Text style={styles.eventTitleText}>{item.eventName}</Text>
          <Text style={styles.eventDateText}>{eventDate}</Text>
          <Text style={styles.eventDateText}>{startTime} to {endTime}</Text>
        </View>
        </TouchableOpacity>
      )
    }

    renderEmptyData() {
      return (
        <View style={styles.emptyDate}>
          <Text>There is no event on this date!</Text>
        </View>
      )
    }
  
    renderEmptyDate() {
      return (
        <View style={styles.emptyDate}>
          <Text>This is empty date!</Text>
        </View>
      );
    }
  
    rowHasChanged(r1, r2) {
      return r1.name !== r2.name;
    }
  
    timeToString(time) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }
  }

export default withNavigationFocus(Weekly)

const styles = StyleSheet.create({
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
    marginBottom: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,

  },
  emptyDate: {
    flex: 1, justifyContent:'center',alignItems:'center'
  },
  eventTitleText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(14),
    fontFamily: AppFonts.NRegular,
    fontWeight:'500',
    letterSpacing: .3,
    marginBottom: 5
  },
  eventDateText: {
    margin: 1.5,
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(12),
	  fontFamily: AppFonts.NRegular,
    letterSpacing: .2
  },
  plusButtonStyle: {
    width:  Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50), 
    height: Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50),  
    borderRadius: Platform.OS === 'android' ?  25 : 25 ,                                             
    position: 'absolute',                                          
    bottom: Platform.OS === 'android' ? 22 : 32,                                                    
    right: Platform.OS === 'android' ? 26 : 15,  
  }
});