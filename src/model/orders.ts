import { Action, action } from 'easy-peasy';

import { initialPickWalks } from '../data';

export type Customer = {
  id: string;
  name: string;
  mobile: number;
};

export type PickItem = {
  name: string;
  image: string;
  sku: string;
  quantity: number;
  price: number;
  netWeightOz: number;
  picked: boolean;
};

export type PickWalk = {
  pickId: string;
  customer: Customer;
  createdAt: string;
  containerId?: string;
  startedAt?: string;
  completedAt?: string;
  items: PickItem[];
  substitutedItems: PickItem[];
  outOfStockItems: PickItem[];
};

export type OrdersModel = {
  pickWalks: PickWalk[];
  currentPickWalk: PickWalk;
  pickItem: Action<OrdersModel, string>;
  unPickItem: Action<OrdersModel, string>;
  startPickWalk: Action<OrdersModel, string>;
  completePickWalk: Action<OrdersModel, string>;
  assignContainer: Action<OrdersModel, string>;
};

const orders: OrdersModel = {
  pickWalks: initialPickWalks,
  currentPickWalk: null,
  pickItem: action((state, sku) => {
    const pickedItem = state.currentPickWalk.items.find(item => {
      return item.sku === sku;
    });
    if (pickedItem) {
      pickedItem.picked = true;
    }
  }),
  unPickItem: action((state, sku) => {
    const pickedItem = state.currentPickWalk.items.find(item => {
      return item.sku === sku;
    });
    if (pickedItem) {
      pickedItem.picked = false;
    }
  }),
  startPickWalk: action((state, pickId) => {
    state.pickWalks = state.pickWalks.map(pickWalk => {
      if (pickWalk.pickId === pickId) {
        state.currentPickWalk = pickWalk;
        pickWalk.startedAt = new Date().toISOString();
      }
      return pickWalk;
    });
  }),
  assignContainer: action((state, pickId) => {
    state.currentPickWalk.containerId = Math.round(
      Math.random() * 100
    ).toString();
  }),
  completePickWalk: action((state, pickId) => {
    state.pickWalks = state.pickWalks.map(pickWalk => {
      if (pickWalk.pickId === pickId) {
        pickWalk.completedAt = new Date().toISOString();
        state.currentPickWalk = null;
      }
      return pickWalk;
    });
  }),
};

export default orders;
