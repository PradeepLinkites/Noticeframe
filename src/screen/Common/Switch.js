import React, { Component } from 'react'
import {Switch } from 'react-native'

export default class SwitchComponent extends Component {
	constructor(props) {
	super(props);
	    this.state = {}
	}
	render() {
	   return (
			<Switch
				onValueChange = {(value) => this.props.onChange(value)}
				value = {this.props.value}
				disabled={false}
				thumbColor={this.state.switch4Value ? "#3b5261" : Platform.OS == 'android' ? 'lightgray' : '#fff'}
				trackColor={{ true: '#939393', false : Platform.OS == 'android' ? '#A2a2a2': 'gray' }}
				trackWidth={10}
				style={
				Platform.OS === 'android'
					? { transform: [{ scaleX: 1 }, { scaleY: 1 }] }
					: { transform: [{ scaleX: .6 }, { scaleY: .6 }] }
				}
				ios_backgroundColor={'#EBECF0'}
		  />
	   );
	}	
}
