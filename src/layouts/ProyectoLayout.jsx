import React from 'react';
import { Layout } from 'antd'; // Assuming you use Ant Design layout components
import Navbar from './components/Navbar'; // Assuming Navbar.jsx is in the same directory
import NavbarProyecto from './components/NavbarProyecto';
const { Header, Content } = Layout;

const ProyectoLayout  = ({ children }) => {
  return (
    <Layout>
      <Header>
        <Navbar /> {/* Render your Navbar component in the Header section */}
        <NavbarProyecto/>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: 64 }}>
        <div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
          {/* Render dynamic content based on routing or state */}
          {children}
        </div>
      </Content>
    </Layout>
  );
};

export default ProyectoLayout;