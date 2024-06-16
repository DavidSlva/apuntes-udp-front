import { Avatar, Button, Card, Layout, Menu, Space } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import Title from 'antd/es/typography/Title';
import React from 'react';
import MenuSider from './components/MenuSider';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  // Obtener el nombre de la ruta actual
  const location = useLocation();
  const pageName = location.pathname.split('/')?.pop();
  console.log(pageName);
  return (
    <Layout className="min-h-screen">
      <Header className="fixed shadow-md z-50 w-full h-16 px-1 md:px-5">
        <div className="relative w-full flex justify-between align-middle">
          <div
            className=" text-right cursor-pointer"
            // onClick={openProfile}
          >
            <Space>
              <p className="capitalize text-gray-500 my-0 inline-block text-sm">
                {' '}
                {'PEPITO'}
              </p>
              <Avatar />
            </Space>
          </div>

          <Title level={2} className="!mt-0 !mb-0">
            {pageName || 'APP'}
          </Title>
          <div className="mr-10">Publico</div>
          {/* <Logo simple /> */}
        </div>
      </Header>
      <Sider
        collapsible
        defaultCollapsed
        className={`!fixed scroll h-full z-50 mt-16 transition-all duration-300   shadow-md md:translate-x-0 md:transform-none opacity-100`}
      >
        <MenuSider />
      </Sider>
      <Layout className="mt-16 md:ml-20 px-2 md:px-5 py-3">
        <Content>{children}</Content>
        <Card className="mt-2">
          <div className=" flex flex-row justify-center align-bottom items-center">
            <Space direction="horizontal">
              <Space direction="vertical">
                <p>Universidad Diego Portales</p>
              </Space>
            </Space>
            <p className="font-subtitle">Versión: 0.1</p>
          </div>
        </Card>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
