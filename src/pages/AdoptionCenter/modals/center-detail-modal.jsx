import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Modal, Spinner } from 'react-rainbow-components';
import AnimalList from '../animals/animal-list';

export default function CenterDetailModal(props) {
  const { isOpen, isLoading, center, onRequestClose, onAdopt } = props;

  const modalHeader = `Adoption Center: ${!isLoading ? center.id : ''}`;

  const modalBody = isLoading
    ? <Spinner variant="brand" />
    : <AnimalList animals={center.animals} onAdopt={onAdopt} />;

  const modalBodyClassName = classnames(
    'paw_adpotion-centers_modal_content',
    { 'paw_adpotion-centers_modal_content--loading': isLoading },
  );

  return (
    <Modal isOpen={isOpen} title={modalHeader} size="medium" onRequestClose={onRequestClose}>
      <div className={modalBodyClassName}>
        {modalBody}
      </div>
    </Modal>
  );
}

CenterDetailModal.propTypes = {
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool,
  center: PropTypes.object,
  onRequestClose: PropTypes.func,
  onAdopt: PropTypes.func,
};

CenterDetailModal.defaultProps = {
  isOpen: false,
  isLoading: true,
  center: undefined,
  onRequestClose: () => {},
  onAdopt: () => {},
};
