import axios from 'axios';
import { serverURL } from '../../constants';

export const LIST_ALL_CLEANSING_CENTERS = 'LIST_ALL_CLEANSING_CENTERS';
export function listAllCleansingCenters() {
  return async(disptch) => {
    const response = await axios.get(`${serverURL}/centers/cleansing`);
    if (response.status === 200) {
      disptch({
        type: LIST_ALL_CLEANSING_CENTERS,
        payload: response.data,
      });
    }
  };
}

export const CLEAN_ANIMALS = 'CLEAN_ANIMALS';
export function cleanAnimals(center) {
  return async(dispatch) => {
    const response = await axios.get(`${serverURL}/centers/clean-animals/${center.id}`);
    if (response.status === 200) {
      dispatch({
        type: CLEAN_ANIMALS,
        payload: { ...center, animalCount: 0 },
      });
    }
  };
}
