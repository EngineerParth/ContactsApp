import React from 'react';
import { KeyboardAvoidingView, TextInput, Button, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import propTypes from 'prop-types';

export default class AddContact extends React.Component {
  state = {
    name: '',
    phone: '',
    isFormValid: false,
  };

  proptypes = {
    handleNameChange: propTypes.func,
    handlePhoneChange: propTypes.func,
    name: propTypes.string,
    phone: propTypes.string,
  };
  static navigationOptions = {
  	title: 'Add New Contact',
	headerBackTitle:'Contacts'
  }
  /*
  The handler functions can be generalized into one getter
  function which will return a handler function for more than
  one text inputs.

  The requirement for that is all text inputs should have same 
  processing i.e. only a state update and possibly a callback.

  It appears that such is not the case here as in the handler of 
  the phone, apart from updating the state and callback we also 
  check for its length and its type. Hence, we shall have a separate
  handler for it
  */
  
  handleNameChange = name => {
    this.setState({name},this.validateForm);
  };

  handlePhoneChange = phone => {
    if (!isNaN(phone) && phone.length <= 10) {
      this.setState({phone}, this.validateForm);
    }
  };

  validateForm = () => {
    if (
      !isNaN(this.state.phone) &&
      this.state.phone.length == 10 &&
      this.state.name.length >= 3
    ) return this.setState({isFormValid: true})
    else return this.setState({isFormValid: false})
  }

  handleSubmit = () => {  
      this.props.navigation.state.params.onSubmit(this.state);
	console.log('Contact submitted')
  };

  render() {
    return (
      <KeyboardAvoidingView style={{justifyContent: 'center'}}>
        <TextInput
          value={this.state.name}
          onChangeText={this.handleNameChange}
          style={styles.input}
          placeholder="name"
        />
        <TextInput
          keyboardType="numeric"
          value={this.state.phone}
          onChangeText={this.handlePhoneChange}
          style={styles.input}
          placeholder="phone"
        />
        <Button
          title="Add Contact"
          onPress={this.handleSubmit}
          disabled={!this.state.isFormValid}
        />
	<Button
	  title="cancel"
	  onPress={()=>{this.props.navigation.navigate('Home')}}
	/>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: 'Blue',
    margin: 5,
  },
});
