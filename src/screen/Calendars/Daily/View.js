import React from 'react'
import { BackHandler, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import { get , isEmpty, size } from 'lodash'
import EventCalendar from '../../../library/react-native-events-calendar'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
let { width } = Dimensions.get('window')

export default class Daily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '2020-03-23',
      allEvents: [],
      calendarHeader: '',
      calendarBody: '',
      calendarFont: '',
      isLoading: false,
      userId: '',
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.setState({ isLoading: true })
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getSetting(user1._id)
        this.props.getEventCalender(user1._id)
        this.setState({userId: user1._id})
      }
    })
  }

  componentWillUnmount() {
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
    if (this.props.getEventCalenderPhase) {
      this.props.resetEventPhase()
      this.handleEvent(get(this.props, 'getEventCalenderData',[]))
      this.setState({ isLoading: false })
    }
    if (this.props.getSettingPhase) {
      this.props.resetSettingPhase()
      this.setState({
        calendarHeader: get(prevProps, 'getSettingData.Calendar.calendarHeader', 'default_header'),
        calendarBody: get(prevProps, 'getSettingData.Calendar.calendarBody', 'default_body'),
        calendarFont: get(prevProps, 'getSettingData.Calendar.calendarFont', 'default_body'),
        isLoading: false
      })
    }
  }

  handleEvent(event) {
    const calendarData = []
    if (event) {
      event.forEach((value, i) => {
        if(get(value, 'startTime', '') !== null){
          var now  = moment(value.endTime).format("DD/MM/YYYY HH:mm:ss")
          var then = moment(value.startTime).format("DD/MM/YYYY HH:mm:ss")
          let duration = moment.utc(moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"))).format("HH:mm:ss")
          calendarData.push({
            start: moment(get(value, 'startTime', '')).format('YYYY-MM-DD HH:MM:ss'),
            end: moment(get(value, 'endTime', '')).format('YYYY-MM-DD HH:MM:ss'),
            title: get(value, 'eventName', ''),
            summary:get(value, 'note', ''),
            date: moment(get(value, 'eventDate', '')).format('YYYY-MM-DD'),
            start_time: moment(get(value, 'startTime', '')).format('hh:mm A'),
            end_time: moment(get(value, 'endTime', '')).format('hh:mm A'),
            hexColor: get(value, 'defaultFillColor', ''),
            id: get(value, '_id', '')
          })
        }
      })
    }
    this.setState({
      allEvents: calendarData,
      isLoading: false
    },()=>{
      this.forceUpdate()
    })
  }

  _eventTapped (id) {
    const { selectedDate, selectedTime } = this.state
    this.props.navigation.navigate('EventDetail',{id : id })
  }

  showTime(time, date){
    let from = 'calender'
    this.props.navigation.navigate('CreateEvent',{date, time, from })
  }

  render() {
    const { allEvents, isLoading } = this.state
    let bodyColor = get(this.state,'calendarBody','') === 'White' ? '#ffffff' : get(this.state,'calendarBody','') === 'Hawkes Blue' ? '#d5d6ea' : get(this.state,'calendarBody','') === 'Milk Punch' ? '#f4e3c9' 
    : get(this.state,'calendarBody','') === 'Coral Candy' ? '#f5d5cb': get(this.state,'calendarBody','') === 'Cruise' ? '#b5dce1': get(this.state,'calendarBody','') === 'Swirl' ? '#d6cdc8': get(this.state,'calendarBody','') === 'Tusk' ? '#d7e0b1': '#fff'

    let calendarHeader = get(this.state,'calendarHeader','') === 'White' ? '#ffffff' : get(this.state,'calendarHeader','') === 'Hawkes Blue' ? '#d5d6ea' : get(this.state,'calendarHeader','') === 'Milk Punch' ? '#f4e3c9' 
    : get(this.state,'calendarHeader','') === 'Coral Candy' ? '#f5d5cb': get(this.state,'calendarHeader','') === 'Cruise' ? '#b5dce1': get(this.state,'calendarHeader','') === 'Swirl' ? '#d6cdc8': get(this.state,'calendarHeader','') === 'Tusk' ? '#d7e0b1': '#fff'

    return (
      <SafeAreaView style={[AppStyles.container,{backgroundColor:'#fff'}]}>
        <ScrollView style={styles.container}>
          {allEvents.length > 0 && 
            <EventCalendar
              showTime={this.showTime.bind(this)}
              calendarHeader={calendarHeader}
              bodyColor={bodyColor}
              events={allEvents.length >0 ? allEvents: []}
              scrollToFirst
              width={width}
              initDate={moment().format('YYYY-MM-DD')}
              renderEvent={(event) => {
                return(
                  <TouchableOpacity 
                    style={{
                      flex: 1, 
                      width: width, 
                      backgroundColor: '#fff',
                      padding: 5
                    }} 
                    onPress={this._eventTapped.bind(this, event.id )}
                  >
                    <Text>{event.title}</Text>
                    <Text>{event.summary}</Text>
                    <Text>{event.start_time} - {event.end_time}</Text>
                  </TouchableOpacity>
                )
              }}
            /> 
          }
       </ScrollView>
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateEvent')} style={styles.plusButtonStyle}>
          <Image source={require('../../../assets/icons/Add.png')} style={{height: 52, width: 52}}/>
        </TouchableOpacity> */}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  plusButtonStyle: {
    width:  Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50), 
    height: Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50),  
    borderRadius: Platform.OS === 'android' ?  25 : 25 ,                                             
    position: 'absolute',                                          
    bottom: Platform.OS === 'android' ? 22 : 32,                                                    
    right: Platform.OS === 'android' ? 26 : 15,  
  }
})
