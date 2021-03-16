import React, { Component } from 'react'
import { Text, View,Image,ToastAndroid } from 'react-native'
import LottieView from "lottie-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"

export class Splash extends Component {
state={
    role:""
}
    componentDidMount(){
        AsyncStorage.getItem('role').then((role) => {
            if (role != null) {
              console.log(role);
              this.setState({role: role});
              setTimeout(()=>{
                  this.roles()
              },3000)
            } else {
              console.log("role tidak ada");
              setTimeout(()=>{
                this.roles()
            },3000)
            }
          });
    }

    roles() {
        if (this.state.role == "member") {
          this.setState({loading: false});
          this.props.navigation.replace('DrawerM'),
            ToastAndroid.show(
              'Anda Berhasil Login',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
        } else if (this.state.role == "pimpinan") {
          this.setState({loading: false});
          this.props.navigation.replace('DrawerP'),
            ToastAndroid.show(
              'Anda Berhasil Login',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
        } else if (this.state.role == "kasir") {
          this.setState({loading: false});
          this.props.navigation.replace('DrawerK'),
            ToastAndroid.show(
              'Anda Berhasil Login',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
        } else if (this.state.role == "staff") {
          this.setState({loading: false});
          this.props.navigation.replace('DrawerS'),
            ToastAndroid.show(
              'Anda Berhasil Login',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
            );
        } else {
            this.props.navigation.replace("Login")
        }
      }

    render() {
        return (
            <View style={{flex:1}}>
               <View style={{flex:1,justifyContent:"center",alignItems:"center",}}>
                   <Image
                   source={require("../Image/retail-store-icon-14319.png")}
                   style={{width:90,height:90}}
                   />
                   <View style={{justifyContent:"center",alignItems:"center"}} >
                   <Text style={{color:"#2994ff",fontSize:18}}>Belanjalah Sesuai </Text>
                   <Text style={{color:"#2994ff",fontSize:18}}>Kebutuhanmu </Text>
                   <Text style={{color:"#2994ff",fontSize:18}}>dan </Text>
                   <Text style={{color:"#2994ff",fontSize:18}}>Keinginanmu</Text>
                   </View>
                   </View>
                   
            </View>
        )
    }
}

export default Splash