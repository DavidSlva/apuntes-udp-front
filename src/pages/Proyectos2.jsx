import { Card, Table } from 'antd';
import { SearchOutlined, FileAddOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Radio, Space, Tooltip, Row, Col } from 'antd';
import React, { useState } from 'react';
import project1Image from '../images/image.png';


const projects = [
    { id: 1, title: 'Proyecto 1', image: project1Image },
    { id: 2, title: 'Proyecto 2', image: project1Image },
    { id: 3, title: 'Proyecto 3', image: project1Image },
    { id: 4, title: 'Proyecto 4', image: project1Image },
    { id: 5, title: 'Proyecto 5', image: project1Image },
    { id: 6, title: 'Proyecto 6', image: project1Image },
    { id: 7, title: 'Proyecto 7', image: project1Image },
    { id: 8, title: 'Proyecto 8', image: project1Image },
    { id: 9, title: 'Proyecto 9', image: project1Image },
    { id: 10, title: 'Proyecto 10', image: project1Image },
    { id: 11, title: 'Proyecto 11', image: project1Image },
    { id: 12, title: 'Proyecto 12', image: project1Image },
    { id: 13, title: 'Proyecto 13', image: project1Image },
    { id: 14, title: 'Proyecto 14', image: project1Image },
    { id: 15, title: 'Proyecto 15', image: project1Image },
    { id: 16, title: 'Proyecto 16', image: project1Image },
    { id: 17, title: 'Proyecto 17', image: project1Image },
    { id: 18, title: 'Proyecto 18', image: project1Image },
    { id: 19, title: 'Proyecto 19', image: project1Image },
    { id: 20, title: 'Proyecto 20', image: project1Image },
    { id: 21, title: 'Proyecto 21', image: project1Image },
    { id: 22, title: 'Proyecto 22', image: project1Image },
    { id: 23, title: 'Proyecto 23', image: project1Image },
    { id: 24, title: 'Proyecto 24', image: project1Image },
    { id: 25, title: 'Proyecto 25', image: project1Image },
    { id: 26, title: 'Proyecto 26', image: project1Image },
    { id: 27, title: 'Proyecto 27', image: project1Image },
  ];
  

const Proyectos = () => {
    const [position, setPosition] = useState('end');
  return (
    
    <div>
    <Row justify="center">
  <Col span={2} style={{ textAlign: 'center' }}>
    <div style={{ width: '100%', marginBottom: '20px' }}>
      <Button type="primary" style={{ width: '80px', height: '40px' }} icon={<SearchOutlined style={{ fontSize: '30px' }} />} iconPosition={position} shape="round"></Button>
    </div>
  </Col>
  <Col span={2} style={{ textAlign: 'center' }}>
    <div style={{ width: '100%', marginBottom: '20px' }}>
      <Button disabled style={{ border: '1px solid #d9d9d9', backgroundColor: '#f5f5f5', color: '#999', cursor: 'not-allowed', height: '40px', fontSize: '18px' }} shape="round">#Arquitectura</Button>
    </div>
  </Col>
  <Col span={3} style={{ textAlign: 'center' }}>
    <div style={{ width: '100%', marginBottom: '20px' }}>
      <Button disabled style={{ border: '1px solid #d9d9d9', backgroundColor: '#f5f5f5', color: '#999', cursor: 'not-allowed', height: '40px', fontSize: '18px' }} shape="round">#Infraestructura</Button>
    </div>
  </Col>
</Row>
<Col span={35} style={{ textAlign: 'center' }}>
    
    <Button
    shape="round"
    
    type="primary"
    icon={<FileAddOutlined />}
    iconPosition={position}
    style={{ width: '300px' , height: '40px', fontSize: '18px'}} // Ajusta el ancho según sea necesario
    >
    Crear un Nuevo Proyecto
    </Button>
    </Col> 
      
    <div>
      
      <Row gutter={[16, 16]} style={{marginTop: '18px'}}>
        {projects.map(project => (
          <Col span={8} key={project.id}>
            <Card
              
              hoverable
              cover={<img alt={project.title} src={project.image} style={{ backgroundColor:'#f5f5f5',  height: '400px', objectFit: 'cover', width: '100%' }} />}
              
            >
                
              <Button disabled style={{ border: '1px solid #d9d9d9', backgroundColor: '#f5f5f5', color: '#999', cursor: 'not-allowed', height: '20px', fontSize: '18px', padding: '15px 10px' }} shape="round">#Arquitectura</Button>
              <Button disabled style={{ border: '1px solid #d9d9d9', backgroundColor: '#f5f5f5', color: '#999', cursor: 'not-allowed', height: '20px', fontSize: '18px' ,marginLeft: '10px', padding: '15px 10px'}} shape="round">#Infraestructura</Button>
              <Card.Meta title={<div style={{ fontSize:'150%', marginTop: '10px' }}>{project.title}</div>} />
            </Card>
          </Col>
        ))}
      </Row>
    </div>  
    </div>
  );
};

export default Proyectos;