import React, { useState, useEffect, useCallback } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import api from '../../shared/api';
import { IEvent } from '../../shared/interfaces';
import CreateUpdateEventDialog from './create-update-event';
import EventList from './event-list';
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

const Events: React.ComponentType<Props> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [events, setEvents] = useState<IEvent[] | any>([]);
  const [errors, setErrors] = useState<any>({});
  const [mode, setMode] = useState<ViewMode>('list');
  const [selectedEvent, setSelectedEvent] = useState<IEvent | null>(null);

  useEffect(() => {
    async function initEvents() {
      setIsRequesting(true);
      const { data: events } = await api.get('/events');
      setIsRequesting(false);
      setIsLoading(false);
      setEvents(events);
    }

    if (!isRequesting) {
      initEvents();
    }
  }, [isLoading]);

  const openCreateUpdateEventDialog = useCallback(
    (mode: ViewMode, event?: IEvent) => {
      if (mode === 'update' && event) {
        setSelectedEvent(event);
        setMode('update');
      } else if (mode === 'create') {
        setSelectedEvent(null);
        setMode('create');
      }
    },
    []
  );

  const deleteEvent = useCallback(
    async (event: IEvent) => {
      try {
        const response = await api.delete(`/events/${event.id}`);
        setEvents(events.filter((_event: IEvent) => _event.id !== event.id));
      } catch(error) {

      }
      
    },
    [events]
  );

  const createEvent = useCallback(
    async (event: IEvent) => {
      console.log('event', event)
      try {
        const response = await api.post('/events', event);
        setEvents([...events, response.data]);
        setMode('list');
        setErrors({});
      } catch (error) {
        setErrors(error.response.data);
      }
    },
    [events]
  );

  const updateEvent = useCallback(
    async (event: IEvent) => {
      try {
        const response = await api.patch(`/events/${event.id}`, event);
        const updatedEvents = events.map((_event: IEvent) => {
          if (_event.id === event.id) {
            return {
              ..._event,
              ...response.data
            };
          }
          return _event;
        });
        setEvents(updatedEvents);
        setMode('list');
        setSelectedEvent(null);
        setErrors({});
      } catch (error) {
        setErrors(error.response.data);
      }
    },
    [events]
  );

  const closeDialog = useCallback(() => {
    setErrors({})
    setMode('list')
  }, [])

  const classes = useStyles();

  return (
    <>
      <h2>Events</h2>
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <EventList
          events={events}
          deleteEvent={deleteEvent}
          updateEvent={(event: IEvent) =>
            openCreateUpdateEventDialog('update', event)
          }
        />
      )}
      <CreateUpdateEventDialog
        closeDialog={closeDialog}
        createEvent={createEvent}
        updateEvent={updateEvent}
        event={selectedEvent}
        mode={mode}
        errors={errors}
      />
      <Fab
        classes={{ root: classes.fab }}
        color="primary"
        aria-label="add"
        onClick={() => openCreateUpdateEventDialog('create')}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default Events;
