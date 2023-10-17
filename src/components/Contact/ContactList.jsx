import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from '../redux/contactsSlice';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);
  const isLoading = useSelector((state) => state.contacts.isLoading);
  const error = useSelector((state) => state.contacts.error);

  React.useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDeleteContact = async (id) => {
    const response = await fetch(`https://652a7f1f4791d884f1fcff54.mockapi.io/contacts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      dispatch(deleteContact(id));
    } else {
      console.error('Не удалось удалить контакт');
    }
  };
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : error ? (
        <p>Произошла ошибка: {error}</p>
      ) : (
        <ul>
          {filteredContacts && filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <li key={contact.id}>
                {contact.name}: {contact.number}
                <button type="button" onClick={() => handleDeleteContact(contact.id)}>
                  Удалить
                </button>
              </li>
            ))
          ) : (
            <p>Контакты не найдены</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ContactList;
