import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
    <GoogleOAuthProvider clientId="26087515364-eaf801qqbse5l3lasnintjl1l671r0t0.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>

    </React.StrictMode>
  </BrowserRouter>
);
