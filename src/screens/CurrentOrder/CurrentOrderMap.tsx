import React from 'react';
import { View, Text, Image } from 'react-native';

const CurrentOrderMap = () => {
  return (
    <View>
      <Image
        source={require('../../../assets/planogram.png')}
        style={{ width: '100%' }}
      />
    </View>
  );
};

export default CurrentOrderMap;
