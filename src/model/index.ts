import todos, { TodosModel } from './todos';
import notification, { NotificationModel } from './notification';
import user, { UserModel } from './user';
import orders, { OrdersModel } from './orders';
import { Action, action } from 'easy-peasy';

export interface StoreModel {
  todos: TodosModel;
  notification: NotificationModel;
  user: UserModel;
  orders: OrdersModel;
}

const model: StoreModel = {
  todos,
  notification,
  user,
  orders,
};

export default model;
