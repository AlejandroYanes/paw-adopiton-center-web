import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table, Column, MenuItem } from 'react-rainbow-components/components';
import { listAllCleansingCenters, cleanAnimals } from '../../redux/actions/cleansing-centers';

function CleansingCenter(props) {
  const { isLoading, centers, listAllCleansingCenters, cleanAnimals } = props;

  const initCenters = () => {
    listAllCleansingCenters();
  };
  useEffect(initCenters, []);

  const handleOnCleanAnimals = (event, data) => cleanAnimals(data);

  return (
    <div>
      <Table isLoading={isLoading} data={centers} keyField="id" resizeColumnDisabled>
        <Column header="Center No." field="id" type="text" />
        <Column header="Animal Count" field="animalCount" type="text" />
        <Column type="action">
          <MenuItem label="Clean Animals" onClick={handleOnCleanAnimals} />
        </Column>
      </Table>
    </div>
  );
}

CleansingCenter.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  centers: PropTypes.array.isRequired,
  listAllCleansingCenters: PropTypes.func.isRequired,
  cleanAnimals: PropTypes.func.isRequired,
};

const mapStateToProps = state => state.cleansingCenters;

const mapDispatchToProps = {
  listAllCleansingCenters,
  cleanAnimals,
};

export default connect(mapStateToProps, mapDispatchToProps)(CleansingCenter);
