import React, { useEffect } from 'react';
import { View, FlatList, Image } from 'react-native';
import styled from 'styled-components';
import {
  Text,
  Title,
  Divider,
  Caption,
  List,
  Colors,
  IconButton,
  Button,
} from 'react-native-paper';
import { useStoreActions, useStoreState } from '../../store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../theme';
import { DateTime } from 'luxon';
import CurrentOrderComplete from './CurrentOrderComplete';

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ListIcon = styled(MaterialCommunityIcons)`
  padding: 8px;
  align-self: center;
`;

const CurrentOrderHome = ({ navigation }) => {
  const currentPickWalk = useStoreState(state => state.orders.currentPickWalk);
  const pickItem = useStoreActions(actions => actions.orders.pickItem);
  const unPickItem = useStoreActions(actions => actions.orders.unPickItem);
  const assignContainer = useStoreActions(
    actions => actions.orders.assignContainer
  );

  if (!currentPickWalk) {
    return (
      <Container>
        <Title>No Current Order</Title>
        <Text>Please start a new order first.</Text>
      </Container>
    );
  }

  const totalItems = currentPickWalk.items.reduce((acc, item) => {
    acc += item.quantity;
    return acc;
  }, 0);
  // Add key to pickWalks
  currentPickWalk.items = currentPickWalk.items.map(item => {
    return { ...item, key: `key-${item.sku}` };
  });
  const canComplete =
    currentPickWalk.items.filter(item => !item.picked).length === 0;
  const formattedDate = DateTime.fromISO(
    currentPickWalk.createdAt
  ).toLocaleString(DateTime.DATETIME_SHORT);

  return (
    <Container>
      {currentPickWalk.containerId && (
        <CurrentOrderComplete navigation={navigation} visible={true} />
      )}
      <Title>{currentPickWalk.customer.name}</Title>
      <Caption>Pick ID: {currentPickWalk.pickId}</Caption>
      <Caption>Created: {formattedDate}</Caption>
      <Button
        mode={canComplete ? 'contained' : 'outlined'}
        color={theme.colors.accent}
        style={{ margin: 16 }}
        disabled={!canComplete}
        onPress={() => {
          assignContainer(currentPickWalk.pickId);
        }}>
        Complete Order
      </Button>
      <Caption style={{ alignSelf: 'flex-start', paddingLeft: 16 }}>
        {totalItems} Items
      </Caption>
      <FlatList
        data={currentPickWalk.items}
        ItemSeparatorComponent={() => <Divider />}
        style={{ height: '100%', width: '100%', padding: 16 }}
        renderItem={({ item, index }) => {
          return (
            <List.Item
              title={`(${item.quantity}) ${item.name}`}
              titleStyle={{ fontSize: 14 }}
              style={{ paddingLeft: 0 }}
              description={`Price: $${item.price.toFixed(2)}`}
              onPress={() => {
                alert(item.name);
              }}
              left={props => {
                return (
                  <>
                    {item.picked ? (
                      <ListIcon
                        {...props}
                        size={24}
                        name="checkbox-marked-circle"
                        color={Colors.green500}
                      />
                    ) : (
                      <ListIcon
                        {...props}
                        size={24}
                        name="checkbox-blank-circle-outline"
                        color={Colors.grey500}
                      />
                    )}
                    <Image
                      style={{ width: 50, height: 50 }}
                      source={{ uri: item.image }}
                    />
                  </>
                );
              }}
              right={props =>
                item.picked ? (
                  <IconButton
                    icon={'remove'}
                    style={{ alignSelf: 'center' }}
                    onPress={() => {
                      unPickItem(item.sku);
                    }}>
                    {item.picked ? 'Remove' : 'Add'}
                  </IconButton>
                ) : (
                  <>
                    <IconButton
                      icon={'add'}
                      style={{ alignSelf: 'center' }}
                      onPress={() => {
                        pickItem(item.sku);
                      }}>
                      {item.picked ? 'Remove' : 'Add'}
                    </IconButton>
                    <IconButton
                      icon={() => (
                        <MaterialCommunityIcons size={24} name="barcode-scan" />
                      )}
                      style={{ alignSelf: 'center' }}
                      onPress={() => {
                        navigation.navigate('CurrentOrderScan', { item });
                      }}
                    />
                  </>
                )
              }
            />
          );
        }}
      />
    </Container>
  );
};

export default CurrentOrderHome;
