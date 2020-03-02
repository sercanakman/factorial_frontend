import React, {useState, useCallback} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { IEvent } from '../../shared/interfaces';
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
  event: IEvent
  deleteEvent: Function;
  updateEvent: Function
}

const Event: React.ComponentType<Props> = ({event, deleteEvent, updateEvent}) => {
  const classes = useStyles();
  const [isActionsVisible, setIsActionsVisible] = useState<boolean>(false);

  return (
    <TableRow hover role="checkbox" tabIndex={-1} onMouseEnter={() => setIsActionsVisible(true)} onMouseLeave={() => setIsActionsVisible(false)}>
      <TableCell align='left'>
        {event.title}
      </TableCell>
      <TableCell align='left'>
        {event.description}
      </TableCell>
      <TableCell align='left'>
        {event.start_date}
      </TableCell>
      <TableCell align='left'>
        {event.end_date}
      </TableCell>
      <TableCell align='right' style={{padding: '0'}}>
        {
          isActionsVisible && (
            <>
              <IconButton size={'small'} onClick={() => updateEvent(event)} style={{paddingRight: '0.5rem'}}>
                  <EditIcon />
              </IconButton>
              <IconButton size={'small'} onClick={() => deleteEvent(event)} style={{paddingRight: '0.5rem'}}>
                  <DeleteIcon />
              </IconButton>
            </>
          )
        }
      </TableCell>
    </TableRow>
  )
}

export default Event;