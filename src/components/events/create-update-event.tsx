import React, {useState, useCallback, useMemo, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IEvent } from '../../shared/interfaces';
import { ViewMode } from '../../shared/types';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Props = {
    closeDialog: Function;
    createEvent: Function;
    updateEvent: Function;
    event?: IEvent | null;
    mode: ViewMode
    errors: any
}

const CreateUpdateEventDialog: React.ComponentType<Props> = ({closeDialog, mode, event, createEvent, updateEvent, errors}) => {
  const [title, setTitle] = useState<string>(event ? event.title : '')
  const [description, setDescription] = useState<string>(event ? event.description : '')
  const [startDate, setStartDate] = useState<Date | string>(event ? event.start_date : '')
  const [endDate, setEndDate] = useState<Date | string>(event ? event.end_date : '')

  useEffect(() => {
    if (event && mode === 'update') {
      setTitle(event.title)
      setDescription(event.description)
      setStartDate(event.start_date)
      setEndDate(event.end_date)
    } else {
      resetForm();
    }
  }, [event, mode])

  const handleClose = useCallback(() => {
    closeDialog();
    resetForm();
  }, [closeDialog]);

  const resetForm = useCallback(() => {
    setTitle('')
    setDescription('')
    setStartDate('')
    setEndDate('')
  }, []);

  const getSaveActionCallback = useMemo(() => {
   if (mode === 'create') {
     return createEvent;
   } else if (mode === 'update') {
     return updateEvent;
   }

   return () => {};
  }, [mode, createEvent, updateEvent])

  const onSave = useCallback(async () => {
    getSaveActionCallback({
      id: event ? event.id : '',
      title: title,
      description: description,
      start_date: startDate,
      end_date: endDate
    })
  }, [title, description, startDate, endDate, getSaveActionCallback])

  return (
      <Dialog open={mode === 'create' || mode === 'update'} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Event</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="description"
                label="Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="start_date"
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="end_date"
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
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

export default CreateUpdateEventDialog;