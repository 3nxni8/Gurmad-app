import React from 'react';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../../assets/icons/home.png')}
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="campaigns"
        options={{
          title: 'Campaigns',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../../assets/icons/list.png')}
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              source={require('../../../assets/icons/profile.png')}
              style={{ width: 24, height: 24, opacity: focused ? 1 : 0.5 }}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
