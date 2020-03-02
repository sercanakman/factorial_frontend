import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Event from './event';
import { IEvent } from '../../shared/interfaces';

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
  events: IEvent[]
  deleteEvent: Function
  updateEvent: Function
}


const EventList: React.ComponentType<Props> = ({events, deleteEvent, updateEvent}) => {
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
                Title
              </TableCell>
              <TableCell
                key={'last_name'}
                align={'left'}
              >
                Description
              </TableCell>
              <TableCell
                key={'email'}
                align={'left'}
              >
                Start Date
              </TableCell>
              <TableCell
                key={'phone_number'}
                align={'left'}
              >
                End Date
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
            {events.map(event => <Event key={`event-${event.id}`} event={event} deleteEvent={deleteEvent} updateEvent={updateEvent} />)}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default EventList;