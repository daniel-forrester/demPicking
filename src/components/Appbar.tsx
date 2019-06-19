import * as React from 'react';
import { Appbar, Colors } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { persistor } from '../store';
import { Updates } from 'expo';
import theme from '../theme';

const AppBarHeader = ({ navigation = null }) => {
  const onReset = () => {
    persistor.purge();
    Updates.reload();
  };

  const canGoBack = navigation && !navigation.isFirstRouteInParent();

  return (
    <Appbar.Header
      style={{
        elevation: 0,
        borderBottomColor: theme.colors.accent,
        borderBottomWidth: 4,
      }}>
      {canGoBack && (
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
      )}
      <Appbar.Content title="Dematic iQ" titleStyle={{ fontWeight: 'bold' }} />
      <Appbar.Action
        icon={() => (
          <MaterialCommunityIcons
            size={24}
            color={Colors.white}
            name="database-refresh"
          />
        )}
        onPress={onReset}
      />
    </Appbar.Header>
  );
};

export default AppBarHeader;
