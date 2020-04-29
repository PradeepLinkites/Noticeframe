import React from 'react'
import { 
  Alert,
  FlatList,
  StyleSheet, 
  Text, 
  View, 
  Button, 
  SafeAreaView, 
  Dimensions, 
  Animated, 
  Easing, 
  TouchableOpacity, 
} from 'react-native'
import Navbar from '../Common/Navbar'
import { get, find, isEmpty, size } from 'lodash'
import MasonryList from "../../lib/masonrylist"
import Lightbox from '../../lib/lightbox'
import data from '../../data'
import { ViewPager } from 'react-native-viewpager-carousel'
import { AppStyles } from '../../theme'
import FastImage from 'react-native-fast-image'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from "react-native-modal";
import CheckBox from 'react-native-checkbox';
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height
import AwesomeButton from 'react-native-really-awesome-button'
import { AppColors, AppSizes } from '../../theme'
import { ActivityIndicator } from 'react-native-paper'
export default class Home extends React.Component {

  scrollListReftop
  offset= 0

  constructor(props) {
    super(props);
    this.state = {
      hideNavbar: true,
      height: new Animated.Value(60),
      allData: [],
      isGame: false,
      videosData: [],
      allVideosData: [],
      getCategoryData:[],
      filterCategoryData: [],
      isModalVisible: false,
      getUserData: {},
      contentHeight: 0,
      all: false,
      loadingMore: false,
      page: 0
    }
    this.getSelectVideo = this.getSelectVideo.bind(this)
  }

