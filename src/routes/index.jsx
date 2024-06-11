import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';

const routes = [
  {
    path: '/',
    layout: MainLayout,
    element: Home,
  },
  {
    path: '/usuarios',
    layout: MainLayout,
    element: Usuarios,
  },
];

export default routes;
