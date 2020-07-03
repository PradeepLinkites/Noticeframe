import React from 'react'
import {  Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import WeeklyCalendar from 'react-native-weekly-calendar';
import styles from './styles'
import moment from 'moment'
import AsyncStorage from '@react-native-community/async-storage'
import { get , isEmpty, size } from 'lodash'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

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
    },()=>{
      this.forceUpdate()
    })
  }

  showEvent =(day)=>{
    this.setState({ date: day.format('yyyy-MM-DD') })
  }

  _eventTapped (id) {
    this.props.navigation.navigate('EventDetail',{id : id})
  }

  render() {
    const { allEvents, isLoading } = this.state
    return (
      <SafeAreaView style={AppStyles.container}>
        <ScrollView style={styles.container}>
          <WeeklyCalendar
            events={allEvents.length > 0 ? allEvents : []} 
            selected={moment().format('YYYY-MM-DD')}
            startWeekday={7}
            weekdayFormat='ddd'
            themeColor='#ff6600'
            titleStyle={styles.title}
            dayLabelStyle={styles.dayLableStyle}
            titleFormat='DD MMM YYYY'
            locale='en'
            renderEvent={(event, j, i) => {
              let newDate = event.start.split(" ")[0]
              let startTime = moment(event.start).format('LT').toString()
              let duration = event.duration.split(':')
              let seconds = parseInt(duration[0]) * 3600 + parseInt(duration[1]) * 60 + parseInt(duration[2])
              let endTime = moment(event.start).add(seconds, 'seconds').format('LT').toString()
                return (
                  <TouchableOpacity key={j} onPress={this._eventTapped.bind(this, event.id )}>
                    <View style={styles.event}>
                      <View style={styles.eventDuration}>
                        <View style={styles.durationContainer}>
                          <View style={styles.durationDot} />
                          <Text style={styles.durationText}>{startTime}</Text>
                        </View>
                        <View style={styles.durationContainer}>
                          <View style={styles.durationDot} />
                          <Text style={styles.durationText}>{endTime}</Text>
                        </View>
                        <View style={styles.durationDotConnector} />
                      </View>
                      <View>
                        <Text numberOfLines={3} style={styles.eventText}>{event.note}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
            }}
            renderDay={(eventViews, weekdayToAdd, i) => {
              return(
                <View key={i.toString()} style={styles.day}>
                  <View style={styles.dayLabel}>                   
                    <Text style={[styles.monthDateText, { color: '#000' }]}>{weekdayToAdd.format('M/D').toString()}</Text>
                    <Text style={[styles.dayText, { color: '#000' }]}>{weekdayToAdd.format('ddd').toString()}</Text>
                  </View>
                  {eventViews.length === 0 ?
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreateEvent')} style={{backgroundColor:'#fff', justifyContent:'center', alignItems: 'center', flex: 1,paddingVertical:22}}>
                      <Image source={require('../../../assets/icons/Plus2.png')} style={styles.plusIcon}/>
                    </TouchableOpacity>
                    :
                    <View style={styles.allEvents}>
                      {eventViews}
                    </View>
                  }
                </View>
              )
            }}    
            onDayPress={(weekday, i) => this.showEvent(weekday)}
            style={{ height: deviceHeight, width:'100%'}}
          />  
       </ScrollView>
      </SafeAreaView>
    )
  }
}