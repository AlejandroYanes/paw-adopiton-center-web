import adoptionCenters from '../adoption-centers';
import {
  LIST_ALL_ADOPTION_CENTERS,
  LIST_CLEAN_ANIMALS_FROM_CENTER,
  ADOPT_AMINAL,
  OPEN_CLEANSING_CENTERS_MODAL,
  SEND_ANIMALS_FOR_CLEANING,
  OPEN_REGISTER_ANIMAL_MODAL,
  REGISTER_ANIMAL,
} from '../../actions/adoption-centers';

const initialState = {
  centers: [],
  center: undefined,
  isLoading: true,
  isLoadingDetails: true,
  isDetailModalOpen: false,
  isCleansingCentersModalOpen: false,
  isRegisterAnimalModalOpen: false,
};

describe('adoption centers reducer', () => {
  it('should list all centers', () => {
    const result = adoptionCenters(
      initialState,
      {
        type: LIST_ALL_ADOPTION_CENTERS,
        payload: [
          { id: 1, animalCount: 10, cleanAnimals: 5 },
          { id: 2, animalCount: 15, cleanAnimals: 6 },
          { id: 3, animalCount: 7, cleanAnimals: 1 },
          { id: 4, animalCount: 9, cleanAnimals: 4 },
          { id: 5, animalCount: 7, cleanAnimals: 0 },
          { id: 6, animalCount: 7, cleanAnimals: 4 },
        ],
      },
    );
    expect(result).toStrictEqual({
      ...initialState,
      isLoading: false,
      centers: [
        { id: 1, animalCount: 10, cleanAnimals: 5 },
        { id: 2, animalCount: 15, cleanAnimals: 6 },
        { id: 3, animalCount: 7, cleanAnimals: 1 },
        { id: 4, animalCount: 9, cleanAnimals: 4 },
        { id: 5, animalCount: 7, cleanAnimals: 0 },
        { id: 6, animalCount: 7, cleanAnimals: 4 },
      ],
    });
  });

  it('should list all animals for a given center', () => {
    const result = adoptionCenters(
      initialState,
      {
        type: LIST_CLEAN_ANIMALS_FROM_CENTER,
        payload: {
          id: 1,
          animals: [
            { id: 1, name: '1', type: 1, commandsLearned: 12 },
            { id: 2, name: '2', type: 1, commandsLearned: 7 },
            { id: 3, name: '3', type: 1, commandsLearned: 3 },
            { id: 4, name: '4', type: 2, estimatedIq: 12 },
            { id: 5, name: '5', type: 2, estimatedIq: 16 },
            { id: 6, name: '6', type: 2, estimatedIq: 30 },
          ],
        },
      },
    );
    expect(result).toStrictEqual({
      ...initialState,
      isLoadingDetails: false,
      center: {
        id: 1,
        animals: [
          { id: 1, name: '1', type: 1, commandsLearned: 12 },
          { id: 2, name: '2', type: 1, commandsLearned: 7 },
          { id: 3, name: '3', type: 1, commandsLearned: 3 },
          { id: 4, name: '4', type: 2, estimatedIq: 12 },
          { id: 5, name: '5', type: 2, estimatedIq: 16 },
          { id: 6, name: '6', type: 2, estimatedIq: 30 },
        ],
      },
    });
  });

  it('should remove the animal adopted', () => {
    const resultedState = adoptionCenters(
      initialState,
      {
        type: LIST_CLEAN_ANIMALS_FROM_CENTER,
        payload: {
          id: 1,
          animals: [
            { id: 1, name: '1', type: 1, commandsLearned: 12 },
            { id: 2, name: '2', type: 1, commandsLearned: 7 },
            { id: 3, name: '3', type: 1, commandsLearned: 3 },
            { id: 4, name: '4', type: 2, estimatedIq: 12 },
            { id: 5, name: '5', type: 2, estimatedIq: 16 },
            { id: 6, name: '6', type: 2, estimatedIq: 30 },
          ],
        },
      },
    );
    const finalState = adoptionCenters(
      resultedState,
      {
        type: ADOPT_AMINAL,
      },
    );
    expect(finalState).toStrictEqual(initialState);
  });

  it('should update the center when its set to sennd animals for cleansing', () => {
    const resultedCenter = adoptionCenters(
      {
        ...initialState,
        centers: [
          { id: 1, animalCount: 10, cleanAnimals: 5 },
          { id: 2, animalCount: 15, cleanAnimals: 6 },
          { id: 3, animalCount: 7, cleanAnimals: 1 },
          { id: 4, animalCount: 9, cleanAnimals: 4 },
          { id: 5, animalCount: 7, cleanAnimals: 0 },
          { id: 6, animalCount: 7, cleanAnimals: 4 },
        ],
      },
      {
        type: OPEN_CLEANSING_CENTERS_MODAL,
        center: { id: 1, animalCount: 10, cleanAnimals: 5 },
      },
    );
    const finalState = adoptionCenters(
      resultedCenter,
      {
        type: SEND_ANIMALS_FOR_CLEANING,
        payload: { id: 1, animalCount: 5, cleanAnimals: 5 },
      },
    );
    expect(finalState).toStrictEqual(
      {
        ...initialState,
        centers: [
          { id: 1, animalCount: 5, cleanAnimals: 5 },
          { id: 2, animalCount: 15, cleanAnimals: 6 },
          { id: 3, animalCount: 7, cleanAnimals: 1 },
          { id: 4, animalCount: 9, cleanAnimals: 4 },
          { id: 5, animalCount: 7, cleanAnimals: 0 },
          { id: 6, animalCount: 7, cleanAnimals: 4 },
        ],
      },
    );
  });

  it('should update the center when a new animal is registered to it', () => {
    const resultedCenter = adoptionCenters(
      {
        ...initialState,
        centers: [
          { id: 1, animalCount: 10, cleanAnimals: 5 },
          { id: 2, animalCount: 15, cleanAnimals: 6 },
          { id: 3, animalCount: 7, cleanAnimals: 1 },
          { id: 4, animalCount: 9, cleanAnimals: 4 },
          { id: 5, animalCount: 7, cleanAnimals: 0 },
          { id: 6, animalCount: 7, cleanAnimals: 4 },
        ],
      },
      {
        type: OPEN_REGISTER_ANIMAL_MODAL,
        center: { id: 1, animalCount: 10, cleanAnimals: 5 },
      },
    );
    const finalState = adoptionCenters(
      resultedCenter,
      {
        type: REGISTER_ANIMAL,
        payload: { id: 1, animalCount: 11, cleanAnimals: 5 },
      },
    );
    expect(finalState).toStrictEqual(
      {
        ...initialState,
        centers: [
          { id: 1, animalCount: 11, cleanAnimals: 5 },
          { id: 2, animalCount: 15, cleanAnimals: 6 },
          { id: 3, animalCount: 7, cleanAnimals: 1 },
          { id: 4, animalCount: 9, cleanAnimals: 4 },
          { id: 5, animalCount: 7, cleanAnimals: 0 },
          { id: 6, animalCount: 7, cleanAnimals: 4 },
        ],
      },
    );
  });
});
