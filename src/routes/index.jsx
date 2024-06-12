import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';
import { Login } from '../pages/Login';
import Inicio from '../pages/Inicio';


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
  {
    path: '/login',
    layout: MainLayout,
    element: Login,
  },
  {
    path: '/inicio',
    layout: MainLayout,
    element: Inicio,
  }
];

export default routes;
