import * as React from 'react';
import { Text, View, KeyboardAvoidingView, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import contacts, { compareNames } from './contacts';
import ContactList from './ContactList';
import AddContact from './AddContact';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import ContactDetails from './ContactDetails'

const styles = StyleSheet.create({
	appContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Constants.statusBarHeight,
	},
});

/* 
 * This class is created to act as a route component which contains app and AddContact as separate components
 * The solution seems to be working at first glance but the problem is in parameter passing
 * The contact list is maintained as state in App, however, it becomes impossible to change it from AddContact
 * So, this solution was not working when this comment was written
 * */
/*class RootComponent extends React.Component{

	render(){

		const appNavigator = createStackNavigator({

			Home:{
				screen: App
			},
			AddCont:{
				screen: AddContact
			}
		},{
			initialRouteName:'Home'
		});
		const AppComponent = createAppComponent(appNavigator)
		return <AppComponent/>
	}
}*/

/*
 * This class is the root component of the Application
 * It stores the list of contacts as well as functions to sort and add new contact
 * It renders the navigation component which includes following 2 screens
 * 1) The actual list of contacts rendered as ContactList component, which is also a default screen i.e. Home screen
 * 2) The add contact form rendered as AddContact component, named as AddCont, which also includes navigation back to the Home screen
 */
export default class App extends React.Component {
	state = {
		contacts: contacts,
	};


	sort = () => {
		this.setState(prevState => ({
			contacts: [...prevState.contacts].sort(compareNames),
		}));
	};

	/*
	 * This function is passed as parameter to AddContact component
	 * This gets called on a button click of add contact
	 */
	addContact = newContact => {

		this.setState(prevState => ({
			contacts: [...prevState.contacts, newContact],
		}));

		//this.toggleAddContact();
	}

	render() { 
		/*
		 * The configuration object for stack navigator which includes
		 * 1) Screens
		 * 2) for each screen -> title, parameters and name
		 */
		const navConfig = {Home: 
			{screen: ContactList,title:"Contacts",
				params:{conts: this.state.contacts},
				navigationOptions:({navigation})=>({
					title:'Contacts',
					headerRight: <Button title='Add'
					onPress={()=>{navigation.navigate('AddCont')}}
					/>
				})

			}, 
			AddCont: {screen: AddContact, params:{onSubmit: this.addContact}}, 
			ContDetails: {screen:ContactDetails}
		}
		/*
		 * The route options for stack navigator which includes
		 * 1) name of the initial route i.e. the screen which is rendered by default when application loads
		 * 2) parameters of the initial route
		 */
		const routeOptions = {initialRouteName: 'Home', initialRouteParams:{conts: this.state.contacts}}

		/*
		 * This is the React component created by the function 'createAppContainer'
		 */
		const ContactsContainer = createAppContainer(createStackNavigator(navConfig, routeOptions))


		return <ContactsContainer/>	  
			//return <View><Text>TEST TEXT. If this is displayed then the app works.</Text></View>

	}
}


