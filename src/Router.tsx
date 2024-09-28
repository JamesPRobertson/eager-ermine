import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { ItemsPage } from './pages/Items/ItemsPage';

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

export const Router = () => {
  return <RouterProvider router={router} />;
}
