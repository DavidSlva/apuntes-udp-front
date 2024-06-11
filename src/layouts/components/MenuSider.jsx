import { HomeOutlined, UserOutlined } from '@ant-design/icons';
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
        <Link to={'/'}>Inicio</Link>{' '}
      </>
    ),
  },
  {
    key: '2',
    icon: <UserOutlined />,
    title: 'Usuarios',
    label: (
      <>
        <Link to={'/usuarios'}>Usuarios</Link>{' '}
      </>
    ),
  },
];

const MenuSider = () => {
  return <Menu items={items} />;
};

export default MenuSider;
