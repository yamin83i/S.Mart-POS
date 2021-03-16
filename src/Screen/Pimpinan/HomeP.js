import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image,ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export class HomeP extends Component {
  state = {
    data: {},
    data2: {},
    token: '',
    roles: '',
    saldo: '',
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        console.log(token);
        this.setState({token: token})
        this.getkeuangan()
        this.getprofile()
      } else {
        alert('anda belum login');
      }
    });
  }

  getkeuangan() {
    url = 'https://s-mart-pos.herokuapp.com/api/getLaporan';

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
          ToastAndroid.show(
            'DAta Didapat',
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

  getprofile(){
    url="https://s-mart-pos.herokuapp.com/api/getProfile"

    fetch(url,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${this.state.token}`
        },
    })
    .then((res)=> res.json())
    .then((resJson)=>{
        console.log(resJson.data);
        if (resJson.code == 200){
            this.setState({data2:resJson.data})
            ToastAndroid.show(
                'Profile Didapat',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              );
        }else{
            alert("data tidak profile tidak terambil")
        }
    })
    .catch((error)=>{
        console.log(error);
    })
}

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.judul}> S.Mart</Text>
              <Text
                style={{
                  ...styles.judul,
                  fontSize: 15,
                  fontWeight: '300',
                  marginStart: 15,
                }}>
                {' '}
                Hallo, {this.state.data2.name}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                source={{
                  uri: `${this.state.data2.photo}`,
                }}
                style={{width: 60, height: 60,borderRadius:100,marginEnd:5}}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            style={{paddingHorizontal: 10, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('Absen')}>
            <Image
              source={require('../../Image/check_up-256.png')}
              style={{width: 50, height: 50}}
            />
            <Text>Rekap Absen</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 10, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('Keuangan')}>
            <Image
              source={require('../../Image/File_money_financial_statements-256.png')}
              style={{width: 50, height: 50}}
            />
            <Text>Laporan Keuangan</Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={{paddingHorizontal: 10, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('Produk')}>
            <Image
              source={require('../../Image/__box_delivery_product-74-256.png')}
              style={{width: 50, height: 50}}
            />
            <Text>Stok Produk </Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center',marginTop:10}}>
          <View style={styles.lapor}>
            <Text>Total Pembelian</Text>
            <Text>Rp. {this.toPrice(this.state.data.total_pembelian)}</Text>
          </View>
          <View style={styles.lapor}>
            <Text>Total Penjualan</Text>
            <Text>Rp. {this.toPrice(this.state.data.total_penjualan)}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={styles.lapor}>
            <Text>Total Pengeluaran</Text>
            <Text>Rp. {this.toPrice(this.state.data.total_pengeluaran)}</Text>
          </View>
          <View style={styles.lapor}>
            <Text>Total Pendapatan</Text>
            <Text>Rp. {this.toPrice(this.state.data.total_pendapatan)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default HomeP;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#19aad7',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingVertical: 10,
  },
  judul: {
    alignSelf: 'flex-start',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginStart: 5,
  },
  lapor: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    padding: 5,
    width:"47%"
  },
});
