import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Input, RadioGroup, Button } from 'react-rainbow-components';

const options = [
  { value: '1', label: 'Dog' },
  { value: '2', label: 'Cat' },
];

function validate(values) {
  const errors = {};
  const { name, type, commands, iq } = values;

  if (!name) {
    errors.name = 'The name is required';
  }
  if (type === '1' && !commands) {
    errors.commands = 'The commands learned are required';
  }
  if (type === '2' && !iq) {
    errors.commands = 'The estimated IQ is required';
  }
  return errors;
}

export default function RegisterAnimalModal(props) {
  const { isOpen, adoptionCenter, onRequestClose, onRegister } = props;

  const [name, setName] = useState('');
  const handleSetName = event => setName(event.target.value);

  const [type, setType] = useState('1');
  const handleSetType = event => setType(event.target.value);

  const [commands, setCommands] = useState('0');
  const handleSetCommands = event => setCommands(event.target.value);

  const [iq, setIQ] = useState('0');
  const handleSetIQ = event => setIQ(event.target.value);

  const [errors, setErrors] = useState({});

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const validation = validate({ name, type, commands, iq });
    setErrors(validation);
    if (Object.keys(validation).length === 0) {
      onRegister(
        {
          name,
          type,
          commandsLearned: parseInt(commands),
          estimatedIq: parseInt(iq)
        },
        adoptionCenter,
      );
    }
  };


  const commandsInput = type === '1'
    ? (
      <Input
        className="paw_adpotion-centers_modal_content_input"
        label="Commands learned"
        type="number"
        value={commands}
        onChange={handleSetCommands}
        error={errors.commands}
        required />
    )
    : null;
  const iqInput = type === '2'
    ? (
      <Input
        className="paw_adpotion-centers_modal_content_input"
        label="Estimated IQ"
        type="number"
        value={iq}
        onChange={handleSetIQ}
        error={errors.iq}
        required />
    )
    : null;

  return (
    <Modal isOpen={isOpen} title="Register Animal" onRequestClose={onRequestClose}>
      <div className="paw_adpotion-centers_modal_content">
        <form>
          <Input
            className="paw_adpotion-centers_modal_content_input"
            label="Name"
            value={name}
            onChange={handleSetName}
            error={errors.name}
            required  />
          <RadioGroup
            className="paw_adpotion-centers_modal_content_input"
            label="Type"
            options={options}
            value={type}
            onChange={handleSetType}
            error={errors.type}
            required />
          {commandsInput}
          {iqInput}
          <div className="paw_adpotion-centers_modal_content_actions">
            <Button
              variant="outline-brand"
              label="Cancel"
              onClick={onRequestClose}
              style={{ marginRight: '1rem' }} />
            <Button
              variant="outline-brand"
              label="Register"
              onClick={handleOnSubmit} />
          </div>
        </form>
      </div>
    </Modal>
  );
}

RegisterAnimalModal.propTypes = {
  isOpen: PropTypes.bool,
  adoptionCenter: PropTypes.object,
  onRequestClose: PropTypes.func,
  onRegister: PropTypes.func,
};

RegisterAnimalModal.defaultProps = {
  isOpen: false,
  adoptionCenter: undefined,
  onRequestClose: () => {},
  onRegister: () => {},
};
