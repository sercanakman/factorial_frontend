import React, {useState, useCallback, useMemo, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { IMetric } from '../../shared/interfaces';
import { ViewMode } from '../../shared/types';

type Props = {
    closeDialog: Function;
    createMetric: Function;
    updateMetric: Function;
    metric?: IMetric | null;
    mode: ViewMode
    errors: any
}

const CreateUpdateMetricDialog: React.ComponentType<Props> = ({closeDialog, mode, metric, createMetric, updateMetric, errors}) => {
  const [name, setName] = useState<string>(metric ? metric.name : '')
  const [value, setValue] = useState<string>(metric ? metric.value : '')

  useEffect(() => {
    if (metric && mode === 'update') {
      setName(metric.name)
      setValue(metric.value)
    } else {
      resetForm();
    }
  }, [metric, mode])

  const handleClose = useCallback(() => {
    closeDialog();
    resetForm();
  }, [closeDialog]);

  const resetForm = useCallback(() => {
    setName('')
    setValue('')
  }, []);

  const getSaveActionCallback = useMemo(() => {
   if (mode === 'create') {
     return createMetric;
   } else if (mode === 'update') {
     return updateMetric;
   }

   return () => {};
  }, [mode, createMetric, updateMetric])

  const onSave = useCallback(async () => {
    getSaveActionCallback({
      id: metric ? metric.id : '',
      name: name,
      value: value
    })
  }, [name, value, getSaveActionCallback])

  return (
      <Dialog open={mode === 'create' || mode === 'update'} onClose={handleClose} aria-labelledby="form-dialog-name">
        <DialogTitle id="form-dialog-name">Create Metric</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                autoFocus
                margin="dense"
                id="value"
                label="Value"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
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

export default CreateUpdateMetricDialog;