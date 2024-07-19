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
    key: '3',
    icon: <MenuOutlined style={{ fontSize: '16pt' }} />,
    title: 'Proyectos',
    label: (
      <Link to={'/Proyectos'} style={{ color: '#FFFFFF' }}>
        Proyectos
      </Link>
    ),
  },
];

const Navbar = () => {
  return (
    <div style={{ width: '100%' }} className="mt-0 md:mt-2">
      <Menu
        mode="horizontal"
        items={items}
        theme="dark"
        // Agregar borde para esquinas de abajo con tailwindcss
        className=" rounded-b-md md:rounded-md"
        // className=" rounded-s-sm md:rounded-md"
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          backgroundColor: '#c23633',
          fontSize: '16pt',
          // borderRadius: '0.375rem',
        }}
      />
    </div>
  );
};

export default Navbar;
