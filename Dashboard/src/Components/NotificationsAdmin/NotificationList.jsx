import { List, DateField, TextField,TextAreaField } from 'react-admin';
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


const NotificationList = (props) => {
  const classes = useStyles();
  const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

  return (
    <div class="container">
      <div class="row" style={{ marginTop: '2%' }}>
        <div class="col-12">
          {isSmall ? (
            <List empty={false} {...props} style={{ width: '100%' }} actions={<ListActions small={isSmall} />} bulkActionButtons={false} pagination={<PostPagination />}>
              <Datagrid {...props} rowClick="show" optimized style={{ textAlign: 'center' }}>
                <TextField source="description" style={{ color: 'black', fontFamily: 'Gothic' }} label="Descripción" sortable={false} cellClassName={classes.fields} />
              </Datagrid>
            </List>
          ) : (
            <List empty={false} {...props} style={{ width: '100%' }} actions={<ListActions small={isSmall} />} bulkActionButtons={false} pagination={<PostPagination />}>
              <Datagrid {...props} rowClick="show" optimized style={{ textAlign: 'center' }}>
                <TextField source="description" style={{ color: 'black', fontFamily: 'Gothic' }} label="Descripción" sortable={false} cellClassName={classes.fields} />
              </Datagrid>
            </List>
          )}
        </div>
      </div>
    </div>
  )
};

export default NotificationList;