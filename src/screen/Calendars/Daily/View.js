import React from 'react'
import { StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WeeklyCalendar from 'react-native-weekly-calendar';
// import styles from './styles'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import { get , isEmpty, size } from 'lodash'
import EventCalendar from '../../../library/react-native-events-calendar'
import { useIsFocused } from '@react-navigation/native';
import { Calendar } from 'react-native-big-calendar'

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
    let route = 'calender'
    this.props.navigation.navigate('CreateEvent',{date, time, route})
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
       <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateEvent')} style={styles.plusButtonStyle}>
          <Image source={require('../../../assets/icons/Add.png')} style={{height: 52, width: 52}}/>
        </TouchableOpacity>
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



// import React from 'react'
// import {  Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
// import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
// import WeeklyCalendar from 'react-native-weekly-calendar';
// import styles from './styles'
// import moment from 'moment'
// import AsyncStorage from '@react-native-community/async-storage'
// import { get , isEmpty, size } from 'lodash'

// const deviceWidth = Dimensions.get('window').width
// const deviceHeight = Dimensions.get('window').height

// const sampleEvents = [
//   { 'start': '2020-03-23 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
//   { 'start': '2020-03-24 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
//   { 'start': '2020-03-25 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
//   { 'start': '2020-03-25 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
//   { 'start': '2020-03-25 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
//   { 'start': '2020-03-26 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
//   { 'start': '2020-03-26 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
//   { 'start': '2020-03-26 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
//   { 'start': '2020-03-26 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
//   { 'start': '2020-03-26 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
// ]

// export default class Daily extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       date: new Date(),
//       allEvents: [],
//       calendarHeader: '',
//       calendarBody: '',
//       calendarFont: '',
//       isLoading: false,
//       userId: '',
//     }
//   }

//   componentDidMount() {
//     this.setState({ isLoading: true })
//     AsyncStorage.getItem('@user')
//     .then((user) => {
//       const user1 = JSON.parse(user)
//       if(!isEmpty(user1)){
//         this.props.getSetting(user1._id)
//         this.props.getEventCalender(user1._id)
//         this.setState({userId: user1._id})
//       }
//     })
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.getEventCalenderPhase) {
//       this.props.resetEventPhase()
//       this.handleEvent(get(this.props, 'getEventCalenderData',[]))
//       this.setState({ isLoading: false })
//     }
//     if (this.props.getSettingPhase) {
//       this.props.resetSettingPhase()
//       this.setState({
//         calendarHeader: get(prevProps, 'getSettingData.Calendar.calendarHeader', 'default_header'),
//         calendarBody: get(prevProps, 'getSettingData.Calendar.calendarBody', 'default_body'),
//         calendarFont: get(prevProps, 'getSettingData.Calendar.calendarFont', 'default_body'),
//         isLoading: false
//       })
//     }
//   }

//   handleEvent(event) {
//     const calendarData = []
//     if (event) {
//       event.forEach((value, i) => {
//         if(get(value, 'startTime', '') !== null){
//           var now  = moment(value.endTime).format("DD/MM/YYYY HH:mm:ss")
//           var then = moment(value.startTime).format("DD/MM/YYYY HH:mm:ss")
//           let duration = moment.utc(moment(now,"DD/MM/YYYY HH:MM:ss").diff(moment(then,"DD/MM/YYYY HH:MM:ss"))).format("HH:MM:ss")
//           calendarData.push({
//             start: moment(get(value, 'startTime', '')).format('YYYY-MM-DD HH:MM:ss'),
//             end: moment(get(value, 'endTime', '')).format('YYYY-MM-DD HH:MM:ss'),
//             duration: duration,
//             title: get(value, 'eventName', ''),
//             summary:get(value, 'note', ''),
//             hexColor: get(value, 'defaultFillColor', ''),
//             id: get(value, '_id', '')
//           })
//         }
//       })
//     console.log('calendarData==>>', calendarData)
//     }
//     this.setState({
//       allEvents: calendarData,
//       isLoading: false
//     },()=>{
//       this.forceUpdate()
//     })
//   }

//   showEvent =(day)=>{
//     this.setState({ date: day.format('yyyy-MM-DD') })
//   }

//   render() {
//     const { allEvents } = this.state
//     return (
//       <SafeAreaView style={AppStyles.container}>
//         <ScrollView style={styles.container}>
//           {allEvents.length > 0 && 
//           <WeeklyCalendar
//             events={allEvents} 
//             selected= {new Date()}
//             startWeekday={7}
//             weekdayFormat='ddd'
//             themeColor='#ff6600'
//             titleStyle={styles.title}
//             dayLabelStyle={styles.dayLableStyle}
//             titleFormat='DD MMM YYYY'
//             locale='en'
//             renderEvent={(event, j, i) => {
//               // console.log('event', event)
//               // console.log('date', event.start.split(" ")[0])
//               let newDate = event.start.split(" ")[0]
//               let startTime = moment(event.start).format('LT').toString()
//               let duration = event.duration.split(':')
//               let seconds = parseInt(duration[0]) * 3600 + parseInt(duration[1]) * 60 + parseInt(duration[2])
//               let endTime = moment(event.start).add(seconds, 'seconds').format('LT').toString()
//                 return (
//                   <View key={j}>
//                     <View style={styles.event}>
//                       <View style={styles.eventDuration}>
//                         <View style={styles.durationContainer}>
//                           <View style={styles.durationDot} />
//                           <Text style={styles.durationText}>{startTime}</Text>
//                         </View>
//                         <View style={styles.durationContainer}>
//                           <View style={styles.durationDot} />
//                           <Text style={styles.durationText}>{endTime}</Text>
//                         </View>
//                         <View style={styles.durationDotConnector} />
//                       </View>
//                       <View>
//                         <Text numberOfLines={3} style={styles.eventText}>{event.note}</Text>
//                       </View>
//                     </View>
//                   </View>
//                 )
//             }}
//             renderDay={(eventViews, weekdayToAdd, i) => {
//               return(
//                 <View key={i.toString()} style={styles.day}>
//                   <View style={styles.dayLabel}>                   
//                     <Text style={[styles.monthDateText, { color: '#000' }]}>{weekdayToAdd.format('M/D').toString()}</Text>
//                     <Text style={[styles.dayText, { color: '#000' }]}>{weekdayToAdd.format('ddd').toString()}</Text>
//                   </View>
//                   {eventViews.length === 0 ?
//                     <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreateEvent')} style={{backgroundColor:'#3293ed', justifyContent:'center', alignItems: 'center', flex: 1,paddingVertical:22}}>
//                       <Image source={require('../../../assets/icons/Plus2.png')} style={styles.plusIcon}/>
//                     </TouchableOpacity>
//                     :
//                     <View style={styles.allEvents}>
//                       {eventViews}
//                     </View>
//                   }
//                 </View>
//               )
//             }}    
//             onDayPress={(weekday, i) => this.showEvent(weekday)}
//               // console.log(weekday.format('yyyy-MM-DD'))
//             style={{ height: deviceHeight, width:'100%'}}
//           /> 
//           }       
//        </ScrollView>
//       </SafeAreaView>
//     )
//   }
// }