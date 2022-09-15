import { List, DateField, TextField, useDataProvider } from 'react-admin';
import Datagrid from '../Commons/Datagrid';
import PostPagination from '../Commons/PostPagination';
import ListActions from '../Commons/ListActions';
import { createStyles, makeStyles } from '@material-ui/core';
import { useMediaQuery } from '@material-ui/core';
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

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
                <TextField source="profile.address" style={{ color: 'black', fontFamily: 'Gothic' }} label="Dirección" sortable={false} cellClassName={classes.fields} />
                <DateField source="date" style={{ color: 'black', fontFamily: 'Gothic' }} label="Fecha" sortable={false} cellClassName={classes.fields} />
                <TextField source="dpi" style={{ color: 'black', fontFamily: 'Gothic' }} label="DPI" sortable={false} cellClassName={classes.fields} />
              </Datagrid>
            </List>
          ) : (
            <List empty={false} {...props} style={{ width: '100%' }} actions={<ListActions small={isSmall} />} bulkActionButtons={false} pagination={<PostPagination />}>
              <Datagrid {...props} rowClick="show" optimized style={{ textAlign: 'center' }}>
                <TextField source="name" style={{ color: 'black', fontFamily: 'Gothic' }} label="Visita" sortable={false} cellClassName={classes.fields} />
                <TextField source="profile.name" style={{ color: 'black', fontFamily: 'Gothic' }} label="Vecino" sortable={false} cellClassName={classes.fields} />
                <TextField source="profile.address" style={{ color: 'black', fontFamily: 'Gothic' }} label="Dirección" sortable={false} cellClassName={classes.fields} />
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