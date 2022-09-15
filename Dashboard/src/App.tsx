import * as React from "react";
import { Admin, Resource, fetchUtils, CreateResult, UpdateResult } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import withValidations from "./withValidations";
import { Route } from 'react-router-dom';
import MyLayout from './MyLayout';

import VisitsList from './Components/Visits/VisitsList';
import VisitsCreate from './Components/Visits/VisitsCreate';
import VisitsShow from './Components/Visits/VisitsShow';

import VisitsListAdmin from './Components/VisitsAdmin/VisitsList';

import NotificationsList from './Components/Notifications/NotificationList';
import NotificationsCreate from './Components/Notifications/NotificationCreate';
import NotificationsShow from './Components/Notifications/NotificationShow';

import NotificationsListAdmin from './Components/NotificationsAdmin/NotificationList';

import NeighbornList from './Components/AdminProfiles/NeighbornList';
import NeignbornEdit from './Components/AdminProfiles/NeighbornEdit';

import Profile from './Components/Profile/Profile';

const routes = [
  <Route exact path="/profile" component={Profile} />
];

const domain: string = process.env.REACT_APP_URL ?? "";


const App = () => {

  const { isAuthenticated, isLoading, getIdTokenClaims, getAccessTokenSilently, logout } = useAuth0();

  const fetchJson = async (url: string, options: any = {}) => {
    if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
    }
    const customHeaders = await (async (): Promise<any> => {
      var c = await getIdTokenClaims();
      return {
        user: c.sub,
      }
    })();

    for (var header in customHeaders) {
      options.headers.set(header, customHeaders[header]);
    }

    // options.headers = { ...options.headers, customHeaders }
    return fetchUtils.fetchJson(url, options);
  }

  const dataProvider = simpleRestProvider(domain, fetchJson)

  const myDataProvider = {
    ...dataProvider,
  };

  return (
    <Admin appLayout={MyLayout} dataProvider={myDataProvider} customRoutes={routes} >
      <Resource name="visits" list={VisitsList} create={VisitsCreate} show={VisitsShow} />
      <Resource name="notifications" list={NotificationsList} create={NotificationsCreate} show={NotificationsShow} />
      <Resource name="profile" />
      <Resource name="profilesadmin" list={NeighbornList} edit={NeignbornEdit} />
      <Resource name="visitsadmin" list={VisitsListAdmin}/>
      <Resource name="notificationsadmin" list={NotificationsListAdmin}/>
    </Admin>
  )
}


export default withAuthenticationRequired(withValidations(App));