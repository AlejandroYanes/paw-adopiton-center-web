import cleansingCenters from '../cleansing-centers';
import { LIST_ALL_CLEANSING_CENTERS, CLEAN_ANIMALS } from '../../actions/cleansing-centers';

const initialState = {
  centers: [],
  isLoading: true,
};

describe('cleansing centers reducers', () => {
  it('should load the cleansing centers', () => {
    const finalState = cleansingCenters(
      initialState,
      {
        type: LIST_ALL_CLEANSING_CENTERS,
        payload: [
          { id: 1, animalCount: 10 },
          { id: 2, animalCount: 15 },
          { id: 3, animalCount: 7 },
          { id: 4, animalCount: 9 },
          { id: 5, animalCount: 7 },
          { id: 6, animalCount: 7 },
        ],
      },
    );
    expect(finalState).toStrictEqual({
      isLoading: false,
      centers: [
        { id: 1, animalCount: 10 },
        { id: 2, animalCount: 15 },
        { id: 3, animalCount: 7 },
        { id: 4, animalCount: 9 },
        { id: 5, animalCount: 7 },
        { id: 6, animalCount: 7 },
      ],
    });
  });

  it('should clean all animals for a given center', () => {
    const resultedState = cleansingCenters(
      initialState,
      {
        type: LIST_ALL_CLEANSING_CENTERS,
        payload: [
          { id: 1, animalCount: 10 },
          { id: 2, animalCount: 15 },
          { id: 3, animalCount: 7 },
          { id: 4, animalCount: 9 },
          { id: 5, animalCount: 7 },
          { id: 6, animalCount: 7 },
        ],
      },
    );
    const finalState = cleansingCenters(
      resultedState,
      {
        type: CLEAN_ANIMALS,
        payload: { id: 1, animalCount: 0 },
      },
    );
  });
});
