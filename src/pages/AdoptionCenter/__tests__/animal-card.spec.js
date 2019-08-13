import React from 'react';
import { mount } from 'enzyme';
import AnimalCard from '../animals/animal-card';

describe('<AnimalCard />', () => {
  it('should call the function passed in onAdopt with the right params', () => {
    const onAdoptMock = jest.fn();
    const component = mount(<AnimalCard id={1} name="1" type={1} commandsLearned={13} onAdopt={onAdoptMock} />);
    component.find('button').simulate('click');
    expect(onAdoptMock).toHaveBeenCalledWith({
      id: 1,
      name: '1',
      type: 1,
      commandsLearned: 13,
      estimatedIq: undefined,
    });
  });
});
