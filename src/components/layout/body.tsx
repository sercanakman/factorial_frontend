
import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      display: 'flex',
      flexDirection: 'column',
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);

type Props = {
  children?: any
}

const Body: React.ComponentType<Props> = ({children}) => {
    const classes = useStyles();
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    )
}

export default Body;