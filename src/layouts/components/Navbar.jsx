import React from 'react';
import {
  HomeOutlined,
  UserOutlined,
  MenuOutlined,
  FileAddOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const items = [
  {
    key: '1',
    icon: <HomeOutlined style={{fontSize: '16pt'}} />,
    title: 'Home',
    label: (
      <Link to={'/inicio'} style={{ color: '#FFFFFF' }}>Inicio</Link>
    ),
  },
  {
    key: '3',
    icon: <MenuOutlined style={{fontSize: '16pt'}} />,
    title: 'Proyectos',
    label: (
      <Link to={'/Proyectos'} style={{ color: '#FFFFFF' }}>Proyectos</Link>
    ),
  },
  {
    key: '4',
    icon: <FileAddOutlined style={{fontSize: '16pt'}}/>,
    title: 'Archivo Ex',
    label: (
      <Link to={'/Subir'} style={{ color: '#FFFFFF' }}>Archivo Ex</Link>
    ),
  },
  {
    key: '5',
    icon: <FileAddOutlined style={{fontSize: '16pt'}}/>,
    title: 'Un Proyecto',
    label: (
      <Link to={'/Proyectos/1/Proyecto'} style={{ color: '#FFFFFF' }}>Un Proyecto</Link>
    ),
  },
  {
    key: '6',
    icon: <LinkOutlined style={{fontSize: '16pt'}}/>,
    title: 'Referencia',
    label: (
      <Link to={'/referencia'} style={{ color: '#FFFFFF' }}>Referencia</Link>
    ),
  },
  {
    key: '7',
    icon: <UserOutlined style={{fontSize: '16pt'}}/>,
    title: 'Miembros',
    label: (
      <Link to={'/Miembros'} style={{ color: '#FFFFFF' }}>Miembros</Link>
    ),
  },
];

const Navbar = () => {
  return (
    <div style={{ width: '100%' }}>
      <Menu 
        mode="horizontal" 
        items={items} 
        theme="dark"
        style={{ display: 'flex', justifyContent: 'space-around', width: '100%', backgroundColor: '#c23633', fontSize: '16pt' }} 
      />
    </div>
  );
};

export default Navbar;
