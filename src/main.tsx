import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { App } from "./App";
import { ItemsPage } from "./pages/Items/ItemsPage";
import { LandingPage } from "./pages/LandingPage/LandingPage";

import '@mantine/core/styles.css';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider forceColorScheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route path="home" element={<LandingPage />}/>
            <Route path="items" element={<ItemsPage />}/>
          </Route>
          <Route path="*" element={<App/>} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);
