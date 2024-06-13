import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import { CustomProvider } from 'rsuite';
import frFr from 'rsuite/locales/fr_FR';
import Router from './Router';
import 'rsuite/DateRangePicker/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CustomProvider locale={frFr}>
      <RouterProvider router={Router} />
    </CustomProvider>
  </React.StrictMode>
);
