import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Text, ProgressBar, Colors, Button } from 'react-native-paper';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styled from 'styled-components';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { Asset } from 'expo-asset';
import { useStoreActions } from '../../store';
import theme from '../../theme';

const Container = styled(View)`
  flex: 1;
  background-color: black;
  align-items: center;
  justify-content: center;
`;

const CurrentOrderScan = ({ navigation }) => {
  const item = navigation.getParam('item');
  const [state, setState] = useState({
    hasCameraPermission: null,
    scanned: false,
  });
  const pickItem = useStoreActions(actions => actions.orders.pickItem);

  // Run once before render
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setState({ ...state, hasCameraPermission: status === 'granted' });
    };
    getPermission();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    const trimmedData = data.length > 12 ? data.slice(1) : data;
    const soundObject = new Audio.Sound();
    if (item.sku === trimmedData) {
      await soundObject.loadAsync(
        require('../../../assets/sounds/success.mp3')
      );
      pickItem(trimmedData);
      navigation.goBack();
    } else {
      await soundObject.loadAsync(
        require('../../../assets/sounds/warning.mp3')
      );
      alert(`Scanned bar code ${data} does not match item! Please try again.`);
    }
    await soundObject.setPositionAsync(0);
    await soundObject.playAsync();
    setState({ ...state, scanned: true });
  };

  const { hasCameraPermission, scanned } = state;

  if (hasCameraPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Container>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{
          position: 'absolute',
          top: 0,
          bottom: 80,
          left: 0,
          right: 0,
        }}
      />
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{ width: 60, height: 60, marginRight: 8 }}
          source={{ uri: item.image }}
        />
        <Text>{`${item.name}\n${item.netWeightOz}oz`}</Text>
      </View>
      {scanned ? (
        <Button
          mode="contained"
          onPress={() => setState({ ...state, scanned: false })}>
          Scan Again
        </Button>
      ) : (
        <>
          <ProgressBar
            color={Colors.red500}
            style={{
              width: '50%',
            }}
            progress={1}
            indeterminate={true}
          />
          <Button color={Colors.red500} loading>
            Scanning...
          </Button>
        </>
      )}
    </Container>
  );
};

export default CurrentOrderScan;
