import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Profile extends Component {
  state = {
    data: {},
    token: '',
    roles: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        console.log(token);
        this.setState({token: token}, () => this.getprofile());
      } else {
        alert('anda belum login');
      }
    });
  }

  getprofile() {
    url = 'https://s-mart-pos.herokuapp.com/api/getProfile';

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson.data);
        if (resJson.code == 200) {
          this.setState({data: resJson.data});
          this.setState({roles: resJson.data.roles[0].name});
          ToastAndroid.show(
            'Profile Didapat',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          alert('data tidak profile tidak terambil');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    AsyncStorage.clear();
    this.props.navigation.replace('Login');
  }

  render() {
    const {data} = this.state;
    return (
      <View style={{flex: 1}}>
        <View style={Styles.imageprof}>
          <Image style={Styles.imagesize} source={{uri: `${data.photo}`}} />
        </View>
        <View
          style={{
            paddingBottom: 10,
          }}>
          <View style={Styles.mail}>
            <Icon name="user" size={20} color="#3a03b0" />
            <View
              style={{
                marginHorizontal: 7,
                borderBottomWidth: 0.5,
                width: '90%',
              }}>
              <Text style={{fontSize: 17, color: '#3a03b0'}}>{data.name}</Text>
            </View>
          </View>
          <View style={Styles.mail}>
            <Icon name="mail" size={20} color="#3a03b0" />
            <View
              style={{
                marginHorizontal: 7,
                borderBottomWidth: 0.5,
                width: '90%',
              }}>
              <Text style={{fontSize: 17, color: '#3a03b0'}}>{data.email}</Text>
            </View>
          </View>
          <View style={Styles.mail}>
            <Icon name="phone" size={20} color="#3a03b0" />
            <View
              style={{
                marginHorizontal: 7,
                borderBottomWidth: 0.5,
                width: '90%',
              }}>
              <Text style={{fontSize: 17, color: '#3a03b0'}}>
                {data.telepon}
              </Text>
            </View>
          </View>
          <View style={Styles.mail}>
            <Image
              source={{
                uri:
                  'https://play-lh.googleusercontent.com/DLU0-a-IeEGM_DAGB6B5AQiEa0QN2aGhhcjmPDAXy_tgFsWzaSoQT6RVPV89eCbdzg0p',
              }}
              style={{width: 20, height: 20}}
            />
            <View
              style={{
                marginHorizontal: 7,
                borderBottomWidth: 0.5,
                width: '90%',
              }}>
              {this.state.data.umur != null ? (
                <Text style={{fontSize: 17, color: '#3a03b0'}}>
                  {data.umur} tahun
                </Text>
              ) : (
                <Text style={{fontSize: 17, color: '#3a03b0'}}>?? tahun</Text>
              )}
            </View>
          </View>
          <View style={Styles.mail}>
            <Image
              source={{
                uri:
                  'https://e7.pngegg.com/pngimages/11/8/png-clipart-computer-icons-house-window-blinds-shades-brookline-adress-blue-angle.png',
              }}
              style={{width: 20, height: 20}}
            />
            <View
              style={{
                marginHorizontal: 7,
                borderBottomWidth: 0.5,
                width: '90%',
              }}>
              {this.state.data.alamat != null ? (
                <Text style={{fontSize: 17, color: '#3a03b0'}}>
                  {data.alamat}
                </Text>
              ) : (
                <Text style={{fontSize: 17, color: '#3a03b0'}}>rumah???</Text>
              )}
            </View>
          </View>
          {this.state.roles == 'member' ? (
            <View style={Styles.mail}>
              <Icon name="key" size={20} color="#3a03b0" />
              <View
                style={{
                  marginHorizontal: 7,
                  borderBottomWidth: 0.5,
                  width: '90%',
                }}>
                <Text style={{fontSize: 17, color: '#3a03b0'}}>
                  {data.kode_member}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
        </View>
        <TouchableOpacity
          style={{...Styles.mail, borderWidth: 0.5, padding: 5}}
          onPress={() => this.props.navigation.navigate('UpdateProfile')}>
          <Icon name="user-check" size={20} color="#3a03b0" />
          <View
            style={{
              marginHorizontal: 7,
              width: '90%',
            }}>
            <Text style={{fontSize: 17, color: '#3a03b0'}}>edit profile</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...Styles.mail, borderWidth: 0.5, padding: 5, marginTop: 1}}
          onPress={() => this.logout()}>
          <Icon name="log-out" size={20} color="#3a03b0" />
          <View
            style={{
              marginHorizontal: 7,
              width: '90%',
            }}>
            <Text style={{fontSize: 17, color: '#3a03b0'}}>logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Profile;

const Styles = StyleSheet.create({
  imageprof: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  imagesize: {
    width: 75,
    height: 75,
    // backgroundColor: 'blue',
    borderRadius: 100,
  },
  mail: {
    width: '90%',
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
