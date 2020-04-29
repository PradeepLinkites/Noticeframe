import { StyleSheet } from 'react-native'
// import { AppFonts } from '../../../theme'

export default StyleSheet.create({
  mediaContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10
  },

  mediaBlackContainer: {
    width: '100%',
    backgroundColor: 'rgb(51,51,51)',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 15
  },

  trackContainer: {
    width: '100%',
    paddingHorizontal: 10,
    justifyContent: 'center'
  },

  progressSlider: {
    height: 20,
    width: '100%'
  },

  timerLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },

  track: {
    height: 8,
    borderRadius: 2
  },

  thumb: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: '#FFF'
  },

  playButtonContainer: {
    marginTop: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  timerLabel: {
    fontSize: 12,
    color: '#FFF',
    // fontFamily: AppFonts.NRegular,
    letterSpacing: 0.3
  },

  leftIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF'
  },

  rightIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFF'
  },

  playIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain'
  },

  replayIcon: {
    width: 25,
    height: 20,
    resizeMode: 'stretch'
  }
})
