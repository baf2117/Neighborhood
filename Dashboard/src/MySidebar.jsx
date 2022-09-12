import { makeStyles } from '@material-ui/core/styles';
import {Sidebar} from 'react-admin';

const useSidebarStyles = makeStyles(theme => ({
    drawerPaper: {
      backgroundColor: 'white',
    },
  }));

const MySidebar = (props) => {
    const classes = useSidebarStyles();
    return (
      <Sidebar classes={classes} {...props} />
    );
  };

  export default MySidebar;