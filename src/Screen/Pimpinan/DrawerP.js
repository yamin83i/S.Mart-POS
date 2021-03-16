import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../Profile';
import HomeP from './HomeP';

const Draw = createDrawerNavigator();

function DrawerP() {
  return (
    <Draw.Navigator
      initialRouteName="Profile"
      drawerContent={(props) => <Profile {...props} />}
      drawerPosition="right"
     
      drawerStyle={{width: "68%",}}>
      <Draw.Screen name="HomeP" component={HomeP} />
    </Draw.Navigator>
  );
}
export default DrawerP;
