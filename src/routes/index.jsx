import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';
import Proyectos from '../pages/Proyectos';
import Miembros from '../pages/Miembros';
import { Login } from '../pages/Login';

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
    path: '/Proyectos',
    layout: MainLayout,
    element: Proyectos,
  },
  {
    path: '/Miembros',
    layout: MainLayout,
    element: Miembros,
  },
  {
    path: '/login',
    layout: MainLayout,
    element: Login,
  },
];

export default routes;
