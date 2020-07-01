import React from 'react'
import {Platform, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions } from 'react-native'
import Navbar from '../../Common/commonNavbar'
import { get, isEmpty } from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../../theme'
import SwitchComponent from '../../Common/Switch'
import ModalSelector from 'react-native-modal-selector'
import MultiSelect from 'react-native-multiple-select';
import AsyncStorage from '@react-native-community/async-storage'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
let index = 0
const data = [
    { label: 'Google Calender' },
    { label: 'OutLoook Calender' },
]

// const items = [{
//   id: '92iijs7yta',
//   name: 'Event Name'
// }, {
//   id: 'a0s0a8ssbsd',
//   name: 'Date'
// }, {
//   id: '16hbajsabsd',
//   name: 'Start Time'
// }, {
//   id: 'nahs75a5sg',
//   name: 'End Time '
// }, {
//   id: '667atsas',
//   name: 'Note(if any)'
// }, {
//   id: 'hsyasajs',
//   name: 'Recurrence(if any)'
// }, {
//   id: 'djsjudksjd',
//   name: 'Contacts(attached to event)'
// }, {
//   id: 'sdhyaysdj',
//   name: 'Reminder set'
// }, {
//   id: 'suudydjsjd',
//   name: 'Location'
//   }
// ];

export default class ImportSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      importCalendar: 0,
      settingDetails:[],
      selectCalendar: [],
      importDetails: [],
      listOfCalendar:[],
      isLoading: true,
      detailList: ['Event Name', 'Date', 'Start Time', 'End Time', 'Note(if any)', 'Recurrence(if any)', 'Contacts(attached to event)', 'Remainders set' , 'Location'],
      userId: '',
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    AsyncStorage.getItem('@user')
    .then((user) => {
      const user1 = JSON.parse(user)
      if(!isEmpty(user1)){
        this.setState({ userId: user1._id })
        this.props.getSetting(user1._id)
      }
    })
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.getSettingPhase){
      this.setState({ 
        settingDetails: get(this.props,'getSettingData',''),
        importCalendar: get(this.props,'getSettingData.Import.importCalendar',''),
        selectCalendar: get(this.props,'getSettingData.Import.selectCalendar',[]),
        importDetails: get(this.props,'getSettingData.Import.importDetails',[]),
        listOfCalendar: get(this.props,'getSettingData.ListOfCalendar.listOfCalendar',[]),
        isLoading: false
      })
    }
    if(this.props.updateSettingPhase){
      this.props.getSetting(this.state.userId)
    }
    this.props.resetSettingPhase()
  }

  onChange = (value) => {
    this.setState({ importCalendar: value },()=>{
      this.apiHit()
    })
  }

  onSelect = (name) => {
    const list = []
    if(name === 'Google Calender'){
      list.push('Google Calendar')
      this.setState({ selectCalendar: list}, ()=>{
        this.apiHit()
      })
    }
    if(name === 'OutLoook Calender'){
      list.push('Microsoft Calendar')
      this.setState({ selectCalendar: list}, ()=>{
        this.apiHit()
      })
    }
  }

  apiHit = () => {
    const data = {
      id: this.state.userId,
      value:{
        Import: {
          importCalendar: this.state.importCalendar,
          selectCalendar : this.state.selectCalendar,
          importDetails: this.state.importDetails
        }
      }
    }
    this.props.updateSetting(data)
  }

  render() {
    const { selectCalendar } = this.state
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'ImportSetting' ? 'Import Settings' : ''
    return (
      <SafeAreaView style={[styles.container,{backgroundColor: '#3b5261'}]}>
        <ScrollView style={styles.container}>
          <Navbar 
            navigation={this.props.navigation} 
            navTitle={route} 
            style={{ height: this.state.height }}
            routeKey={'ImportSetting'} 
          />
          <View style={styles.topContainer}>
            <View style={styles.firstView}>
              <Text style={styles.text}>Import from Calendar</Text>
              <SwitchComponent onChange={this.onChange} value={this.state.importCalendar} />
            </View>
          </View> 
          <View style={[styles.topContainer,{flexDirection:'row',justifyContent:'space-between'}]}>
            <Text style={[styles.text,{marginTop: 10}]}>Select Calender</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <ModalSelector
                  initValueTextStyle={[styles.text,{color:'#000'}]}
                  selectStyle={{borderColor: "black"}}
                  data={data}
                  initValue={get(this.state, 'selectCalendar', [])}
                  onChange={(option) => this.onSelect(option.label)}
                />
                {/* <Image source={require('../../../assets/sidemenuAssets/Arrow_down.png')} style={styles.DropdownStyle}/> */}
              </View>
          </View>

            {/* <View style={styles.topContainer}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={[styles.text,{marginTop: 10}]}>Import</Text>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                  <View style={styles.multiSelectView}>
                  <MultiSelect
                      hideTags={true}
                      canAddItems={false}
                      items={items}
                      uniqueKey="id"
                      // ref={(component) => { this.multiSelect = component }}
                      onSelectedItemsChange={this.onSelectedItemsChange}
                      selectedItems={selectedItems}
                      selectText="Select multiple"
                      fontSize={Platform.OS === 'android' ? 12: 14}
                      iconSearch={false}
                      itemTextColor='green'
                      searchInputPlaceholderText={'Select multiple'}
                      onChangeInput={ (text)=> console.log(text)}
                      // altFontFamily="ProximaNova-Light"
                      // tagRemoveIconColor="#CCC"
                      // tagBorderColor="#CCC"
                      // tagTextColor="#CCC"
                      itemFontSize={Platform.OS === 'android' ? 16 : 20}
                      itemTextColor="green"
                      selectedItemTextColor="#000"
                      selectedItemIconColor="green"
                      itemTextColor="#000"
                      styleDropdownMenu={<View><Text>kk</Text></View>}
                      // displayKey="name"
                      // searchInputStyle={{ color: 'red',height:100 }}
                      submitButtonColor="#A2a2a2"
                      submitButtonText="Submit"
                    />
                  </View> 
                </View> 
              </View>
            </View> */}
        </ScrollView>
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
    backgroundColor:'#fff',
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === 'android' ? 16 : 20,
    borderBottomWidth: .3,
    borderBottomColor: '#A2a2a2',
  },
  firstView : {
    flexDirection:'row',
    justifyContent:'space-between'
  },
  text: {
    marginTop: Platform.OS === 'android' ? 2 : 3 ,
    color:'#A2a2a2',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(14) : AppSizes.verticalScale(12),
  },
  // DropdownStyle: {
  //   height: 12, 
  //   width: 12, 
  //   marginTop: Platform.OS === 'android' ? 17 : 15 ,
  //   position:'absolute', 
  //   right: 8 
  // },
  // listTitle: {
	//   color: '#A2a2a2',
	//   fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(12),
  //   // fontFamily: AppFonts.NRegular,
  //   letterSpacing: .5,
  //   fontWeight: '500'
  // },
  // multiSelectView: {
  //   width: Platform.OS === 'android' ? AppSizes.verticalScale(180) : AppSizes.verticalScale(180),
  //   // marginLeft: 5 ,
  //   backgroundColor:'#fff'
  // },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: "center",
  //   marginTop: 10,
  //   right: 5
  // },
  // modalView: {
  //   marginLeft: 100,
  //   marginRight: 20,
  //   backgroundColor: "white",
  //   // padding: 35,
  //   // alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5
  // },
  // openButton: {
  //   backgroundColor: "#F194FF",
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2
  // },
  // textStyle: {
  //   color: "white",
  //   fontWeight: "bold",
  //   textAlign: "center"
  // },
  // modalText: {
  //   marginBottom: 15,
  //   textAlign: "center"
  // }
})