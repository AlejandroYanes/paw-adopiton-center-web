import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Modal, Spinner } from 'react-rainbow-components';
import CleansingCenterList from '../cleansing-centers/cleansing-center-list';

export default function CleansingCenterListModal(props) {
  const { isOpen, isLoading, adoptionCenter, cleansingCenters, onRequestClose, onClean } = props;

  const modalBody = isLoading
    ? <Spinner variant="brand" />
    : (
      <CleansingCenterList
        adoptionCenter={adoptionCenter}
        cleansingCenters={cleansingCenters}
        onClean={onClean} />
    );

  const modalBodyClassName = classnames(
    'paw_adpotion-centers_modal_content',
    { 'paw_adpotion-centers_modal_content--loading': isLoading },
  );

  return (
    <Modal isOpen={isOpen} title="Cleansing Centers" size="medium" onRequestClose={onRequestClose}>
      <div className={modalBodyClassName}>
        {modalBody}
      </div>
    </Modal>
  );
}

CleansingCenterListModal.propTypes = {
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  adoptionCenter: PropTypes.object,
  cleansingCenters: PropTypes.array,
  onRequestClose: PropTypes.func,
  onClean: PropTypes.func,
};

CleansingCenterListModal.defaultProps = {
  isOpen: false,
  isLoading: true,
  adoptionCenter: undefined,
  cleansingCenters: [],
  onRequestClose: () => {},
  onClean: () => {},
};
