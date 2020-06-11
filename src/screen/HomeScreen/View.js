import React from 'react'
import { 
  Image,
  Alert,
  FlatList,
  StyleSheet, 
  Text, 
  View, 
  Button, 
  SafeAreaView, 
  Dimensions, 
  Animated, 
  TouchableOpacity, 
} from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get, find, isEmpty, size } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import { ActivityIndicator } from 'react-native-paper'
import { FlatGrid } from 'react-native-super-grid';
import { ScrollView } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import moment from "moment"
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
const itemWidth = (deviceWidth - 15) / 2

const data = [
  { name: 'Healty Sport', time: '07:30 AM to 08:30 AM', source: require('../../assets/images/image1.jpeg') }, 
  { name: 'Sport', time: '09:30 AM to 10:30 AM', source: require('../../assets/images/image2.jpeg') },
  { name: 'Football', time: '10:30 AM to 11:30 AM', source: require('../../assets/images/image3.jpeg') }, 
  {name: 'Football', time: '10:30 AM to 11:30 AM',source: require('../../assets/images/image4.jpeg') },
  { name: 'Football', time: '10:30 AM to 11:30 AM',source: require('../../assets/images/image5.jpeg') },
]

export default class Home extends React.Component {
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

render() {
  let width = Dimensions.get('screen').width/2
  const { state } = this.props.navigation
  const route = get(state, 'routeName', '')  === 'Home' ? 'Home' : ''
  return (
    <SafeAreaView style={AppStyles.container,{backgroundColor:'#fff'}}>
      <View style={styles.gridView}>
        <Text style={styles.text}>Recent Events</Text>
          <FlatGrid
            itemDimension={130}
            items={data}
            renderItem={({ item, index }) => {
              let start_time = moment(item.startTime).format("hh:mm")
              let end_time = moment(item.endTime).format("hh:mm")      
              return(
              <TouchableOpacity  onPress={()=> this.props.navigation.navigate('EventDetail',{id : item._id})}>
                <Image source={require('../../assets/images/event_thumb1.png')} style={styles.itemContainer}/>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('SlideShow')} style={styles.playButton}>
                  <Image source={require('../../assets/icons/Play.png')} style={{height: 36, width: 36 }}/>
                </TouchableOpacity>
                <TouchableOpacity style={styles.eventName}>
                  <Text style={styles.eventNameText}>{item.eventName}</Text>
                  <Text style={styles.eventTimeText}>{start_time} to {end_time}</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  text:{
    marginLeft:20,
    marginTop: 15,
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
    fontFamily: AppFonts.NRegular,
    fontWeight:'600'
  },
  gridView: {
    paddingLeft: 25,
    borderBottomWidth: .3,
    borderBottomColor: '#A2a2a2'
  },
  dateText: {
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(16),
    fontWeight: '500',
    marginTop: 15
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 22,
    borderWidth: 4,
    borderColor: 'red',
    padding: 10,
    height: Platform.OS === 'android' ? AppSizes.verticalScale(150) : AppSizes.verticalScale(130),
    width:  Platform.OS === 'android' ? AppSizes.verticalScale(150) : AppSizes.verticalScale(130),
    marginBottom: 2
  },
  playButton: {
    position:'absolute',
    top: Platform.OS === 'android' ? 6 : 6,
    right: Platform.OS === 'android' ? 12 : 4,
  },
  eventName:{
    position:'absolute',
    bottom : 10,
    left: 14,
  },
  eventNameText:{
    color:'#fff',
    fontSize: Platform.OS === 'android' ? 14 : 16,
    fontWeight:'800'
  },
  eventTimeText: {
    color:'#fff',
    fontSize: Platform.OS === 'android' ? 10 : 12,
    fontWeight:'500'
  },
  plusButtonStyle: {
    width:  Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50), 
    height: Platform.OS === 'android' ? AppSizes.verticalScale(50) : AppSizes.verticalScale(50),  
    borderRadius: Platform.OS === 'android' ?  25 : 25 ,                                             
    position: 'absolute',                                          
    bottom: Platform.OS === 'android' ? 26 : 26,                                                    
    right: Platform.OS === 'android' ? 26 : 26,  
  }
  })