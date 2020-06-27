import React from 'react'
import { ActivityIndicator, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { get , isEmpty, size } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
import WeeklyCalendar from 'react-native-weekly-calendar'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const sampleEvents2 = [
  {
    duration: "01:00:00",
    note: "morning walk",
    start: "2020-06-25 09:00:57",
    startTime: "09:00:57 AM",
  },
  { 
    date: "2020-06-26",
    duration: "03:00:00",
    endTime: "08:30:00 AM",
    note: "New Event",
    start: "2020-06-26 05:30:00",
    startTime: "05:30:00 AM"
  },
  {
    date: "2020-06-24",
    duration: "01:00:00",
    endTime: "06:30:05 AM",
    note: "Test",
    start: "2020-06-24 05:30:05",
    startTime: "05:30:05 AM"
  },
]

export default class Weekly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allEvents: [],
      calendarHeader: '',
      calendarBody: '',
      calendarFont: '',
      isLoading: false,
      userId: ''
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
            duration: duration,
            date: moment(get(value, 'eventDate', '')).format('YYYY-MM-DD'),
            startTime: moment(get(value, 'startTime', '')).format('hh:mm:ss A'),
            endTime: moment(get(value, 'endTime', '')).format('hh:mm:ss A'),
            note: get(value, 'eventName', ''),
            hexColor: get(value, 'defaultFillColor', ''),
            id: get(value, '_id', '')
          })
        }
      })
    }
    this.setState({
      allEvents: calendarData,
      isLoading: false
    })
  }

  render() {
    const { allEvents, isLoading } = this.state
    console.log('allEvents==>>', get(this.state, 'allEvents', []))
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Setting' ? '' : ''
    return (
      <SafeAreaView style={[AppStyles.container,{backgroundColor:'#fff'}]}>
        {isLoading ?
        <ActivityIndicator color = {'#3b5261'} size = "large" style = {AppStyles.activityIndicator} />
        :
        <ScrollView style={styles.container}>
          <WeeklyCalendar 
            events={get(this.state, 'allEvents', [])}
            selected={moment().format('YYYY-MM-DD')}
            themeColor='#ff6600'
            style={styles.weeklyCalendar}
            titleStyle={styles.title}
            dayLabelStyle={styles.dayLableStyle}
            monthDateText={{ fontSize: 10 }}
            startWeekday={7}
          />
        </ScrollView>
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',  
  },
  weeklyCalendar: {
    height: deviceHeight, width:'100%'
  },
  title: {
    color: '#000',
    fontSize:  Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(14), 
    fontWeight: '300',
    marginTop: 8
  },
  dayLableStyle: {
    color: '#A2a2a2',
    fontSize: 14, 
    marginTop: Platform.OS === 'android' ? 10 : 15
}
});