import React from 'react';
import { Avatar, Row, Col } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';

const UserCard = ({ name, isInvite }) => (
  <Col style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <div style={{ textAlign: 'center', margin: '15px' }}>
      {isInvite ? (
        <Avatar size={400} icon={<UserAddOutlined style={{ fontSize: '100px', color: '#b22222' }} />} style={{ backgroundColor: '#f0f0f0' }} />
      ) : (
        <Avatar size={400} style={{ backgroundColor: '#d9d9d9' }} />
      )}
      <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>{name}</div>
    </div>
  </Col>
);

const Miembros = () => (
  <div style={{ padding: '50px 20px', backgroundColor: '#fafafa' }}>
    <Row justify="space-around" align="middle">
      <UserCard name="Nombre usuario" isInvite={false} />
      <UserCard name="Nombre usuario" isInvite={false} />
      <UserCard name="Invitar Usuario" isInvite={true} />
    </Row>
  </div>
);

export default Miembros;
