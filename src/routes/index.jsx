// src/routes.js
import React from 'react';
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
import PrivateRoute from '../components/PrivateRoute';

const routes = [
  {
    path: '/',
    layout: EmptyLayout,
    element: <Login />,
  },
  {
    path: '/usuarios',
    layout: MainLayoutTop,
    element: (
      <PrivateRoute>
        <Usuarios />
      </PrivateRoute>
    ),
  },
  {
    path: '/Proyectos',
    layout: MainLayoutTop,
    element: (
      <PrivateRoute>
        <Proyectos />
      </PrivateRoute>
    ),
  },
  {
    path: '/Proyectos/:id/Proyecto',
    layout: MainLayoutTop,
    element: (
      <PrivateRoute>
        <Proyecto />
      </PrivateRoute>
    ),
  },
  {
    path: '/Miembros',
    layout: MainLayoutTop,
    element: (
      <PrivateRoute>
        <Miembros />
      </PrivateRoute>
    ),
  },
  {
    path: '/login',
    layout: EmptyLayout,
    element: <Login />,
  },
  {
    path: '/inicio',
    layout: MainLayoutTop,
    element: (
      <PrivateRoute>
        <Inicio />
      </PrivateRoute>
    ),
  },
  {
    path: '/Subir',
    layout: MainLayoutTop,
    element: (
      <PrivateRoute>
        <Subir />
      </PrivateRoute>
    ),
  },
  {
    path: '/referencia',
    layout: MainLayoutTop,
    element: (
      <PrivateRoute>
        <Referencia />
      </PrivateRoute>
    ),
  },
  {
    path: '/Subir',
    layout: MainLayout,
    element: (
      <PrivateRoute>
        <Subir />
      </PrivateRoute>
    ),
  },
];

export default routes;
