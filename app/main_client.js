import React from 'react';
import controller from './controller.js';
import {Container} from 'cerebral-react';

import App from './components/App.jsx';

import Router from 'cerebral-router';

import setSearchText from './actions/setSearchText';
import incrementLimit from './actions/incrementLimit';
import setPage from './actions/setPage';
import insertPost from './actions/insertPost';


// Controller
controller.signal('homeOpened', setPage('Home') );
controller.signal('listOpened', setPage('List') );
// coming from in-page link in ListData
controller.signal('searchText', setSearchText );
// coming from router
controller.signal('listOpenedSearch', setSearchText, setPage('List') );
controller.signal('loadMore', incrementLimit() );
controller.signal('insertPost', insertPost );

// Router
Router(controller, {
  '/': 'homeOpened',
  '/list': 'listOpened',
  '/list/:filter': 'listOpenedSearch',
}).start();

// Attach to the DOM
Meteor.startup(() => {
  React.render(<Container controller={controller} app={App}/>,
    document.getElementById('root'));
});
