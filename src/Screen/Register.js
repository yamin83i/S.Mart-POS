import React, {Component} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  ImageBackground,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    telepon:"",
    loading:false,
    data:{},
    sandi:true
  };

  register = () => {
    const {
      name,
      email,
      password,
      password_confirmation,
      telepon
    } = this.state;
    const url = 'https://s-mart-pos.herokuapp.com/api/register';
    this.setState({loading:true})

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
        telepon:telepon
      }),
    })
      .then(respon => respon.json())
      .then(resJson => {
        console.log(resJson);
        if (resJson.code==201) {
          this.setState({loading:false,data:resJson.data})
          this.props.navigation.replace('EmailVerification',{item:this.state.data});
          ToastAndroid.show(
            'Register Berhasil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          this.setState({loading:false})
          alert('try again');
        }
      })
      .catch(error => {
        this.setState({loading:false})
        alert(error)
        console.log('error is ' + error);
      });
  };

  render() {
    return (
      <View style={{flex: 1,alignItems:"center",
      justifyContent:"center"}}>
          <View
            style={{
              backgroundColor: '#ffffffde',
              margin: 20,
              elevation: 1,
              borderRadius: 5,
              
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 30, color:"#1b95c5e8"}}>S.Mart</Text>
            </View>
            <View style={styles.mail}>
              <Icon name="user" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Username"
                value={this.state.name}
                onChangeText={(teks) => this.setState({name: teks})}
              />
            </View>
            <View style={styles.mail}>
              <Icon name="mail" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Email"
                value={this.state.email}
                onChangeText={(teks) => this.setState({email: teks})}
              />
            </View>
            <View style={styles.mail}>
              <Icon name="lock" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '80%',
                }}
                placeholder="Password"
                value={this.state.password}
                onChangeText={(teks) => this.setState({password: teks})}
                secureTextEntry={this.state.sandi}
              />
               {this.state.sandi == true ? (
              
              <Icon name="eye-off" size={25} onPress={()=>this.setState({sandi:false})}/>
            ):(
              <Icon name="eye" size={25} onPress={()=>this.setState({sandi:true})} />

            )}
            </View>
            <View style={styles.mail}>
              <Icon name="lock" size={20} />
              <TextInput
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '80%',
                }}
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
                onChangeText={(teks) => this.setState({password_confirmation: teks})}
                secureTextEntry={this.state.sandi}
              />
              {this.state.sandi == true ? (
              
              <Icon name="eye-off" size={25} onPress={()=>this.setState({sandi:false})}/>
            ):(
              <Icon name="eye" size={25} onPress={()=>this.setState({sandi:true})} />

            )}
            </View> 
             <View style={styles.mail}>
              <Icon name="phone" size={20} />
              <TextInput
              keyboardType="phone-pad"
                style={{
                  borderBottomWidth: 1,
                  borderColor: 'gray',
                  width: '90%',
                }}
                placeholder="Telephone"
                value={this.state.telepon}
                onChangeText={(teks) => this.setState({telepon: teks})}
                
              />
            </View>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1b95c5e8',
                marginHorizontal: '5%',
                height: 30,
                marginVertical: 10,
                marginTop:20
              }} onPress={()=>this.register()}>
               {this.state.loading ?(
                  <ActivityIndicator size={30} color="white" /> 
                ):(

              <Text style={{color: 'white',fontSize:17}}>Register</Text>
                ) }
            </TouchableOpacity>
            
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  mail: {
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 7,
  },
 
});
