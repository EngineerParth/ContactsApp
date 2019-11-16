import * as React from 'react';
import { Text, SectionList, View, Button } from 'react-native';
import Row from './Row';



const renderSectionHeader = obj => <Text>{obj.section.title}</Text>;

const ContactList = props => {
	/*static navigationOptions = ({navigation})=>{
		return {
			headerTitle: 'Contacts',
			headerRight: <Button 
			title='Add' 
			onPress={()=>{this.props.navigation.navigate('AddCont')}}
			/>
		}
	}*/
	const renderItem = obj => <Row {...obj.item} navigation={props.navigation}/>;

	const contactsByLetter=props.navigation.state.params.conts.reduce((obj, contact) => {
			//const contactsByLetter =props.contacts.reduce((obj, contact)=>{
			const firstLetter = contact.name[0];
			return {
				...obj,
				[firstLetter]: [...(obj[firstLetter] || []), contact],
			};
		},{});

	const sections=Object.keys(contactsByLetter)
			.sort()
			.map(letter => ({
				title: letter,
				data: contactsByLetter[letter],
			}));

		return (
			<View>
			<SectionList
			renderItem={renderItem}
			renderSectionHeader={renderSectionHeader}
			sections={sections}
			/></View>
		);
};

export default ContactList;
			/*<Button 
		title="Add Contact"
		onPress={()=>{props.navigation.navigate("AddCont")}}
	  />*/
