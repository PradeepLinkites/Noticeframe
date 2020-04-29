import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View ,TouchableOpacity,Dimensions, Alert} from 'react-native';
import CheckBox from 'react-native-checkbox';
import {get,size} from 'lodash';
import AwesomeButton from 'react-native-really-awesome-button'
import { AppFonts, AppSizes, AppColors, AppStyles } from '../../theme'
import { StackActions, NavigationActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

export default class FlatListBasics extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          userId:'',
          editUserData: {},
          all: true,
          categoryData: [],
          filterCategoryData: []
        };
    }

    componentDidMount(){
      this.props.getCategory()
    }

    static getDerivedStateFromProps(nextProps, prevState){
      return { categoryData: nextProps.categoryData.categories }
   }

   componentDidUpdate(prevProps) {
    if (this.props.categoryData !== prevProps.categoryData) {
        this.setState({categoryData: this.props.categoryData.categories , isLoading: false });  
        this.toggleAllCheckbox(this.state.all)
    } 
    if (this.props.editUserData !== prevProps.editUserData) {
      if( get(this.props.editUserData, 'success', false)){
        this.props.getUser(this.state.userId)
        this.setState({editUserData: this.props.editUserData , isLoading: false });     
      }else{
        this.setState({ isLoading: false })
      }
    } 
  }

  toggleAllCheckbox = (isAll) => {
    let filterData = this.state.categoryData
    console.log('error ha yanha => ', this.state.categoryData)
    if(isAll) {
      for( let i=0, len= size(filterData); i<len; i++ ){
        let obj = {}
        obj = filterData[i]
        obj['isChecked'] = true
        filterData[i] = obj
      }
    } else {
      for( let i=0, len= size(filterData); i<len; i++ ){
        let obj = {}
        obj = filterData[i]
        if(get(obj,'isChecked','') !== '') {
          delete obj.isChecked
          filterData[i] = obj
        }
      }
    }
    this.setState({ all : isAll, filterCategoryData: filterData})
  }
  
  toggleCheckbox = (item) => {
    let { filterCategoryData, categoryData } = this.state
    if(get(item, 'item.isChecked','') !== ''){
      delete this.state.categoryData[item.index].isChecked
    }else{
      this.state.categoryData[item.index].isChecked = true
    }
    this.setState({ filterCategoryData : this.state.categoryData}, () => {
      let checkedItems = this.state.filterCategoryData.filter((cat,i) => {
                          return get(cat,'isChecked','')
                        })
      if(size(checkedItems) !== size(categoryData)) {
        this.setState({ all: false })
      } else {
        this.setState({ all: true })
      }
    })
  }

  onSubmit = () => {
    const { filterCategoryData } = this.state
    let filterIds = []
    let checkedArray = filterCategoryData.map((item) => {
                          if(get(item,'isChecked','') !== '') {
                            filterIds.push(item.categoryId)
                          }
                      })
    if(size(filterIds) >= 1) {
      var params = {};
      params.categoryInterests = filterIds;  
      params.page_no = 0;
      params.userId = get(this.props.getUserData, 'userId', '')
      this.props.updateUser(params)
    } else {
      Alert.alert('KIKO','Select atleast one category.')
    }
  }

  render() {
    const { all, filterCategoryData} = this.state
    return (
      <View style={styles.container}>
          { size(filterCategoryData) > 0 &&
            <View style={styles.checkBoxContainer}>
              <CheckBox
                checkboxStyle={{tintColor:'green'}}
                label={'All'}
                labelStyle={styles.item}
                checked={all ? true : false}
                onChange={(e)=>this.toggleAllCheckbox(!all)}
              />
            </View>
          }
          <FlatList
            data={filterCategoryData}
            keyExtractor={(item) => item.categoryId}
            renderItem ={(data, ind) => 
            {
              return(
                <View style={styles.checkBoxContainer}>
                  <CheckBox
                    checkboxStyle={{tintColor:'green'}}
                    label={data.item.title.charAt(0).toUpperCase() + data.item.title.slice(1)}
                    labelStyle={styles.item}
                    checked={get(data.item, 'isChecked','') ? true: false}
                    onChange={(e)=>this.toggleCheckbox(data)}
                  />
                </View>
              )
            }} 
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 60
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  checkBoxContainer:{
    marginTop:5
  }
})