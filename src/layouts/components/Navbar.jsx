import React, { useState } from 'react';
import { Menu } from 'antd';
import { HomeOutlined, ProjectOutlined, UserOutlined } from '@ant-design/icons';

const items = [
  {
    label: 'Inicio',
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: 'Proyectos',
    key: 'projects',
    icon: <ProjectOutlined />,
  },
  {
    label: 'Perfil',
    key: 'profile',
    icon: <UserOutlined />,
  },
];

const Navbar = () => {
  const [current, setCurrent] = useState('home'); // Default selected key

  const handleClick = (e) => {
    setCurrent(e.key); // Update selected key on click
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      style={{ width: '100%' }}
    >
      {items.map(item => (
        <Menu.Item key={item.key} icon={item.icon} style={{ flex: '1', textAlign: 'center' }}>
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Navbar;
