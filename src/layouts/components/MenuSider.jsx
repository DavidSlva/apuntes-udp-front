import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  FileAddOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
const items = [
  {
    key: '1',
    icon: <HomeOutlined />,
    title: 'Home',
    label: (
      <>
        <Link to={'/inicio'}>Inicio</Link>{' '}
      </>
    ),
  },
  // {
  //   key: '2',
  //   icon: <UserOutlined />,
  //   title: 'Usuarios',
  //   label: (
  //     <>
  //       <Link to={'/usuarios'}>Usuarios</Link>{' '}
  //     </>
  //   ),
  // },
  {
    key: '3',
    icon: <MenuOutlined />,
    title: 'Proyectos',
    label: (
      <>
        <Link to={'/Proyectos'}>Proyectos</Link>{' '}
      </>
    ),
  },
  {
    key: '4',
    icon: <FileAddOutlined />,
    title: 'Archivo Ex',
    label: (
      <>
        <Link to={'/Subir'}>Archivo Ex</Link>{' '}
      </>
    ),
  },
  {
    key: '5',
    icon: <FileAddOutlined />,
    title: 'Un Proyecto',
    label: (
      <>
        <Link to={'/Proyectos/1/Proyecto'}>Un Proyecto</Link>{' '}
      </>
    ),
  },
  {
    key: '6',
    icon: <LinkOutlined />,
    title: 'Referencia',
    label: (
      <>
        <Link to={'/referencia'}>Referencia</Link>{' '}
      </>
    ),
  },
  {
    key: '7',
    icon: <UserOutlined />,
    title: 'Miembros',
    label: (
      <>
        <Link to={'/Miembros'}>Miembros</Link>{' '}
      </>
    ),
  },
];

const MenuSider = () => {
  return <Menu items={items} />;
};

export default MenuSider;
