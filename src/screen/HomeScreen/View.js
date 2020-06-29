import React from 'react'
import { 
  Image,
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  Dimensions, 
  TouchableOpacity, 
} from 'react-native'
import { get, find, isEmpty, size } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import { ActivityIndicator } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage'
import moment from "moment"
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const itemWidth = (deviceWidth - 15) / 2

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideNavbar: true,
      tabIndex: 0,
      routeName: '',
      getEventData:[],
      isLoading: false,
      red: 0,
      yellow: 0,
      green: 0,
      redHour: 0,
      yellowHour: 0,
      greenHour: 0,
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getEvent(user1._id)
        this.props.getSetting(user1._id)
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.getEventData !== prevProps.getEventData) {
      if(this.props.getEventPhase) {
        this.props.resetEventPhase()
        this.setState({ getEventData: get(this.props, 'getEventData', []) , isLoading: false })
      }
    }
    if(this.props.getSettingPhase){
      this.props.resetSettingPhase()
      this.setState({
        red: get(this.props, 'getSettingData.FrameColor.red', 0),
        yellow: get(this.props, 'getSettingData.FrameColor.yellow', 0),
        green: get(this.props, 'getSettingData.FrameColor.green', 0),
        redHour: get(this.props, 'getSettingData.FrameColor.redHour', 0),
        yellowHour: get(this.props, 'getSettingData.FrameColor.yellowHour', 0),
        greenHour: get(this.props, 'getSettingData.FrameColor.greenHour', 0),
      })
    }
  }

  render(){
    const { isLoading, getEventData, red, yellow, green, redHour, yellowHour, greenHour, } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Home' ? 'Home' : ''
    return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center',alignItems: 'center'}}>
        {isLoading ?
        <ActivityIndicator animating = {isLoading} color = {'#3b5261'} size = "small" style = {AppStyles.activityIndicator} />
        :
        <View style={{ paddingLeft: 25 }}>
          {size(getEventData) > 0 ?
            <>
              <Text style={styles.text}>Recent Events</Text>
                <FlatGrid
                  itemDimension={130}
                  items={getEventData}
                  renderItem={({ item, index }) => {
                    let start_time = moment(item.startTime).format("h:mm A")
                    let end_time = moment(item.endTime).format("h:mm A")
                    var diffInHours = Math.floor(Math.abs(new Date(item.startTime) - new Date()) / 36e5)
                    let frameColor = '#00a651'
                    if(red &&  diffInHours >= 12 && diffInHours <= redHour){
                      frameColor = '#ed1c24'
                    }
                    if(yellow &&  diffInHours >= 24 && diffInHours <= yellowHour){
                      frameColor = '#ff9900'
                    }
                    if(green && diffInHours >= 72){
                      frameColor = '#00a651'
                    }         
                    return(
                    <TouchableOpacity  onPress={()=> this.props.navigation.navigate('EventDetail',{id : item._id})}>
                      <Image source={require('../../assets/images/event_thumb1.png')} style={[AppStyles.itemContainer, {borderColor: frameColor}]}/>
                      {get(item, 'showEventInSlideShow', false) && 
                        <TouchableOpacity onPress={()=> this.props.navigation.navigate('SlideShow',{id : item._id})} style={AppStyles.playButton}>
                          <Image source={require('../../assets/icons/Play.png')} style={{height: 36, width: 36 }}/>
                        </TouchableOpacity>
                      }
                        <TouchableOpacity style={AppStyles.eventBottomBar}>
                          <Text style={AppStyles.eventNameText}>{item.eventName}</Text>
                          <Text style={AppStyles.eventTimeText}>{start_time} to {end_time}</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                  )}
                  }
                />
              </>
              :
              <View style={{alignItems: 'center'}}>
                <Image source={require('../../assets/images/no_event.png')} alt="No Event" style={{ height: 100, width: 100 }}/>
                <Text>Welcome to Notice Frame Please Create Event .</Text>
              </View>
            }
        </View>
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    marginLeft: 20,
    marginTop: 15,
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
    fontWeight:'600'
  }
})