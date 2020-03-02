import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from './components/layout/drawer';
import Body from './components/layout/body';
import Header from './components/layout/header';
import Contacts from './components/contacts';
import Events from './components/events';
import Metrics from './components/metrics';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
    <Router>
      <div className={classes.root}>   
        <CssBaseline />
        <Header handleDrawerToggle={handleDrawerToggle} />
        <Drawer open={mobileOpen} toggle={handleDrawerToggle} />
        <Body>
          <Switch>
            <Route path="/contacts">
              <Contacts />
            </Route>
            <Route path="/events">
              <Events />
            </Route>
            <Route path="/metrics">
              <Metrics />
            </Route>
            <Route path="/">
              <Contacts />
            </Route>
          </Switch>
        </Body>
      </div>
    </Router>
  );
}

export default App;
