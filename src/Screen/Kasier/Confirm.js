import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export class Confirm extends Component {
  state = {
    token: '',
    modal: false,
    modal2: false,
    total: '',
    diterima: '',
    kembalian: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        console.log(token);
        this.setState({token: token}, () => this.getpenjualan());
      } else {
        alert('anda belum login');
      }
    });
  }

  getpenjualan() {
    url = 'https://s-mart-pos.herokuapp.com/api/detailPenjualan/request';

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
          this.setState({total: resJson.data.total_semua});
        } else {
          alert('data tidak terambil');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getmember() {
    url = 'https://s-mart-pos.herokuapp.com/api/getMember';

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
        } else {
          alert('data tidak terambil');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  bayar = () => {
    const {diterima} = this.state;
    const url = 'https://s-mart-pos.herokuapp.com/api/detailPenjualan/confirm';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'aplication/json',
        'Content-Type': 'aplication/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        dibayar: diterima,
      }),
    })
      .then((respon) => respon.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 200) {
          ToastAndroid.show(
            'Terbayar',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.props.navigation.navigate('Penjualan');
        } else {
          alert('try again');
        }
      })
      .catch((error) => {
        alert(error);
        console.log('error is ' + error);
      });
  };

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  change() {
    const susuk = this.state.diterima - this.state.total;
    return <Text>{this.toPrice(susuk)}</Text>;
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Modal
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal: false})}
          animationType="fade">
          <View style={{flex: 1, justifyContent: 'center'}}>
            <View style={{...Styles.input, height: 45}}>
              <Text>Total: </Text>
              <Text>Rp. {this.toPrice(this.state.total)}</Text>
            </View>
            <View style={Styles.input}>
              <Text>Diterima: </Text>
              <TextInput
                keyboardType="phone-pad"
                style={{width: 250}}
                placeholder="Massukan nominal"
                value={this.state.diterima}
                onChangeText={(teks) => this.setState({diterima: teks})}
              />
            </View>
            <View style={{...Styles.input, height: 45}}>
              <Text>Kembalian: </Text>
              {this.state.diterima != '' ? (
                <Text>Rp. {this.change()}</Text>
              ) : (
                <Text>Rp. 0</Text>
              )}
            </View>
            <Button title="Bayar" onPress={() => this.bayar()} />
          </View>
        </Modal>
        <TouchableOpacity
          style={Styles.jemput}
          onPress={() => this.setState({modal: true})}>
          <Text style={{fontSize: 20}}>Bayar Langsung</Text>
        </TouchableOpacity>
        <Text>OR</Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("Bayar")}
          style={Styles.jemput}>
          <Text style={{fontSize: 20}}>Pakai Saldo</Text>
        </TouchableOpacity>
        
      </View>
    );
  }
}

export default Confirm;
const Styles = StyleSheet.create({
  jemput: {
    backgroundColor: 'white',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    margin: 10,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    borderWidth: 0.2,
    marginBottom: 5,
    paddingHorizontal: 5,
  },
});
