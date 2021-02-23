//Stores
import ShopsStore from './shop';

//Services
import shopsService from '../services/shops';

class RootStore {
  shopsStore: ShopsStore;

  constructor() {
    this.shopsStore = new ShopsStore(this, shopsService)
  }

  resetAll() {
    this.shopsStore.reset();
  }
}

export default RootStore;