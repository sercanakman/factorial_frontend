import React, { useState, useEffect, useCallback } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import api from '../../shared/api';
import { IMetric } from '../../shared/interfaces';
import CreateUpdateMetricDialog from './create-update-metric';
import MetricList from './metric-list';
import { ViewMode } from '../../shared/types';

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

const Metrics: React.ComponentType<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [metrics, setMetrics] = useState<IMetric[]>([]);
  const [errors, setErrors] = useState<any>({});
  const [mode, setMode] = useState<ViewMode>('list');
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

  const classes = useStyles();

  return (
    <div>
      <h2>Metrics</h2>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <MetricList
          metrics={metrics}
          deleteMetric={deleteMetric}
          updateMetric={(metric: IMetric) =>
            openCreateUpdateMetricDialog('update', metric)
          }
        />
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
