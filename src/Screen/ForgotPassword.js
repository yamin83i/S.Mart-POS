import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View,ToastAndroid} from 'react-native';

export class ForgotPassword extends Component {
  state = {
    email: '',
  };

  Forgot = () => {
    const {email} = this.state;
    const url = 'https://s-mart-pos.herokuapp.com/api/forgotPassword';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson.message);
        if (resJson.message == "success") {
         
          ToastAndroid.show(
            'Email Berhasil Terkirim',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.replace('ResetPassword');
        } else {
          alert('try again');
        }
      })
      .catch((error) => {
        alert(error);
        console.log('error is ' + error);
      });
  };
  
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal:3,
            borderWidth: 0.2,
            marginBottom:5
          }}>
          <Text>Email: </Text>
          <TextInput
          style={{width:250}}
            placeholder="Massukan email"
            value={this.state.email}
            onChangeText={(teks) => this.setState({email: teks})}
          />
        </View>
        <TouchableOpacity
          style={{backgroundColor: 'blue', padding: 5,paddingHorizontal:10}}
          onPress={() => this.Forgot()}>
          <Text style={{fontSize: 20, fontWeight: '900',color:"white"}}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ForgotPassword;
