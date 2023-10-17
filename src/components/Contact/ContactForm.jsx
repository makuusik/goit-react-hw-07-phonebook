import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../redux/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [duplicateError, setDuplicateError] = useState(null);

  const handleNumberChange = e => {
    let value = e.target.value;
    value = value.replace(/[^0-9+-]/g, '');
    setNumber(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    if (!name || !number) {
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      setDuplicateError(`Контакт с именем "${name}" уже существует!`);
      return;
    }

    setDuplicateError(null);

    const validNumber = /^[0-9+-]+$/.test(number);
    if (!validNumber) {
      setDuplicateError('Номер телефона может содержать только цифры');
      return;
    }

    const response = await fetch(
      'https://652a7f1f4791d884f1fcff54.mockapi.io/contacts',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, number }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      dispatch(addContact(data));
    } else {
      console.error('Ошибка в добавлении контакта');
    }

    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit}>
      {duplicateError && <p style={{ color: 'red' }}>{duplicateError}</p>}
      <label>
        Имя:
        <input
          type="text"
          name="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Номер телефона:
        <input
          type="text"
          name="number"
          value={number}
          onInput={handleNumberChange}
          required
        />
      </label>
      <button type="submit">Добавить контакт</button>
    </form>
  );
};

export default ContactForm;
