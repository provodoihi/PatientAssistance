import {axiosAuth} from '../services';
import {types, Instance, flow} from 'mobx-state-tree';
import {API_LIST} from '../utils';

export type UpdateProfileDataType = {
  firstname: string;
  lastname: string;
  address: string;
  age: string | number;
};

export const User = types
  .model('User')
  .props({
    firstname: types.maybeNull(types.string),
    lastname: types.maybeNull(types.string),
    fullname: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    sex: types.maybeNull(types.string),
    age: types.maybeNull(types.union(types.string, types.number)),
    phone: types.maybeNull(types.string),
  })
  .actions(self => ({
    getUserInfo: flow(function* () {
      try {
        let response = yield axiosAuth.get(API_LIST.myProfile);
        if (response.data) {
          self.firstname = response.data.firstname;
          self.lastname = response.data.lastname;
          self.email = response.data.email;
          self.address = response.data.address;
          self.phone = response.data.phone;
          self.sex = response.data.sex;
          self.age = response.data.age;
          self.fullname = self.firstname + ' ' + self.lastname;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }),
    updateProfile: flow(function* (body: UpdateProfileDataType) {
      try {
        let response = yield axiosAuth.put(API_LIST.myProfile, body);
        if (response.data) {
          self.fullname =
            response.data.firstname + ' ' + response.data.lastname;
        }
        return response;
      } catch (error) {
        throw error;
      }
    }),
  }));

export type UserType = Instance<typeof User>;
