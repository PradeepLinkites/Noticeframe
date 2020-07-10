import React from 'react'
import {ActivityIndicator, StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import Navbar from '../../Common/commonNavbar'
import { get, isEmpty } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
import SwitchComponent from '../../Common/Switch'
import AsyncStorage from '@react-native-community/async-storage'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class eventSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      importedInSlideShow: false,
      userId: '',
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
        this.setState({ userId: user1._id})
      }
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.getSettingPhase){
      this.setState({ 
        importedInSlideShow: get(this.props,'getSettingData.SlideShow.importedInSlideShow', false),
        isLoading: false
      })
    }
  if(this.props.updateSettingPhase){
    this.props.getSetting(this.state.userId)
  }
  this.props.resetSettingPhase()
}

  onChange = (value) => {
     this.setState({ importedInSlideShow: value},()=>{
      const data = {
        id: this.state.userId,
        value:{
          SlideShow: {
            importedInSlideShow: this.state.importedInSlideShow,
          }
        }
      }
      this.props.updateSetting(data)
     })
  }

  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'EventSetting' ? 'Event Settings' : ''
    return (
      <SafeAreaView style={[styles.container,{backgroundColor: 'fff'}]}>
        {this.state.isLoading ? 
          <ActivityIndicator color = {'#3b5261'} size = "small" style = {AppStyles.activityIndicator} />
          :
        <ScrollView style={styles.container}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'EventSetting'} 
          />
          <View style={styles.topContainer}>
            <View style={styles.mainView}>
              <Text style={styles.text}>Show imported events in slideshow</Text>
              <SwitchComponent onChange={this.onChange} value={this.state.importedInSlideShow}/>
            </View>
          </View>       
        </ScrollView>
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  topContainer:{
    height: deviceHeight *.22 ,
    width: '100%',
    backgroundColor:'#fff',
    justifyContent:'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  mainView : {
    height: 30,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  text: {
    color:'#A2a2a2',
    fontSize: 16
  }
})