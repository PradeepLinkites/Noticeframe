import React from 'react'
import { Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { get , isEmpty } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import moment from 'moment'
import {Calendar} from 'react-native-calendars'
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage'

const sampleEvents = [
  { 'date': '2020-06-23','startTime': '09:00:00', 'endTime': '09:20:00','duration': '00:20:00', 'note': 'Walk my dog' },
  { 'date': '2020-06-24','startTime': '14:00:00', 'endTime': '15:00:00','duration': '01:00:00', 'note': 'Doctor\'s appointment' },
  { 'date': '2020-06-25','startTime': '08:00:00', 'endTime': '08:30:00','duration': '00:30:00', 'note': 'Morning exercise' },
  { 'date': '2020-06-25','startTime': '14:00:00', 'endTime': '16:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
  { 'date': '2020-06-25','startTime': '19:00:00', 'endTime': '20:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
  { 'date': '2020-06-26','startTime': '09:30:00', 'endTime': '10:30:00','duration':  '01:00:00', 'note': 'Schedule 1' },
  { 'date': '2020-06-26','startTime': '11:00:00', 'endTime': '13:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
]

export default class Monthly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: '2020-05-29',
      // markedData: ['2020-05-21', '2020-05-22', '2020-05-26'],
      eventDetails: [],
      isModalVisible: false,
      currentDate: '',
      calendarHeader: '',
      calendarBody: '',
      calendarFont: '',
      isLoading: false
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
      }
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getEventCalenderPhase) {
      this.props.resetEventPhase()
      this.handleEvent(this.props.getEventCalenderData)
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
        calendarData.push({
          id: get(value, '_id', ''),
          date: moment(get(value, 'eventDate', '')).format('YYYY-MM-DD'),
          startTime: moment(get(value, 'startTime', '')).format('hh:mm:ss'),
          endTime: moment(get(value, 'endTime', '')).format('hh:mm:ss'),
          note: get(value, 'eventName', ''),
          hexColor: get(value, 'defaultFillColor', '')
        })
      })
    }
    this.setState({
      eventDetails: calendarData,
      isLoading: false
    })
  }

  onDayPress = (day, newDates) => {
    let eventDate = newDates.dateString
    this.state.eventDetails.map(item=> {
      if(item.date === eventDate){
        this.setState({ isModalVisible: !this.state.isModalVisible ,currentDate : eventDate })
      }
    })
    this.setState({ selectedDate: day.dateString })
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  onNavigate = (id) => {
    this.setState({isModalVisible: !this.state.isModalVisible})
    this.props.navigation.navigate('EventDetail',{id : id})
  }

  render() {
    let dates = {}
    this.state.eventDetails.forEach((val) => {
      dates[val.date] = { marked: true }  
    })
    return (
      <SafeAreaView style={AppStyles.container}>
        <ScrollView style={styles.container}>
          <Calendar
            monthFormat={'dd MMM yyyy'}
            style={styles.calendar}
            current={new Date()}
            onDayPress={this.onDayPress.bind(this, dates)}
            markedDates={dates}
            hideArrows={true}
            theme={{
              textSectionTitleColor: '#A2a2a2',
              todayTextColor: '#ff6600',
              dayTextColor: '#000',
              textDisabledColor: '#A2a2a2',
              dotColor: '#ff6600',
              monthTextColor: '#000',
              textDayFontWeight: '300',
              textMonthFontWeight: '300',
              fontSize:  Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(18), 
              textMonthFontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14), 
              textDayHeaderFontSize: 14,
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 6,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }
              }
            }}
          />

        <Modal isVisible={this.state.isModalVisible}>
          <View style={{ backgroundColor:'#fff', paddingTop: 10 }}>
              <Text style={{ alignSelf:'center',fontSize: 20, top: 3}}>List of Events</Text>
              {this.state.eventDetails.map((item,ind) => {
                if(item.date === this.state.currentDate){
                  return(
                  <View>
                    <TouchableOpacity style={styles.event} onPress={this.onNavigate.bind(this, get(item, 'id', ''))} key = {ind}>
                      <View style={styles.eventDuration}>
                        <View style={styles.durationContainer}>
                          <View style={styles.durationDot} />
                          <Text style={styles.durationText}>{item.startTime}</Text>
                        </View>
                        <View style={styles.durationContainer}>
                          <View style={styles.durationDot} />
                          <Text style={styles.durationText}>{item.endTime}</Text>
                        </View>
                        <View style={styles.durationDotConnector} />
                      </View>
                      <View>
                        <Text numberOfLines={3} style={{color: '#fff'}}>{item.note}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{height:2, backgroundColor:'#A2a2a2',width: '100%'}} /> 
                  </View>
                  )                 
                }
              })}
            <Button title="Cancel" onPress={this.toggleModal} color='#A2a2a2'/>
          </View>
        </Modal>

        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
    backgroundColor:'#fff',
  },
  event: {
    backgroundColor:'#ff6600',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: .5,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 6
},
eventDuration: {
    width: '30%',
    justifyContent: 'center'
},
durationContainer: {
    flexDirection: 'row',
    alignItems: 'center'
},
durationDot: {
    width: 4,
    height: 4,
    backgroundColor: 'grey',
    marginRight: 5,
    alignSelf: 'center',
    borderRadius: 4/2,
},
durationDotConnector: {
    height: 20,
    borderLeftColor: '#fff',
    borderLeftWidth: StyleSheet.hairlineWidth,
    position: 'absolute',
    left: 2
},
durationText: {
    color: '#fff',
    fontSize: 14
},
})