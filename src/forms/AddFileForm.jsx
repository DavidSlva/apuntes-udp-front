import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification, Upload } from 'antd';
import React from 'react';
import { API_URL } from '../config';

const AddFileForm = ({ onSubmit, initialValues }) => {
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  const onFinish = async (values) => {
    const { file } = values;
    const { id } = file[0].response;
    const response = await onSubmit({
      ...values,
      file: id,
    });
    if (response.error) {
      api.error({
        message: 'Error al almacenar el archivo del proyecto',
      });
    } else {
      form.resetFields();
    }
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={initialValues}
    >
      {contextHolder}

      <Form.Item name="project" hidden>
        <Input />
      </Form.Item>
      <Form.Item
        label="Título"
        name="title"
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese el título del archivo.',
          },
        ]}
      >
        <Input placeholder="Título del archivo" />
      </Form.Item>
      <Form.Item
        name="description"
        label="Descripción"
        rules={[
          {
            required: true,
            message: 'Por favor, ingrese la descripción del archivo.',
          },
        ]}
      >
        <Input placeholder="Título del archivo" />
      </Form.Item>
      <Form.Item
        rules={[{ required: true, message: 'Por favor, agregue un archivo.' }]}
        label="Subir"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        name="file"
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
          Guardar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddFileForm;
