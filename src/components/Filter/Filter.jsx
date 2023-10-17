import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.contacts.filter);

  const handleFilterChange = (event) => {
    const value = event.target.value;
    dispatch(setFilter(value.trim()));
  };

  return (
    <label>
      Фильтр по имени:
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Filter contacts by name"
      />
    </label>
  );
};

export default Filter;
