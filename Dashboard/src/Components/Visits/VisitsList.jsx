import { List, DateField, TextField } from 'react-admin';
import Datagrid from '../Commons/Datagrid';
import PostPagination from '../Commons/PostPagination';
import ListActions from '../Commons/ListActions';
import { createStyles, makeStyles } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import { useLayoutEffect, useState, useEffect } from "react";

const useStyles = makeStyles(() =>
  createStyles({
    bool: {
      width: '100%',
      textAlign: 'center',
    },
    fields: {
      textAlign: 'center',
    },
  }),
);


function useMediaQueryWidth() {
  const [screenSize, setScreenSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateScreenSize() {
      setScreenSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateScreenSize);
    updateScreenSize();
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return screenSize;
}

const VisitsList = (props) => {
  const classes = useStyles();
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <div class="container">
      <div class="row" style={{ marginTop: '2%' }}>
        <div class="col-12">
          {isSmall ? (
            <List empty={false} {...props} style={{ width: '100%' }} actions={<ListActions small={isSmall} />} bulkActionButtons={false} pagination={<PostPagination />}>
              <Datagrid {...props} rowClick="show" optimized style={{ textAlign: 'center' }}>
                <TextField source="name" style={{ color: 'black', fontFamily: 'Gothic' }} label="Visita" sortable={false} cellClassName={classes.fields} />
                <TextField source="phone" style={{ color: 'black', fontFamily: 'Gothic' }} label="Telefono" sortable={false} cellClassName={classes.fields} />
                <DateField source="date" style={{ color: 'black', fontFamily: 'Gothic' }} label="Fecha" sortable={false} cellClassName={classes.fields} />
                <TextField source="dpi" style={{ color: 'black', fontFamily: 'Gothic' }} label="DPI" sortable={false} cellClassName={classes.fields} />
              </Datagrid>
            </List>
          ) : (
            <List empty={false} {...props} style={{ width: '100%' }} actions={<ListActions small={isSmall} />} bulkActionButtons={false} pagination={<PostPagination />}>
              <Datagrid {...props} rowClick="show" optimized style={{ textAlign: 'center' }}>
                <TextField source="name" style={{ color: 'black', fontFamily: 'Gothic' }} label="Visita" sortable={false} cellClassName={classes.fields} />
                <TextField source="phone" style={{ color: 'black', fontFamily: 'Gothic' }} label="Telefono" sortable={false} cellClassName={classes.fields} />
                <DateField source="date" style={{ color: 'black', fontFamily: 'Gothic' }} label="Fecha" sortable={false} cellClassName={classes.fields} />
                <TextField source="dpi" style={{ color: 'black', fontFamily: 'Gothic' }} label="DPI" sortable={false} cellClassName={classes.fields} />
              </Datagrid>
            </List>
          )}
        </div>
      </div>
    </div>
  )
};

export default VisitsList;