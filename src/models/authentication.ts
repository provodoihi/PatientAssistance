import axios from 'axios';
import {types, Instance, flow} from 'mobx-state-tree';
import {API_List} from '../API';
import * as storage from '../utils/storage';
import {STORAGE_KEY} from '../utils';

export type SignInDataType = {
  username: string;
  password: string;
};

export type SignUpDataType = {
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  phone: string;
  address: string;
  age: string | number;
  sex: string;
};

export const Auth = types
  .model('Auth')
  .props({
    token: types.maybeNull(types.string),
    userID: types.maybeNull(types.union(types.string, types.number)),
    role: types.maybeNull(types.string),
    fullname: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
  })
  .actions(self => ({
    login: flow(function* (body: SignInDataType) {
      try {
        const response = yield axios.post(API_List.login, body);
        if (response.data) {
          self.token = response.data.accessToken;
          self.userID = response.data.id;
          self.role = response.data.roles[0];
          self.email = response.data.email;
          self.phone = response.data.phone;
          self.fullname = response.data.fullname;
          storage.saveString(STORAGE_KEY.TOKEN, response.data.accessToken);
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }),
    register: flow(function* (body: SignUpDataType) {
      try {
        const response = yield axios.post(API_List.signup, body);
        return response;
      } catch (error) {
        throw error;
      }
    }),
    saveToken: () => {
      if (self.token) {
        storage.saveString(STORAGE_KEY.TOKEN, self.token);
      }
    },
    deleteToken: () => {
      self.token = null;
      storage.clear();
    },
  }));

export type AuthType = Instance<typeof Auth>;
