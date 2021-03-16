import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity,ToastAndroid, StyleSheet} from 'react-native';

export class ResetPassword extends Component {
  state = {
    email: '',
    token: '',
    password: '',
    password_confirmation: '',
  };

  Reset = () => {
    const {email, password, password_confirmation, token} = this.state;
    const url = 'https://s-mart-pos.herokuapp.com/api/resetPassword';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        email: email,
        token: token,
        password: password,
        password_confirmation: password_confirmation,
      }),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.message == "success") {
          this.props.navigation.replace('Login');
          ToastAndroid.show(
            'Password Berhasil Diganti',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
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
          style={Styles.input}>
          <Text>Email: </Text>
          <TextInput
          style={Styles.tek}
            placeholder="Massukan email"
            value={this.state.email}
            onChangeText={(teks) => this.setState({email: teks})}
          />
        </View>
        <View style={Styles.input}>
          <Text>Token: </Text>
          <TextInput style={{...Styles.tek,maxWidth:250}}
            placeholder="massukkan token"
            value={this.state.token}
            onChangeText={(teks) => this.setState({token: teks})}
          />
        </View>
        <View style={Styles.input}>
          <Text>New Password: </Text>
          <TextInput
          style={{width:"60%"}}
            placeholder="password"
            value={this.state.password}
            onChangeText={(teks) => this.setState({password: teks})}
            secureTextEntry={true}
          />
        </View>
        <View style={Styles.input}>
          <Text>password confirmation: </Text>
          <TextInput
          style={{width:"46%"}}
            placeholder="password"
            value={this.state.password_confirmation}
            onChangeText={(teks) =>
              this.setState({password_confirmation: teks})
            }
            secureTextEntry={true}

          />
        </View>

        <TouchableOpacity
          style={{backgroundColor: 'blue', padding: 10}}
          onPress={() => this.Reset()}>
          <Text style={{fontSize: 17, fontWeight: '900'}}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ResetPassword;

const Styles = StyleSheet.create({
  input:{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:3,
    borderWidth: 0.2,
    marginBottom:5
  },
  tek:{width:250}
})