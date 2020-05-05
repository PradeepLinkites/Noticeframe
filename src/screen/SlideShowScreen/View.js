import React from 'react'
import { Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import AwesomeButton from 'react-native-really-awesome-button'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import AsyncStorage from '@react-native-community/async-storage'


export default class Home extends React.Component {
  static navigationOptions = {  
    title: 'Dashboard',  
};

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { getUserData } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Setting' ? 'KIKO KIDS' : ''
    console.log('route==>>', route)
    return (
      <SafeAreaView style={AppStyles.container}>
        <Navbar 
          navigation={this.props.navigation} 
          navTitle={route} 
          stylee={{ height: this.state.height }}
          routeKey={'SlideShow'} 
        />

        <View style={{ flex:1,backgroundColor:'skyblue',justifyContent:'center',alignItems:'center' }}>
          <Text>SlideShow Screen</Text>
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