  componentDidMount(){
    this.props.getCategory()
    AsyncStorage.getItem('@user').then(item=>{
      const user = JSON.parse(item)
      if(user){
        this.setState({ getUserData : user })
        this.props.getUser(user.userId)
      }
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    return { getUserData: nextProps.getUserData, videosData: nextProps.selectCategoryData, getCategoryData: nextProps.categoryData.categories }
  }

  componentDidUpdate(prevProps) {

    if (this.props.selectCategoryPhase === true) {
      this.props.resetVideosPhase()
      this.setState({ videosData: this.props.selectCategoryData, getCategoryData: this.props.categoryData.categories, isLoading: false }); 
      // console.log(this.props.selectCategoryPhase,' videos aa gye ===^^^^^^^^^===>>> ', (this.props.selectCategoryData))
      if(size(this.props.selectCategoryData) > 0) {
        let oldVideos = []
        oldVideos = [...this.state.allVideosData,...this.props.selectCategoryData]
        this.setState({ allVideosData: oldVideos })
        setTimeout(() => {
          this.setState({ loadingMore: false })
        },500)
      }
    }
    
    if (this.props.getCategoryData !== prevProps.getCategoryData) {
      this.setState({ getCategoryData: this.props.categoryData.categories });
    }

    if(this.props.getUserPhase) {
      this.props.resetPhase()
      this.setState({ getUserData: this.props.getUserData })
      this.props.screenProps.updateUser(this.props.getUserData)
      AsyncStorage.setItem('@user',JSON.stringify(this.props.getUserData))
      let user = this.props.getUserData
      let catArraay = ["ChdiGV2Y", "ofAXMfcT"]
      if(size(user, 'categoryInterests', []) > 0 ){
        catArraay = user.categoryInterests
      }
      let params = {};
      params.filterIds = catArraay;
      params.page_no = 0;
      params.userId = user.userId
      // console.log('sending params =>', params)
      this.props.getCategoryVideos(params)
    }
  
    if(this.props.updateUserPhase) {
      this.props.resetPhase()
      this.setState({ isModalVisible: false, isLoading: true, allVideosData: [], loadingMore: false })
      if(get(this.state.getUserData,'userId','') !== ''){
        this.props.getUser(this.state.getUserData.userId)
      } else {
        AsyncStorage.getItem('@user').then(item=>{
          const user = JSON.parse(item)
          if(user){
            this.setState({ getUserData : user })
            this.props.getUser(user.userId)
          }
        })
      }
    }
  }

  addMoreImages = () => {
    const { getUserData } = this.state
    if (!this.state.loadingMore) {
      this.setState({ loadingMore: true })
      let page = this.state.page
      page = page + 1 // increase page by 1
      this.setState({ page })
      if(!isEmpty(getUserData)) {
        let params = {};
        params.filterIds = getUserData.categoryInterests;
        params.page_no = page;
        params.userId = getUserData.userId
        // console.log('on loading more param =>', params)
        this.props.getCategoryVideos(params)
      }
    }
  }

  handleScroll = (e) => {
    // if (this.isCloseToBottom(e.nativeEvent)) {
    //   clearInterval(this.scrollRef)
    //   this.scrollRef = setInterval(() => {
    //     this.addMoreImages()
    //     clearInterval(this.scrollRef)
    //   },500)
    // }

    var currentOffset = e.nativeEvent.contentOffset.y;
    var direction = currentOffset > this.offset ? 'down' : 'up';
    this.offset = currentOffset;
    if(direction === 'down' && this.offset > 5){
      this._setAnimation(false)
    } else {
      if(this.isCloseToBottom(e.nativeEvent)){
        this._setAnimation(false)
      } else {
        this._setAnimation(true)
      }
    }
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 10;
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
  }

  _setAnimation(enable) {
    Animated.timing(this.state.height, {
      duration: 50,
      toValue: enable? 60 : 0,
      easing: Easing.ease,
      // delay: 500
    }).start()
  }

  // onOpenTile = (item) => {
  //   // this.props.navigation.setParams({
  //   //   videoItem,
  //   //   allVideos: data
  //   // })
  //   console.log('call 23123131231231232 => ',item)
  // }

  // renderCarousel = (item) => {
  //   return <VideoPlayer navigation={this.props.navigation} videoItem={item} allVideos={this.state.videosData} />
  // }

  // renderImage= (item) => {
  //   console.log('video 1212121212 => ', item)
  //   let isUrl = get(item,'source.uri','')
  //   let videoItem = {}
  //   if(isUrl !== ''){
  //     videoItem = this.state.videosData.find((d) => {
  //       return get(d,'uri','') === isUrl
  //     })
  //   }
  //   return(
  //       <Lightbox
  //         springConfig={{ overshootClamping: true, friction: 5 }}
  //         swipeToDismiss={true}
  //         // onOpen={this.onOpenTile.bind(this,videoItem)}
  //         renderContent={this.renderCarousel.bind(this, videoItem)}
  //         // activeProps={{ opacity: 0, backgroundColor: 'red' }}
  //         // backgroundColor={'transparent'}
  //         // underlayColor={'transparent'}
  //         // renderHeader={() => <View />}
  //         // renderHeader={close => <TouchableOpacity onPress={() => alert('call')} style={{ width: 500, height: 500, backgroundColor: 'red', flex: 1 }}>
  //         //      <Text>CLOSE</Text>
  //         //    </TouchableOpacity>
  //         // }
  //       >
  //         <FastImage {...item} />
  //       </Lightbox>
  //   )
  // }


  renderFastImage(item){
    return(
      <FastImage {...item} />
    )
  }

  playVideoItem = (item,index) => {
    this.props.navigation.navigate('VideoPlayer', { videoItem: item })
  }

  getSelectVideo(params){
    this.props.selectCategory(params)  
  }

  _onFilterSubmit = () => {
    const { filterCategoryData, getUserData } = this.state
    let filterObjArr = filterCategoryData.filter((item) => {
      return get(item,'isChecked','') === true
    })
    let filterIds = []
    if(size(filterObjArr) >= 1) {
      for (let index = 0; index < filterObjArr.length; index++) {
        const element = filterObjArr[index]
        filterIds.push(element.categoryId)
      }
      var params = {};
      params.categoryInterests = filterIds;  
      params.page_no = 0;
      params.userId = get(getUserData, 'userId', '')
      this.props.updateUser(params)
    } else {
      Alert.alert('KIKO','Select atleast 1 categories')
    }
  }

  isCheckedCategoryFilter = () => {
    const { getUserData, getCategoryData } = this.state
    let filterLocalData = []
    filterLocalData = getCategoryData
    for( let i=0, len= size(filterLocalData); i<len; i++ ){
      let obj = {}
      obj = filterLocalData[i]
      if(get(obj,'isChecked','') !== '') {
        delete obj.isChecked
        filterLocalData[i] = obj
      }
    }
    let userCategory = size(getUserData.categoryInterests) === 0 ? ["ChdiGV2Y", "ofAXMfcT"] : getUserData.categoryInterests
    if(size(userCategory) === size(getCategoryData)) {
      this.setState({ all: true })
    } else {
      this.setState({ all: false })
    }
    setTimeout(async () => {
      let filterData = await userCategory.map(( id ) => {
                              for( let i=0, len= size(filterLocalData); i<len; i++ ){
                                let obj = {}
                                obj = filterLocalData[i]
                                if( obj.categoryId === id ) {
                                  obj['isChecked'] = true
                                  filterLocalData[i] = obj
                                }
                              }
                            })
      this.setState({ filterCategoryData: filterLocalData })
    },100)
  }

  toggleAllCheckbox = (isAll) => {
    let filterData = this.state.filterCategoryData
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
        delete obj.isChecked
        filterData[i] = obj
      }
    }
    this.setState({ all : isAll, filterCategoryData: filterData})
  }

  toggleCheckbox = (item,index) => {
    let { filterCategoryData, getCategoryData } = this.state
    let filterData = filterCategoryData
    let obj = filterData[index]
    if(get(obj,'isChecked',false)) {
      delete obj.isChecked
    } else {
      obj['isChecked'] = true
    }
    filterData[index] = obj
    this.setState({ filterCategoryData: filterData }, () => {
      let checkedItems = this.state.filterCategoryData.filter((cat,i) => {
                          return get(cat,'isChecked','')
                        })
      if(size(checkedItems) !== size(getCategoryData)) {
        this.setState({ all: false })
      } else {
        this.setState({ all: true })
      }
    })
  }

