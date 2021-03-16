import React, { Component } from 'react'
import { Text, View,Modal,TextInput,TouchableOpacity,ToastAndroid,StyleSheet,Button, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export class Topup extends Component {
    state = {
        token: '',
        modal: false,
        total: '',
        member: '',
        data: [],
        saldo: '',
        topup:""
      };
    
      componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
          if (token != null) {
            console.log(token);
            this.setState({token: token} );
            this.getmember()
          } else {
            alert('anda belum login');
          }
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
    
      getsaldo(id) {
        url = `https://s-mart-pos.herokuapp.com/api/saldoMember/${id}`;
    
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
              this.setState({saldo: resJson.data[0].saldo});
            } else {
              alert('data tidak terambil');
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }

      Topup = () => {
        const {topup} = this.state;
        const url = `https://s-mart-pos.herokuapp.com/api/topupMember/${this.state.member.user_id}`;
    
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'aplication/json',
            'Content-Type': 'aplication/json',
            Authorization: `Bearer ${this.state.token}`,
          },
          body: JSON.stringify({
            saldo: topup,
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
            //   this.props.navigation.navigate('DrawerK');
                alert("saldo bertambah Rp. "+this.toPrice(this.state.topup))
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

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
            <Modal
              visible={this.state.modal}
              onRequestClose={() => this.setState({modal: false})}
              animationType="fade">
                {this.state.data!= ""?(

                  <ScrollView style={{flex: 1}}>
                  {this.state.data.map((value, index) => {
                    return (
                      <TouchableOpacity
                          key={value.id}
                          style={{
                            marginHorizontal: '2%',
                              backgroundColor: 'white',
                              elevation: 3,
                              borderRadius: 9,
                              Width: '43%',
                              marginTop: 10,
                            }}
                            onPress={() =>
                              this.setState({member: value, modal: false}, () =>
                              this.getsaldo(value.user_id),
                              )
                            }>
                        <View style={{maxWidth: '90%', marginStart: 5}}>
                          <Text style={Styles.text}>name: {value.user.name}</Text>
                          <Text style={Styles.text}>email: {value.user.email}</Text>
                          <Text style={Styles.text}>
                            kode_member: {value.user.kode_member}
                          </Text>
                          <Text style={Styles.text}>telepon: {value.user.telepon}</Text>
                          <Text style={Styles.text}>alamat: {value.user.alamat}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
    
              </ScrollView>
            ):(
              <Text>dta Kosong</Text>
            )}
            </Modal>
            
            <View style={{ justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => this.setState({modal: true})}
                style={{
                  padding: 10,
                  borderWidth: 1,
                  margin: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // maxWidth: '50%',
                  marginHorizontal: 30,
                }}>
                {this.state.member == '' ? (
                  <Text style={{fontSize: 18, marginStart: 5}}>
                    {'>>pilih Member<<'}{' '}
                  </Text>
                ) : (
                  <Text style={{fontSize: 18, marginStart: 5}}>
                    {this.state.member.user.name}
                  </Text>
                )}
              </TouchableOpacity>
              <View style={{...Styles.input, height: 45}}>
                <Text>Saldo: </Text>
                {this.state.saldo != '' ? (
                  <Text>Rp. {this.toPrice(this.state.saldo)}</Text>
                ) : (
                  <Text>Rp. 0</Text>
                )}
              </View>
              <View style={{...Styles.input, height: 45}}>
                <Text>Topup: </Text>
                <TextInput 
                value={this.state.topup}
                style={{width:"100%"}}
                keyboardType="phone-pad"
                placeholder="nominal"
                onChangeText={(t)=>this.setState({topup:t})}
                />
              </View>
              <Button title="Topup" onPress={() => this.Topup()} />
            </View>
          </View>
        )
    }
}

export default Topup
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
    text: {
      fontSize: 15,
    },
  });
  