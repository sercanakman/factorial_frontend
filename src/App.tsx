import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from './components/layout/drawer';
import Body from './components/layout/body';
import Header from './components/layout/header';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import './App.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
  }),
);

function App() {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

  return (
    <div className={classes.root}>     
        <CssBaseline />
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Drawer open={mobileOpen} toggle={handleDrawerToggle} />
        <Body />
    </div>
  );
}

export default App;
