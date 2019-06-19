import React from 'react';
import { createStackNavigator } from 'react-navigation';
import AppBarHeader from '../../components/Appbar';
import CurrentOrderHome from './CurrentOrderHome';
import CurrentOrderScan from './CurrentOrderScan';
import CurrentOrderMap from './CurrentOrderMap';
import CurrentOrderChat from './CurrentOrderChat';
import theme from '../../theme';

import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

const CurrentOrderHomeStack = createMaterialTopTabNavigator(
  {
    CurrentOrderList: {
      screen: CurrentOrderHome,
      navigationOptions: {
        tabBarLabel: 'ORDER',
      },
    },
    CurrentOrderMap: {
      screen: CurrentOrderMap,
      navigationOptions: {
        tabBarLabel: 'MAP',
      },
    },
    CurrentOrderChat: {
      screen: CurrentOrderChat,
      navigationOptions: {
        tabBarLabel: 'CHAT',
      },
    },
  },
  {
    tabBarOptions: {
      indicatorStyle: {
        backgroundColor: theme.colors.accent,
      },
      style: {
        backgroundColor: theme.colors.light,
      },
    },
  }
);

const CurrentOrderStack = createStackNavigator(
  {
    CurrentOrderHome: {
      screen: CurrentOrderHomeStack,
      navigationOptions: ({ navigation }) => ({
        header: () => {
          return <AppBarHeader navigation={navigation} />;
        },
      }),
    },
    CurrentOrderScan: {
      screen: CurrentOrderScan,
      navigationOptions: ({ navigation }) => ({
        header: () => {
          return <AppBarHeader navigation={navigation} />;
        },
      }),
    },
  },
  {
    initialRouteName: 'CurrentOrderHome',
  }
);

export default CurrentOrderStack;
