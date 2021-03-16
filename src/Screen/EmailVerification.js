import React, {Component} from 'react';
import {Text, TextInput, TouchableOpacity, View,ToastAndroid} from 'react-native';

export class EmailVerification extends Component {
  state = {
    token:this.props.route.params.item.token,
    id:this.props.route.params.item.user.id,
    email:""
  };

  verify = () => {
    const url = 'https://s-mart-pos.herokuapp.com/api/email/resend';

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization:`Bearer ${this.state.token}`
      },
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson.message);
          ToastAndroid.show(
            'Email Berhasil Terkirim',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          )
          alert("cek emailmu")
          this.props.navigation.replace('Login')
       
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
          <Text>Verification Email!!!</Text>
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
          onPress={() => this.verify()}>
          <Text style={{fontSize: 20, fontWeight: '900',color:"white"}}>Verify</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default EmailVerification;