  onFilter = () => {
    this.isCheckedCategoryFilter()
    this.setState({ isModalVisible: true })
  }

  _renderCategories = ({item, index}) => {
    return(
      <View key={item.categoryId} style={{ padding:10, height:50, margin: 3, justifyContent:'center' }}>
        <CheckBox
          checkboxStyle={{tintColor:'green'}}
          label={item.title.charAt(0).toUpperCase() + item.title.slice(1)}
          labelStyle={{color: 'black', fontSize:16,fontWeight:'400'}}
          checked={get(item, 'isChecked','') ? true : false }
          onChange={(e) => this.toggleCheckbox(item,index)}
        />
      </View>
    )
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ contentHeight: contentHeight })
  };

  MasonryCustomComponent = (props) => (
    <FastImage
      resizeMode="cover"
      source={{ uri: props.data.uri }}
      style={{ width: props.style.width, height: props.style.height, margin: props.style.margin }}
    />
  )

  render() {
    const { state } = this.props.navigation
    const route = get(state, 'routeName', '')  === 'Home' ? 'KIKO KIDS' : ''
    const { isLoading, allVideosData, filterCategoryData, isModalVisible, height, contentHeight, all } = this.state
    const scrollEnabled = contentHeight > (deviceHeight - 150)
    return (
      <SafeAreaView style={AppStyles.container}>
        <Navbar  
          onFilter={this.onFilter}
          navigation={this.props.navigation} 
          navTitle={route} 
          stylee={{ height: height }} 
          routeKey={'Home'}
        />
        { isLoading ?
          <ActivityIndicator size="large" color="#000" />
          :
          size(allVideosData) > 0 &&
            <MasonryList
              images={allVideosData}
              columns={3}
              onEndReached={(distanceFromEnd) => (distanceFromEnd.distanceFromEnd < 0) && this.addMoreImages()}
              onEndReachedThreshold={0}
              listContainerStyle={{ margin: 0, padding: 0, alignItems: 'center', justifyContent: 'center' }}
              customImageComponent={this.renderFastImage.bind(this)}
              masonryFlatListColProps={{
                scrollEnabled: scrollEnabled,
                onScroll: this.handleScroll.bind(this),
                onContentSizeChange: this.onContentSizeChange.bind(this),
                extraData: this.state
              }}
              onPressImage={(item,index) => this.playVideoItem(item,index)}
              // rerender={true}
              // sorted={true}
              // backgroundColor={'#FFF'}
              // imageContainerStyle={{ margin: 0, padding: 0 }}
              // onImageResolved={() => console.log('all images resolved 434343434343434343434 ')}
              // completeCustomComponent={(props) => this.MasonryCustomComponent(props)}
            />
        }
        { isModalVisible &&
          <View style={{ flex: 1 }}>
            <Modal 
              isVisible={isModalVisible}
              backdropColor={'#000'}
              backdropOpacity={0.75}
              animationIn={'zoomInDown'}
              animationOut={'zoomOutUp'}
            >
              <View style={{ height: (deviceHeight - 150), width: '100%', backgroundColor:'#fff', pading: 15 }}>
                <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => this.setState({ isModalVisible: false, all: false })} style={{ position: 'absolute', right: 10, padding: 5 }}>
                      <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold' }}>X</Text>
                    </TouchableOpacity>
                    <Text style={{ alignSelf:'center', fontSize: 18, fontWeight:'500' }}>Please Select Category</Text>
                </View>
                <View style={{ flex:1 }}>
                  <View style={{ padding:10, height:50, margin: 3, justifyContent:'center' }}>
                    <CheckBox
                      checkboxStyle={{tintColor:'green'}}
                      label={'All'}
                      labelStyle={{color: 'black', fontSize:16, fontWeight:'400'}}
                      checked={all ? true : false }
                      onChange={(e) => this.toggleAllCheckbox(!all)}
                    />
                  </View>
                  <FlatList
                    data={filterCategoryData}
                    extraData={this.state}
                    keyExtractor={(item) => item.categoryId}
                    renderItem={this._renderCategories}
                  />
                </View>
                <AwesomeButton
                    // disabled={loading}
                    type="primary"
                    color={'#FFF'}
                    backgroundColor={AppColors.app.button}
                    backgroundDarker={AppColors.app.buttonShadow}
                    height={AppSizes.verticalScale(40)}
                    width={deviceWidth - 160}
                    textSize={AppSizes.verticalScale(14)}
                    onPress={this._onFilterSubmit}  
                    borderRadius={50}
                    style={{ margin: 15, alignSelf:'center' }}
                >
                    Get Videos
                </AwesomeButton>
              </View>
            </Modal>
          </View>
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})