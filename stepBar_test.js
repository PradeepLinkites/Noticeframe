import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Alert,
  StatusBar,
  StyleSheet,
  ScrollView,
  DeviceEventEmitter,
  ActivityIndicator,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  Text,
  Switch,
  NativeModules,
  Platform,
  TextInput
} from 'react-native';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { AppStyles, AppSizes, AppFonts, AppColors } from '@theme/';
const { width, height } = Dimensions.get('window');
import {Column as Col, Row} from 'react-native-flexbox-grid';
import { Header } from 'react-navigation';
import { AppConfig } from '@constants/';
import StepIndicator from 'react-native-step-indicator';
import { Dropdown } from 'react-native-material-dropdown';
import { TextField } from 'react-native-material-textfield';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import NumericInput from 'react-native-numeric-input';
import categoryData from './data';

const styles = StyleSheet.create({

  container   : {
    flex: 1,
    width: '100%',
    backgroundColor: '#fff'
  },

});

const labels = ["New Query", "Date & Time", "Congrats"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: AppColors.app.mainColor,//'#fe7013',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: AppColors.app.mainColor,//'#fe7013',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: AppColors.app.mainColor,//'#fe7013',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: AppColors.app.mainColor,//'#fe7013',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: AppColors.app.mainColor,//'#fe7013',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: AppColors.app.mainColor,//'#fe7013'
}

// var categoryData = [
//   {
//     key: 1,
//     value: 'Home Improvement',
//     subCategory: [
//       {
//         id: 101,
//         name: 'Internal Wiring',
//       }, {
//         id: 102,
//         name: 'Flooring Experts',
//       }
//     ]
//   }, {
//     key: 2,
//     value: 'Events & Parties',
//     subCategory: [
//       {
//         id: 201,
//         name: 'Party Lawn Booking',
//       }, {
//         id: 202,
//         name: 'Party Hall Booking',
//       }
//     ]
//   }
// ];

var subCategoryData = [
  { key: 0, value: 'Decoration' },
  { key: 1, value: 'DJ Party' },
  { key: 2, value: 'Other' }
];

var eventData = [
  { key: 0, value: 'Decoration' },
  { key: 1, value: 'DJ Party' },
  { key: 2, value: 'Other' }
];

var guestsData = [
  { key: 0, value: 'Decoration' },
  { key: 1, value: 'DJ Party' },
  { key: 2, value: 'Other' }
];

var decorationData = [
  { key: 0, value: 'Decoration' },
  { key: 1, value: 'DJ Party' },
  { key: 2, value: 'Other' }
];

var eventClassData = [
  { key: 0, value: 'Decoration' },
  { key: 1, value: 'DJ Party' },
  { key: 2, value: 'Other' }
];

const getStepIndicatorIconConfig = ({ position, stepStatus }) => {

  const iconConfig = {
    name: 'check',
    color: stepStatus === 'finished' ? AppColors.app.mainColor : '#aaaaaa',
    size: 18
  }

  switch (position) {
    case 0: {
      iconConfig.name = 'check',
      iconConfig.color = stepStatus === 'finished' ? '#fff' : '#aaa' 
      break
    }
    case 1: {
      iconConfig.name = 'check'
      iconConfig.color = stepStatus === 'finished' ? '#fff' : '#aaa' 
      break
    }
    case 2: {
      iconConfig.name = 'check'
      iconConfig.color = stepStatus === 'finished' ? '#fff' : '#aaa' 
      break
    }
    default: {
      break
    }
  }
  return iconConfig
}

class ComponentView extends Component {

