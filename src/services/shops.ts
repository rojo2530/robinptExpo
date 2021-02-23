import { httpGet } from './index';
import { JsonShopModel, ShopModel, shopModelAdapter } from '../models/shop';
import { API_RESULTS_PER_PAGE } from '../utils/constants';

export interface ShopsServiceModel {
  getShopsRequest(page: number): Promise<ShopModel [] | undefined>,
}

const shopsService: ShopsServiceModel = {
  getShopsRequest: async (page: number): Promise<ShopModel [] | undefined>=> {
    try {
      const response = await httpGet('/', {
        skip: (page - 1) * API_RESULTS_PER_PAGE,
        limit: API_RESULTS_PER_PAGE,
      });

      if (response) {
        const stores: ShopModel[] =  response.data.map((store:JsonShopModel) => shopModelAdapter(store));
 
        return stores; 
       }
       
    } catch (error) {
      throw error;
    }
  },
}

export default shopsService;