import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';
import Proyectos from '../pages/Proyectos';
import Miembros from '../pages/Miembros';
import { Login } from '../pages/Login';
import Inicio from '../pages/Inicio';
import Proyecto from '../pages/Proyecto';
import Subir from '../pages/Subir';

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
  {
    path: '/inicio',
    layout: MainLayout,
    element: Inicio,
  },
  {
    path: '/Subir',
    layout: MainLayout,
    element: Subir,
  }
];

export default routes;
