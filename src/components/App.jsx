import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { setFilter } from './redux/contactsSlice';
import ContactForm from './Contact/ContactForm';
import ContactList from './Contact/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  // const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.contacts);
  // const filter = useSelector((state) => state.contacts.filter);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // const handleFilterChange = (value) => {
  //   dispatch(setFilter(value));
  // };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;