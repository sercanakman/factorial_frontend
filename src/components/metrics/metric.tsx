import React, {useState, useCallback} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { IMetric } from '../../shared/interfaces';
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
  metric: IMetric
  deleteMetric: Function;
  updateMetric: Function
}

const Metric: React.ComponentType<Props> = ({metric, deleteMetric, updateMetric}) => {
  const classes = useStyles();
  const [isActionsVisible, setIsActionsVisible] = useState<boolean>(false);

  return (
    <TableRow hover role="checkbox" tabIndex={-1} onMouseEnter={() => setIsActionsVisible(true)} onMouseLeave={() => setIsActionsVisible(false)}>
      <TableCell align='left'>
        {metric.name}
      </TableCell>
      <TableCell align='left'>
        {metric.value}
      </TableCell>
      <TableCell align='right' style={{padding: '0'}}>
        {
          isActionsVisible && (
            <>
              <IconButton size={'small'} onClick={() => updateMetric(metric)} style={{paddingRight: '0.5rem'}}>
                  <EditIcon />
              </IconButton>
              <IconButton size={'small'} onClick={() => deleteMetric(metric)} style={{paddingRight: '0.5rem'}}>
                  <DeleteIcon />
              </IconButton>
            </>
          )
        }
      </TableCell>
    </TableRow>
  )
}

export default Metric;