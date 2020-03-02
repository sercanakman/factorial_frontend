import React, {useState, useCallback, useMemo, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IContact } from '../../shared/interfaces';
import { ContactModes } from '../../shared/types';

type Props = {
    closeDialog: Function;
    createContact: Function;
    updateContact: Function;
    contact?: IContact | null;
    mode: ContactModes
    errors: any
}

const CreateUpdateContactDialog: React.ComponentType<Props> = ({closeDialog, mode, contact, createContact, updateContact, errors}) => {
  const [firstName, setFirstName] = useState<string>(contact ? contact.first_name : '')
  const [lastName, setLastName] = useState<string>(contact ? contact.last_name : '')
  const [email, setEmail] = useState<string>(contact ? contact.email : '')
  const [phoneNumber, setPhoneNumber] = useState<string>(contact ? contact.phone_number : '')

  useEffect(() => {
    if (contact && mode === 'update') {
      setFirstName(contact.first_name)
      setLastName(contact.last_name)
      setEmail(contact.email)
      setPhoneNumber(contact.phone_number)
    } else {
      resetForm();
    }
  }, [contact, mode])

  const handleClose = useCallback(() => {
    closeDialog();
    resetForm();
  }, [closeDialog]);

  const resetForm = useCallback(() => {
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhoneNumber('')
  }, []);

  const getSaveActionCallback = useMemo(() => {
   if (mode === 'create') {
     return createContact;
   } else if (mode === 'update') {
     return updateContact;
   }

   return () => {};
  }, [mode, createContact, updateContact])

  const onSave = useCallback(async () => {
    getSaveActionCallback({
      id: contact ? contact.id : '',
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber
    })
  }, [firstName, lastName, email, phoneNumber, getSaveActionCallback])

  return (
      <Dialog open={mode === 'create' || mode === 'update'} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Contact</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="first_name"
                label="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="last_name"
                label="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                helperText={errors.email && errors.email !== '' ? 'E-mail has already been taken' : ''}
                error={errors.email && errors.email !== '' ? true : false}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="phone_number"
                label="Phone Number"
                type="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
              /> 
            </Grid> 
          </Grid>             
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={onSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
  );
}

export default CreateUpdateContactDialog;