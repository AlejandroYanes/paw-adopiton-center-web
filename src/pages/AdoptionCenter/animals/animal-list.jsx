import React from 'react';
import PropTypes from 'prop-types';
import AnimalCard from './animal-card';

export default function AnimalList(props) {
  const { animals, onAdopt } = props;
  return animals.map(animal => <AnimalCard key={animal.id} {...animal} onAdopt={onAdopt} />);
}

AnimalList.propTypes = {
  animals: PropTypes.array,
  onAdopt: PropTypes.func,
};

AnimalList.defaultProps = {
  animals: [],
  onAdopt: () => {},
};
