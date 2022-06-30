import axios from 'axios';
import {types, Instance, flow} from 'mobx-state-tree';
import {API_LIST} from '../utils';
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
    fullname: types.maybeNull(types.string),
    role: types.maybeNull(types.string),
    phone: types.maybeNull(types.string),
  })
  .actions(self => ({
    login: flow(function* (body: SignInDataType) {
      try {
        const response = yield axios.post(API_LIST.login, body);
        if (response.data) {
          self.token = response.data.accessToken;
          self.userID = response.data.id;
          self.role = response.data.roles[0];
          self.fullname = response.data.fullname;
          self.phone = response.data.phone;
          storage.saveString(STORAGE_KEY.TOKEN, response.data.accessToken);
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }),
    register: flow(function* (body: SignUpDataType) {
      try {
        const response = yield axios.post(API_LIST.signup, body);
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
    updateFullname: (name: string) => {
      self.fullname = name;
    },
    signOut: () => {
      storage.clear();
    },
  }))
  .views(self => ({
    get getGullname() {
      return self.fullname;
    },
  }));

export type AuthType = Instance<typeof Auth>;
