import React from 'react';
import { mount } from 'enzyme';
import CenterDetailModal from '../modals/center-detail-modal';

describe('<CenterDetailModal />', () => {
  it('should show a spinner if is loading details data', () => {
    const component = mount(<CenterDetailModal isOpen />);
    expect(component.find('Spinner').exists()).toBe(true);
  });

  it('should show the AnimalList component if is not loading', () => {
    const center = {
      id: 1,
      animals: [
        { id: 1, name: '1', type: 1, commandsLearned: 12 },
        { id: 2, name: '2', type: 1, commandsLearned: 7 },
        { id: 3, name: '3', type: 1, commandsLearned: 3 },
        { id: 4, name: '4', type: 2, estimatedIq: 12 },
        { id: 5, name: '5', type: 2, estimatedIq: 16 },
        { id: 6, name: '6', type: 2, estimatedIq: 30 },
      ],
    };
    const component = mount(<CenterDetailModal isOpen isLoading={false} center={center} />);
    expect(component.find('AnimalList').exists()).toBe(true);
  });
});
