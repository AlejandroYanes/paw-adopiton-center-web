import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-rainbow-components/components';

export default function CleansingCenterCard(props) {
  const { adoptionCenter, cleansingCenter, onClean } = props;
  const { id, name, animalCount } = cleansingCenter;
  const handleOnClean = (event) => {
    event.preventDefault();
    onClean(adoptionCenter, cleansingCenter);
  };

  return (
    <div className="paw_adoption-center_card">
      <span className="paw_adoption-center_card_id">{id}</span>
      <div className="paw_adoption-center_card_content">
        <h4 className="paw_adoption-center_card_content_header">Name: {name}</h4>
        <span className="paw_adoption-center_card_content_field">Animal Count: {animalCount}</span>
      </div>
      <Button
        className="paw_adoption-center_card_content_action"
        variant="base"
        label="Send for cleaning"
        onClick={handleOnClean} />
    </div>
  );
}

CleansingCenterCard.propTypes = {
  cleansingCenter: PropTypes.object,
  adoptionCenter: PropTypes.object,
  onClean: PropTypes.func,
};

CleansingCenterCard.defaultProps = {
  cleansingCenter: undefined,
  adoptionCenter: undefined,
  onClean: () => {},
};
