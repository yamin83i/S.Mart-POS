import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Profile from '../Profile';
import HomeM from './HomeM';

const Draw = createDrawerNavigator();

function DrawerM() {
  return (
    <Draw.Navigator
      initialRouteName="Profile"
      drawerContent={(props) => <Profile {...props} />}
      drawerPosition="right"
     
      drawerStyle={{width: "68%",}}>
      <Draw.Screen name="HomeM" component={HomeM} />
    </Draw.Navigator>
  );
}
export default DrawerM;
