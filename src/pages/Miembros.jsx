import React, { useState } from 'react';
import { Avatar, Row, Col, Modal, Input, Button } from 'antd';
import { UserAddOutlined, UserOutlined } from '@ant-design/icons';

const UserCard = ({ name, isInvite, onInviteClick }) => (
  <Col
    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
  >
    <div
      style={{ textAlign: 'center', margin: '15px' }}
      onClick={isInvite ? onInviteClick : null}
    >
      {isInvite ? (
        <Avatar
          className="w-full h-full p-10"
          // size={400}
          icon={
            <UserAddOutlined style={{ fontSize: '100px', color: '#b22222' }} />
          }
          style={{ backgroundColor: '#f0f0f0', cursor: 'pointer' }}
        />
      ) : (
        <Avatar
          className="w-full h-full p-10"
          style={{ backgroundColor: '#d9d9d9' }}
        >
          <UserOutlined style={{ fontSize: '100px' }} />
        </Avatar>
      )}
      <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '18px' }}>
        {name}
      </div>
    </div>
  </Col>
);

const Miembros = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    // Logica de la invitacion // agregar la wea de los mails
    setIsModalVisible(false);
  };

  return (
    <div style={{ padding: '50px 20px', backgroundColor: '#fafafa' }}>
      <Row justify="space-around" align="middle">
        <UserCard name="Nombre usuario" isInvite={false} />
        <UserCard name="Nombre usuario" isInvite={false} />
        <UserCard
          name="Invitar Usuario"
          isInvite={true}
          onInviteClick={showModal}
        />
      </Row>
      <Modal
        title="Invitar Usuario"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          placeholder="Correo de invitación"
          style={{ marginBottom: '10px' }}
        />
        <Button
          type="primary"
          block
          style={{ marginBottom: '10px' }}
          onClick={handleOk}
        >
          Enviar Invitacion
        </Button>
        <Button block>Copiar Link de Invitación</Button>
      </Modal>
    </div>
  );
};

export default Miembros;
