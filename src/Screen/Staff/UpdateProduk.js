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
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Picker} from '@react-native-picker/picker';
import _ from 'lodash';

export default class UpdateProduk extends Component {
  state = {
    token: '',
    kodeproduk:"",
    namaproduk: "",
    Kategory: "",
    merk: "",
    hargabeli: "",
    diskon: "",
    hargajual: "",
    stok: "",
    data:[],
    id:this.props.route.params.item
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      console.log('respon si' + token);
      if (token != null) {
        console.log(token);
        this.setState({token: token},()=>this.getcategory());
      } else {
        console.log('tidak ada token');
      }
    });
  }

  getcategory() {
    url = 'https://s-mart-pos.herokuapp.com/api/getCategory';

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
        if (resJson.message == 'success') {
          this.setState({data: resJson.data});
          ToastAndroid.show(
            'Category Tertampil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else alert('try again');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateproduct() {
    const {
      kodeproduk,
      namaproduk,
      Kategory,
      merk,
      hargabeli,
      diskon,
      hargajual,
      stok,
    } = this.state;
    url = `https://s-mart-pos.herokuapp.com/api/updateProduct/${this.state.id}`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        name: namaproduk,
        uid: kodeproduk,
        merek: merk,
        category_id: Kategory.id,
        harga_beli: hargabeli,
        harga_jual: hargajual,
        stok: stok,
        diskon: diskon,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 200) {
          ToastAndroid.show(
            'Berhasil mengupdate produk',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );

        }
        else{
          alert("try again")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#047af1f2',
            padding: 10,
            elevation: 1,
          }}>
          <Text style={{fontSize: 20, color: 'white'}}>Edit Produk</Text>
        </View>

        <View
          style={{
            width: '94%',
            backgroundColor: '#f4f1f1e6',
            elevation: 2,
            margin: 10,
          }}>
          <View style={{paddingHorizontal: 5}}>
            <Text style={{...styles.sizeteks}}>Kode Produk</Text>
            <TextInput
              keyboardType="phone-pad"
              style={{borderWidth: 0.5}}
              placeholder="Kode Produk"
              value={this.state.kodeproduk}
              onChangeText={(teks) => this.setState({kodeproduk: teks})}
            />
          </View>
          <View style={{paddingHorizontal: 5, marginTop: 10}}>
            <Text style={{...styles.sizeteks}}>Nama Produk</Text>
            <TextInput
              style={{borderWidth: 0.5}}
              placeholder="Nama Produk"
              value={this.state.namaproduk}
              onChangeText={(teks) => this.setState({namaproduk: teks})}
            />
          </View>
          <View>
            <Text style={{...styles.sizeteks}}>pilih Kategory</Text>

            <Picker
            selectedValue={this.state.Kategory}
              style={{height: 50, width: 270,}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({Kategory: itemValue})}
            >
              {this.state.data.map((value, key) => {
                    return (
                      <Picker.Item label={value.name} value={value} />
                    );
                  })}
            </Picker>
          </View>

          <View style={{paddingHorizontal: 5, marginTop: 10}}></View>
          <View style={{margin: 5}}>
            <Text style={{...styles.sizeteks}}>Merk</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                value={this.state.merk}
                style={{borderWidth: 0.5, width: '40%'}}
                placeholder="merek"
                onChangeText={(teks) => this.setState({merk: teks})}
              />
            </View>
          </View>
          <View style={{margin: 5}}>
            <Text style={{...styles.sizeteks}}>harga beli</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
              keyboardType="phone-pad"
              value={this.state.hargabeli}
                style={{borderWidth: 0.5, width: '40%'}}
                placeholder="haraga beli"
                onChangeText={(teks) => this.setState({hargabeli: teks})}
              />
            </View>
          </View>
          <View style={{margin: 5}}>
            <Text style={{...styles.sizeteks}}>harga Jual</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
              keyboardType="phone-pad"
              value={this.state.hargajual}
                style={{borderWidth: 0.5, width: '40%'}}
                placeholder="harga jual"
                onChangeText={(teks) => this.setState({hargajual: teks})}
              />
            </View>
          </View>
          <View style={{margin: 5}}>
            <Text style={{...styles.sizeteks}}>diskon</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
              keyboardType="phone-pad"
              value={this.state.diskon}
                style={{borderWidth: 0.5, width: '40%'}}
                placeholder="diskon"
                onChangeText={(teks) => this.setState({diskon: teks})}
              />
            </View>
          </View>
          
          <View style={{margin: 5}}>
            <Text style={{...styles.sizeteks}}>stok</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
              keyboardType="phone-pad"
              value={this.state.stok}
                style={{borderWidth: 0.5, width: '40%'}}
                placeholder="stok"
                onChangeText={(teks) => this.setState({stok: teks})}
              />
            </View>
          </View>
          <Button
            title="Input"
            onPress={() => this.updateproduct()}
          />
        </View>
      </ScrollView>
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
