import {
  LIST_ALL_CLEANSING_CENTERS,
  CLEAN_ANIMALS,
} from '../actions/cleansing-centers';

const initialState = {
  centers: [],
  isLoading: true,
};

export default function cleansingCenters(state = initialState, action) {
  switch (action.type) {
    case LIST_ALL_CLEANSING_CENTERS: {
      const { payload } = action;
      return {
        isLoading: false,
        centers: payload,
      };
    }
    case CLEAN_ANIMALS: {
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
        centers: updatedCenters,
      };
    }
    default:
      return state;
  }
}
