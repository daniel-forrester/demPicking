import React from 'react';
import { Colors, Card, Text, Button, Caption } from 'react-native-paper';
import styled from 'styled-components';
import { useStoreState } from '../store';
import { DateTime } from 'luxon';

const CardTitle = styled(Card.Title)`
  height: 40px;
`;

const UrgentOrder = ({ style, navigation }) => {
  const pickWalk = useStoreState(state => state.orders.pickWalks)[0];
  const formattedDate = DateTime.fromISO(pickWalk.createdAt).toLocaleString(
    DateTime.DATETIME_SHORT
  );
  return (
    <Card style={style}>
      <CardTitle
        title="Urgent Order"
        titleStyle={{
          color: Colors.red500,
          fontSize: 14,
          textTransform: 'uppercase',
        }}
      />
      <Card.Content>
        <Text>{`${pickWalk.pickId.slice(0, 16)}...`}</Text>
        <Caption style={{ marginBottom: 16 }}>{formattedDate}</Caption>
        <Button mode="contained" disabled>
          Start
        </Button>
      </Card.Content>
    </Card>
  );
};

export default UrgentOrder;
