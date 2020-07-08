import React from 'react'
import {  Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WeeklyCalendar from 'react-native-weekly-calendar';
import styles from './styles'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import { get , isEmpty, size } from 'lodash'
import EventCalendar from 'react-native-events-calendar'
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
            start: moment(get(value, 'startTime', '')).format('YYYY-MM-DD hh:mm:ss'),
            end: moment(get(value, 'endTime', '')).format('YYYY-MM-DD hh:mm:ss'),
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
    this.props.navigation.navigate('EventDetail',{id : id})
  }

  render() {
    const { allEvents, isLoading } = this.state
    return (
      <SafeAreaView style={{flex:1}}>
        {allEvents.length > 0 && 
          <EventCalendar
            events={allEvents}
            scrollToFirst
            width={width}
            initDate={moment().format('YYYY-MM-DD')}
            renderEvent={(event) => {
              return(
                <ScrollView style={styles.container}>
                  <TouchableOpacity 
                    style={{flex: 1, width: width, padding: 10}} 
                    onPress={this._eventTapped.bind(this, event.id )}
                  >
                    {/* <Text>{event.title}</Text> */}
                    <Text>{event.summary}</Text>
                    <Text style={{marginTop:5}}>{event.start_time} - {event.end_time}</Text>
                  </TouchableOpacity>
                </ScrollView>
              )
            }}
          />
        }      
      </SafeAreaView>
    )
  }
}
