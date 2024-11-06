// Loading this before anything else prevents Mantine
// from overruling .module.css files.
import '@mantine/core/styles.css';

import React from "react";
import ReactDOM from "react-dom/client";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { App } from "./App";

import { LandingPage } from "./pages/LandingPage/LandingPage";
import { ItemsPage } from "./pages/Items/ItemsPage";
import { BuildingsPage } from "pages/Buildings/BuildingsPage";
import { RecipesPage } from "pages/Recipes/RecipesPage";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider forceColorScheme="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>}>
            <Route path="home" element={<LandingPage />}/>
            <Route path="items" element={<ItemsPage />}/>
            <Route path="buildings" element={<BuildingsPage />}/>
            <Route path="recipes" element={<RecipesPage />}/>
          </Route>
          <Route path="*" element={<App/>} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  </React.StrictMode>,
);
