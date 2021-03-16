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


export class Absen extends Component {
    state = {
        token: '',
        data: [],
        refresh: false,
      };
    
      componentDidMount() {
        AsyncStorage.getItem('token').then((token) => {
          if (token != null) {
            console.log(token);
            this.setState({token: token}, () => this.getabsen());
          } else {
            alert('anda belum login');
          }
        });
      }
    
      getabsen() {
        url = 'https://s-mart-pos.herokuapp.com/api/getAbsent';
    
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
              <Text style={{fontSize:20,color:"white"}}>Absen</Text>
              
            </View>
         {this.state.data != ""?(

           <ScrollView
           refreshControl={
             <RefreshControl
             refreshing={this.state.refresh}
             onRefresh={() => {
               this.setState({refresh: true});
               this.getabsen();
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
                      <Text style={{fontSize: 15}}>name: {value.name}</Text>
                      <Text style={{fontSize: 15}}>hadir: {value.hadir}</Text>
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
      export default Absen
