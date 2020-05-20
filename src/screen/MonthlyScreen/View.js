import React from 'react'
import { Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { get } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import Moment from 'moment'
import {Calendar} from 'react-native-calendars'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


const array = ['2020-05-20', '2020-05-22', '2020-05-26']

export default class Monthly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '2020-05-29',
      markedData: ['2020-05-21', '2020-05-22', '2020-05-26']
    }
  }

  onDayPress = (day) => {
    this.setState({selected: day.dateString});
  }

  render() {
    let dates = {}
    this.state.markedData.forEach((val) => {
      dates[val] = { marked: true }
    })
    // const { state } = this.props.navigation
    // const route = get(state, 'routeName', '')  === 'Monthly' ? 'Monthly' : ''
    return (
      <SafeAreaView style={AppStyles.container}>
        <ScrollView style={styles.container}>
          <Calendar
            monthFormat={'dd MMM yyyy'}
            style={styles.calendar}
            current={new Date()}
            onDayPress={this.onDayPress}
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
              textDayFontSize: 18,
              textMonthFontSize: 18,
              textDayHeaderFontSize: 14,

              'stylesheet.calendar.header': {
                week: {
                  marginTop: 10,
                  marginBottom: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }
              }
  
            }}
          />
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
})