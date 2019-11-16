import React from 'react'
import {View, Text} from 'react-native'

class ContactDetails extends React.Component {
	static navigationOptions = ({navigation}) => (
		{
			title: navigation.getParam('name','default title')
		}
	)
	render(){
		return (

			<View>
			<Text>{this.props.navigation.getParam('phone')}</Text>
			</View>
		)
	}}

export default ContactDetails
