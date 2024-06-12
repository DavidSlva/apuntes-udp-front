import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';
import Proyectos from '../pages/Proyectos';
import Miembros from '../pages/Miembros';
import { Login } from '../pages/Login';
import Proyecto from '../pages/Proyecto';

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
    path: '/Proyectos/:id/Proyecto',
    layout: MainLayout,
    element: Proyecto,
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
