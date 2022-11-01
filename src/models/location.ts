import axios from 'axios';
import {types, flow, Instance} from 'mobx-state-tree';
import {API_LIST} from '../utils';

const LocationData = types.model({
  id: types.maybeNull(types.union(types.string, types.number)),
  name: types.maybeNull(types.string),
  address: types.maybeNull(types.string),
  phone: types.maybeNull(types.string),
  latitude: types.maybeNull(types.number),
  longitude: types.maybeNull(types.number),
});

export type LocationDataType = Instance<typeof LocationData>;

export const Location = types
  .model({
    itemList: types.array(LocationData),
    responseStatus: types.maybeNull(types.number),
  })
  .actions(self => ({
    getLocationList: flow(function* (searchKeyword: string) {
      try {
        let response = yield axios.get(API_LIST.filterLocation + searchKeyword);
        if (response.data) {
          self.itemList = response.data;
          self.responseStatus = response.status;
          return response.data;
        }
      } catch (error) {
        throw error;
      }
    }),
  }));
