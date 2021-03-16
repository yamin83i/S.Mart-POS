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

export class CRUDCategory extends Component {
  state = {
    name: '',
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
        this.setState({token: token}, () => this.getcategory());
      } else {
        alert('anda belum login');
      }
    });
  }

  createcategory() {
    url = 'https://s-mart-pos.herokuapp.com/api/createCategory';

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        name: this.state.name,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.message == 'successfully added category') {
          this.setState({modal: false});
          ToastAndroid.show(
            'Berhasil menambah Kategory',
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

  updatecategory() {
    url = `https://s-mart-pos.herokuapp.com/api/updateCategory/${this.state.id}`;

    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.token}`,
      },
      body: JSON.stringify({
        name: this.state.name,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        if (resJson.code == 200) {
          ToastAndroid.show(
            'Berhasil mengedit Kategory',
            ToastAndroid.SHORT,
            ToastAndroid.CENTER,
          );
        } else alert('try again');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletecategory(id) {
    url = `https://s-mart-pos.herokuapp.com/api/deleteCategory/${id}`;

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
        if (resJson.message == 'successfully deleted categroy') {
          ToastAndroid.show(
            'Berhasil mendelete Kategory',
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
          <Text style={{fontSize:20,color:"white",marginStart:10}}>Category</Text>
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
              <Text>Nama Kategori: </Text>
              <TextInput
                style={{width: '60%'}}
                placeholder={'masukkan nama category'}
                onChangeText={(teks) => this.setState({name: teks})}
              />
            </View>
            <Button title="Confirm" onPress={() => this.createcategory()} />
          </View>
        </Modal>
        {this.state.data != ""?(
        <ScrollView 
        refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true});
                this.getcategory();
              }}
            />
          }>
          {this.state.data.map((value, index) => {
            return (
              <View key={value.id}>
                <View
                  
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
                    <Text style={{fontSize: 18}}>{value.name}</Text>
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
                      onPress={() => this.deletecategory(value.id)}
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
                      <Text>Nama Kategori: </Text>
                      <TextInput
                        style={{width: '60%'}}
                        placeholder={'masukkan nama category baru'}
                        onChangeText={(teks) => this.setState({name: teks})}
                      />
                    </View>
                    <Button
                    
                      title="Confirm"
                      onPress={() => this.updatecategory()}
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
