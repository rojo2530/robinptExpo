import ShopsStore from '../../src/stores/shop';
import RootStore from '../../src/stores/root';
import shopsService from '../../src/services/shops';


const rootStore = new RootStore();
let shopsStore: ShopsStore;

const shops = [
  {
    "_id": "5a3n28tvv9Ddtabod",
    "name": "MediaMarkt",
    "category": "ky6bZouSnTb4pgTi4",
    "domain": "mediamarkt.es",
    "favorite": false,
  },
  {
    "_id": "rcgZjvRMCcggJSgND",
    "name": "Leroy Merlin",
    "category": "AxgzoyrbaYSm5pd7x",
    "domain": "",
    "favorite": false
  },
];

describe("ShopsStore", () => {
  beforeAll(() => {
    shopsStore = new ShopsStore(rootStore, shopsService);
  });
  
  it("create new store", () => {
    expect(shopsStore.shops.length).toBe(0);
    expect(shopsStore.isCached).toBe(false);
    expect(shopsStore.isLoading).toBe(false);
    expect(shopsStore.page).toBe(0);

  });

  it('fetches successfully data from fetchShops', async () => {
    shopsStore.apiService.getShopsRequest = jest.fn().mockImplementation((page: number) => 
      Promise.resolve(shops));
    
    const result = await shopsStore.apiService.getShopsRequest(0); // first call
    expect(result?.length).toBe(2);
    
    await shopsStore.fetchShops();

    expect(shopsStore.isCached).toBe(true);
    expect(shopsStore.shops.length).toBe(2);
  });

  it("check favorite", () => {
    shopsStore.toggleFavorite(shopsStore.shops[0]._id);
    
    expect(shopsStore.shops[0].favorite).toBe(true);
  });

  it ("check reset", () => {
    shopsStore.reset();
    
    expect(shopsStore.shops.length).toBe(0);
    expect(shopsStore.isCached).toBe(false);
    expect(shopsStore.isLoading).toBe(false);
    expect(shopsStore.page).toBe(0);
  });
});