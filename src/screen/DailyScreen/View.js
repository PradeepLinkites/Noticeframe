import React from 'react'
import { Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { get } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import WeeklyCalendar from 'react-native-weekly-calendar';
import styles from './styles'
import moment from 'moment'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


const sampleEvents = [
  { 'start': '2020-03-23 09:00:00', 'duration': '00:20:00', 'note': 'Walk my dog' },
  { 'start': '2020-03-24 14:00:00', 'duration': '01:00:00', 'note': 'Doctor\'s appointment' },
  { 'start': '2020-03-25 08:00:00', 'duration': '00:30:00', 'note': 'Morning exercise' },
  { 'start': '2020-03-25 14:00:00', 'duration': '02:00:00', 'note': 'Meeting with client' },
  { 'start': '2020-03-25 19:00:00', 'duration': '01:00:00', 'note': 'Dinner with family' },
  { 'start': '2020-03-26 09:30:00', 'duration': '01:00:00', 'note': 'Schedule 1' },
  { 'start': '2020-03-26 11:00:00', 'duration': '02:00:00', 'note': 'Schedule 2' },
  { 'start': '2020-03-26 15:00:00', 'duration': '01:30:00', 'note': 'Schedule 3' },
  { 'start': '2020-03-26 18:00:00', 'duration': '02:00:00', 'note': 'Schedule 4' },
  { 'start': '2020-03-26 22:00:00', 'duration': '01:00:00', 'note': 'Schedule 5' }
]

export default class Daily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <SafeAreaView style={AppStyles.container}>
        <ScrollView style={styles.container}>
        <WeeklyCalendar
            events={sampleEvents} 
            selected='2020-03-23'
            startWeekday={7}
            weekdayFormat='ddd'
            style={{ height: 500, backgroundColor:'green' }} 
            themeColor='#ff6600'
            titleStyle={{ color: '#000',fontSize: 18 ,fontWeight: '300',marginTop: 10}}
            dayLabelStyle={{ color: '#A2a2a2',fontSize: 14, marginTop: 15, marginBottom: 10 }}
            titleFormat='DD MMM YYYY'
            locale='en'
            renderEvent={(event, j) => {
              let startTime = moment(event.start).format('LT').toString()
              let duration = event.duration.split(':')
              let seconds = parseInt(duration[0]) * 3600 + parseInt(duration[1]) * 60 + parseInt(duration[2])
              let endTime = moment(event.start).add(seconds, 'seconds').format('LT').toString()
              return (
                <View key={j}>
                  <View style={styles.event}>
                    <View style={styles.eventDuration}>
                      <View style={styles.durationContainer}>
                        <View style={styles.durationDot} />
                        <Text style={styles.durationText}>{startTime}</Text>
                      </View>
                      <View style={{ paddingTop: 10 }} />
                      <View style={styles.durationContainer}>
                        <View style={styles.durationDot} />
                        <Text style={styles.durationText}>{endTime}</Text>
                      </View>
                      <View style={styles.durationDotConnector} />
                    </View>
                    <View style={styles.eventNote}>
                      <Text numberOfLines={3} style={styles.eventText}>{event.note}</Text>
                    </View>
                  </View>
                  <View style={styles.lineSeparator} />
                </View>
              )
            }}
            // renderLastEvent={(event, j) => {
            //   let startTime = moment(event.start).format('LT').toString()
            //   let duration = event.duration.split(':')
            //   let seconds = parseInt(duration[0]) * 3600 + parseInt(duration[1]) * 60 + parseInt(duration[2])
            //   let endTime = moment(event.start).add(seconds, 'seconds').format('LT').toString()
            //   return (
            //     <View key={j}>
            //       <View style={styles.event}>
            //         <View style={styles.eventDuration}>
            //           <View style={styles.durationContainer}>
            //             <View style={styles.durationDot} />
            //             <Text style={styles.durationText}>{startTime}</Text>
            //           </View>
            //           <View style={{ paddingTop: 10 }} />
            //           <View style={styles.durationContainer}>
            //             <View style={styles.durationDot} />
            //             <Text style={styles.durationText}>{endTime}</Text>
            //           </View>
            //           <View style={styles.durationDotConnector} />
            //         </View>
            //         <View style={styles.eventNote}>
            //           <Text style={styles.eventText}>{event.note}</Text>
            //         </View>
            //       </View>
            //     </View>
            //   )
            // }}
            renderDay={(eventViews, weekdayToAdd, i) => {
              return(
                <View key={i.toString()} style={styles.day}>
                  <View style={styles.dayLabel}>                   
                    <Text style={[styles.monthDateText, { color: '#000' }]}>{weekdayToAdd.format('M/D').toString()}</Text>
                    <Text style={[styles.dayText, { color: '#000' }]}>{weekdayToAdd.format('ddd').toString()}</Text>
                  </View>
                  {eventViews.length === 0 ?
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('CreateEvent')} style={{backgroundColor:'#3293ed', justifyContent:'center', alignItems: 'center', flex: 1,width:400}}>
                      <Image source={require('../../assets/icons/Plus2.png')} style={styles.plusIcon}/>
                    </TouchableOpacity>
                    :
                    <View style={[styles.allEvents,{backgroundColor:'#e2e9f6'}]}>
                      {eventViews}
                    </View>
                  }
                </View>
              )
            }}    
            onDayPress={(weekday, i) => {
              console.log(weekday.format('ddd') + ' is selected! And it is day ' + (i+1) + ' of the week!')
            }}
            style={{ height: deviceHeight, width:'100%'}}
          />        
       </ScrollView>
      </SafeAreaView>
    )
  }
}
