import { Action, action } from 'easy-peasy';

export interface UserModel {
  onboarded: boolean;
  set: Action<UserModel, Partial<UserModel>>;
  reset: Action<UserModel>;
}

const user: UserModel = {
  onboarded: false,
  set: action((state, payload) => {
    return { ...state, ...payload };
  }),
  reset: action(state => {
    state.onboarded = false;
  }),
};

export default user;
