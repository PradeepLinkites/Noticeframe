import React from 'react'
import { Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/Navbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { getUserData } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Setting' ? 'KIKO KIDS' : ''
    return (
      <SafeAreaView style={AppStyles.container}>
        <View style={{ flex:1,justifyContent:'center',alignItems:'center' }}>
          <Text>Weekly Screen</Text>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  planContainerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  }
})