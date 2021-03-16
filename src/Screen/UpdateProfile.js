import React, {Component} from 'react';
import {
  Button,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary} from 'react-native-image-picker';

export default class UpdateProfile extends Component {
  state = {
    name: '',
    email: '',
    alamat: '',
    no_telephone: '',
    photo: {uri: '', fileName: '', type: ''},
    user: {},
    token: '',
    umur: '',
    password_confirmation: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((respon) => {
      if (respon) {
        console.log(respon);
        this.setState({token: respon});
        console.log(this.state.token);
      } else {
        alert('anda belum login');
      }
    });
  }

  update = () => {
    console.log('mulai updat');
    const {
      name,
      email,
      photo,
      no_telephone,
      alamat,
      umur
    } = this.state;
    const url = 'https://s-mart-pos.herokuapp.com/api/updateProfile';
    const data = {
      name: name,
      email: email,
      telepon: no_telephone,
      alamat: alamat,
      umur:umur
    };

    fetch(url, {
      method: 'POST',
      body: this.createFromData(photo, data),
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);

        this.setState({data: resJson.data});
        this.props.navigation.goBack()
        ToastAndroid.show(
          'berhasil terupdate',
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };
  createFromData = (photo, body) => {
    const data = new FormData();
    if (photo.fileName) {
      data.append('photo', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'android'
            ? photo.uri
            : photo.uri.replace('file://', ''),
      });
    }
    Object.keys(body).forEach((key) => {
      if (body[key]) {
        data.append(key, body[key]);
      }
    });
    console.log('ini data ');
    console.log(data._parts);
    return data;
  };
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.uri) {
        this.setState({photo: response});
      }
    });
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 10,
            }}>
            <Text style={{fontSize: 20}}>Edit Profile</Text>
          </View>
          <TouchableOpacity
            style={styles.gambar}
            onPress={() => this.handleChoosePhoto()}>
            {this.state.photo.uri !== '' ? (
              <Image
                source={this.state.photo}
                style={{
                  width: 90,
                  height: 90,
                  position: 'absolute',
                  resizeMode: 'stretch',
                }}
              />
            ) : (
              <Icon name="image" size={30} color="white" />
            )}
          </TouchableOpacity>
          <View style={styles.edit}>
            <Icon size={20} name="user" />
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: 'gray',
                width: '85%',
              }}
              placeholder="name"
              value={this.state.name}
              onChangeText={(teks) => this.setState({name: teks})}
            />
          </View>
          <View style={styles.edit}>
            <Icon size={20} name="mail" />
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: 'gray',
                width: '85%',
              }}
              placeholder="email"
              value={this.state.email}
              onChangeText={(teks) => this.setState({email: teks})}
            />
          </View>

          <View style={styles.edit}>
            <Icon size={20} name="home" />
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: 'gray',
                width: '85%',
              }}
              placeholder="Alamat"
              value={this.state.alamat}
              onChangeText={(teks) => this.setState({alamat: teks})}
            />
          </View>
          <View style={styles.edit}>
            <Icon size={20} name="phone" />
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: 'gray',
                width: '85%',
              }}
              keyboardType="phone-pad"
              placeholder="phone number"
              value={this.state.no_telephone}
              onChangeText={(teks) => this.setState({no_telephone: teks})}
            />
          </View>
          <View style={styles.edit}>
            <Icon name="life-buoy" size={20} />
            <TextInput
              style={{
                borderBottomWidth: 1,
                borderColor: 'gray',
                width: '85%',
              }}
              placeholder="umur"
              keyboardType="phone-pad"
              value={this.state.umur}
              onChangeText={(teks) => this.setState({umur: teks})}
            />
          </View>
          
          <TouchableOpacity style={styles.button} onPress={() => this.update()}>
            <Text style={{fontSize: 20, color: 'white'}}>Edit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  bak: {
    flex: 1,
    marginHorizontal: '10%',
    width: '80%',
    height: 490,
    backgroundColor: '#ffffffc2',
    position: 'absolute',
    top: 50,
    borderRadius: 9,
    marginBottom: 5,
    marginTop: 20,
    elevation: 3,
  },
  nama: {
    width: '90%',
    height: 40,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    alignItems: 'center',
    padding: 5,
    marginTop: 20,
  },
  edit: {
    width: '90%',
    marginBottom: 5,
    marginHorizontal: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#47a9e6',
    marginHorizontal: '5%',
    height: 35,
    marginTop: 17,
    marginBottom: 10,
  },
  gambar: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 14,
    width: 90,
    height: 90,
    backgroundColor: '#19aad7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gambar2: {
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 14,
    width: 160,
    height: 160,
    backgroundColor: '#6d0303',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  teks: {paddingStart: 5},
});
