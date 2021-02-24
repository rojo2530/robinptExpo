import axios from 'axios';
import { isEmpty, map, keys } from "lodash";
import { API_URL } from '../utils/constants';


export const httpClient = axios.create({});

const setBaseUrl = () => httpClient.defaults.baseURL = API_URL;
 
const buildPathwithParams = (path: string, params: any): string => {
  if (isEmpty(params)) {
    return path;
  }

  const queries = map(keys(params), (key) =>
    [encodeURIComponent(key), encodeURIComponent(params[key])].join("=")
  );

  return `${path}?${queries.join("&")}`;
};

export const httpGet = async (path: string, params: object = {}) => {
  const url = buildPathwithParams(path, params);
  setBaseUrl();

  console.log('URL ', url);
  
  try {
    return await httpClient.get(url);
  } catch (error) {
    throw(error);
  }
}


