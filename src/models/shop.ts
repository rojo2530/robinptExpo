export interface JsonShopModel {
  _id: string,
  name: string,
  category: string,
  domain: string,
}

export interface ShopModel {
  _id: string,
  name: string,
  category: string,
  domain: string,
  favorite: boolean,
} 

export function shopModelAdapter(json: JsonShopModel): ShopModel {
  return {
    _id: json._id,
    name: json.name,
    category: json.category,
    domain: json.domain,
    favorite: false,
  }
}

