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

export class CRUDProduk extends Component {
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

  deleteproduk(id) {
    url = `https://s-mart-pos.herokuapp.com/api/deleteProduct/${id}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Cntent-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 200) {
          this.setState({modal:false})
          ToastAndroid.show(
            'Berhasil mendelete produk',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.componentDidMount();
        } else {
          console.log('try again');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  cariproduk() {
    url = `https://s-mart-pos.herokuapp.com/api/searchProduct/${this.state.nama}`;

    fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 200) {
          this.setState({data2: resJson.data});
          ToastAndroid.show(
            'produk Tertampil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else {
          alert('try again');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('try again');
      });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Modal
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal: false})}
          animationType="fade">
          <View
            style={{
              width: '100%',
              height: 50,
              flexDirection: 'row',
              backgroundColor: '#19aad7',
              elevation: 3,
            }}>
            <View
              style={{
                margin: 8,
                width: '95%',
                flexDirection: 'row',
                backgroundColor: '#fffffff5',
                borderRadius: 10,
                paddingStart: 10,
              }}>
              <View style={{justifyContent: 'center'}}>
                <Icon name="search" size={18} />
              </View>
              <View style={{justifyContent: 'center', width: '85%'}}>
                <TextInput
                  style={{height: 50}}
                  placeholder="search"
                  value={this.state.nama}
                  onChangeText={(teks) => this.setState({nama: teks})}
                  onEndEditing={() => this.cariproduk()}
                />
              </View>
            </View>
          </View>
          {this.state.data2 != ""?(
          <ScrollView>
            {this.state.data2.map((value, index) => {
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
                    <View style={{flexDirection: 'row'}}>
                      <Icon
                        name="edit"
                        size={35}
                        color="blue"
                        onPress={() =>
                         this.props.navigation.navigate('UpdateProduk',{item:value.id})
                        }
                      />
                      <Icon
                        name="trash-2"
                        size={35}
                        color="red"
                        onPress={() => this.deleteproduk(value.id)}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          ):(
            <Text>Data Kosong</Text>
          )}
        </Modal>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            backgroundColor: '#19aad7',
            elevation: 3,
          }}>
          <TouchableOpacity
            style={{
              margin: 8,
              width: '85%',
              flexDirection: 'row',
              backgroundColor: '#fffffff5',
              borderRadius: 10,
              paddingStart: 10,
            }}
            onPress={() => this.setState({modal: true})}>
            <View style={{justifyContent: 'center'}}>
              <Icon name="search" size={18} />
            </View>
            <View style={{justifyContent: 'center', width: '85%'}}>
              <Text>Search</Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              marginStart: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              color="white"
              name="plus-circle"
              size={25}
              onPress={() => this.props.navigation.navigate('CreateProduk')}
            />
          </View>
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
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="edit"
                      size={35}
                      color="blue"
                      onPress={() =>
                        this.props.navigation.navigate('UpdateProduk', {
                          item: value.id,
                        })
                      }
                    />
                    <Icon
                      name="trash-2"
                      size={35}
                      color="red"
                      onPress={() => this.deleteproduk(value.id)}
                    />
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

export default CRUDProduk;
