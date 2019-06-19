import React from 'react';
import {
  Avatar,
  Button,
  Card,
  List,
  Divider,
  Colors,
  Caption,
} from 'react-native-paper';
import { FlatList } from 'react-native';
import { DateTime } from 'luxon';
import { orderBy } from 'lodash';

import { useStoreState, useStoreActions } from '../store';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components';
import theme from '../theme';

const ListIcon = styled(MaterialCommunityIcons)`
  padding: 8px;
  align-self: center;
`;

const OpenOrders = ({ navigation, style = {} }) => {
  let pickWalks = useStoreState(state => state.orders.pickWalks);
  const currentPickWalk = useStoreState(state => state.orders.currentPickWalk);
  const startPickWalk = useStoreActions(
    actions => actions.orders.startPickWalk
  );
  const completePickWalk = useStoreActions(
    actions => actions.orders.completePickWalk
  );
  // Add key to pickWalks
  pickWalks = pickWalks.map(pickWalk => {
    return { ...pickWalk, key: pickWalk.pickId };
  });
  pickWalks = orderBy(
    pickWalks,
    ['completedAt', 'createdAt'],
    ['desc', 'desc']
  );

  if (!pickWalks.length) return null;

  return (
    <Card
      style={{
        ...style,
        flex: 1,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}>
      <Card.Title
        title="Open Orders"
        subtitle="These orders are ready to be fulfilled."
        left={props => (
          <Avatar.Icon
            {...props}
            icon="assignment"
            color={Colors.white}
            style={{ backgroundColor: theme.colors.accent }}
          />
        )}
      />
      <Card.Content>
        <FlatList
          data={pickWalks}
          ItemSeparatorComponent={() => <Divider />}
          style={{ height: '100%' }}
          renderItem={({ item, index }) => {
            const formattedDate = DateTime.fromISO(
              item.createdAt
            ).toLocaleString(DateTime.DATETIME_SHORT);
            const totalItems = item.items.reduce((acc, item) => {
              acc += item.quantity;
              return acc;
            }, 0);
            const isComplete = !!item.completedAt;
            return (
              <List.Item
                style={{ paddingLeft: 0, opacity: isComplete ? 0.25 : 1 }}
                title={
                  <>
                    {`${item.customer.name}  `}
                    <Caption>{`${item.pickId.slice(0, 16)}...`}</Caption>
                  </>
                }
                description={`${formattedDate}\n${totalItems} items | ${
                  item.items.length
                } unique`}
                left={props =>
                  isComplete ? (
                    <ListIcon
                      {...props}
                      size={24}
                      name="check"
                      color={Colors.green500}
                    />
                  ) : item.startedAt ? (
                    <ListIcon
                      {...props}
                      size={24}
                      name="timelapse"
                      color={Colors.green500}
                    />
                  ) : (
                    <ListIcon
                      {...props}
                      size={24}
                      name="clock-outline"
                      color={Colors.grey500}
                    />
                  )
                }
                right={props =>
                  isComplete ? null : (
                    <Button
                      mode="contained"
                      compact
                      disabled={
                        currentPickWalk &&
                        currentPickWalk.pickId === item.pickId
                      }
                      style={{ height: 36, alignSelf: 'center' }}
                      onPress={() => {
                        startPickWalk(item.pickId);
                        navigation.navigate('CurrentOrder');
                      }}>
                      Start
                    </Button>
                  )
                }
              />
            );
          }}
        />
      </Card.Content>
    </Card>
  );
};

export default OpenOrders;
