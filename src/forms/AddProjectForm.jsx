import { Button, Form, Input, notification } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

const AddProjectForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const result = await onSubmit(values);
    if (result.error) {
      console.log('entramos?');
      api.error({
        message: 'Error al crear el proyecto',
      });
    } else {
      console.log('Creado el proyecto');
      form.resetFields();
    }
  };
  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      {contextHolder}
      <Form.Item
        label="Nombre del proyecto"
        name="name"
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese el nombre del proyecto.',
          },
        ]}
      >
        <Input placeholder="Ingresar nombre del proyecto" />
      </Form.Item>

      <Form.Item
        label="Descripción"
        name="description"
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese la descripción del proyecto.',
          },
        ]}
      >
        <TextArea placeholder="Ingresar descripción del proyecto" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Crear Proyecto
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddProjectForm;
