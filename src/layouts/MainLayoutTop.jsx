import React from 'react';
import { Card, Layout } from 'antd'; // Assuming you use Ant Design layout components
import Navbar from './components/Navbar'; // Assuming Navbar.jsx is in the same directory

const { Header, Content } = Layout;

const MainLayoutTop = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header>
        <Navbar /> {/* Render your Navbar component in the Header section */}
      </Header>
      <Content className="mt-10 mx-12">
        <Card style={{ minHeight: 380, marginBottom: 24 }}>{children}</Card>
      </Content>
    </Layout>
  );
};

export default MainLayoutTop;
