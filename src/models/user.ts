import {types, Instance} from 'mobx-state-tree';

export const User = types
  .model({
    id: types.identifier,
    username: types.maybeNull(types.string),
    fullname: types.maybeNull(types.string),
    firstname: types.maybeNull(types.string),
    lastname: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    sex: types.maybeNull(types.string),
    age: types.maybeNull(types.union(types.string, types.number)),
    phone: types.maybeNull(types.string),
    role: types.maybeNull(types.string),
  })
  .actions(self => ({
    saveUserInfo: (response: any) => {
      self.id = '';
      self.firstname = response.data.firstname;
    },
  }));

export type UserType = Instance<typeof User>;
