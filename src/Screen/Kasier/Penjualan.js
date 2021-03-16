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
  ScrollView,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/Feather';


export default class Penjualan extends Component {
  state = {
    token: '',
    data: [],
    pesanan: '',
    nama: '',
    modal: false,
    product: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token});
      } else {
        console.log('tidak ada token');
      }
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
          this.setState({data: resJson.data});
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

  createpenjualan = () => {
    const {product, pesanan} = this.state;
    const url = 'https://s-mart-pos.herokuapp.com/api/createPenjualan';
    this.setState({loading: true});

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        product_id: product.id,
        jumlah_barang: pesanan,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 201) {
          ToastAndroid.show(
            'menambah penjualan',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.navigate('TotalJual');
        } else {
          alert('try again');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('try again');
      });
  };

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  harga() {
    const total = this.state.product.harga_jual * this.state.pesanan;
    return <Text>{this.toPrice(total)}</Text>;
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
          <ScrollView>
            {this.state.data.map((value, index) => {
              return (
                <TouchableOpacity
                  key={value.id}
                  style={{
                    marginStart: '2%',
                    backgroundColor: 'white',
                    elevation: 3,
                    borderRadius: 9,
                    Width: '43%',
                    marginBottom: 10,
                  }}
                  onPress={() => this.setState({product: value, modal: false})}>
                  <View style={{maxWidth: '90%', marginStart: 5}}>
                    <Text style={styles.text}>name: {value.name}</Text>
                    <Text style={styles.text}>uid: {value.uid}</Text>
                    <Text style={styles.text}>merek: {value.merek}</Text>
                    <Text style={styles.text}>
                      harga: Rp. {this.toPrice(value.harga_jual)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Modal>
        <View
          style={{
            backgroundColor: '#047af1f2',
            padding: 10,
            elevation: 1,
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Penjualan</Text>
        </View>

        <View
          style={{
            backgroundColor: '#f4f1f1e6',
            elevation: 2,
            margin: 10,
          }}>
          <TouchableOpacity
            onPress={() => this.setState({modal: true})}
            style={{
              padding: 10,
              borderWidth: 1,
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
              maxWidth: '50%',
            }}>
            {this.state.product == '' ? (
              <Text style={{fontSize: 18, marginStart: 5}}>
                {'>>pilih Produk<<'}{' '}
              </Text>
            ) : (
              <Text style={{fontSize: 18, marginStart: 5}}>
                {this.state.product.name}
              </Text>
            )}
          </TouchableOpacity>

          <View style={{margin: 5}}>
            <Text style={{...styles.sizeteks}}>Harga</Text>
            <View style={{borderWidth: 0.5, padding: 10, width: 90}}>
              <Text>Rp. {this.toPrice(this.state.product.harga_jual)}</Text>
            </View>
          </View>

          <View style={{margin: 5}}>
            <Text style={{...styles.sizeteks}}>Jumlah Pesanan</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                keyboardType="phone-pad"
                value={this.state.pesanan}
                style={{borderWidth: 0.5, width: '30%'}}
                placeholder="total pesanan"
                onChangeText={(teks) => this.setState({pesanan: teks})}
              />
            </View>
          </View>

          <View style={{margin: 5}}>
            <Text style={{...styles.sizeteks}}>Total Harga</Text>
            <View style={{borderWidth: 0.5, padding: 10, width: 105}}>
              <Text>Rp. {this.harga()}</Text>
            </View>
          </View>
          <Button title="Input" onPress={() => this.createpenjualan()} />
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
  sizeteks: {
    fontSize: 18,
  },
});
