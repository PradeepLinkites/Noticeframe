import { get } from 'lodash'
import React, { Component } from 'react'
import { View, Image, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import { AppStyles, AppSizes, AppColors, AppFonts } from '../../theme'
import AwesomeButton from 'react-native-really-awesome-button'

export default class WebViewComponent extends React.Component {

  webview
  
  constructor(props) {
    super(props)
    this.state = {
      link: 'http://169.56.143.164/game/'
    }
  }

  onReload(){
    this.refs.webview.reload()
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={AppStyles.container}>
        <AwesomeButton
          type="primary"
          borderRadius={300}
          backgroundColor={AppColors.app.button}
          backgroundDarker={AppColors.app.buttonShadow}
          width={AppSizes.scale(42)}
          height={AppSizes.verticalScale(38)}
          onPress={() => navigation.goBack()}
          style={{ position: 'absolute', left: 10, top: 40 }}
        >
          <Image source={require('../../assets/auth/back.png')} style={{ height: AppSizes.verticalScale(40), marginLeft: 150, resizeMode: 'contain' }} />
        </AwesomeButton>
        <WebView
          ref='webview'
          source={{ uri: 'http://169.56.143.164/game/' }}
          style={{ flex: 1 }}
        />
        <TouchableOpacity style={{ position: 'absolute', right: 10, top: 40 }} onPress={this.onReload.bind(this)}>
          <Image source={require('../../assets/video/reload.png')} style={{ height: AppSizes.verticalScale(40), resizeMode: 'contain', tintColor: 'lightgray' }} />
        </TouchableOpacity>
      </View>
    )
  }
}
