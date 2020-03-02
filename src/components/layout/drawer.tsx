
import React, {useCallback} from 'react';
import Divider from '@material-ui/core/Divider';
import {default as MuiDrawer} from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import ContactsIcon from '@material-ui/icons/Contacts';
import EventIcon from '@material-ui/icons/Event';
import AssessmentIcon from '@material-ui/icons/Assessment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { NavLink } from "react-router-dom";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
  }),
);

type Props = {
}

const Drawer: React.ComponentType<Props> = () => {
    const classes = useStyles();

    return (
      <MuiDrawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
            <ListItem button key={'contacts'} component={NavLink} to={"/contacts"}>
              <ListItemIcon><ContactsIcon /></ListItemIcon>
              <ListItemText primary={'Contacts'} />
            </ListItem>
            <ListItem button key={'events'} component={NavLink} to={"/events"}>
              <ListItemIcon><EventIcon /></ListItemIcon>
              <ListItemText primary={'Events'} />
            </ListItem>
            <ListItem button key={'metrics'} component={NavLink} to={"/metrics"}>
              <ListItemIcon><AssessmentIcon /></ListItemIcon>
              <ListItemText primary={'Metrics'} />
            </ListItem>
        </List>
      </MuiDrawer>
    )
}

export default Drawer;