import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image,ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage"

export class HomeK extends Component {
  state={
    data:{},
    token:"",
    role:"",
    
}

componentDidMount(){
    AsyncStorage.getItem('token').then((token) => {
        if (token != null) {
          console.log(token);
          this.setState({token: token}, () => this.getprofile());
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
      <View style={{flex: 1}}>
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
                style={{width: 60, height: 60,marginEnd:5,borderRadius:100}}
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
            onPress={() => this.props.navigation.navigate('Penjualan')}>
            <Image
              source={require('../../Image/pngegg.png')}
              style={{width: 50, height: 50}}
            />
            <Text>Penjualan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{paddingHorizontal: 20, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('TotalJual')}>
            <Image
              source={require('../../Image/kisspng-advance-payment-computer-icons-money-cash-payment-icon-5ab07b158f4357.0076462515215152855868.png')}
              style={{width: 50, height: 50}}
            />
            <Text>Pembayaran</Text>
          </TouchableOpacity> 
          <TouchableOpacity
            style={{paddingHorizontal: 20, alignItems: 'center'}}
            onPress={() => this.props.navigation.navigate('Topup')}>
            <Image
              source={{uri:`https://assets.jenius.com/assets/2018/10/31072614/e-walleticon.png`}}
              style={{width: 50, height: 50}}
            />
            <Text>Topup Member</Text>
          </TouchableOpacity>
        </View>
      
      </View>
    );
  }
}

export default HomeK;

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
