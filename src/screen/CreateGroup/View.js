import React from 'react'
import { TextInput, Platform, StyleSheet, Text, View,  SafeAreaView, Image, ScrollView, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get, isEmpty, size } from 'lodash'
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker'
import AsyncStorage from '@react-native-community/async-storage'
import MultiSelect from 'react-native-multiple-select'
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSource: '',
      groupName: '',
      texts: [],
      fileList: [],
      userList: [],
      eventPicture: [],
      eventPictureError: false,
      groupNameError: false,
      firstName:'',
      lastName:'',
      userId: '',
      selectedItems: [],
      selectedItemsError: false,
      message: ''
    }
    this._initState = this.state 
    this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
  }

  onFocusFunction = () => {
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.props.getUserListForShow()
        this.setState({ userId: user1._id})
      }
    })
  }

  componentDidMount(){
    this.setState({ isLoading: true })
    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })
  }

  componentWillUnmount(){
    this.focusListener.remove()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.createGroupPhase) {
      this.setState({ selectedItems: [], groupName: '',  loading: false , message:  get(this.props, 'createGroupMessage','')})
      alert('created group successfully')
    }
    if (this.props.getUserListForShowPhase) {
      let arr = []
      get(this.props, 'getUserListForShowData', []).map(item=>{
        let obj = {}
        obj['id'] = get(item, '_id', '')
        obj['firstName'] = get(item, 'firstName', '')
        obj['lastName'] = get(item, 'lastName', '')
        obj['email'] = get(item, 'email', '')
        obj['key'] = get(item, 'key', '')
        obj['name'] = get(item, 'email', '')
        arr.push(obj)
      })
      this.setState({ userList: arr })
    }
    this.props.resetPhase()
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
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

  createGroup() {
    let memberList = []
    this.state.userList.map(item=>{
      if(this.state.selectedItems.indexOf(item.id) != -1){
        memberList.push(item)
      }
    })
    const {groupName, userId, selectedItems } = this.state
    var error = true
    this.setState({
      groupNameError: false,
      selectedItemsError: false,
    })
    if (groupName.trim() === '') {
      error = false
      this.setState({ groupNameError: true })
    }
    if ((selectedItems).length === 0) {
      error = false
      this.setState({ selectedItemsError: true })
    }
    if(error){
      this.setState({ loading: true })
      const data = {
        groupName: this.state.groupName,
        inviteMembers: memberList,
        userId: userId,
        userName: this.state.firstName + ' ' + this.state.lastName,
        key: Date.now()
      }
      this.props.createGroup(data)
    }
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems })
  }

  _cancel =()=> {
    this.setState(this._initState)
    this.props.navigation.goBack(null)
    return true
  }

  render() {
    const { groupNameError,  userList, selectedItemsError } = this.state
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
                  placeholder = "Group Name"
                  placeholderTextColor = "#A2a2a2"
                  maxLength={40}
                  onChangeText={text => this.setState({ groupName: text})}
                  value={this.state.groupName}
                />
              {groupNameError && <Text style={AppStyles.error}>Please enter event name</Text>} 
            </View>
            <View style={styles.eventContainer}>
                <Text style={[styles.listTitle,{marginBottom: 10}]}>Select Members to join</Text>
                <MultiSelect
                  items={userList}
                  uniqueKey="id"
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={get(this.state, 'selectedItems', '')}
                  selectText="Pick Members"
                  searchInputPlaceholderText="Search Names ..."
                  onChangeInput={text => console.log(text)}
                  tagRemoveIconColor="#CCC"
                  tagBorderColor="#3b5261"
                  tagTextColor="#A2a2a2"
                  selectedItemTextColor="#000"
                  selectedItemIconColor="green"
                  itemTextColor="#A2a2a2"
                  displayKey="name"
                  searchInputStyle={{ color: '#CCC' }}
                  submitButtonColor="#3b5261"
                  submitButtonText="Submit"
                  textColor="#A2a2a2"
                  itemFontSize={18}
                />
              {selectedItemsError && <Text style={AppStyles.error}>Please select the member</Text>} 
            </View>
            {/* <View style={styles.eventContainer}>
                <Text style={styles.listTitle}>To members who have not joined</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={()=>alert('call')}
                >
                  <Text style={AppStyles.buttonText}>Send Email Notification</Text>
                </TouchableOpacity>
            </View> */}
              <View style={styles.bottomView}>
                <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <TouchableOpacity style={[styles.cancelButton, {backgroundColor:'#A2a2a2'}]}
                    onPress={this._cancel.bind(this)}
                    >
                    <Text style={[styles.cancelText,{color:'#000'}]}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.cancelButton, {backgroundColor:'#3b5261'}]}
                    onPress={this.createGroup.bind(this)}
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
    backgroundColor:'#fff',
    // backgroundColor:'#e6e1de',

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
    color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(12),
    fontFamily: AppFonts.NRegular,
    letterSpacing: .2,
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
    borderBottomWidth: .6,
    color: '#000',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
    letterSpacing: .2,
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