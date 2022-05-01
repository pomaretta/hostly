import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';

// Styles
import "./styles/_general.scss";

// Components
import Wrapper from './components/App';

// Routes
import routes from './router/Routes';

// Config
const config = {
  schema: process.env.REACT_APP_SCHEMA || 'http',
  hostname: process.env.REACT_APP_HOSTNAME || 'localhost:3000',
  environment: process.env.REACT_APP_ENVIRONMENT || 'DEV',
};

const appEl = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Wrapper config={config} routes={routes} />
    </CookiesProvider>
  </React.StrictMode>,
  appEl
);