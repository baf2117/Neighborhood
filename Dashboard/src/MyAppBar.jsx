// in src/MyAppBar.js
import * as React from 'react';
import { AppBar } from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import MyUserMenu from './MyUserMenu';

const useAppBarStyles = makeStyles(theme => ({

  toolbar: {
    backgroundColor: 'white',
    color: 'black'
  },
  menuButton: {
    color: 'black',

  },
  menuButtonIconClosed: {
  },
  menuButtonIconOpen: {
  },
  title: {
    textIndent: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}));

const MyAppBar = props => {
  const classes = useAppBarStyles();
  return (
    <AppBar {...props} classes={classes} userMenu={<MyUserMenu />}>
    </AppBar>
  );
};

export default MyAppBar;