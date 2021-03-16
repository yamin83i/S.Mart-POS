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
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';
import {Picker} from '@react-native-picker/picker';
import _ from 'lodash';

export class CRUDCategory extends Component {
  state = {
    supplier_id: '',
    product_id: '',
    total_barang: '',
    total_biaya: '',
    token: '',
    data: [],
    data1: [],
    data2: [],
    modal: false,
    modal2: false,
    id:""
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        console.log(token);
        this.setState({token: token});
        this.getpembelian();
      } else {
        alert('anda belum login');
      }
    });
  }

  createpembelian() {
    const {supplier_id, product_id, total_barang, total_biaya} = this.state;
    url = 'https://s-mart-pos.herokuapp.com/api/createPembelian';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        supplier_id: supplier_id.id,
        product_id: product_id.id,
        total_barang: total_barang,
        total_biaya: total_biaya,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 201) {
          this.setState({modal: false});
          ToastAndroid.show(
            'Berhasil menambah pembelian',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.componentDidMount();
        } else alert('try again');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getpembelian() {
    url = 'https://s-mart-pos.herokuapp.com/api/getPembelian';

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
        // console.log(resJson);
        if (resJson.code == 200) {
          this.getsupplier(), this.setState({data: resJson.data});
          ToastAndroid.show(
            'pembelian Tertampil',
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

  getsupplier() {
    url = 'https://s-mart-pos.herokuapp.com/api/getSupplier';

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
        // console.log(resJson);
        if (resJson.message == 'success') {
          this.getproduk();

          this.setState({data1: resJson.data});
          ToastAndroid.show(
            'Supplier Tertampil',
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
        // console.log(resJson);
        if (resJson.code == 200) {
          this.setState({data2: resJson.data});
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

  updatepembelian() {
    const {supplier_id, product_id, total_barang, total_biaya} = this.state;
    url = `https://s-mart-pos.herokuapp.com/api/updatePembelian/${this.state.id}`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        supplier_id: supplier_id.id,
        product_id: product_id.id,
        total_barang: total_barang,
        total_biaya: total_biaya,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 200) {
          this.setState({modal2: false});
          ToastAndroid.show(
            'Berhasil mengedit pembelian',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.componentDidMount();
        } else alert('try again');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletepembelian(id) {
    url = `https://s-mart-pos.herokuapp.com/api/deletePembelian/${id}`;

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
          ToastAndroid.show(
            'Berhasil mendelete pembelian',
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

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            backgroundColor: '#19aad7',
            elevation: 3,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: 'white', marginStart: 10}}>
            Pembelian
          </Text>
          <View
            style={{
              justifyContent: 'center',
              marginEnd: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon
              color="white"
              name="plus-circle"
              size={25}
              onPress={() => this.setState({modal: true})}
            />
          </View>
        </View>
        <Modal
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal: false})}
          animationType="fade">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{fontSize: 18}}>pilih Supplier</Text>

              <Picker
                selectedValue={this.state.supplier_id}
                style={{height: 50, width: 270}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({supplier_id: itemValue})
                }>
                {this.state.data1.map((value, key) => {
                  return <Picker.Item label={value.name} value={value} />;
                })}
              </Picker>
            </View>
            <View>
              <Text style={{fontSize: 18}}>pilih Produk</Text>

              <Picker
                selectedValue={this.state.product_id}
                style={{height: 50, width: 270}}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({product_id: itemValue})
                }>
                {this.state.data2.map((value, key) => {
                  return <Picker.Item label={value.name} value={value} />;
                })}
              </Picker>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0.5,
                alignItems: 'center',
                padding: 5,
                marginBottom: 5,
              }}>
              <Text>Total barang: </Text>
              <TextInput
                keyboardType="phone-pad"
                value={this.state.total_barang}
                style={{width: '60%'}}
                placeholder={'masukkan total barang'}
                onChangeText={(teks) => this.setState({total_barang: teks})}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0.5,
                alignItems: 'center',
                padding: 5,
                marginBottom: 5,
              }}>
              <Text>Total biaya: </Text>
              <TextInput
                keyboardType="phone-pad"
                value={this.state.total_biaya}
                style={{width: '60%'}}
                placeholder={'masukkan total biaya'}
                onChangeText={(teks) => this.setState({total_biaya: teks})}
              />
            </View>
            <Button title="Confirm" onPress={() => this.createpembelian()} />
          </View>
        </Modal>
        {this.state.data != ""?(
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true});
                this.getpembelian();
              }}
            />
          }>
          {this.state.data.map((value, index) => {
            return (
              <View>
                <View
                  key={value.id}
                  style={{
                    padding: 5,
                    backgroundColor: 'white',
                    marginVertical: 5,
                    elevation: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{maxWidth: '80%'}}>
                    <Text style={{fontSize: 18}}>
                      Supplier: {value.supplier.name}
                    </Text>
                    <Text style={{fontSize: 18}}>
                      produk: {value.product.name}
                    </Text>
                    <Text style={{fontSize: 18}}>
                      Total barang: {value.total_barang}
                    </Text>
                    <Text style={{fontSize: 18}}>
                      Total biaya: Rp.{value.total_biaya}
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="edit"
                      size={35}
                      color="blue"
                      onPress={() => this.setState({modal2: true,id:value.id})}
                    />
                    <Icon
                      name="trash-2"
                      size={35}
                      color="red"
                      onPress={() => this.deletepembelian(value.id)}
                    />
                  </View>
                </View>
                <Modal
                  visible={this.state.modal2}
                  onRequestClose={() => this.setState({modal2: false})}
                  animationType="fade">
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Text style={{fontSize: 18}}>pilih Supplier</Text>

                      <Picker
                        selectedValue={this.state.supplier_id}
                        style={{height: 50, width: 270}}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({supplier_id: itemValue})
                        }>
                        {this.state.data1.map((value, key) => {
                          return (
                            <Picker.Item label={value.name} value={value} />
                          );
                        })}
                      </Picker>
                    </View>
                    <View>
                      <Text style={{fontSize: 18}}>pilih Produk</Text>

                      <Picker
                        selectedValue={this.state.product_id}
                        style={{height: 50, width: 270}}
                        onValueChange={(itemValue, itemIndex) =>
                          this.setState({product_id: itemValue})
                        }>
                        {this.state.data2.map((value, key) => {
                          return (
                            <Picker.Item label={value.name} value={value} />
                          );
                        })}
                      </Picker>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderWidth: 0.5,
                        alignItems: 'center',
                        padding: 5,
                        marginBottom: 5,
                      }}>
                      <Text>Total barang: </Text>
                      <TextInput
                        value={this.state.total_barang}
                        keyboardType="phone-pad"
                        style={{width: '60%'}}
                        placeholder={'masukkan total barang'}
                        onChangeText={(teks) =>
                          this.setState({total_barang: teks})
                        }
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        borderWidth: 0.5,
                        alignItems: 'center',
                        padding: 5,
                        marginBottom: 5,
                      }}>
                      <Text>Total biaya: </Text>
                      <TextInput
                        value={this.state.total_biaya}
                        keyboardType="phone-pad"
                        style={{width: '60%'}}
                        placeholder={'masukkan total biaya'}
                        onChangeText={(teks) =>
                          this.setState({total_biaya: teks})
                        }
                      />
                    </View>
                    <Button
                      title="Confirm"
                      onPress={() => this.updatepembelian()}
                    />
                  </View>
                </Modal>
              </View>
            );
          })}
        </ScrollView>
        ):(
          <Text>Data Kosong</Text>
        )}
      </View>
    );
  }
}

export default CRUDCategory;
