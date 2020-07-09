import React from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import { get , isEmpty, size } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
import moment from 'moment'
import {Calendar} from 'react-native-calendars'
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-community/async-storage'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper';

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
      isLoading: false,
      userId: '',
      // myColor:'red'
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.setState({ isModalVisible: false })
      AsyncStorage.getItem('@user')
      .then((user) => {
        const user1 = JSON.parse(user)
        if(!isEmpty(user1)){
          this.props.getEventCalender(user1._id)
          this.setState({userId: user1._id})
        }
      })
    })
  }

  componentWillUnmount(){
    this.focusListener.remove()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.getEventCalenderPhase) {
      this.props.resetEventPhase()
      this.handleEvent(this.props.getEventCalenderData)
    }
    if (this.props.getSettingPhase) {
      this.props.resetSettingPhase()
      this.setState({
        calendarHeader: get(this.props, 'getSettingData.Calendar.calendarHeader', 'default_header'),
        calendarBody: get(this.props, 'getSettingData.Calendar.calendarBody', 'default_body'),
        calendarFont: get(this.props, 'getSettingData.Calendar.calendarFont', 'default_body'),
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
          eventDate: moment(get(value, 'eventDate', '')).format('DD-MM-YYYY'),
          startTime: moment(get(value, 'startTime', '')).format('h:mm A'),
          endTime: moment(get(value, 'endTime', '')).format('h:mm A'),
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
    const { isLoading, eventDetails, currentDate, calendarHeader, calendarBody } = this.state
    let dates = {}
    eventDetails.forEach((val) => {
      dates[val.date] = { marked: true }  
    })
    let bodyColor = get(this.state,'calendarBody','') === 'White' ? '#ffffff' : get(this.state,'calendarBody','') === 'Hawkes Blue' ? '#d5d6ea' : get(this.state,'calendarBody','') === 'Milk Punch' ? '#f4e3c9' 
    : get(this.state,'calendarBody','') === 'Coral Candy' ? '#f5d5cb': get(this.state,'calendarBody','') === 'Cruise' ? '#b5dce1': get(this.state,'calendarBody','') === 'Swirl' ? '#d6cdc8': get(this.state,'calendarBody','') === 'Tusk' ? '#d7e0b1': '#fff'
    return (
      <SafeAreaView style={{flex:1}}>
        {isLoading ?
        <ActivityIndicator animating = {isLoading} color = {'#3b5261'} size = "small" style = {AppStyles.activityIndicator} />
        :
        <ScrollView style={styles.container}>
          <Calendar
            // monthFormat={'dd MMM yyyy'}
            style={{
              borderWidth: .5,
              borderColor: 'gray',
              backgroundColor: calendarHeader === 'White' ? '#ffffff' : calendarHeader === 'Hawkes Blue' ? '#d5d6ea' : calendarHeader === 'Milk Punch' ? '#f4e3c9' 
              : calendarHeader === 'Coral Candy' ? '#f5d5cb': calendarHeader === 'Cruise' ? '#b5dce1': calendarHeader === 'Swirl' ? '#d6cdc8': calendarHeader === 'Tusk' ? '#d7e0b1': ''
            }}
            current={new Date()}
            onDayPress={this.onDayPress.bind(this, dates)}
            markedDates={dates}
            hideArrows={true}
            theme={{
              calendarBackground: bodyColor,
              selectedDayBackgroundColor: 'red',
              textSectionTitleColor: '#A2a2a2',
              todayTextColor: '#ff6600',
              dayTextColor: '#000',
              textDisabledColor: '#A2a2a2',
              dotColor: '#ff6600',
              monthTextColor: '#000',
              textDayFontWeight: '300',
              textMonthFontWeight: '500',
              fontSize:  Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(18), 
              textMonthFontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14), 
              textDayHeaderFontSize: 14,
              'stylesheet.calendar.header': {
                week: {
                  marginTop: 6,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  padding: 20
                },
                dayHeader: {
                  fontSize:  Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12), 
                },
              },
              // calendarBackground: 'pink',
            }}
          />
          {/* <Modal isVisible={this.state.isModalVisible}>
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
          </Modal> */}
          {this.state.isModalVisible &&
            <View style={{paddingHorizontal: 20,marginTop: 20}}>
              <Text style={{ alignSelf:'center',fontSize: 18, marginVertical: 3, fontWeight: '700'}}>List of Events</Text>
              <Text style={{ alignSelf:'center',fontSize: 18, marginVertical: 3, fontWeight: '300', color: '#A2a2a2'}}>{moment(currentDate).format('Do YYYY')}</Text>
              {size(get(this.state, 'eventDetails', [])) > 0 && eventDetails.map((item,ind) => {
                if(item.date === this.state.currentDate){
                  return(
                  <TouchableOpacity onPress={this.onNavigate.bind(this, get(item, 'id', ''))} key = {ind}>
                    <Card style={{backgroundColor : bodyColor ,marginVertical: 5}}>
                      <Card.Content>
                        <Title>{item.note}</Title>
                        <Paragraph>{item.eventDate}</Paragraph>
                        <Paragraph>{item.startTime} To {item.endTime}</Paragraph>
                      </Card.Content>
                    </Card>
                  </TouchableOpacity>
                  )
                }
                })
              }
            </View>  
          } 
        </ScrollView>
        }
        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateEvent')} style={styles.plusButtonStyle}>
          <Image source={require('../../../assets/icons/Add.png')} style={{height: 52, width: 52}}/>
        </TouchableOpacity>
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
plusButtonStyle: {
  width:  Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50), 
  height: Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50),  
  borderRadius: Platform.OS === 'android' ?  25 : 25 ,                                             
  position: 'absolute',                                          
  bottom: Platform.OS === 'android' ? 22 : 32,                                                    
  right: Platform.OS === 'android' ? 26 : 15,  
}
})