import React, { useState, useEffect, useCallback } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import api from '../../shared/api';
import { IContact } from '../../shared/interfaces';
import CreateUpdateContactDialog from './create-update-contact';
import ContactList from './contact-list';
import { ContactModes } from '../../shared/types';

type Props = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    }
  })
);

const Contacts: React.ComponentType<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [mode, setMode] = useState<ContactModes>('list');
  const [selectedContact, setSelectedContact] = useState<IContact | null>(null);

  useEffect(() => {
    async function initContacts() {
      setIsRequesting(true);
      const { data: contacts } = await api.get('/contacts');
      setIsRequesting(false);
      setIsLoading(false);
      setContacts(contacts);
    }

    if (!isRequesting) {
      initContacts();
    }
  }, [isLoading]);

  const openCreateUpdateContactDialog = useCallback(
    (mode: ContactModes, contact?: IContact) => {
      if (mode === 'update' && contact) {
        setSelectedContact(contact);
        setMode('update');
      } else if (mode === 'create') {
        setSelectedContact(null);
        setMode('create');
      }
    },
    []
  );

  const deleteContact = useCallback(
    async (contact: IContact) => {
      const response = await api.delete(`/contacts/${contact.id}`);
      setContacts(contacts.filter(_contact => _contact.id !== contact.id));
    },
    [contacts]
  );

  const createContact = useCallback(
    async (contact: IContact) => {
      try {
        const response = await api.post('/contacts', contact);
        setContacts([...contacts, response.data]);
        setMode('list');
        setErrors({});
      } catch (error) {
        setErrors(error.response.data);
      }
    },
    [contacts]
  );

  const updateContact = useCallback(
    async (contact: IContact) => {
      try {
        const response = await api.patch(`/contacts/${contact.id}`, contact);
        const updatedContacts = contacts.map(_contact => {
          if (_contact.id === contact.id) {
            return {
              ..._contact,
              ...response.data
            };
          }
          return _contact;
        });
        setContacts(updatedContacts);
        setMode('list');
        setSelectedContact(null);
        setErrors({});
      } catch (error) {
        setErrors(error.response.data);
      }
    },
    [contacts]
  );

  const classes = useStyles();

  return (
    <div>
      <h2>Contacts</h2>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <ContactList
          contacts={contacts}
          deleteContact={deleteContact}
          updateContact={(contact: IContact) =>
            openCreateUpdateContactDialog('update', contact)
          }
        />
      )}
      <CreateUpdateContactDialog
        closeDialog={() => setMode('list')}
        createContact={createContact}
        updateContact={updateContact}
        contact={selectedContact}
        mode={mode}
        errors={errors}
      />
      <Fab
        classes={{ root: classes.fab }}
        color="primary"
        aria-label="add"
        onClick={() => openCreateUpdateContactDialog('create')}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Contacts;
