import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import api from '../../shared/api';
import { IMetric } from '../../shared/interfaces';
import CreateUpdateMetricDialog from './create-update-metric';
import MetricList from './metric-list';
import { ViewMode, TimeMode } from '../../shared/types';
import { Grid } from '@material-ui/core';

type Props = {};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    formControl: {
      width: '100%',
      minWidth: 81,
    },
  })
);

const Metrics: React.ComponentType<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<IMetric[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [mode, setMode] = useState<ViewMode>('list');
  const [timeMode, setTimeMode] = useState<TimeMode>('day');
  const [selectedMetric, setSelectedMetric] = useState<IMetric | null>(null);

  useEffect(() => {
    async function initMetrics() {
      setIsRequesting(true);
      const { data: metrics } = await api.get('/metrics');
      setIsRequesting(false);
      setIsLoading(false);
      setMetrics(metrics);
    }

    if (!isRequesting) {
      initMetrics();
    }
  }, [isLoading]);

  const openCreateUpdateMetricDialog = useCallback(
    (mode: ViewMode, metric?: IMetric) => {
      if (mode === 'update' && metric) {
        setSelectedMetric(metric);
        setMode('update');
      } else if (mode === 'create') {
        setSelectedMetric(null);
        setMode('create');
      }
    },
    []
  );

  const deleteMetric = useCallback(
    async (metric: IMetric) => {
      try {
        const response = await api.delete(`/metrics/${metric.id}`);
        setMetrics(metrics.filter(_metric => _metric.id !== metric.id));
      } catch(error) {

      }
      
    },
    [metrics]
  );

  const createMetric = useCallback(
    async (metric: IMetric) => {
      try {
        const response = await api.post('/metrics', metric);
        setMetrics([...metrics, response.data]);
        setMode('list');
        setErrors({});
      } catch (error) {
        setErrors(error.response.data);
      }
    },
    [metrics]
  );

  const updateMetric = useCallback(
    async (metric: IMetric) => {
      try {
        const response = await api.patch(`/metrics/${metric.id}`, metric);
        const updatedMetrics = metrics.map(_metric => {
          if (_metric.id === metric.id) {
            return {
              ..._metric,
              ...response.data
            };
          }
          return _metric;
        });
        setMetrics(updatedMetrics);
        setMode('list');
        setSelectedMetric(null);
        setErrors({});
      } catch (error) {
        setErrors(error.response.data);
      }
    },
    [metrics]
  );

  const closeDialog = useCallback(() => {
    setErrors({})
    setMode('list')
  }, [])

  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const getDateFieldType = useMemo(() => {
    if (timeMode === 'day') {
      return 'date'
    }

    return 'datetime-local'
  }, [timeMode])

  const classes = useStyles();

  return (
    <div>
      <h2>Metrics</h2>
      <Grid container>
        <Grid item xs={4} style={{marginLeft: 'auto'}}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              <FormControl className={classes.formControl}>
                <InputLabel id="mode-select-label">Mode</InputLabel>
                <Select
                  labelId="mode-select-label"
                  id="mode-select"
                  value={timeMode}
                  onChange={(e: any) => setTimeMode(e.target.value)}
                >
                  <MenuItem value={'minute'}>Minutes</MenuItem>
                  <MenuItem value={'hour'}>Hours</MenuItem>
                  <MenuItem value={'day'}>Days</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={5}>
              <TextField
                  autoFocus
                  id="start_date"
                  label="Start Date"
                  type={getDateFieldType}
                  value={startDate}
                  onChange={(e: any) => setStartDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
            </Grid>
            <Grid item xs={5}>
              <TextField
                  autoFocus
                  id="end_date"
                  label="End Date"
                  type={getDateFieldType}
                  value={endDate}
                  inputProps={{
                    min: startDate
                  }}
                  onChange={(e: any) => setEndDate(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  fullWidth
                />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {isLoading && <p>Loading...</p>}
      {!isLoading && startDate !== '' && endDate !== '' && (
        <MetricList
          metrics={metrics}
          startDate={startDate}
          endDate={endDate}
          mode={timeMode}
        />
      )}
      {!isLoading && (startDate === '' || endDate === '') && (
        <p>Please select mode and time period for average results</p>
      )}
      <CreateUpdateMetricDialog
        closeDialog={closeDialog}
        createMetric={createMetric}
        updateMetric={updateMetric}
        metric={selectedMetric}
        mode={mode}
        errors={errors}
      />
      <Fab
        classes={{ root: classes.fab }}
        color="primary"
        aria-label="add"
        onClick={() => openCreateUpdateMetricDialog('create')}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default Metrics;
