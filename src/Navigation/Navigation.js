import * as React from "react"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from "react-native-vector-icons/Feather"

import Login from "../Screen/Login"
import Splash from "../Screen/Splash"
import Register from "../Screen/Register"
import HomeM from "../Screen/Member/HomeM"
import DrawerM from "../Screen/Member/DrawerM"
import HomeK from "../Screen/Kasier/HomeK"
import Penjualan from "../Screen/Kasier/Penjualan"
import TotalJual from "../Screen/Kasier/TotalJual"
import DrawerK from "../Screen/Kasier/DrawerK"
import Confirm from "../Screen/Kasier/Confirm"
import Bayar from "../Screen/Kasier/Bayar"
import Topup from "../Screen/Kasier/Topup"
import ForgotPassword from "../Screen/ForgotPassword"
import ResetPassword from "../Screen/ResetPassword"
import EmailVerification from "../Screen/EmailVerification"
import DrawerS from "../Screen/Staff/DrawerS"
import HomeS from "../Screen/Staff/HomeS"
import CRUDCategory from "../Screen/Staff/CRUDCategory"
import CRUDSupplier from "../Screen/Staff/CRUDSupplier"
import CreateSupplier from "../Screen/Staff/CreateSupplier"
import CreateProduk from "../Screen/Staff/CreateProduk"
import CRUDProduk from "../Screen/Staff/CRUDProduk"
import UpdateProduk from "../Screen/Staff/UpdateProduk"
import CRUDPengeluaran from "../Screen/Staff/CRUDPengeluaran"
import Profile from "../Screen/Profile"
import UpdateProfile from "../Screen/UpdateProfile"
import CRUDPembelian from "../Screen/Staff/CRUDPembelian"
import DrawerP from '../Screen/Pimpinan/DrawerP'
import HomeP from '../Screen/Pimpinan/HomeP'
import Keuangan from '../Screen/Pimpinan/Keuangan'
import Absen from '../Screen/Pimpinan/Absen'
import Produk from '../Screen/Pimpinan/Produk'


const Stack = createStackNavigator()

function App (){
    return(
        <NavigationContainer >
            <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            <Stack.Screen name="HomeM" component={HomeM} />
            <Stack.Screen name="DrawerM" component={DrawerM} />
            <Stack.Screen name="HomeK" component={HomeK} />
            <Stack.Screen name="Confirm" component={Confirm} />
            <Stack.Screen name="Bayar" component={Bayar} />
            <Stack.Screen name="Topup" component={Topup} />
            <Stack.Screen name="Penjualan" component={Penjualan} />
            <Stack.Screen name="TotalJual" component={TotalJual} />
            <Stack.Screen name="DrawerK" component={DrawerK} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="EmailVerification" component={EmailVerification} />
            <Stack.Screen name="DrawerS" component={DrawerS} />
            <Stack.Screen name="HomeS" component={HomeS} />
            <Stack.Screen name="CRUDCategory" component={CRUDCategory} />
            <Stack.Screen name="CRUDSupplier" component={CRUDSupplier} />
            <Stack.Screen name="CreateSupplier" component={CreateSupplier} />
            <Stack.Screen name="CRUDProduk" component={CRUDProduk} />
            <Stack.Screen name="CreateProduk" component={CreateProduk} />
            <Stack.Screen name="UpdateProduk" component={UpdateProduk} />
            <Stack.Screen name="CRUDPengeluaran" component={CRUDPengeluaran} />
            <Stack.Screen name="CRUDPembelian" component={CRUDPembelian} />
            <Stack.Screen name="DrawerP" component={DrawerP} />
            <Stack.Screen name="HomeP" component={HomeP} />
            <Stack.Screen name="Keuangan" component={Keuangan} />
            <Stack.Screen name="Absen" component={Absen} />
            <Stack.Screen name="Produk" component={Produk} />
            
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default App