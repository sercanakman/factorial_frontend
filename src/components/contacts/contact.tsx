import React, {useState, useCallback} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { IContact } from '../../shared/interfaces';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    inline: {
      display: 'inline',
    },
  }),
);

type Props = {
  contact: IContact
  deleteContact: Function;
  updateContact: Function
}

const Contact: React.ComponentType<Props> = ({contact, deleteContact, updateContact}) => {
  const classes = useStyles();
  const [isActionsVisible, setIsActionsVisible] = useState<boolean>(false);

  return (
    <TableRow hover role="checkbox" tabIndex={-1} onMouseEnter={() => setIsActionsVisible(true)} onMouseLeave={() => setIsActionsVisible(false)}>
      <TableCell align='left'>
        {contact.first_name}
      </TableCell>
      <TableCell align='left'>
        {contact.last_name}
      </TableCell>
      <TableCell align='left'>
        {contact.email}
      </TableCell>
      <TableCell align='left'>
        {contact.phone_number}
      </TableCell>
      <TableCell align='right' style={{padding: '0'}}>
        {
          isActionsVisible && (
            <>
              <IconButton size={'small'} onClick={() => updateContact(contact)} style={{paddingRight: '0.5rem'}}>
                  <EditIcon />
              </IconButton>
              <IconButton size={'small'} onClick={() => deleteContact(contact)} style={{paddingRight: '0.5rem'}}>
                  <DeleteIcon />
              </IconButton>
            </>
          )
        }
      </TableCell>
    </TableRow>
  )
}

export default Contact;