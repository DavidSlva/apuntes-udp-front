// src/layouts/MainLayout.jsx
import { Avatar, Layout, Menu, Space, Typography } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import React from 'react';
import MenuSider from './components/MenuSider';

const { Title } = Typography;

const MainLayout = ({ children }) => {
  return (
    <Layout className="min-h-screen">
      <Header className="fixed shadow-md z-50 w-full h-16 px-1 md:px-5 bg-white">
        <div className="relative w-full flex justify-between align-middle">
          <div className="text-right cursor-pointer">
            <Space>
              <p className="capitalize text-gray-500 my-0 inline-block text-sm">
                Alumno
              </p>
              <Avatar />
            </Space>
          </div>
          <Title level={2} className="!mt-0 !mb-0">
            Proyectos
          </Title>
          <div className="mr-10">Publico</div>
        </div>
        <Menu mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <a href="/">Inicio</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="/proyecto">Proyectos</a>
          </Menu.Item>
          <Menu.Item key="3">
            <a href="/usuarios">Perfil</a>
          </Menu.Item>
        </Menu>
      </Header>
      <Sider
        collapsible
        defaultCollapsed
        className="!fixed scroll h-full z-50 mt-16 transition-all duration-300 shadow-md md:translate-x-0 md:transform-none opacity-100"
      >
        <MenuSider />
      </Sider>
      <Layout className="mt-32 md:ml-20 px-2 md:px-5 py-3">
        {' '}
        {/* Adjust the top margin */}
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
