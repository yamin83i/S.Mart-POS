import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image,ToastAndroid, ScrollView,RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage"

export class HomeS extends Component {
  state={
    data:{},
    token:"",
    roles:"",
    saldo:"",
refresh:false
}

componentDidMount(){
    AsyncStorage.getItem('token').then((token) => {
        if (token != null) {
          console.log(token);
          this.setState({token: token}, () => this.getprofile());
          this.setState({refresh: false});
        } else {
          alert('anda belum login');
        }
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
            this.setState({data:resJson.data})
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

  render() {
    return (
      <ScrollView style={{flex: 1}} 
      refreshControl={
        <RefreshControl
          refreshing={this.state.refresh}
          onRefresh={() => {
            this.setState({refresh: true});
            this.componentDidMount();
          }}
        />
      }>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <View>

            <Text
              style={styles.judul}>
              {' '}
              S.Mart
            </Text>
            <Text style={{...styles.judul,fontSize:15,fontWeight:"300",marginStart:15}}> Hallo, {this.state.data.name}</Text>
                </View>
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
                source={{
                  uri: `${this.state.data.photo}`,
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
            style={{paddingHorizontal: 20, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('CRUDCategory')}>
            <Image
              source={require('../../Image/menu_category_categories_apps-256.png')}
              style={{width: 50, height: 50}}
            />
            <Text>Category </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 20, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('CRUDSupplier')}>
            <Image
              source={require('../../Image/255_outsource-people-foreign-supplier-international-global-256.png')}
              style={{width: 50, height: 50}}
            />
            <Text>Supplier </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 20, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('CRUDPembelian')}>
            <Image
              source={require('../../Image/shopping-cart-shopping_cart-purchases-bought_items-buying-purchasing-256.png')}
              style={{width: 50, height: 50}}
            />
            <Text>Pembelian </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 20,
          }}>
          <TouchableOpacity
            style={{paddingHorizontal: 20, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('CRUDProduk')}>
            <Image
              source={require('../../Image/__box_delivery_product-74-256.png')}
              style={{width: 50, height: 50}}
            />
            <Text>Produk </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 20, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('CRUDPengeluaran')}>
            <Image
              source={require('../../Image/negative-s003-256.png')}
              style={{width: 50, height: 50}}
            />
            <Text>Pengeluaran </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default HomeS;

const styles = StyleSheet.create({
  header: {
    width: '100%',
    backgroundColor: '#19aad7',
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    paddingVertical: 10,
  },
  judul:{
    alignSelf: 'flex-start',
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    marginStart: 5,
  }
});
