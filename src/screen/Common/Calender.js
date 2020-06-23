import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Calender extends Component {
	constructor(props) {
	super(props);
	this.state = {
		text: ''
	};
	}
	render() {
	   return (
			<View style={{flex: 1}}>
           <Text>Calenders</Text>
			</View>
	);
	}
	
  }
