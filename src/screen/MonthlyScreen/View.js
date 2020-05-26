import React from 'react'
import { Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { get } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import moment from 'moment'
import {Calendar} from 'react-native-calendars'
import Modal from 'react-native-modal';

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


const array = ['2020-05-20', '2020-05-22', '2020-05-26']

const sampleEvents = [
  { 'date': '2020-05-23','startTime': '09:00:00', 'endTime': '09:20:00','duration': '00:20:00', 'note': 'Walk my dog' },
  { 'date': '2020-05-24','startTime': '14:00:00', 'endTime': '15:00:00','duration': '01:00:00', 'note': 'Doctor\'s appointment' },
  { 'date': '2020-05-25','startTime': '08:00:00', 'endTime': '08:30:00','duration': '00:30:00', 'note': 'Morning exercise' },
  { 'date': '2020-05-25','startTime': '14:00:00', 'endTime': '16:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
  { 'date': '2020-05-25','startTime': '19:00:00', 'endTime': '20:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
  { 'date': '2020-05-26','startTime': '09:30:00', 'endTime': '10:30:00','duration':  '01:00:00', 'note': 'Schedule 1' },
  { 'date': '2020-05-26','startTime': '11:00:00', 'endTime': '13:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
]

export default class Monthly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '2020-05-29',
      // markedData: ['2020-05-21', '2020-05-22', '2020-05-26'],
      markedData: sampleEvents,
      isModalVisible: false,
      currentDate: ''
    }
  }

  onDayPress = (day, newDates) => {
    let eventDate = newDates.dateString
    this.state.markedData.map(item=> {
      if(item.date === eventDate){
        this.setState({ isModalVisible: !this.state.isModalVisible ,currentDate : eventDate })
      }
    })
    this.setState({ selected: day.dateString })
  }

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  onNavigate =() => {
    this.setState({isModalVisible: !this.state.isModalVisible})
    this.props.navigation.navigate('CreateEvent')
  }

  render() {
    let dates = {}
    this.state.markedData.forEach((val) => {
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
          <View style={{height: 400, backgroundColor:'#fff'}}>
              <Text style={{ alignSelf:'center',fontSize: 20, top: 3}}>List of Events</Text>
              {this.state.markedData.map(item => {
                if(item.date === this.state.currentDate){
                  return(
                  <View style={{flex: 1}}>
                    <TouchableOpacity style={styles.event} onPress={this.onNavigate}>
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
                        <Text numberOfLines={3} style={styles.eventText}>{item.note}</Text>
                      </View>
                    </TouchableOpacity>
                    <View style={{height:2, backgroundColor:'#A2a2a2',width: '100%'}} /> 
                  </View>
                  )                 
                }
              })}
            <Button title="Cancel" onPress={this.toggleModal} color="#A2a2a2"/>
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
    backgroundColor:'#fff'
  },
  event: {
    backgroundColor:'#fff',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: .5,
    paddingHorizontal: 10
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
    borderLeftColor: 'grey',
    borderLeftWidth: StyleSheet.hairlineWidth,
    position: 'absolute',
    left: 2
},
durationText: {
    color: 'grey',
    fontSize: 14
},
})