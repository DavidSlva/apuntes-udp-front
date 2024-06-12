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
      className='w-full'
      style={{ 
 
        background: `linear-gradient(to right, #E54441, #E54441)`, // Red gradient background
        color: 'white', // Text color of the Navbar
      }}
    >
      {items.map(item => (
        <Menu.Item 
          key={item.key} 
          icon={item.icon} 
          style={{ 
            flex: '1', 
            textAlign: 'center',
            background: current === item.key ? 'white' : `linear-gradient(to right, #E54441, #E54441)`, // Red gradient for non-selected items
            color: current === item.key ? '#E54441' : 'white', // Red text color for non-selected items
          }}
        >
          {item.label}
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default Navbar;
