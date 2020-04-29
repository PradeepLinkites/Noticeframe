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
      hideNavbar: true,
      height: new Animated.Value(60),
      getUserData: {},
      cancelSubscriptionData: {}
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('@user').then(item=>{
      const user = JSON.parse(item)
      if(user){
        this.props.getUser(user.userId)  
      }
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return { getUserData: nextProps.getUserData }
 }

  componentDidUpdate(prevProps) {

      if (this.props.getUserPhase && this.props.getUserData !== prevProps.getUserData) {
          this.setState({ getUserData: this.props.getUserData });
      }

      if(this.props.cancelSubscriptionPhase) {
        this.props.resetPhase()
        Alert.alert('KIKO',this.props.cancelSubscriptionMessage)
      }
  }

  _cancelSubscription = () =>{
    if(get(this.state.getUserData,'userId','') !== ''){
      let userId = this.state.getUserData.userId
      this.props.cancelSubscription(userId)
    } else {
      AsyncStorage.getItem('@user').then(item=>{
        const user = JSON.parse(item)
        if(user){
          let userId = user.userId
          this.props.cancelSubscription(userId)    
        }
      })
    }
  }

  render() {
    const { getUserData } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Setting' ? 'KIKO KIDS' : ''
    return (
      <SafeAreaView style={AppStyles.container}>
        <Navbar navigation={this.props.navigation} navTitle={route} stylee={{ height: this.state.height }} />
        <View style={{ marginTop: 10, padding: 20 }}>
          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{fontSize:18 }}>Name:</Text>
            <Text style={{fontSize:18, textAlign: 'right' }}>{getUserData.name}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{fontSize:18 }}>Email:</Text>
            <Text style={{fontSize:18, textAlign: 'right' }}>{getUserData.email}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{fontSize:18 }}>Plan Details:</Text>
            <View style={styles.planContainerView}>
              { get(getUserData,'planId','' ) === 'plan_monthly' &&
                <View>  
                  <Text style={{fontSize:18, textAlign: 'right' }}>Monthly</Text>
                  <Text style={{fontSize:18, textAlign: 'right' }}>INR 299.00/mo</Text>
                  <Text style={{fontSize:18, textAlign: 'right' }}>(Billed monthly)</Text>
                </View>
              }
              { get(getUserData,'planId','' ) === 'plan_yearly' &&
                <View>
                  <Text style={{fontSize:18, textAlign: 'right' }}>Annual</Text>
                  <Text style={{fontSize:18, textAlign: 'right' }}>INR 699.00/year</Text>
                  <Text style={{fontSize:18, textAlign: 'right' }}>(Billed annualy)</Text>
                </View>
              }
            </View>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
            <AwesomeButton
              disabled={get(getUserData,'planId','') !== '' ? false : true }
              type="primary"
              color={'#FFF'}
              backgroundColor={get(getUserData,'planId','') !== '' ? AppColors.app.button : 'gray'}
              backgroundDarker={get(getUserData,'planId','') !== '' ? AppColors.app.buttonShadow : 'gray'}
              height={AppSizes.verticalScale(40)}
              width={deviceWidth - 160}
              textSize={AppSizes.verticalScale(14)}
              onPress={this._cancelSubscription} 
              borderRadius={50}
              style={{ alignSelf:'center' }}
            >       
              CANCEL SUBSCRIPTION
            </AwesomeButton>
          </View>
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