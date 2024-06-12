// src/routes/index.jsx
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Usuarios from '../pages/Usuarios';
import ProjectDetails from '../pages/ProjectDetails'; // Import the new component

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
    path: '/proyecto',
    layout: MainLayout,
    element: ProjectDetails,
  },
];

export default routes;
