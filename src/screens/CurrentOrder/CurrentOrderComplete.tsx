import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

import React, { useState } from 'react';
import { useStoreState, useStoreActions } from '../../store';

const CurrentOrderComplete = ({ visible = false, navigation }) => {
  const [isVisible, setVisible] = useState(visible);
  const currentPickWalk = useStoreState(state => state.orders.currentPickWalk);
  const completePickWalk = useStoreActions(
    actions => actions.orders.completePickWalk
  );
  return (
    <Portal>
      <Dialog dismissable={false} visible={isVisible}>
        <Dialog.Title>
          Container #{currentPickWalk.containerId} Assigned
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph>
            This order has been assigned to container #
            {currentPickWalk.containerId}. Please return all items to the
            appropriate location.
          </Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={() => {
              setVisible(false);
              completePickWalk(currentPickWalk.pickId);
              navigation.navigate('Home');
            }}>
            Complete Order
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default CurrentOrderComplete;
