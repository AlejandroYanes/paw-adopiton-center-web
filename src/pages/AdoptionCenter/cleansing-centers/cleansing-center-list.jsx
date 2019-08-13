import React from 'react';
import PropTypes from 'prop-types';
import CleansingCenterCard from './cleansing-center-card';

export default function CleansingCenterList(props) {
  const { adoptionCenter, cleansingCenters, onClean } = props;
  return cleansingCenters.map(center => (
    <CleansingCenterCard
      key={center.id}
      cleansingCenter={center}
      adoptionCenter={adoptionCenter}
      onClean={onClean} />
  ));
}

CleansingCenterList.propTypes = {
  adoptionCenter: PropTypes.object,
  cleansingCenters: PropTypes.array,
  onClean: PropTypes.func,
};

CleansingCenterList.defaultProps = {
  adoptionCenter: undefined,
  cleansingCenters: [],
  onClean: () => {},
};
