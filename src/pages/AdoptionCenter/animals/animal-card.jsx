import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-rainbow-components/components';

export default function AnimalCard(props) {
  const { id, name, type, commandsLearned, estimatedIq } = props;

  let specialAttribute;
  let typeDescription;
  if (type === 1) {
    typeDescription = 'Dog';
    specialAttribute = `Commands learned: ${commandsLearned}`;
  } else {
    typeDescription = 'Cat';
    specialAttribute = `Estimated IQ: ${estimatedIq}`;
  }

  const handleOnAdopt = (event) => {
    event.preventDefault();
    const { onAdopt, ...animal } = props;
    onAdopt(animal);
  };

  return (
    <div className="paw_adoption-center_card">
      <span className="paw_adoption-center_card_id">{id}</span>
      <div className="paw_adoption-center_card_content">
        <h4 className="paw_adoption-center_card_content_header">Name: {name}</h4>
        <div className="paw_adoption-center_card_content_description">
          <span className="paw_adoption-center_card_content_field">Type: {typeDescription}</span>
          <span className="paw_adoption-center_card_content_field">{specialAttribute}</span>
        </div>
      </div>
      <Button variant="base" label="Adopt" onClick={handleOnAdopt} />
    </div>
  );
}

AnimalCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  type: PropTypes.oneOf([1, 2]),
  commandsLearned: PropTypes.number,
  estimatedIq: PropTypes.number,
  onAdopt: PropTypes.func,
};

AnimalCard.defaultProps = {
  id: undefined,
  name: undefined,
  type: 1,
  commandsLearned: undefined,
  estimatedIq: undefined,
  onAdopt: () => {},
};
