import React from 'react'
import { Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/Navbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'
import Calendar from 'react-native-calendar-datepicker'
import Moment from 'moment'

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { getUserData } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Setting' ? '' : ''
    return (
      <SafeAreaView style={AppStyles.container}>
        <ScrollView style={styles.container}>
          <Calendar
            onChange={(date) => this.setState({date})}
            selected={this.state.date}
            // We use Moment.js to give the minimum and maximum dates.
            minDate={Moment().startOf('day')}
            maxDate={Moment().add(10, 'years').startOf('day')}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    height: 500
  },
})