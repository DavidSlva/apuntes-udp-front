// src/pages/ProjectDetails.jsx
import React from 'react';
import { Avatar, Card, Layout, Typography } from 'antd';
const { Title } = Typography;

const ProjectDetails = () => {
  return (
    <Layout className="p-8">
      <div className="flex flex-col items-center mb-8">
        <Title level={3}>Nombre Proyecto</Title>
        <p>00/00/00</p>
      </div>
      <div className="flex flex-row justify-around mb-8">
        <div className="flex flex-col items-center">
          <Card style={{ width: 500, height: 500 }}>Imagen Opcional</Card>
        </div>
        <div className="flex flex-col items-center">
          <Title level={4}>Archivos</Title>
          <div className="grid grid-cols-3 gap-8 mt-4">
            <Card style={{ width: 120, height: 120 }}>Archivo 1</Card>
            <Card style={{ width: 120, height: 120 }}>Archivo 2</Card>
            <Card style={{ width: 120, height: 120 }}>Archivo 3</Card>
          </div>
          <Title level={4} className="mt-8">
            Miembros
          </Title>
          <div className="flex justify-center space-x-8 mt-4">
            <Avatar size={64} />
            <Avatar size={64} />
            <Avatar size={64} />
            <Avatar size={64} />
          </div>
          <div className="flex justify-between space-x-8 mt-4">
            <p>Nombre</p>
            <p>Nombre</p>
            <p>Nombre</p>
            <p>Nombre</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProjectDetails;
