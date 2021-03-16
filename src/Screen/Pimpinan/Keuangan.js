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
import _ from 'lodash';


export class Keuangan extends Component {
    state = {
        token: '',
        data: [],
        refresh: false,
      };
    
      componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
          if (token != null) {
            console.log(token);
            this.setState({token: token}, () => this.getkeuangan());
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
              this.setState({data: resJson.data.data});
              ToastAndroid.show(
                'Data Didapat',
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
    
      toPrice(price) {
        return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
      }
      
      
    
      render() {
        return (
          <View style={{flex: 1}}>
            <View
              style={{
                width: '100%',
                height: 40,
                backgroundColor: '#19aad7',
                elevation: 3,
                justifyContent:"center",
                padding:10
              }}>
              <Text style={{fontSize:20,color:"white"}}>Keuangan</Text>
              
            </View>
            {this.state.data != ""?(
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refresh}
                  onRefresh={() => {
                    this.setState({refresh: true});
                    this.getkeuangan();
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
                      <View style={{maxWidth:"75%"}}>
                      <Text style={{fontSize: 15}}>tanggal: {value.tanggal}</Text>
                      <Text style={{fontSize: 15}}>penjualan: Rp. {this.toPrice(value.penjualan)}</Text>
                      <Text style={{fontSize: 15}}>pembelian: Rp. {this.toPrice(value.pembelian)}</Text>
                      <Text style={{fontSize: 15}}>pengeluaran: Rp.{this.toPrice(value.pengeluaran)}</Text>
                      <Text style={{fontSize: 15}}>pendapatan: Rp. {this.toPrice(value.pendapatan)}</Text>
    
                      </View>
                      
                    </View>
                    
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
export default Keuangan


  