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
  RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

export class CRUDPengeluaran extends Component {
  state = {
    jenis_pengeluaran: '',
    nominal:"",
    token: '',
    data: [],
    modal: false,
    modal2: false,
    id:""

  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        console.log(token);
        this.setState({token: token}, () => this.getpengeluaran());
      } else {
        alert('anda belum login');
      }
    });
  }

  createpengeluaran() {
    url = 'https://s-mart-pos.herokuapp.com/api/createPengeluaran';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        jenis_pengeluaran: this.state.jenis_pengeluaran,
        nominal:this.state.nominal
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 201) {
          this.setState({modal: false});
          ToastAndroid.show(
            'Berhasil menambah Pengeluaran',
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

  getpengeluaran() {
    url = 'https://s-mart-pos.herokuapp.com/api/getPengeluaran';

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
            'Pengeluaran Tertampil',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else alert('try again');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updatepengeluaran() {
    url = `https://s-mart-pos.herokuapp.com/api/updatePengeluaran/${this.state.id}`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        jenis_pengeluaran: this.state.jenis_pengeluaran,
        nominal:this.state.nominal
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 200) {
          ToastAndroid.show(
            'Berhasil mengedit Pengeluaran',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.componentDidMount()
        } else alert('try again');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletepengeluaran(id) {
    url = `https://s-mart-pos.herokuapp.com/api/deletePengeluaran/${id}`;

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
            'Berhasil mendelete Pengeluaran',
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
            justifyContent:"space-between",
            alignItems:"center"
          }}>
          <Text style={{fontSize:20,color:"white",marginStart:10}}>Pengeluaran</Text>
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
            <View
              style={{
                flexDirection: 'row',
                borderWidth: 0.5,
                alignItems: 'center',
                padding: 5,
                marginBottom: 5,
              }}>
              <Text>Jenis Pengeluaran: </Text>
              <TextInput
                style={{width: '60%'}}
                placeholder={'masukkan jenis pengeluaran'}
                onChangeText={(teks) => this.setState({jenis_pengeluaran: teks})}
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
              <Text>Nominal: </Text>
              <TextInput
              keyboardType="phone-pad"
                style={{width: '60%'}}
                placeholder={'masukkan nominal'}
                onChangeText={(teks) => this.setState({nominal: teks})}
              />
            </View>
            <Button title="Confirm" onPress={() => this.createpengeluaran()} />
          </View>
        </Modal>
        {this.state.data != ""?(
        <ScrollView 
        refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true});
                this.getpengeluaran();
              }}
            />
          }>
          {this.state.data.map((value, index) => {
            return (
              <View>
                <View
                  key={value.id}
                  style={{
                    padding: 10,
                    backgroundColor: 'white',
                    marginVertical: 5,
                    elevation: 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <View>
                    <Text style={{fontSize: 18}}>Pengeluaran: {value.jenis_pengeluaran}</Text>
                    <Text style={{fontSize: 18}}>nominal: Rp.{value.nominal}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Icon
                      name="edit"
                      size={25}
                      color="blue"
                      onPress={() => this.setState({modal2: true,id: value.id})}
                    />
                    <Icon
                      name="trash-2"
                      size={25}
                      color="red"
                      onPress={() => this.deletepengeluaran(value.id)}
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
                    <View
                      style={{
                        flexDirection: 'row',
                        borderWidth: 0.5,
                        alignItems: 'center',
                        padding: 5,
                        marginBottom: 5,
                      }}>
                      <Text>Jenis Pengeluaran: </Text>
                      <TextInput
                        style={{width: '60%'}}
                        placeholder={'masukkan jenis pengeluaran'}
                        onChangeText={(teks) => this.setState({jenis_pengeluaran: teks})}
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
                      <Text>Nominal: </Text>
                      <TextInput
                      keyboardType="phone-pad"
                        style={{width: '60%'}}
                        placeholder={'masukkan nominal'}
                        onChangeText={(teks) => this.setState({nominal: teks})}
                      />
                    </View>
                    <Button
                      title="Confirm"
                      onPress={() => this.updatepengeluaran()}
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

export default CRUDPengeluaran;
