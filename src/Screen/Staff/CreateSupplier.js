import React, {Component} from 'react';
import {Button, Modal, StyleSheet, Text, TextInput, ToastAndroid, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class CreateSupplier extends Component {
  state = {
    name: '',
    alamat: '',
    no_telephone: '',
    token: '',
    modal:false
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        console.log(token);
        this.setState({token: token});
      } else {
        alert('anda belum login');
      }
    });
  }


  createsupplier() {
    const {name, alamat, no_telephone} = this.state;
    url = 'https://s-mart-pos.herokuapp.com/api/createSupplier';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        name: name,
        alamat: alamat,
        telepon: no_telephone,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 201 ) {
          ToastAndroid.show(
            'Berhasil menambah Kategory',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          
        }else{
          alert("try again")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
              flex:1,
            justifyContent: 'center',
            alignItems: 'center',
 
          }}>
          <View style={styles.suppli}>
            <Text>Nama Supplier: </Text>
            <TextInput
            style={styles.input}
              placeholder={'masukkan nama Supplier'}
              value={this.state.name}
              onChangeText={(teks) => this.setState({name: teks})}
            />
          </View>
          <View style={styles.suppli}>
            <Text>Alamat: </Text>
            <TextInput style={styles.input}
              placeholder={'masukkan Alamat'}
              value={this.state.alamat}
              onChangeText={(teks) => this.setState({alamat: teks})}
            />
          </View>
          <View style={styles.suppli}>
            <Text>noTelephone: </Text>
            <TextInput style={styles.input}
            keyboardType="phone-pad"
              placeholder={'masukkan No Telephone'}
              value={this.state.no_telephone}
              onChangeText={(teks) => this.setState({no_telephone: teks})}
            />
          </View>
          <Button title="Confirm" onPress={()=> this.createsupplier()} />
        </View>
      </View>
    );
  }
}

export default CreateSupplier;

const styles = StyleSheet.create({
    suppli:{
        flexDirection:"row",
        alignItems:"center",
        borderWidth:0.3,
        padding:5,
        marginTop:5
    },
    input:{
        width:"60%"
    }
})