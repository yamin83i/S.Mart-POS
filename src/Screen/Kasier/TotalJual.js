import React from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ToastAndroid,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

class TotalJual extends React.Component {
  state = {
    data: [],
    data2: [],
    token: '',
    id: '',
    total: '',
    diterima: '',
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
          this.setState({data: resJson.data.keranjang});
          this.setState({total: resJson.data.total_semua});
        } else {
          console.log('data tidak terambil');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deletepenjualan(id) {
    url = `https://s-mart-pos.herokuapp.com/api/deletePenjualan/${id}`;

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
            'Berhasil mendelete penjualan',
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

  toPrice(price) {
    return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
  }

  change() {
    const susuk = this.state.diterima - this.state.total;
    return <Text>{this.toPrice(susuk)}</Text>;
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <Icon name="arrow-left" size={30} color="white" onPress={()=>this.props.navigation.goBack()} />
          <Text style={styles.kata}>My Keranjang</Text>
        </View>

        <View style={{flex: 1}}>
          {this.state.data!=""?(

            <ScrollView>
            {this.state.data.map((value, index) => {
              return (
                <View style={{flex: 1}}>
                  <View style={styles.barang}>
                    <View
                      style={{
                        marginTop: 5,
                        marginHorizontal: 10,
                        marginVertical: 5,
                      }}>
                      <View>
                        <Text>{value.name}</Text>
                        <Text>uid: {value.uid}</Text>
                        <Text>Jumlah Pesanan: {value.jumlah_barang}</Text>
                        <Text>
                          sub total Rp. {this.toPrice(value.total_harga)}{' '}
                        </Text>
                      </View>

                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
            ):(
              <Text>data kosong</Text>
            )}

          <View style={{flex:1,justifyContent:"flex-end"}}>
            <View
              style={{
                ...styles.harga,
                marginTop: 10,
              }}>
              <Text style={{fontSize: 16, paddingStart: 10, fontWeight: '500'}}>
                Total :
              </Text>
              <View>
                {this.state.total !=""?(

                  <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingStart: 10,
                  }}>
                  Rp. {this.toPrice(this.state.total)}
                </Text>
                  ):(
                    <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      paddingStart: 10,
                    }}>
                    Rp. 0
                  </Text>
                  )}
              </View>
            </View>
            
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: 35,
                backgroundColor: '#0756c5',
              }}
              onPress={() => this.props.navigation.navigate("Confirm")}>
              <Text style={{color: 'white'}}>CheckOut</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View />
      </View>
    );
  }
}
export default TotalJual;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#558edd',
    paddingStart: 10,
    alignItems: 'center',
  },
  kata: {
    fontSize: 20,
    color: 'white',
    marginStart: 15,
  },
  barang: {
    marginHorizontal: 15,
    backgroundColor: 'white',
    elevation: 3,
    borderRadius: 9,
    marginTop: 9,
    justifyContent: 'center',
  },
  gambar: {
    paddingVertical: 10,
    paddingStart: 10,
  },
  harga: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    elevation: 3,
    height: 40,
  },
  delete: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 25,
    backgroundColor: '#487dc7',
  },
});
