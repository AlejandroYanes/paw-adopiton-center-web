import {
  LIST_ALL_ADOPTION_CENTERS,
  LIST_CLEAN_ANIMALS_FROM_CENTER,
  OPEN_CENTER_DETAIL_MODAL,
  CLOSE_CENTER_DETAIL_MODAL,
  ADOPT_AMINAL,
  OPEN_CLEANSING_CENTERS_MODAL,
  CLOSE_CLEANSING_CENTERS_MODAL,
  SEND_ANIMALS_FOR_CLEANING,
  OPEN_REGISTER_ANIMAL_MODAL,
  CLOSE_REGISTER_ANIMAL_MODAL,
  REGISTER_ANIMAL,
} from '../actions/adoption-centers';

const initialState = {
  centers: [],
  center: undefined,
  isLoading: true,
  isLoadingDetails: true,
  isDetailModalOpen: false,
  isCleansingCentersModalOpen: false,
  isRegisterAnimalModalOpen: false,
};

export default function adoptionCenters(state = initialState, action) {
  switch (action.type) {
    case LIST_ALL_ADOPTION_CENTERS: {
      const { payload } = action;
      return {
        ...state,
        isLoading: false,
        centers: payload,
      };
    }
    case LIST_CLEAN_ANIMALS_FROM_CENTER: {
      return {
        ...state,
        isLoadingDetails: false,
        center: action.payload,
      };
    }
    case OPEN_CENTER_DETAIL_MODAL: {
      return {
        ...state,
        isDetailModalOpen: true,
      };
    }
    case CLOSE_CENTER_DETAIL_MODAL: {
      return {
        ...state,
        isDetailModalOpen: false,
        isLoadingDetails: true,
        center: undefined,
      };
    }
    case ADOPT_AMINAL: {
      return {
        ...state,
        isLoadingDetails: true,
        isDetailModalOpen: false,
        center: undefined,
      };
    }
    case OPEN_CLEANSING_CENTERS_MODAL: {
      return {
        ...state,
        isCleansingCentersModalOpen: true,
        center: action.payload,
      };
    }
    case CLOSE_CLEANSING_CENTERS_MODAL: {
      return {
        ...state,
        isCleansingCentersModalOpen: false,
        center: undefined,
      };
    }
    case SEND_ANIMALS_FOR_CLEANING: {
      const { centers } = state;
      const { payload: updatedCenter } = action;
      console.log (updatedCenter);
      console.log (centers);
      const updatedCenters = centers.reduce((acumulator, currentValue) => {
        if (currentValue.id === updatedCenter.id) {
          return acumulator.concat([updatedCenter]);
        }
        return acumulator.concat([currentValue]);
      }, []);
      console.log (updatedCenters);
      return {
        ...state,
        isCleansingCentersModalOpen: false,
        centers: updatedCenters,
      };
    }
    case OPEN_REGISTER_ANIMAL_MODAL: {
      return {
        ...state,
        isRegisterAnimalModalOpen: true,
        center: action.payload,
      };
    }
    case CLOSE_REGISTER_ANIMAL_MODAL: {
      return {
        ...state,
        isRegisterAnimalModalOpen: false,
        center: undefined,
      };
    }
    case REGISTER_ANIMAL: {
      const { centers } = state;
      const { payload: updatedCenter } = action;
      const updatedCenters = centers.reduce((acumulator, currentValue) => {
        if (currentValue.id === updatedCenter.id) {
          return acumulator.concat([updatedCenter]);
        }
        return acumulator.concat([currentValue]);
      }, []);
      return {
        ...state,
        center: undefined,
        isRegisterAnimalModalOpen: false,
        centers: updatedCenters,
      };
    }
    default:
      return state;
  }
}
