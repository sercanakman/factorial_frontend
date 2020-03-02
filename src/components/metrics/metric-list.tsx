import React, { useMemo } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { IMetric } from '../../shared/interfaces';
import _ from 'lodash';
import { TimeMode } from '../../shared/types';
import createIntervals from './create-intervals';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      padding: theme.spacing(2),
    },
    container: {
      maxHeight: 440,
      overflowX: 'auto'
    },
    table: {
      overflowX: 'auto'
    }
  })
);

const getAverage = (nums: number[]) => {
  const total = nums.reduce((acc, c) => acc + c, 0);
  return total / nums.length;
}

type Props = {
  metrics: IMetric[];
  startDate: string
  endDate: string
  mode: TimeMode
};

const MetricList: React.ComponentType<Props> = ({
  metrics,
  startDate,
  endDate,
  mode,
}) => {
  const classes = useStyles();

  const groupedMetrics = useMemo(() => {
    return _.groupBy(metrics, 'name');
  }, [metrics, mode]);

  const createdIntervals = useMemo(() => {
    const intervals = createIntervals(startDate, endDate, mode);
    return intervals
  }, [groupedMetrics, startDate, endDate, mode])

  const calculateAverageBetweenPeriod = (interval: any) => {
    let endDateCondition: any;
    if (mode === 'minute') {
      endDateCondition = moment(interval, "DD.MM.YYYY HH:mm").add(1, 'minutes');
    } else if (mode === 'hour') {
      endDateCondition = moment(interval, "DD.MM.YYYY HH:mm").add(1, 'hours');
    } else if (mode === 'day') {
      endDateCondition = moment(interval, "DD.MM.YYYY HH:mm").add(1, 'days');
    }
    
    const _metrics = metrics
        .filter(metric => moment(metric.created_at).isBetween(moment(interval, "DD.MM.YYYY HH:mm"), endDateCondition))
        .map(metric => parseInt(metric.value))

    if (_metrics.length) {
      return getAverage(_metrics);
    }
    
    return 0;
  }

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table" className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell key={'name'} align={'left'} rowSpan={2}>
                Name
              </TableCell>
              <TableCell key={'average_value'} align={'center'} colSpan={createdIntervals.length}>
                Average Values
              </TableCell>
            </TableRow>
            <TableRow>
              {
                createdIntervals.map(interval => (
                  <TableCell key={`interval-${interval}`} align={'center'} style={{ top: 57, minWidth: 110 }}>{interval}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              Object.keys(groupedMetrics).map(key => (
                <TableRow>
                  <TableCell>{key}</TableCell>
                  {
                createdIntervals.map(interval => (
                  <TableCell key={`interval-${interval}`} align={'center'} style={{ minWidth: 110 }}>{calculateAverageBetweenPeriod(interval).toFixed(2)}</TableCell>
                ))
              }
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default MetricList;
