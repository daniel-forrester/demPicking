import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StoreProvider } from 'easy-peasy';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaView, StatusBar, Platform } from 'react-native';
import styled from 'styled-components';

// Store
import store, { persistor } from './store';
import theme from './theme';

import MainLayout from './components/MainLayout';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.colors.primary};
  padding-top: ${Platform.OS === 'android' ? StatusBar.currentHeight : 0};
`;

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PaperProvider theme={theme}>
          <SafeArea>
            <StatusBar barStyle="light-content" />
            <MainLayout />
          </SafeArea>
        </PaperProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
