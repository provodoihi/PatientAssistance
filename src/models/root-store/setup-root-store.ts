import {onSnapshot} from 'mobx-state-tree';
import {RootStoreModel, RootStore} from './root-store';
import * as storage from '../../utils/storage';
import {STORAGE_KEY} from '../../utils';

/**
 * Setup the root state.
 */
export async function setupRootStore() {
  let rootStore: RootStore;
  let data: any;

  // prepare the environment that will be associated with the RootStore.
  try {
    // load data from storage
    data = (await storage.load(STORAGE_KEY.ROOT)) || {};
    rootStore = RootStoreModel.create(data);
  } catch (e) {
    // if there's any problems loading, then let's at least fallback to an empty state
    // instead of crashing.
    rootStore = RootStoreModel.create({});
  }
  // track changes & save to storage
  onSnapshot(rootStore, snapshot => storage.save(STORAGE_KEY.ROOT, snapshot));

  return rootStore;
}