  static componentName = 'ComponentView';

  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = { 
      currentPosition: 0,
      serviceInvalid: false,
      newQuery: {
        category: 'Select Category',
        subCategory: 'Select SubCategory',
        location: '',
        event: 'Select Event',
        guests: 'Select Guests',
        decoration: 'Select Decoration Item',
        eventClass: 'Select Class',
        eventDate: '',
        eventTime: '',
        description: '',
        categoryId: -1,
        subCategoryId: '',
        eventId: '',
        guestsId: '',
        eventClassId: '',
        error: {}
      },
      categoryInvalid: false,
      subCategoryInvalid: false,
      locationInvalid: false,
      eventInvalid: false,
      guestsInvalid: false,
      decorationInvalid: false,
      eventClassInvalid: false,
      allCategory: categoryData,
      subCategoryData: subCategoryData,
      eventData: eventData,
      guestsData: guestsData,
      decorationData: decorationData,
      eventClassData: eventClassData,
    };
  }

  componentWillMount = () => {

  }

  componentDidMount = () => {
    
  }

  componentWillReceiveProps(props) {
   
  }

  renderStepView = (position, stepStatus) => {
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <Text>{position} {stepStatus}</Text>
    </View>
  }

  onPageChange(position) {
    this.setState({ currentPosition: position });
  }

  renderStepIndicator = params => (
    <MaterialIcon {...getStepIndicatorIconConfig(params)} />
  )

  addTime(time) {
    // var formatted = moment(time, "hh:mm");
    this.setState({ newQuery: Object.assign({}, this.state.newQuery, { eventTime: time }) })
  }

  next(position){
    const {newQuery} = this.state;
    const error = {}
    if (position == 1) {
      if (newQuery.category == 'Select Category') {
        error.category = 'Category is required';
      }
      if (newQuery.subCategory == 'Select SubCategory') {
        error.subCategory = 'SubCategory is required';
      }
      if (newQuery.location == '') {
        error.location = 'Location is required';
      }
    }
    if (position == 2) {
      
    }
    if (position == 3) {
      if (newQuery.eventDate == '') {
        error.eventDate = 'Date is required';
      }
      if (newQuery.eventTime == '') {
        error.eventTime = 'Time is required';
      }
    }

    this.setState({
      newQuery: Object.assign({}, this.state.newQuery, { error: error })
    });

    if (!Object.keys(error).length) {
      this.setState({currentPosition: position});
    }

  }

  render(){
    const { newQuery, allCategory, categoryId } = this.state;
    return(
      <View style={AppStyles.bodyContainer}>
        <StepIndicator
          renderStepIndicator={this.renderStepIndicator}
          customStyles={customStyles}
          currentPosition={this.state.currentPosition}
          // labels={labels}
          stepCount={4}
        />
        <ScrollView style={{width: '100%', padding: 10}}>
        { this.state.currentPosition == 0 &&
          <View style={AppStyles.stepperContainer}>
            <Text style={AppStyles.stepperTitle}>Select Service</Text>
            <Text style={AppStyles.steeperSubTitle}>Choose category and subcategory in this step. Also add location where service needed.</Text>
            <View style={{width: '90%'}}>
              <Dropdown
                error={newQuery.error.category}
                fontSize={16}
                baseColor={newQuery.category == 'Select Category' ? 'gray' : '#00afb3'}
                textColor={newQuery.category == 'Select Category' ? 'gray' : '#00afb3'}
                itemColor={'#000'}
                selectedItemColor={'#00afb3'}
                labelFontSize={16}
                value={newQuery.category}
                onChangeText={(value, index, data) => {
                  this.setState({ newQuery: Object.assign({}, newQuery, { category: value, categoryId: index, subCategory: 'Select SubCategory' }) })
                }}
                data={allCategory}
              />

              <Dropdown
                error={newQuery.error.subCategory}
                fontSize={16}
                baseColor={newQuery.subCategory == 'Select SubCategory' ? 'gray' : '#00afb3'}
                textColor={newQuery.subCategory == 'Select SubCategory' ? 'gray' : '#00afb3'}
                itemColor={'#000'}
                selectedItemColor={'#00afb3'}
                labelFontSize={16}
                value={newQuery.subCategory}
                onChangeText={(value, index, data) => {
                  this.setState({ newQuery: Object.assign({}, newQuery, { subCategory: value, subCategoryId: index }) })
                }}
                data={newQuery.categoryId == -1 ? [] : (allCategory[newQuery.categoryId] && allCategory[newQuery.categoryId].subCat)}
              />

              <TextField
                label={'Location Where Service Needed'}
                textColor={'#000'}
                fontSize={16}
                titleFontSize={16}
                labelFontSize={16}
                error={newQuery.error.location}
                tintColor={'#00afb3'}
                baseColor={newQuery.location != '' ? '#00afb3' : 'gray'}
                keyboardType={'email-address'}
                returnKeyType={"done"}
                autoCorrect={false}
                autoCapitalize={'none'}
                clearTextOnFocus={false}
                enablesReturnKeyAutomatically={true}
                // onSubmitEditing={() => this.refs.passwordRef.focus()}
                value={newQuery.location}
                onChangeText={(text) =>
                  this.setState({ newQuery: Object.assign({}, newQuery, { location: text }) })
                }
              />

              <TouchableOpacity style={[AppStyles.appBtn,{marginTop: 20}]} onPress={this.next.bind(this,1)}>
                <Text style={AppStyles.appBtnText}>NEXT</Text>
              </TouchableOpacity>

            </View>
          </View>
        }

        { this.state.currentPosition == 1 &&
          <View style={AppStyles.stepperContainer}>
            <Text style={AppStyles.stepperTitle}>Customize Requirements</Text>
            <Text style={AppStyles.steeperSubTitle}>You can customize your requirments on this step. Choose date and time and features you want.</Text>
            <View style={{ width: '90%' }}>
              <Dropdown
                error={newQuery.error.event}
                fontSize={16}
                baseColor={newQuery.event == 'Select Event' ? 'gray' : '#00afb3'}
                textColor={newQuery.event == 'Select Event' ? 'gray' : '#00afb3'}
                itemColor={'#000'}
                selectedItemColor={'#00afb3'}
                labelFontSize={16}
                value={newQuery.event}
                onChangeText={(value, index, data) => {
                  this.setState({ newQuery: Object.assign({}, newQuery, { event: value, eventId: index }) })
                }}
                data={this.state.eventData}
              />

              <Dropdown
                error={newQuery.error.guests}
                fontSize={16}
                baseColor={newQuery.guests == 'Select Guests' ? 'gray' : '#00afb3'}
                textColor={newQuery.guests == 'Select Guests' ? 'gray' : '#00afb3'}
                itemColor={'#000'}
                selectedItemColor={'#00afb3'}
                labelFontSize={16}
                value={newQuery.guests}
                onChangeText={(value, index, data) => {
                  this.setState({ guestsInvalid: false, newQuery: Object.assign({}, newQuery, { guests: value, guestsId: index }) })
                }}
                data={this.state.guestsData}
              />

              <Dropdown
                error={newQuery.error.decoration}
                fontSize={16}
                baseColor={newQuery.decoration == 'Select Decoration Item' ? 'gray' : '#00afb3'}
                textColor={newQuery.decoration == 'Select Decoration Item' ? 'gray' : '#00afb3'}
                itemColor={'#000'}
                selectedItemColor={'#00afb3'}
                labelFontSize={16}
                value={newQuery.decoration}
                onChangeText={(value, index, data) => {
                  this.setState({ decorationInvalid: false, newQuery: Object.assign({}, newQuery, { decoration: value, decorationId: index }) })
                }}
                data={this.state.decorationData}
              />

              <Dropdown
                error={newQuery.error.eventClass}
                fontSize={16}
                baseColor={newQuery.eventClass == 'Select Class' ? 'gray' : '#00afb3'}
                textColor={newQuery.eventClass == 'Select Class' ? 'gray' : '#00afb3'}
                itemColor={'#000'}
                selectedItemColor={'#00afb3'}
                labelFontSize={16}
                value={newQuery.eventClass}
                onChangeText={(value, index, data) => {
                  this.setState({ eventClassInvalid: false, newQuery: Object.assign({}, newQuery, { eventClass: value, eventClassId: index }) })
                }}
                data={this.state.eventClassData}
              />

              <TouchableOpacity style={[AppStyles.appBtn, { marginTop: 20 }]} onPress={this.next.bind(this, 2)}>
                <Text style={AppStyles.appBtnText}>NEXT</Text>
              </TouchableOpacity>

            </View>
          </View>
        }
        { this.state.currentPosition == 2 &&
          <View style={AppStyles.stepperContainer}>
            <View style={{ width: '90%', alignItems: 'center' }}>
              <Text style={AppStyles.stepperTitle}>Select Date & Time</Text>
              <Text style={AppStyles.steeperSubTitle}>You can select your date & time on this step. Fill details description for extra features.</Text>
              <Row style={{marginTop: 10}}>
                <Col sm={8} md={8} lg={8}>
                  <View style={['eventDate' in newQuery.error ? { borderBottomColor: 'red' } : { borderBottomColor: 'lightgray' }, { flexDirection: 'row', width: '92%', justifyContent: 'center', alignItems: 'center', marginRight: 5, borderBottomWidth: 1 }]}>
                    <Image source={require('../../../assets/icons/calendar.png')} style={[AppStyles.dateIcon,{tintColor: AppColors.app.mainColor}]} />
                    <DatePicker
                      label={'Date'}
                      style={{ width: '90%'}}
                      customStyles={{
                        placeholderText: {
                          fontFamily: AppFonts.LRegular,
                          fontSize: 16, letterSpacing: 0.8
                        },
                        dateText: {
                          fontFamily: AppFonts.LRegular,
                          fontSize: 16, 
                          letterSpacing: 0.8,
                          color: AppColors.app.mainColor
                        },
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {  
                          borderWidth: 0,
                          alignItems: 'flex-start',
                          marginLeft: 0,
                          fontFamily: AppFonts.LRegular, fontSize: AppSizes.scale(16), letterSpacing: 0.8
                        }
                      }}
                      date={newQuery.eventDate}
                      mode="date"
                      showIcon={false}
                      placeholder="Event Date"
                      format="MMMM DD, YYYY"
                      minDate={new Date()}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      onDateChange={(index, date) => 
                        this.setState({ newQuery: Object.assign({}, newQuery, { eventDate: date}) })
                      }
                    />
                  </View>
                  { 'eventDate' in newQuery.error &&
                      <Text style={{color: 'red'}}>{newQuery.error.eventDate}</Text>
                  }
                </Col>
                <Col sm={4} md={4} lg={4}>
                  <View style={['eventTime' in newQuery.error ? { borderBottomColor: 'red' } : { borderBottomColor: 'lightgray' }, { flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1}]}>
                    <Image source={require('../../../assets/icons/clock.png')} style={[AppStyles.dateIcon]} />
                    <DatePicker
                      label={'Time'}
                      style={{ width: '100%'}}
                      customStyles={{
                        placeholderText: {
                          fontFamily: AppFonts.LRegular,
                          fontSize: 16, 
                          letterSpacing: 0.8
                        },
                        dateText: {
                          fontFamily: AppFonts.LRegular,
                          fontSize: 16, 
                          letterSpacing: 0.8,
                          color: AppColors.app.mainColor
                        },
                        dateIcon: {
                          position: 'absolute',
                          left: 0,
                          top: 4,
                          marginLeft: 0
                        },
                        dateInput: {
                          borderWidth: 0,
                          alignItems: 'flex-start',
                          marginLeft: 0,
                          fontFamily: AppFonts.LRegular,fontSize: AppSizes.scale(16),letterSpacing: 0.8
                        }
                      }}  
                      date={newQuery.eventTime}
                      mode="time"
                      placeholder="Event Time"
                      format="HH:mm"
                      is24Hour={false}
                      showIcon={false}
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      minuteInterval={10}
                      onDateChange={this.addTime.bind(this)}
                    />
                  </View>
                  {'eventTime' in newQuery.error &&
                    <Text style={{ color: 'red' }}> {newQuery.error.eventTime}</Text>
                  }
                  {/* <View style={AppStyles.dateBootmBorder} /> */}
                </Col>
              </Row>
                      
              <View style={{ marginTop: 25, padding: 2, height: AppSizes.verticalScale(140), borderRadius: 10, width: '100%', backgroundColor: 'transparent', borderColor: 'gray', borderWidth: 1 }}>
                <TextInput
                  placeholder="Description"
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    borderRadius: 10,
                    textAlignVertical: "top",
                    color: AppColors.app.mainColor
                  }}
                  value={this.state.newQuery.description}
                  onChangeText={(text) =>
                    this.setState({ descriptionInvalid: false, newQuery: Object.assign({}, this.state.newQuery, { description: text }) })
                  }
                  multiline={true}
                  returnKeyType={"done"}
                  underlineColorAndroid='transparent'
                />
              </View>

              <TouchableOpacity style={AppStyles.appBtn} onPress={this.next.bind(this, 3)}>
                <Text style={AppStyles.appBtnText}>DONE</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        { this.state.currentPosition == 3 &&
          <View style={AppStyles.stepperContainer}>
            <View style={{ width: '90%', alignItems: 'center' }}>
              <Text style={AppStyles.stepperTitle}>Congratulations</Text>
              <View style={{ marginTop: 10 , borderRadius: 50, backgroundColor: AppColors.app.greenColor, padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={AppStyles.title}>Query Submitted Successfully</Text>
              </View>
              <Text style={[AppStyles.steeperSubTitle,{marginTop: 15}]}>You can customize your requirments on this step. Choose date and time and features you want.</Text>
              <Text style={AppStyles.stepperTitle}>QRN-123-WQJFD</Text>
              <Text style={[AppStyles.steeperSubTitle, { marginTop: 15 }]}>You can customize your requirments on this step. Choose date and time and features you want.</Text>
              <TouchableOpacity style={AppStyles.appBtn}  onPress={() => this.props.onTabChange()}>
                <Text style={AppStyles.appBtnText}>View Your Query</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        </ScrollView>
      </View>
    )
  }
}

ComponentView.route = {  };
/* Export Component ==================================================================== */
export default ComponentView;
