import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";

import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { ItemsPage } from './pages/Items/ItemsPage';


import '@mantine/core/styles.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/items',
    element: <ItemsPage />
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider forceColorScheme="dark">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);
