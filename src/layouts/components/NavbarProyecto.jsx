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
    title: 'Proyecto',
    label: (
      <Link to={'/Proyecto'} style={{ color: '#FFFFFF' }}>Proyecto</Link>
    ),
  },
  {
    key: '2',
    icon: <MenuOutlined style={{fontSize: '16pt'}} />,
    title: 'Archivos',
    label: (
      <Link to={'/Referentes'} style={{ color: '#FFFFFF' }}>Archivos</Link>
    ),
  },
  {
    key: '3',
    icon: <FileAddOutlined style={{fontSize: '16pt'}}/>,
    title: 'Referentes',
    label: (
      <Link to={'/Referentes'} style={{ color: '#FFFFFF' }}>Referentes</Link>
    ),
  },
  {
    key: '4',
    icon: <FileAddOutlined style={{fontSize: '16pt'}}/>,
    title: 'Miembros del Proyecto',
    label: (
      <Link to={'/Proyectos/1/Proyecto'} style={{ color: '#FFFFFF' }}>Miembros</Link>
    ),
  },
];

const NavbarProyecto = () => {
  return (
    <div style={{ width: '100%' }}>
      <Menu 
        mode="horizontal" 
        items={items} 
        theme="dark"
        style={{ display: 'flex', justifyContent: 'space-around', width: '100%', backgroundColor: '#000000', fontSize: '16pt' }} 
      />
    </div>
  );
};

export default NavbarProyecto;