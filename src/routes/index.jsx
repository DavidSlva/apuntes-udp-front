import MainLayout from '../layouts/MainLayout';
import MainLayoutTop from '../layouts/MainLayoutTop';
import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';
import Proyectos from '../pages/Proyectos';
import Miembros from '../pages/Miembros';
import { Login } from '../pages/Login';
import Inicio from '../pages/Inicio';
import Proyecto from '../pages/Proyecto';
import Subir from '../pages/Subir';
import Referencia from '../pages/Referencia';
import EmptyLayout from '../layouts/EmptyLayout';

const routes = [
  {
    path: '/',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/usuarios',
    layout: MainLayoutTop,
    element: Usuarios,
  },
  {
    path: '/Proyectos',
    layout: MainLayoutTop,
    element: Proyectos,
  },
  {
    path: '/Proyectos/:id/Proyecto',
    layout: MainLayoutTop,
    element: Proyecto,
  },
  {
    path: '/Miembros',
    layout: MainLayoutTop,
    element: Miembros,
  },
  {
    path: '/login',
    layout: EmptyLayout,
    element: Login,
  },
  {
    path: '/inicio',
    layout: MainLayoutTop,
    element: Inicio,
  },
  {
    path: '/Subir',
    layout: MainLayoutTop,
    element: Subir,
  },
  {
    path: '/referencia',
    layout: MainLayoutTop,
    element: Referencia,
  },
  {
    path: '/Subir',
    layout: MainLayout,
    element: Subir,
  },
];

export default routes;
