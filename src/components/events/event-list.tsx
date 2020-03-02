import React, {useMemo} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { IEvent } from '../../shared/interfaces';
import moment from 'moment';

const localizer = momentLocalizer(moment)

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      padding: theme.spacing(2)
    },
    container: {
      height: '100%',
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

  const transformedEvents = useMemo(() => {

    return events.map(event => ({
      title: event.title,
      desc: event.description,
      start: event.start_date,
      end: event.end_date
    }));
  }, [events])

  return (
    <Paper className={classes.root}>
      <Grid container className={classes.container}>
        <Grid item xs={12}>
          <Calendar
            localizer={localizer}
            events={transformedEvents}
            startAccessor="start"
            endAccessor="end"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default EventList;