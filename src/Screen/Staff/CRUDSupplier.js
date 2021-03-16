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
import CreateSupplier from './CreateSupplier';

export class CRUDSupplier extends Component {
  state = {
    name: '',
    alamat: '',
    no_telephone: '',
    token: '',
    data: [],
    modal: false,
    modal2: false,
    refresh: false,
    id:""
  };

  componentDidMount() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        console.log(token);
        this.setState({token: token}, () => this.getsupplier());
      } else {
        alert('anda belum login');
      }
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
        console.log(resJson);
        if (resJson.message == 'success') {
          this.setState({data: resJson.data});
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

  updatesupplier() {
    const {name, no_telephone, alamat} = this.state;
    url = `https://s-mart-pos.herokuapp.com/api/updateSupplier/${this.state.id}`;

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
        if (resJson.code == 200) {
          ToastAndroid.show(
            'Berhasil mengedit Supplier',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.componentDidMount()
        } else {
          alert('try again');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletesupplier(id) {
    url = `https://s-mart-pos.herokuapp.com/api/deleteSupplier/${id}`;

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
            'Berhasil mendelete Supplier',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
          this.componentDidMount();
        } else {
          alert('try again');
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
          <Text style={{fontSize:20,color:"white",marginStart:10}}>Supplier</Text>
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
              size={30}
              onPress={() => this.setState({modal: true})}
            />
          </View>
        </View>
        <Modal
          visible={this.state.modal}
          onRequestClose={() => this.setState({modal: false})}
          animationType="fade">
          <CreateSupplier />
        </Modal>
        {this.state.data != ""?(
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true});
                this.getsupplier();
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
                  <View>
                  <Text style={{fontSize: 18}}>{value.name}</Text>
                  <Text style={{fontSize: 18}}>{value.alamat}</Text>
                  <Text style={{fontSize: 18}}>{value.telepon}</Text>
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
                      onPress={() => this.deletesupplier(value.id)}
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
                      <TextInput
                        style={styles.input}
                        placeholder={'masukkan Alamat'}
                        value={this.state.alamat}
                        onChangeText={(teks) => this.setState({alamat: teks})}
                      />
                    </View>
                    <View style={styles.suppli}>
                      <Text>noTelephone: </Text>
                      <TextInput
                      keyboardType="phone-pad"
                        style={styles.input}
                        placeholder={'masukkan No Telephone'}
                        value={this.state.no_telephone}
                        onChangeText={(teks) =>
                          this.setState({no_telephone: teks})
                        }
                      />
                    </View>
                    <Button
                      title="Confirm"
                      onPress={() => this.updatesupplier()}
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

export default CRUDSupplier;

const styles = StyleSheet.create({
  suppli: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.3,
    padding: 5,
    marginTop: 5,
  },
  input: {
    width: '60%',
  },
});
