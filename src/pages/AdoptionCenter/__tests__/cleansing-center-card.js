import React from 'react';
import { mount } from 'enzyme';
import CleansingCenterCard from '../cleansing-centers/cleansing-center-card';

describe ('CleansingCenterCard', () => {
  it('should call the function passed in onAdopt with the right params', () => {
    const onCleanMock = jest.fn();
    const adoptionCenter = { id: 1, name: 'adoption-center' };
    const cleansingCenter = { id: 1, name: 'cleansing-center' };
    const component = mount(
      <CleansingCenterCard
        onClean={onCleanMock}
        adoptionCenter={adoptionCenter}
        cleansingCenter={cleansingCenter} />
    );
    component.find('button').simulate('click');
    expect(onCleanMock).toHaveBeenCalledWith(
      { id: 1, name: 'adoption-center' },
      { id: 1, name: 'cleansing-center' },
      );
  });
});
