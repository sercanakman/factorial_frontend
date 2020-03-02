
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
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
  }),
);

type Props = {
    container?: any;
    open: boolean;
    toggle: Function
}

const Drawer: React.ComponentType<Props> = ({ container, open, toggle }) => {
    const classes = useStyles();
    const theme = useTheme();

    const onDrawerClose = useCallback(() => {
      toggle()
    }, [open, toggle])
  
    const drawer = (
      <div>
        <div className={classes.toolbar} />
          <Divider />
          <List>
            <ListItem button key={'contacts'}>
              <ListItemIcon><ContactsIcon /></ListItemIcon>
              <ListItemText primary={'Contacts'} />
            </ListItem>
            <ListItem button key={'events'}>
              <ListItemIcon><EventIcon /></ListItemIcon>
              <ListItemText primary={'Events'} />
            </ListItem>
            <ListItem button key={'metrics'}>
              <ListItemIcon><AssessmentIcon /></ListItemIcon>
              <ListItemText primary={'Metrics'} />
            </ListItem>
        </List>
      </div>
    );

    return (
        <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <MuiDrawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={open}
            onClose={onDrawerClose}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </MuiDrawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <MuiDrawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </MuiDrawer>
        </Hidden>
      </nav>
    )
}

export default Drawer;