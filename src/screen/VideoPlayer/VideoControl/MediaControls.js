import React, { Component } from 'react'
import {
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  Animated,
  Image,
  TouchableWithoutFeedback
} from 'react-native'
import Slider from 'react-native-slider'
import styles from './MediaControlsStyles'
import { humanizeVideoDuration, noop } from './Utils'

const PLAYER_STATES = {
  PLAYING: 0,
  PAUSED: 1,
  ENDED: 2
}

class MediaControls extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      opacity: new Animated.Value(1),
      isVisible: true
    }
  }

  componentDidMount() {
    this.fadeOutControls(5000)
  }

  onReplay = () => {
    // this.fadeOutControls(5000)
    this.props.onRestart()
  }

  onPause = () => {
    const { playerState, onPaused } = this.props
    const { PLAYING, PAUSED } = PLAYER_STATES
    switch (playerState) {
      case PLAYING: {
        this.cancelAnimation()
        break
      }
      case PAUSED: {
        this.fadeOutControls(5000)
        break
      }
      default:
        break
    }

    const newPlayerState = playerState === PLAYING ? PAUSED : PLAYING
    return onPaused(newPlayerState)
  }

  setLoadingView = () => <ActivityIndicator size="large" color="#FFF" />

  setPlayerControls = (playerState) => {
    const icon = this.getPlayerStateIcon(playerState)
    const pressAction =
      playerState === PLAYER_STATES.ENDED ? this.onReplay : this.onPause
    return (
      <TouchableOpacity style={{ paddingHorizontal: 15 }} onPress={pressAction}>
        <Image source={icon} style={styles.playIcon} />
      </TouchableOpacity>
    )
  }

  getPlayerStateIcon = (playerState) => {
    switch (playerState) {
      case PLAYER_STATES.PAUSED:
        return require('../../../assets/video/ic_play.png')
      case PLAYER_STATES.PLAYING:
        return require('../../../assets/video/playing.png')
      case PLAYER_STATES.ENDED:
        return require('../../../assets/video/ic_replay.png')
      default:
        return null
    }
  }

  cancelAnimation = () => {
    this.state.opacity.stopAnimation(() => {
      this.setState({ isVisible: true })
    })
  }

  toggleControls = () => {
    this.state.opacity.stopAnimation((value) => {
      this.setState({ isVisible: !!value })
      return value ? this.fadeOutControls(5000) : this.fadeInControls()
    })
  }

  fadeOutControls = (value) => {
    // log(value)
    // Animated.timing(this.state.opacity, {
    //   toValue: 0,
    //   duration: 300,
    //   delay,
    // }).start(result => {
    //   if (result.finished) this.setState({ isVisible: false });
    // });
  }

  fadeInControls = () => {
    this.setState({ isVisible: true })
    // Animated.timing(this.state.opacity, {
    //   toValue: 1,
    //   duration: 300,
    //   delay: 0,
    // }).start(() => {
    //   if (loop) {
    //     this.fadeOutControls(5000);
    //   }
    // });
  }

  dragging = (value) => {
    const { onSeeking, playerState } = this.props

    onSeeking(value)
    if (playerState === PLAYER_STATES.PAUSED) {
      return
    }

    this.onPause()
  }

  seekVideo = (value) => {
    this.props.onSeek(value)
    this.onPause()
  }

  renderControls() {
    const {
      duration,
      isLoading,
      playerState,
      progress,
      videoIndex,
      videosLength,
      openPopup
    } = this.props
    return (
      <View style={styles.mediaBlackContainer}>
        <View style={styles.trackContainer}>
          <Slider
            disabled={false}
            style={styles.progressSlider}
            onValueChange={this.dragging}
            onSlidingComplete={this.seekVideo}
            maximumValue={duration}
            value={progress}
            trackStyle={styles.track}
            thumbStyle={[styles.thumb]}
            minimumTrackTintColor={'#FFF'}
            maximumTrackTintColor={'rgba(255,255,255,0.3)'}
          />
          <View style={[styles.timerLabelsContainer]}>
            <Text style={styles.timerLabel}>
              {humanizeVideoDuration(progress)}
            </Text>
            <Text style={styles.timerLabel}>
              {humanizeVideoDuration(duration)}
            </Text>
          </View>
        </View>
        <View style={[styles.playButtonContainer]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => openPopup('chapterList')}
            >
              <Image
                source={require('../../../assets/video/menu.png')}
                style={styles.leftIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => openPopup('videoInfo')}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: '#FFF',
                  // fontFamily: AppFonts.NBlack
                }}
              >
                i
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              disabled={videoIndex === 0}
              style={{ paddingHorizontal: 15 }}
              onPress={() => this.props.onVideoChange('previous')}
            >
              <Image
                source={require('../../../assets/video/previous.png')}
                style={[
                  styles.playIcon,
                  { opacity: videoIndex === 0 ? 0.4 : 1.0 }
                ]}
              />
            </TouchableOpacity>
            <View style={{ width: 60, alignItems: 'center' }}>
              {isLoading
                ? this.setLoadingView()
                : this.setPlayerControls(playerState)}
            </View>
            <TouchableOpacity
              disabled={videoIndex === videosLength - 1}
              style={{ paddingHorizontal: 15 }}
              onPress={() => this.props.onVideoChange('next')}
            >
              <Image
                source={require('../../../assets/video/forward.png')}
                style={[
                  styles.playIcon,
                  { opacity: videoIndex === videosLength - 1 ? 0.4 : 1.0 }
                ]}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => openPopup('videoSetting')}
          >
            <Image
              source={require('../../../assets/video/setting.png')}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.toggleControls}>
        <Animated.View
          style={[styles.mediaContainer, { opacity: this.state.opacity }]}
        >
          {this.renderControls()}
        </Animated.View>
      </TouchableWithoutFeedback>
    )
  }
}

export default MediaControls
