import { observable, action } from 'mobx';
import { ShopsServiceModel } from '../services/shops';
import { persist } from 'mobx-persist';
import RootStore from './root';
import { ShopModel } from '../models/shop';

class ShopsStore {
  rootStore:RootStore;
  apiService: ShopsServiceModel;

  @persist ("list") @observable shops: Array<ShopModel> = [];
  @persist @observable isCached: boolean = false;
  @persist @observable page = 0;
  @persist @observable initial: boolean = false;
  @observable isLoading: boolean = false;

  constructor(rootStore: RootStore, apiService: ShopsServiceModel) {
    this.rootStore = rootStore;
    this.apiService = apiService;
    console.log('Pagina inicial ', this.page);
  }

  //actions
  @action setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  @action setIsCached(value: boolean) {
    this.isCached = value;
  }

  @action setPage(value: number) {
    this.page = value;
  }

  @action setInitial(value: boolean) {
    this.initial = value;
  }

  @action async fetchShops() {
    console.log('Antes de pedirlo ', this.page);
    if (this.isLoading) {
      console.log('Aun se estan cargando las tiendas');
      return;
    }
    try {
      this.setIsLoading(true);
      const shops = await this.apiService.getShopsRequest(this.page + 1);
      
      if (shops) {
        this.shops = this.shops.concat(shops.slice());
        //shops.map(shop => this.shops.push(shop));

        this.setIsCached(true);
        this.setPage(this.page + 1);
      }
      this.setIsLoading(false);
      return shops;

    } catch (error) {
      this.setIsLoading(false);
      throw error;
    }
  }

  @action async getShops() {
    if (!this.isCached) {
      try {
        await this.fetchShops();
      } catch (error) {
        throw error;
      }
    }
  }

  @action toggleFavorite(id: string) {
    const shop = this.shops.find(shop => shop._id === id);
    if (shop) {
      shop.favorite = !shop.favorite;
    }
  }

  @action reset() {
    this.shops = [];
    this.setPage(0);
    this.setIsLoading(false);
    this.setIsCached(false);
  }
}

export default ShopsStore;