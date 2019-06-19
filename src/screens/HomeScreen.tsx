import React, { useEffect } from 'react';
import styled from 'styled-components';
import { View, Alert } from 'react-native';
import * as SMS from 'expo-sms';
import Constants from 'expo-constants';

import { useStoreState, useStoreActions, persistor } from '../store';
import OpenOrders from '../components/OpenOrders';
import RecentOrder from '../components/RecentOrder';
import UrgentOrder from '../components/UrgentOrder';
import AppBarHeader from '../components/Appbar';

const HomeContainer = styled(View)`
  flex: 1;
  flex-direction: column;
  background-color: lightgray;
  align-items: center;
  padding: 16px;
`;

const HomeScreen = ({ navigation }) => {
  // const handleSMS = async () => {
  //   const isAvailable = await SMS.isAvailableAsync();
  //   if (isAvailable && Constants.isDevice) {
  //     // do your SMS stuff here
  //     SMS.sendSMSAsync(['5555555555'], 'Hello World.');
  //   } else {
  //     Alert.alert('Warning', 'SMS is not available for this device!');
  //     // misfortune... there's no SMS available on this device
  //   }
  // };

  return (
    <>
      <AppBarHeader navigation={navigation} />
      <HomeContainer>
        <View style={{ flexDirection: 'row' }}>
          <RecentOrder
            style={{ flex: 1, marginBottom: 16, marginRight: 16 }}
            navigation={navigation}
          />
          <UrgentOrder
            style={{ flex: 1, marginBottom: 16 }}
            navigation={navigation}
          />
        </View>
        <OpenOrders navigation={navigation} />
      </HomeContainer>
    </>
  );
};

export { HomeScreen };
