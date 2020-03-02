import React, {useState, useEffect} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import api from '../../shared/api';
import {IContact} from '../../shared/interfaces';

type Props = {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
  }),
);

const Contacts: React.ComponentType<Props> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [contacts, setContacts] = useState<IContact[]>([]);

    useEffect(() => {
		async function initContacts() {
            setIsRequesting(true)
            const {data: contacts} = await api.get('/contacts')
			setIsRequesting(false)
            setIsLoading(false)
            setContacts(contacts);
		}

		if (!isRequesting) {
            initContacts();
        }
    }, [isLoading]);

    const classes = useStyles();
    
    return (
        <div>
            <h2>Contacts</h2>
            {
                isLoading && <p>Loading...</p>
            }
            {
                !isLoading && contacts.map(contact => (
                    <p key={contact.id}>{contact.first_name}</p>
                ))
            }
            <Fab classes={{root: classes.fab}} color="primary" aria-label="add">
                <AddIcon />
            </Fab>
        </div>
    )
}

export default Contacts;