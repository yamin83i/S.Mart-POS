import React, {useCallback} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  StyleSheet,
  ImageBackground,
  Linking,
  ActivityIndicator,
} from 'react-native';
import AsynStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import Swiper from 'react-native-swiper';
import LottieView from 'lottie-react-native';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    token: '',
    role: '',
    loading: false,
    ingat: false,
    sandi:true
  };
  login = () => {
    const {email, password} = this.state;
    const url = 'https://s-mart-pos.herokuapp.com/api/login';
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log('ini      ', resJson.data.user.roles[0].id);
        AsynStorage.setItem('token', resJson.data.token).catch(
          (err) => console.log(err),
        );
        this.setState({role:resJson.data.user.roles[0].id})
        if (this.state.ingat == true) {
          AsynStorage.setItem(
            'role',
            resJson.data.user.roles[0].name,
          ).catch((err) => console.log(err));
        this.roles()
        } else {
          this.roles()
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({loading: false});
        alert('try again');
      });
  };

  roles() {
    if (this.state.role == 5) {
      this.setState({loading: false});
      this.props.navigation.replace('DrawerM'),
        ToastAndroid.show(
          'Anda Berhasil Login',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
    } else if (this.state.role == 2) {
      this.setState({loading: false});
      this.props.navigation.replace('DrawerP'),
        ToastAndroid.show(
          'Anda Berhasil Login',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
    } else if (this.state.role == 3) {
      this.setState({loading: false});
      this.props.navigation.replace('DrawerK'),
        ToastAndroid.show(
          'Anda Berhasil Login',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
    } else if (this.state.role == 4) {
      this.setState({loading: false});
      this.props.navigation.replace('DrawerS'),
        ToastAndroid.show(
          'Anda Berhasil Login',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
    } else {
      this.setState({loading: false});
      alert('try again');
    }
  }

  register = () => {
    this.props.navigation.navigate('Register');
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: '#ffffffde',
            margin: 20,
            elevation: 1,
            borderRadius: 5,
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 30, color: '#1b95c5e8'}}>S_Mart</Text>
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
          <View style={styles.lock}>
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginStart: 25,
            }}>
            {this.state.ingat == false ? (
              <Icon
                name="square"
                size={20}
                onPress={() => this.setState({ingat: true})}
              />
            ) : (
              <Icon
                name="check-square"
                size={20}
                onPress={() => this.setState({ingat: false})}
              />
            )}
            <Text> Remember Me!!!</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <Text
              onPress={() => this.props.navigation.navigate('ForgotPassword')}>
              Forgot Password ???
            </Text>
          </View>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#1b95c5e8',
              marginHorizontal: '5%',
              height: 30,
              marginVertical: 5,
            }}
            onPress={() => this.login()}>
            {this.state.loading ? (
              <ActivityIndicator size={30} color="white" />
            ) : (
              <Text style={{color: 'white', fontSize: 17}}>Login</Text>
            )}
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 10,
              paddingBottom: 5,
            }}>
            <Text>Don't Have an Account??? </Text>
            <Text
              style={{color: '#1b95c5e8', textDecorationLine: 'underline'}}
              onPress={() => this.props.navigation.navigate('Register')}>
              Sign Up!
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Login;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  mail: {
    width: '90%',
    marginBottom: 10,
    marginHorizontal: '5%',
    paddingTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 7,
  },
  lock: {
    width: '90%',
    marginBottom: 20,
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 7,
  },
});
