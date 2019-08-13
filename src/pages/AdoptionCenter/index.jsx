import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Column, MenuItem } from 'react-rainbow-components/components';
import {
  listAllAdoptionCenters,
  openCenterDetailModal,
  closeCenterDetailModal,
  adoptAnimal,
  openCleansingCentersModal,
  closeCleansingCentersModal,
  sendAnimalsForCleaning,
  openRegisterAnimalModal,
  closeRegisterAnimalModal,
  registerAnimal,
} from '../../redux/actions/adoption-centers';
import CenterDetailModal from './modals/center-detail-modal';
import CleansingCenterListModal from './modals/cleansing-centers-modal';
import RegisterAnimalModal from './modals/register-animal-modal';
import './styles.scss';

function AdoptionCenter(props) {
  const {
    center,
    centers,
    cleansingCenters,
    isLoading,
    isDetailModalOpen,
    isLoadingDetails,
    listAllAdoptionCenters,
    openCenterDetailModal,
    closeCenterDetailModal,
    adoptAnimal,
    isCleansingCentersModalOpen,
    isLoadingCleansingCenters,
    openCleansingCentersModal,
    closeCleansingCentersModal,
    sendAnimalsForCleaning,
    isRegisterAnimalModalOpen,
    closeRegisterAnimalModal,
    openRegisterAnimalModal,
    registerAnimal,
  } = props;

  const initCenterList = () => {
    listAllAdoptionCenters()
  };
  useEffect(initCenterList, []);

  const openDetailModal = (event, data) => openCenterDetailModal(data);
  const openCleansingCentersModalHandler = (event, data) => openCleansingCentersModal(data);
  const openRegisterAnimalHandler = (event, data) => openRegisterAnimalModal(data);

  return (
    <>
      <Table isLoading={isLoading} data={centers} keyField="id" resizeColumnDisabled>
        <Column header="Center No." field="id" type="text" />
        <Column header="Animal Count" field="animalCount" type="text" />
        <Column header="Clean Animals" field="cleanAnimals" type="text" />
        <Column type="action">
          <MenuItem label="Adopt an Animal" onClick={openDetailModal} />
          <MenuItem label="Clean Animals" onClick={openCleansingCentersModalHandler} />
          <MenuItem label="Register a new Animal" onClick={openRegisterAnimalHandler} />
        </Column>
      </Table>

      <CenterDetailModal
        center={center}
        isOpen={isDetailModalOpen}
        isLoading={isLoadingDetails}
        onAdopt={adoptAnimal}
        onRequestClose={closeCenterDetailModal} />

      <CleansingCenterListModal
        adoptionCenter={center}
        cleansingCenters={cleansingCenters}
        isLoading={isLoadingCleansingCenters}
        isOpen={isCleansingCentersModalOpen}
        onClean={sendAnimalsForCleaning}
        onRequestClose={closeCleansingCentersModal} />

      <RegisterAnimalModal
        adoptionCenter={center}
        isOpen={isRegisterAnimalModalOpen}
        onRegister={registerAnimal}
        onRequestClose={closeRegisterAnimalModal} />
    </>
  );
}

AdoptionCenter.propTypes = {
  center: PropTypes.object,
  centers: PropTypes.array,
  cleansingCenters: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  isLoadingDetails: PropTypes.bool.isRequired,
  isLoadingCleansingCenters: PropTypes.bool.isRequired,
  isDetailModalOpen: PropTypes.bool.isRequired,
  isCleansingCentersModalOpen: PropTypes.bool.isRequired,
  isRegisterAnimalModalOpen: PropTypes.bool.isRequired,
  listAllAdoptionCenters: PropTypes.func.isRequired,
  openCenterDetailModal: PropTypes.func.isRequired,
  closeCenterDetailModal: PropTypes.func.isRequired,
  adoptAnimal: PropTypes.func.isRequired,
  openCleansingCentersModal: PropTypes.func.isRequired,
  closeCleansingCentersModal: PropTypes.func.isRequired,
  sendAnimalsForCleaning: PropTypes.func.isRequired,
  openRegisterAnimalModal: PropTypes.func.isRequired,
  closeRegisterAnimalModal: PropTypes.func.isRequired,
  registerAnimal: PropTypes.func.isRequired,
};

AdoptionCenter.defaultProps = {
  center: undefined,
  centers: [],
  cleansingCenters: [],
};

const mapStateToProps = (state) => {
  const { adoptionCenters, cleansingCenters: cleansingCentersState } = state;
  const { centers: cleansingCenters, isLoading: isLoadingCleansingCenters } = cleansingCentersState;
  return {
    ...adoptionCenters,
    cleansingCenters,
    isLoadingCleansingCenters,
  };
};

const mapDispatchToProps = {
  listAllAdoptionCenters,
  openCenterDetailModal,
  closeCenterDetailModal,
  adoptAnimal,
  openCleansingCentersModal,
  closeCleansingCentersModal,
  sendAnimalsForCleaning,
  openRegisterAnimalModal,
  closeRegisterAnimalModal,
  registerAnimal,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdoptionCenter);
