import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {Auth} from '../authentication';
import {User} from '../user';
import {Location} from '../location';

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model('RootStore').props({
  authStore: types.optional(Auth, {} as any),
  userStore: types.optional(User, {} as any),
  locationStore: types.optional(Location, {} as any),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
