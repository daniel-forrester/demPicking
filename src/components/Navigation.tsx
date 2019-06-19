import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from 'react-native-paper';

// Screens / Routes
import { HomeScreen } from '../screens/HomeScreen';
import CurrentOrderStack from '../screens/CurrentOrder';
import theme from '../theme';

// Route stack
const AppNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ tintColor }) => {
          return <MaterialIcons name="dashboard" color={tintColor} size={24} />;
        },
      },
    },
    CurrentOrder: {
      screen: CurrentOrderStack,
      navigationOptions: {
        tabBarLabel: 'Current Order',
        tabBarIcon: ({ tintColor }) => {
          return (
            <MaterialIcons name="assignment" color={tintColor} size={24} />
          );
        },
      },
    },
  },
  {
    initialRouteName: 'Home',
    activeColor: Colors.white,
    inactiveColor: theme.colors.light,
    barStyle: { height: 54 },
  }
);

const Navigation = createAppContainer(AppNavigator);

export default Navigation;
