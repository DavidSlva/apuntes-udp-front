import React from 'react';
import { Form, Input, Button } from 'antd';

const AddReferenceForm = ({ onSubmit, initialValues }) => {
  return (
    <Form
      layout="vertical"
      onFinish={onSubmit}
      initialValues={initialValues}
    >
      <Form.Item
        name="titulo"
        label="titulo"
        rules={[{ required: true, message: 'Por favor, ingrese el titulo' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción"
        rules={[{ required: true, message: 'Por favor, ingrese la descripción' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="autor"
        label="Autor"
        rules={[{ required: true, message: 'Por favor, ingrese el autor' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Agregar Referencia
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddReferenceForm;
