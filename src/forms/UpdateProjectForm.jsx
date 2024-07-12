import { Button, Form, Input, notification, Upload } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect } from 'react';
import { API_URL, MEDIA_URL } from '../config';
import { PlusOutlined } from '@ant-design/icons';
const UpdateProjectForm = ({ project, onSubmit }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    form.setFieldsValue({
      name: project.name,
      description: project.description,
      portrait_file: project.portrait_file
        ? [
            {
              uid: '-1',
              name: 'portrait.png',
              status: 'done',
              url: `${MEDIA_URL}/${project.portrait_file.route}`,
            },
          ]
        : [],
    });
  }, [project]);

  const onFinish = async (values) => {
    const { portrait_file } = values;
    const portrait_file_id =
      portrait_file && portrait_file.length
        ? portrait_file[0].response?.id || project.portrait_file.id
        : null;
    const result = await onSubmit({
      ...values,
      portrait_file: portrait_file_id,
    });
    if (result.error) {
      api.error({
        message: 'Error al actualizar el proyecto',
      });
    } else {
      console.log('Proyecto actualizado');
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
          Actualizar Proyecto
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UpdateProjectForm;
