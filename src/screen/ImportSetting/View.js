import React from 'react'
import {FlatList,Modal, Picker, TextInput, Switch, Platform, Alert, StyleSheet, Text, View, Button, SafeAreaView, Image, ScrollView, Dimensions, Animated, Easing, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Navbar from '../Common/commonNavbar'
import { get } from 'lodash'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { AppColors, AppSizes, AppFonts, AppStyles} from '../../theme'
import SwitchComponent from '../Common/Switch'
import ModalSelector from 'react-native-modal-selector'
import MultiSelect from 'react-native-multiple-select';


const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

let index = 0
const data = [
    { key: index++, label: 'Google Calender' },
    { key: index++, label: 'OutLoook Calender' },
]

const items = [{
  id: '92iijs7yta',
  name: 'Event Name'
}, {
  id: 'a0s0a8ssbsd',
  name: 'Date'
}, {
  id: '16hbajsabsd',
  name: 'Start Time'
}, {
  id: 'nahs75a5sg',
  name: 'End Time '
}, {
  id: '667atsas',
  name: 'Note(if any)'
}, {
  id: 'hsyasajs',
  name: 'Recurrence(if any)'
}, {
  id: 'djsjudksjd',
  name: 'Contacts(attached to event)'
}, {
  id: 'sdhyaysdj',
  name: 'Reminder set'
}, {
  id: 'suudydjsjd',
  name: 'Location'
  }
];

export default class ImportSetting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      importValue: true,
      selectCalender: 'Google Calender',
      selectValue: 'select multiple',
      selectedItems : [],
      modalVisible: false,
    }
  }
  OnChange=(value)=>{
    this.setState({ value: value, importValue: value, exportValue: value})
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems })
  }

  render() {
    const {modalVisible ,selectedItems, selectCalender, selectValue  } = this.state
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
              <Text style={styles.text}>Import from Calender</Text>
              <SwitchComponent OnChange={this.OnChange} value={this.state.importValue}/>
            </View>
          </View> 

          <View style={[styles.topContainer,{flexDirection:'row',justifyContent:'space-between'}]}>
              <Text style={[styles.text,{marginTop: 10}]}>Select Calender</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                 <ModalSelector
                    initValueTextStyle={[styles.text,{color:'#000'}]}
                    selectStyle={{borderColor: "transparent"}}
                    style={{right:20}}
                    // selectTextStyle={{color: "blue"}}
                    data={data}
                    initValue={selectCalender}
                    onChange={(option)=>this.setState({ selectCalender: option.label })} 
                  />
                 <Image source={require('../../assets/sidemenuAssets/Arrow_down.png')} style={styles.DropdownStyle}/>
              </View>
            </View>

            <View style={styles.topContainer}>
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
                  {/* <View>
                    {this.multiSelect.getSelectedItemsExt(selectedItems)}
                  </View> */}
                </View> 
                  {/* <TouchableOpacity onPress={()=>this.setState({modalVisible: true})} style={{marginRight:30, marginTop:10}}>
                   <Text style={[styles.text,{color:'#000'}]}>Select multiple</Text>
                  </TouchableOpacity>
                 <Image source={require('../../assets/sidemenuAssets/Arrow_down.png')} style={styles.DropdownStyle}/> */}
              </View> 
              </View>
              <Text style={{marginTop: 25}}>Interval (Minutes)</Text>
            </View>
            {/* <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                  {items.map(item=>{
                    return(
                    <TouchableOpacity onPress={this.onSelect(item.name)} style={{paddingHorizontal:30,paddingVertical:20, justifyContent:'center',width:'100%',borderBottomWidth:.3}}>
                      <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                    )
                  })
                  }
              </View>
            </View>
          </Modal> */}
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
  DropdownStyle: {
    height: 12, 
    width: 12, 
    marginTop: Platform.OS === 'android' ? 17 : 15 ,
    position:'absolute', 
    right: 8 
  },
  listTitle: {
	  color: '#A2a2a2',
	  fontSize: Platform.OS === 'android' ? AppSizes.verticalScale(16) : AppSizes.verticalScale(12),
    // fontFamily: AppFonts.NRegular,
    letterSpacing: .5,
    fontWeight: '500'
  },
  multiSelectView: {
    width: Platform.OS === 'android' ? AppSizes.verticalScale(180) : AppSizes.verticalScale(180),
    // marginLeft: 5 ,
    backgroundColor:'#fff'
  },
  // bottomContainer:{
  //   backgroundColor:'#fff',
  //   paddingLeft: 20,
  //   paddingRight: 20,
  //   // paddingTop: 20,
  //   paddingBottom: 80
  // },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    marginTop: 10,
    right: 5
  },
  modalView: {
    marginLeft: 100,
    marginRight: 20,
    backgroundColor: "white",
    // padding: 35,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})