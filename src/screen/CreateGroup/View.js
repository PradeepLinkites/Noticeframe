import React from 'react'
import {Picker, TextInput, Switch, Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height


export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: '',
      groupName: 'Directors'
    }
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        // maxWidth: 1200, maxHeight: 800, quality: 0.9, noData: true,
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let source = {uri: response.uri}
        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    const {selectValue, isEndPickerVisible, isStartPickerVisible, isDatePickerVisible, startTime, endTime, getUserData , selectedValue, selectedColor  } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'CreateGroup' ? 'Create Group' : ''
    return (
    <SafeAreaView style={[AppStyles.container,{backgroundColor:'#3b5261'}]}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'CreateGroup'} 
          />   
          <ScrollView style={styles.container}>
            <View style={styles.topContainer}>
              {get(this.state, 'avatarSource','') === '' ?
                <TouchableOpacity
                  style={styles.addPictureButton}
                  onPress={this.selectPhotoTapped.bind(this)}
                >
                  <Text style={styles.addPictureText}>Add Picture</Text>
                </TouchableOpacity>
                :
                <Image style={styles.avatar} source={this.state.avatarSource} />
              }
            </View>
            <View style={styles.eventContainer}>
                <Text style={styles.listTitle}>Group Name</Text>
                <TextInput
                  multiline
                  style={styles.inputBox}
                  maxLength={40}
                  placeholderTextColor="red"
                  onChangeText={text => this.setState({ groupName: text})}
                  value={this.state.groupName}
                />
            </View>
            <View style={styles.eventContainer}>
                <Text style={styles.listTitle}>Select Members to join</Text>
                <TextInput
                  multiline
                  style={styles.inputBox}
                  maxLength={40}
                  placeholderTextColor="red"
                  // onChangeText={text => this.setState({ groupName: text})}
                  // value={this.state.groupName}
                />
            </View>
            <View style={styles.eventContainer}>
                <Text style={styles.listTitle}>To members who have not joined</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={()=>alert('call')}
                >
                  <Text style={AppStyles.buttonText}>Resend Email Notification</Text>
                </TouchableOpacity>
            </View>

              <View style={styles.bottomView}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <TouchableOpacity style={[styles.cancelButton, {backgroundColor:'#A2a2a2'}]}
                      // onPress={onPress}
                    >
                      <Text style={[styles.cancelText,{color:'#000'}]}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.cancelButton, {backgroundColor:'#3b5261'}]}
                      // onPress={() => this.props.navigation.navigate('ListView')}
                    >
                      <Text style={[styles.cancelText,{color:'#fff'}]}>CREATE</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </ScrollView>    
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#e6e1de',
  },
  topContainer:{
    height: deviceHeight *.22 ,
    backgroundColor:'#A2a2a2',
    justifyContent:'center',
    alignItems:'center'
  },
  addPictureButton: {
    backgroundColor:'#fff',
    width: deviceWidth *.60 ,
    paddingVertical: Platform.OS === 'android' ? 8 : 10,
    borderRadius:18,
    justifyContent:'center',
    alignItems:'center',
  },
  addPictureText: {
    fontSize: 16,
  },
  avatar: {
    height: deviceHeight *.22 ,
    width: '100%',
  },
  eventContainer: {
    paddingHorizontal: Platform.OS === 'android' ? 20 : 25,
    paddingVertical: Platform.OS === 'android' ? 20 : 26,
    backgroundColor:'#fff',
    borderBottomWidth: .3,
  },
  listTitle: {
	  color: '#A2a2a2',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(12),
    // fontFamily: AppFonts.NRegular,
    letterSpacing: .5,
    fontWeight: '500'
  },
  selectedText: {
	  color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    // fontFamily: AppFonts.NBlack,
    letterSpacing: 1,
    fontWeight: Platform.OS === 'android' ? '600' : '500'
  },
  inputBox: {
    width: '100%',
    justifyContent:'center',
    paddingTop: 7,
    paddingBottom: 7,
    borderColor: 'gray', 
    borderBottomWidth: .8,
    color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    letterSpacing: 1,
    fontWeight: Platform.OS === 'android' ? '600' : '500'
  },
  button: {
     width:'100%',
     justifyContent:'center',
     alignItems: 'center',
     backgroundColor:'#ff6600',
     paddingVertical: Platform.OS === 'android' ? 6 : 8,
     marginTop : Platform.OS === 'android' ? 12 : 15,
     marginBottom: Platform.OS === 'android' ? 12 : 15
  },
  bottomView: {
    paddingHorizontal: Platform.OS === 'android' ? 35 : 40,
    paddingVertical: 30,
    marginTop: Platform.OS === 'android' ? 30 : 100,
    width:'100%',
    // position:'absolute',
    bottom: 0,
  },
  cancelButton: {
    backgroundColor:'#ff6600',
    alignItems:'center',
    justifyContent:'center',
    paddingVertical: Platform.OS === 'android' ? 8 : 10,
    paddingHorizontal: Platform.OS === 'android' ? 32 : 35,  
    borderRadius: 24,
  },
  repeatText: {
    color: '#939393',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    fontWeight: '700'
  },
  checkboxText: {
    color: '#939393',
    fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(12) : AppSizes.verticalScale(10),
    fontFamily: AppFonts.NRegular,
    fontWeight: '600'
  },
  cancelText: {
    color: '#fff',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(18) : AppSizes.verticalScale(14),
    letterSpacing: .5,
    fontWeight: '600',
  },
})