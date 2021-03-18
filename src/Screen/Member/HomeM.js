import React, {Component} from 'react';
import {Text, View, StyleSheet,TouchableOpacity,Image,ToastAndroid,ScrollView,RefreshControl} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from "@react-native-async-storage/async-storage"
import _ from 'lodash';
import LottieView from 'lottie-react-native';

export class HomeM extends Component {
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
            this.getsaldo()
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

getsaldo() {
  url = `https://s-mart-pos.herokuapp.com/api/saldoMember/${this.state.data.id}`;

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

toPrice(price) {
  return _.replace(price, /\B(?=(\d{3})+(?!\d))/g, '.');
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
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View >
            <Text style={styles.judul}> S.Mart</Text>
            <Text style={{...styles.judul,fontSize:15,fontWeight:"300",marginStart:15}}> Hallo, {this.state.data.name}</Text>

            </View>

            <TouchableOpacity
              style={{marginEnd:5}}
            
              onPress={() => this.props.navigation.openDrawer()}>
              <Image
           
                source={{
                  uri: `${this.state.data.photo}`,
                }}
                style={{width: 60, height: 60,borderRadius:100,}}
              />
            </TouchableOpacity>
          </View>
          <Text style={{color:"white"}}> Saldo anda Saai ini,</Text>
          {this.state.saldo != "" ? (

            <Text style={{alignSelf: 'flex-end',color:"white",fontSize:20,marginEnd:5}}> Rp. {this.toPrice(this.state.saldo)}</Text>
          ):(
            <Text style={{alignSelf: 'flex-end',color:"white",fontSize:20,marginEnd:5}}> Rp. 0</Text>
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex:1,
           
          }}>
          <LottieView
            style={{ height: 200}}
            source={require('../../Image/30364-online-shopping.json')}
            autoPlay
            loop
          />
          <Text style={{color:"#2994ff",fontSize:18}}>Belanjalah Sesuai </Text>
                   <Text style={{color:"#2994ff",fontSize:18}}>Kebutuhanmu </Text>
                   <Text style={{color:"#2994ff",fontSize:18}}>dan </Text>
                   <Text style={{color:"#2994ff",fontSize:18}}>Keinginanmu</Text>
          </View>
      </ScrollView>
    );
  }
}

export default HomeM;

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
