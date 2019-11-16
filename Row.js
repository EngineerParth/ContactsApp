import * as React from 'react';
import { Text, TouchableOpacity,StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	row: {
		padding: 20,
		//fontSize: 20,
	},
});

const Row = props => (
	<TouchableOpacity style={styles.row} onPress={()=>{props.navigation.navigate('ContDetails',{name: props.name, phone: props.phone})}}>
	<Text>{props.name}</Text>
	<Text>{props.phone}</Text>
	</TouchableOpacity>
);

export default Row;
