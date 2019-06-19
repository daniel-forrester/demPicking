import { createStore } from 'easy-peasy';
import { persistStore, persistReducer } from 'redux-persist';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';

import model, { StoreModel } from './model';

const store = createStore<StoreModel, any>(model, {
  reducerEnhancer: reducer => {
    return persistReducer(
      {
        key: 'root',
        storage: ExpoFileSystemStorage,
      },
      reducer
    );
  },
});

const persistor = persistStore(store);

const { useStoreActions, useStoreDispatch, useStoreState } = store;

// We export the hooks from our store as they will contain the
// type information on them
export { useStoreActions, useStoreDispatch, useStoreState, persistor };

export default store;
