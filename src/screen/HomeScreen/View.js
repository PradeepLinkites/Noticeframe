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
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getEvent(user1._id)
      }
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.getEventData !== prevProps.getEventData) {
      if(this.props.getEventPhase) {
        this.props.resetEventPhase()
        this.setState({ getEventData: get(this.props, 'getEventData', []) })
      }
    }
  }

  render(){
    let width = Dimensions.get('screen').width/2
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Home' ? 'Home' : ''
    return (
      <SafeAreaView style={AppStyles.container,{backgroundColor:'#fff'}}>
        <View style={AppStyles.gridView}>
          <Text style={styles.text}>Recent Events</Text>
            <FlatGrid
              itemDimension={130}
              items={this.state.getEventData}
              renderItem={({ item, index }) => {
                let start_time = moment(item.startTime).format("h:mm A")
                let end_time = moment(item.endTime).format("h:mm A")      
                return(
                <TouchableOpacity  onPress={()=> this.props.navigation.navigate('EventDetail',{id : item._id})}>
                  <Image source={require('../../assets/images/event_thumb1.png')} style={AppStyles.itemContainer}/>
                  <TouchableOpacity onPress={()=> this.props.navigation.navigate('SlideShow')} style={AppStyles.playButton}>
                    <Image source={require('../../assets/icons/Play.png')} style={{height: 36, width: 36 }}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={AppStyles.eventBottomBar}>
                    <Text style={AppStyles.eventNameText}>{item.eventName}</Text>
                    <Text style={AppStyles.eventTimeText}>{start_time} to {end_time}</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
                )}
                }
            />
        </View>
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
  },
  })