import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../Profile';
import HomeS from './HomeS';

const Draw = createDrawerNavigator();

function DrawerK() {
  return (
    <Draw.Navigator
      initialRouteName="ProfileS"
      drawerContent={(props) => <Profile {...props} />}
      drawerPosition="right"
     
      drawerStyle={{width: "68%",}}>
      <Draw.Screen name="HomeS" component={HomeS} />
    </Draw.Navigator>
  );
}
export default DrawerK;
