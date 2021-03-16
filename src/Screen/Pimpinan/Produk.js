import React, {Component} from 'react';
import {
  Modal,
  Text,
  TextInput,
  ToastAndroid,
  View,
  ScrollView,
  TouchableOpacity,
  Button,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

export class Produk extends Component {
  state = {
    nama: '',
    alamat: '',
    no_telephone: '',
    token: '',
    data: [],
    modal: false,
    refresh: false,
    data2: [],
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        console.log(token);
        this.setState({token: token}, () => this.getproduk());
      } else {
        alert('anda belum login');
      }
    });
  }

  getproduk() {
    url = 'https://s-mart-pos.herokuapp.com/api/getProduct';

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
        console.log(resJson);
        if (resJson.code == 200) {
          this.setState({data: resJson.data});
          ToastAndroid.show(
            'produk Tertampil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.setState({refresh: false});
        } else alert('try again');
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
        width: '100%',
        height: 40,
        backgroundColor: '#19aad7',
        elevation: 3,
        justifyContent:"center",
        padding:10
      }}>
      <Text style={{fontSize:20,color:"white"}}>Produk</Text>
      
    </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true});
                this.getproduk();
              }}
            />
          }>
          {this.state.data.map((value, index) => {
            return (
              <View>
                <View
                  key={value.id}
                  style={{
                    padding: 3,
                    backgroundColor: 'white',
                    marginVertical: 5,
                    elevation: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{maxWidth: '75%'}}>
                    <Text style={{fontSize: 18}}>uid: {value.uid}</Text>
                    <Text style={{fontSize: 18}}>nama: {value.name}</Text>
                    <Text style={{fontSize: 18}}>merk: {value.merek}</Text>
                    <Text style={{fontSize: 18}}>
                      hrga beli: Rp.{value.harga_beli}
                    </Text>
                    <Text style={{fontSize: 18}}>
                      hrga jual: Rp.{value.harga_jual}
                    </Text>
                    <Text style={{fontSize: 18}}>
                      diskon: Rp.{value.diskon}
                    </Text>
                    <Text style={{fontSize: 18}}>stok: {value.stok}</Text>
                  </View>
                 
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

export default Produk;
