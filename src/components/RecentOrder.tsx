import React from 'react';
import { Card, Text, Button, Caption, Colors } from 'react-native-paper';
import { useStoreState } from '../store';
import { DateTime } from 'luxon';
import styled from 'styled-components';

const CardTitle = styled(Card.Title)`
  height: 40px;
`;

const RecentOrder = ({ style, navigation }) => {
  const currentPickWalk = useStoreState(state => state.orders.currentPickWalk);

  if (!currentPickWalk) {
    return (
      <Card style={style}>
        <CardTitle
          title="Recent Order"
          titleStyle={{
            fontSize: 14,
            textTransform: 'uppercase',
          }}
        />
        <Card.Content>
          <Text>No recent orders...</Text>
        </Card.Content>
      </Card>
    );
  }

  const formattedDate = DateTime.fromISO(
    currentPickWalk.createdAt
  ).toLocaleString(DateTime.DATETIME_SHORT);

  return (
    <Card style={style}>
      <CardTitle
        title="Recent Order"
        titleStyle={{
          fontSize: 14,
          textTransform: 'uppercase',
        }}
      />
      <Card.Content>
        <Text>{`${currentPickWalk.pickId.slice(0, 16)}...`}</Text>
        <Caption style={{ marginBottom: 16 }}>{formattedDate}</Caption>
        <Button
          mode="contained"
          disabled={!currentPickWalk}
          onPress={() => {
            navigation.navigate('CurrentOrder');
          }}>
          Continue
        </Button>
      </Card.Content>
    </Card>
  );
};

export default RecentOrder;
