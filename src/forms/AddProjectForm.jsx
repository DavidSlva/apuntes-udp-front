import { Button, Form, Input, notification, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { API_URL } from '../config';
import { PlusOutlined } from '@ant-design/icons';

const AddProjectForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const { portrait_file } = values;
    const { id } = portrait_file[0].response;
    const result = await onSubmit({
      ...values,
      portrait_file: id,
    });
    if (result.error) {
      api.error({
        message: 'Error al crear el proyecto',
      });
    } else {
      console.log('Creado el proyecto');
      form.resetFields();
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
      <Form.Item
        rules={[{ required: true, message: 'Por favor, agregue un archivo.' }]}
        label="Portada"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        name="portrait_file"
      >
        <Upload
          action={`${API_URL}/files-upload/`}
          listType="picture-card"
          maxCount={1}
        >
          <button
            style={{
              border: 0,
              background: 'none',
            }}
            type="button"
          >
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Subir
            </div>
          </button>
        </Upload>
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
