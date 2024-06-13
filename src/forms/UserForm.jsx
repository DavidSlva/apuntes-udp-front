import { Form, Input } from 'antd';
import React from 'react';

const UserForm = () => {
  return (
    <Form>
      <Form.Item label="Nombre del proyecto" name="proyect_name">
        <Input placeholder="Ingresar nombre del proyecto" />
      </Form.Item>
      <Form.Item label="Título" name="proyect_name">
        <Input placeholder="Ingresar nombre del proyecto" />
      </Form.Item>
      <Form.Item label="Nombre del proyecto" name="proyect_name">
        <Input placeholder="Ingresar nombre del proyecto" />
      </Form.Item>
    </Form>
  );
};

export default UserForm;
