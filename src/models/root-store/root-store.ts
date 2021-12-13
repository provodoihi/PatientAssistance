import {Instance, SnapshotOut, types} from 'mobx-state-tree';
import {Auth} from '../authentication';
import {Appointment} from '../appointment';
import {User} from '../user';
import {Location} from '../location';
import {Question, Answer} from '../health-advice';

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model('RootStore').props({
  authStore: types.optional(Auth, {} as any),
  userStore: types.optional(User, {} as any),
  locationStore: types.optional(Location, {} as any),
  appointmentStore: types.optional(Appointment, {} as any),
  questionStore: types.optional(Question, {} as any),
  answerStore: types.optional(Answer, {} as any),
});

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
