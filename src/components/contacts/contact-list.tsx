import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Contact from './contact';
import { IContact } from '../../shared/interfaces';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
  }),
);

type Props = {
  contacts: IContact[]
  deleteContact: Function
  updateContact: Function
}


const ContactList: React.ComponentType<Props> = ({contacts, deleteContact, updateContact}) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                key={'first_name'}
                align={'left'}
              >
                First Name
              </TableCell>
              <TableCell
                key={'last_name'}
                align={'left'}
              >
                Last Name
              </TableCell>
              <TableCell
                key={'email'}
                align={'left'}
              >
                E-mail
              </TableCell>
              <TableCell
                key={'phone_number'}
                align={'left'}
              >
                Phone Number
              </TableCell>
              <TableCell
                key={'actions'}
                align={'right'}
                style={{ minWidth: '5rem' }}
              >
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts.map(contact => <Contact key={`contact-${contact.id}`} contact={contact} deleteContact={deleteContact} updateContact={updateContact} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ContactList;