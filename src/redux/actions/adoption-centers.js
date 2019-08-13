import axios from 'axios';
import { serverURL } from '../../constants';
import { listAllCleansingCenters } from './cleansing-centers';

export const LIST_ALL_ADOPTION_CENTERS = 'LIST_ALL_ADOPTION_CENTERS';
export function listAllAdoptionCenters() {
  return async(disptch) => {
    const response = await axios.get(`${serverURL}/centers/adoption`);
    if (response.status === 200) {
      disptch({
        type: LIST_ALL_ADOPTION_CENTERS,
        payload: response.data,
      });
    }
  };
}

export const LIST_CLEAN_ANIMALS_FROM_CENTER = 'LIST_CLEAN_ANIMALS_FROM_CENTER';
export async function listCleanAnimalsFromCenter(center) {
  const response = await axios.get(`${serverURL}/animals/clean/${center.id}`);
  if (response.status === 200) {
    return {
      type: LIST_CLEAN_ANIMALS_FROM_CENTER,
      payload: {
        id: center.id,
        animals:response.data,
      },
    };
  }
}

export const OPEN_CENTER_DETAIL_MODAL = 'OPEN_CENTER_DETAIL_MODAL';
export function openCenterDetailModal(center) {
  return async(dispatch) => {
    dispatch({ type: OPEN_CENTER_DETAIL_MODAL });
    dispatch(await listCleanAnimalsFromCenter(center));
  };
}

export const CLOSE_CENTER_DETAIL_MODAL = 'CLOSE_CENTER_DETAIL_MODAL';
export function closeCenterDetailModal() {
  return (dispatch) => {
    dispatch({ type: CLOSE_CENTER_DETAIL_MODAL });
  };
}

export const ADOPT_AMINAL = 'ADOPT_AMINAL';
export function adoptAnimal(animal) {
  return async(dispatch) => {
    const response = await axios.delete(`${serverURL}/animals/${animal.id}`);
    if (response.status === 204) {
      dispatch({ type: ADOPT_AMINAL, payload: animal });
      dispatch(listAllAdoptionCenters());
    }
  }
}

export const OPEN_CLEANSING_CENTERS_MODAL = 'OPEN_CLEANSING_CENTERS_MODAL';
export function openCleansingCentersModal(center) {
  return async (dispatch) => {
    dispatch({ type: OPEN_CLEANSING_CENTERS_MODAL, payload: center });
    dispatch(await listAllCleansingCenters());
  };
}

export const CLOSE_CLEANSING_CENTERS_MODAL = 'CLOSE_CLEANSING_CENTERS_MODAL';
export function closeCleansingCentersModal() {
  return (dispatch) => {
    dispatch({ type: CLOSE_CLEANSING_CENTERS_MODAL });
  };
}

export const SEND_ANIMALS_FOR_CLEANING = 'SEND_ANIMALS_FOR_CLEANING';
export function sendAnimalsForCleaning(adoptionCenter, cleansingCenter) {
  return async (dispatch) => {
    const response = await axios.get(`${serverURL}/centers/send-animals/${adoptionCenter.id}/${cleansingCenter.id}`);
    if (response.status === 200) {
      dispatch({
        type: SEND_ANIMALS_FOR_CLEANING,
        payload: response.data,
      });
    }
  };
}

export const REGISTER_ANIMAL = 'REGISTER_ANIMAL';
export function registerAnimal(animal, adoptionCenter) {
  return async (dispatch) => {
    const response = await axios.post(
      `${serverURL}/animals`,
      {
        ...animal,
        isClean: false,
        actualCenter: adoptionCenter,
      }
    );
    if (response.status === 201) {
      dispatch({
        type: REGISTER_ANIMAL,
        payload: { ...adoptionCenter, animalCount: adoptionCenter.animalCount + 1 },
      });
    }
  };
}

export const OPEN_REGISTER_ANIMAL_MODAL = 'OPEN_REGISTER_ANIMAL_MODAL';
export function openRegisterAnimalModal(center) {
  return (dispatch) => {
    dispatch({ type: OPEN_REGISTER_ANIMAL_MODAL, payload: center });
  };
}

export const CLOSE_REGISTER_ANIMAL_MODAL = 'CLOSE_REGISTER_ANIMAL_MODAL';
export function closeRegisterAnimalModal() {
  return (dispatch) => {
    dispatch({ type: CLOSE_REGISTER_ANIMAL_MODAL });
  };
}
