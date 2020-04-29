import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  SafeAreaView
} from 'react-native'
import Video from 'react-native-video'
import MediaControls from './VideoControl/MediaControls'
import { NavigationEvents } from 'react-navigation'
import { get, isEmpty } from 'lodash'
import { AppSizes, AppFonts } from '../../theme'
import FastImage from 'react-native-fast-image'
import Orientation from 'react-native-orientation'

const PLAYER_STATES = {
  PLAYING: 0,
  PAUSED: 1,
  ENDED: 2
}

class VideoPlayer extends Component {
  
  videoPlayer
  timerref
  
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      title: '',
      currentTime: 0.0,
      duration: 0.0,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      videoLink: '',
      videoIndexChange: -1,
      allVideosLength: 0,
      modal: false,
      isCloseConfirm: false,
      isVideoSetting: false,
      isVideoInfo: false,
      poster: '',
      orientation: 'portrait',
      isMediaControl: true,
      videoDuration: '',
      videoPlayed: 0,
      videoSpeed: 1.0,
      videoSpeedLabel: 'Normal',
      speedOptions: [
        { key: '0.5x', value: '0.5x' },
        { key: 'Normal', value: 'Normal' },
        { key: '1.25x', value: '1.25x' },
        { key: '1.5x', value: '1.5x' },
        { key: '2x', value: '2x' }
      ]
    }
  }

  componentDidMount = async () => {
    // try {
    //   const { navigation } = this.props
    //   const { allVideos, videoItem } = this.props
    //   var videoIndex = allVideos.findIndex(item => {
    //     var videoId = get(item, 'id', 0)
    //     return videoId === videoItem.id
    //   })
    //   var videosLength = allVideos.length
    //   this.setState({
    //     videoIndexChange: videoIndex,
    //     allVideosLength: videosLength
    //   })
    //   var vimeoUrl = get(videoItem, 'vimeouri', '')
    //   var id = get(videoItem, 'id', 0)
    //   var title = get(videoItem, 'title', '')
    //   // All Values set dynamic
    //   var videoId = vimeoUrl.split('https://vimeo.com/')[1].replace(/\s+/g, '')
    //   var vimeoApi = `https://player.vimeo.com/video/${videoId}/config`
    //   const response = await fetch(vimeoApi)
    //   const myJson = await response.json()
    //   // console.log('vimeoApi myJson', myJson)
    //   const linksArray = get(myJson, 'request.files.progressive', [])
    //   const thumb = get(myJson, 'video.thumbs.1280', '640')
    //   this.setState({ poster: thumb })
    //   if (linksArray.length > 0) {
    //     var url = linksArray[0].url.split('?')[0]
    //     const videoLink = url
    //     const newState = {
    //       videoLink,
    //       id,
    //       title,
    //       playerState: PLAYER_STATES.PLAYING
    //     }
    //     this.setState(newState)
    //     this.onPaused()
    //   }
    // } catch (error) {
    //   console.log('video player error', error)
    // }

    // setTimeout(() => {
    //   this.setState({ isMediaControl: false })
    // }, 10000)

    this.getOrientation()
    Dimensions.addEventListener('change', this.getOrientation)
  }

  componentWillUnmount() {
    Orientation.lockToPortrait()
    Dimensions.removeEventListener('change', this.getOrientation)
  }

  getOrientation = () => {
    if (Dimensions.get('window').width < Dimensions.get('window').height) {
      this.setState({ orientation: 'portrait' })
    } else {
      this.setState({ orientation: 'landscape' })
    }
  }

  onSeek = (seek) => {
    this.videoPlayer.seek(seek)
  }

  onPaused = () => {
    this.setState({
      paused: !this.state.paused,
      playerState: !this.state.paused
        ? PLAYER_STATES.PAUSED
        : PLAYER_STATES.PLAYING
    })
  }

  onReplay = () => {
    this.videoPlayer && this.videoPlayer.seek(0)
    this.setState({
      currentTime: 0.0
    })
    this.onPaused()
  }

  onProgress = (data) => {
    const { isLoading, playerState } = this.state
    if ( !isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime })
    }
  }

  onLoad = (data) => {
    this.setState({
      duration: data.duration,
      isLoading: false,
      playerState: PLAYER_STATES.PAUSED,
      currentTime: 0.0
    })
    this.onPaused()
    // if (this.state.nextVideoLoading) {
    //   // this.onPaused()
    //   this.setState({
    //     paused: true
    //   })
    // }
  }

  onLoadStart = () => this.setState({ isLoading: true })

  onEnd = () => {
    this.setState(
      {
        playerState: PLAYER_STATES.ENDED,
        paused: true,
        currentTime: this.state.duration,
        videoPlayed: this.state.videoPlayed + 1
      },
      () => {
        
      }
    )
  }

  onError = () => alert('Oh! Error')

  exitFullScreen = () => {
    alert('Exit full screen')
  }

  onFullScreen = () => {
    if (this.state.screenType === 'content') {
      this.setState({ screenType: 'cover' })
    } else {
      this.setState({ screenType: 'content' })
    }
  }

  onSeeking = (currentTime) => {
    this.setState({ currentTime })
  }

  openPopup = (popKey) => {
    // if (popKey === 'chapterList') {
    //   this.setState({ modal: true })
    // } else if (popKey === 'closeConfirm') {
    //   this.setState({ isCloseConfirm: true })
    // } else if (popKey === 'videoSetting') {
    //   this.setState({ isVideoSetting: true })
    // } else if (popKey === 'videoInfo') {
    //   this.setState({ isVideoInfo: true })
    // }
  }

  onVideoChange = async (isChange) => {
    // const { navigation } = this.props
    // const { allVideos } = navigation.state.params
    // var videoIndexChange = this.state.videoIndexChange
    // if (isChange === 'next') {
    //   videoIndexChange++
    // } else {
    //   videoIndexChange--
    // }
    // this.setState({
    //   videoIndexChange
    // })
    // var newVideoItem = allVideos[videoIndexChange]
    // var vimeoUrl = get(newVideoItem, 'vimeouri', '')
    // var id = get(newVideoItem, 'id', 0)
    // var title = get(newVideoItem, 'title', '')
    // try {
    //   var videoId = vimeoUrl.split('https://vimeo.com/')[1]
    //   var vimeoApi = `https://player.vimeo.com/video/${videoId}/config`
    //   const response = await fetch(vimeoApi)
    //   const myJson = await response.json()
    //   const linksArray = get(myJson, 'request.files.progressive', [])
    //   const thumb = get(myJson, 'video.thumbs.1280', '640')
    //   this.setState({ poster: thumb })
    //   if (linksArray.length > 0) {
    //     var url = linksArray[0].url.split('?')[0]
    //     const videoLink = url
    //     this.setState({
    //       videoLink,
    //       id,
    //       title
    //     })
    //     this.setState({
    //       currentTime: 0.0,
    //       nextVideoLoading: true,
    //     })
    //     this.onPaused()
    //     this.forceUpdate()
    //   }
    // } catch (error) {
    //   console.log('error', error)
    // }
  }

  renderPoster() {
    if (this.state.poster !== '' && this.state.playerState !== 0 && this.state.currentTime === 0.0) {
      return (
        <FastImage
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            resizeMode: 'cover'
          }}
          source={{ uri: this.state.poster }}
          resizeMode="cover"
        />
      )
    } else {
      return null
    }
  }

  displayMediaControl() {
    alert('call')
    clearTimeout(this.timerref)
    var isMedia = this.state.isMediaControl
    this.setState({ isMediaControl: !isMedia })
    this.timerref = setInterval(() => {
      this.setState({ isMediaControl: false })
      clearTimeout(this.timerref)
    }, 5000)
  }

  handleVideoSpeed(value) {
    var videoSpeed = 1.0
    if (value == '0.5x') {
      videoSpeed = 0.5
    } else if (value == 'Normal') {
      videoSpeed = 1.0
    } else if (value == '1.25x') {
      videoSpeed = 1.25
    } else if (value == '1.5x') {
      videoSpeed = 1.5
    } else if (value == '2x') {
      videoSpeed = 2
    }
    this.setState({ videoSpeed, videoSpeedLabel: value })
  }

  // startNextExercise() {
  //   this.setState({ nextVideoLoading: false })
  //   this.onPaused()
  // }

  render() {
    const { navigation } = this.props
    const {
      id,
      title,
      paused,
      videoLink,
      modal,
      isCloseConfirm,
      isVideoSetting,
      isVideoInfo,
      poster,
      isMediaControl,
      orientation,
      videoSpeed,
      videoSpeedLabel,
      speedOptions,
      videoDuration,
    } = this.state
    const { videoItem } = get(this.props,'navigation.state.params',{})
    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: '#000',
              maxHeight:
                orientation === 'portrait'
                  ? 231
                  : Dimensions.get('window').height,
              width: '100%'
            }}
          >
            { !isEmpty(videoItem) &&
              <Video
                repeat={false}
                // onEnd={this.onEnd}
                onLoadStart={() => {
                  // this.videoPlayer.presentFullscreenPlayer()
                  Orientation.lockToLandscapeLeft()
                }}
                // onLoadStart={this.onLoadStart}
                // onProgress={this.onProgress}
                paused={paused}
                ref={videoPlayer => (this.videoPlayer = videoPlayer)}
                resizeMode={'cover'}
                // rate={videoSpeed}
                source={{
                  uri: videoItem.mp4uri
                }}
                style={styles.mediaPlayer}
                volume={10}
                // poster={poster}
                // poster={{ uri: videoItem.uri }}
                // posterResizeMode={'cover'}
                // ignoreSilentSwitch={'ignore'}
                disableFocus={true}
                controls={true}
              />
            }
            <TouchableOpacity 
              onPress={() => this.props.navigation.goBack(null)} 
              style={{ position: 'absolute', top: 5, left: 10, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: '#000' }}
            >
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: 'bold' }}>X</Text>
            </TouchableOpacity>
            {/* {this.state.poster !== '' && this.renderPoster()} */}
            {/* {isMediaControl && title !== '' && (
              <View
                style={[
                  styles.labelContainer,
                  orientation === 'portrait' ? { bottom: 0 } : { top: 15 }
                ]}
              >
                <Text style={styles.videoTitle}>{title}</Text>
              </View>
            )} */}
          </View>

          {
          // isMediaControl && (
          //   <MediaControls
          //     isLoading={this.state.isLoading}
          //     mainColor="gray"
          //     onFullScreen={this.onFullScreen}
          //     onPaused={this.onPaused}
          //     onRestart={this.onReplay}
          //     onSeek={this.onSeek}
          //     duration={this.state.duration}
          //     onSeeking={this.onSeeking}
          //     playerState={this.state.playerState}
          //     progress={this.state.currentTime}
          //     onVideoChange={this.onVideoChange}
          //     videoIndex={this.state.videoIndexChange}
          //     videosLength={this.state.allVideosLength}
          //     openPopup={this.openPopup}
          //   />
          // )
          }

          {
          // isMediaControl && (
          //   <TouchableOpacity
          //     style={{
          //       justifyContent: 'center',
          //       alignItems: 'center',
          //       position: 'absolute',
          //       top: 40,
          //       right: 20
          //     }}
          //     onPress={() => this.props.navigation.goBack()}
          //   >
          //     <Image
          //       source={require('../../assets/video/close.png')}
          //       style={{ width: 48, height: 48 }}
          //     />
          //   </TouchableOpacity>
          // )
          }

          {/* {modal && (
            <SmallPopup
              modalKey={'chapterList'}
              visible={modal}
              title={'Exercise List'}
              modalCloseFunction={() => this.setState({ modal: false })}
              chapterChange={this.changeChapter.bind(this)}
              chapterList={allVideos}
              currentTodoId={todoId}
            />
          )} */}
          {/* {isVideoInfo && (
            <SmallPopup
              modalKey={'videoInfo'}
              visible={isVideoInfo}
              title={toDoTitle}
              modalCloseFunction={() => this.setState({ isVideoInfo: false })}
              description={toDoDescription}
            />
          )} */}
          {/* {isCloseConfirm && (
            <SmallPopup
              modalKey={'closeConfirm'}
              visible={isCloseConfirm}
              title={'Are You Finished?'}
              modalCloseFunction={() => {
                this.setState({ isCloseConfirm: false })
                this.props.navigation.goBack()
              }}
              videoCloseConfirmed={() => {
                this.setState({ isCloseConfirm: false })
                mark && mark(todoId, progressStepId)
                this.props.navigation.goBack()
              }}
            />
          )} */}
          {/* {isVideoSetting && (
            <SmallPopup
              modalKey={'videoSetting'}
              handleVideoSpeed={this.handleVideoSpeed.bind(this)}
              videoSpeed={videoSpeedLabel}
              speedOptions={speedOptions}
              visible={isVideoSetting}
              title={'Video Settings'}
              modalCloseFunction={() => {
                this.setState({ isVideoSetting: false })
              }}
              // subTitles={subTitle}
              // onChangeSubTitle={this.onChangeSubTitle.bind(this)}
            />
          )} */}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5
  },
  mediaPlayer: {
    width: '100%',
    height: '100%'
  },

  labelContainer: {
    position: 'absolute',
    maxWidth: Dimensions.get('window').width - 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },

  videoTitle: {
    fontFamily: AppFonts.NBlack,
    fontSize: AppSizes.verticalScale(10),
    color: '#454F63',
    letterSpacing: 0.25,
  },

  labelIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
    marginLeft: 15,
    tintColor: '#454F63'
  }
})

export default VideoPlayer