import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../Profile';
import HomeK from './HomeK';

const Draw = createDrawerNavigator();

function DrawerK() {
  return (
    <Draw.Navigator
      initialRouteName="ProfileK"
      drawerContent={(props) => <Profile {...props} />}
      drawerPosition="right"
     
      drawerStyle={{width: "68%",}}>
      <Draw.Screen name="HomeK" component={HomeK} />
    </Draw.Navigator>
  );
}
export default DrawerK;
