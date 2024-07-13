import { Button, Form, Input, notification, Upload, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../config';
import { PlusOutlined } from '@ant-design/icons';
import { useTags } from '../providers/tagsProvider';
import { useProject } from '../providers/projectProvider';

const AddProjectForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const { addProjectTag, deleteProjectTag } = useProject();
  const [api, contextHolder] = notification.useNotification();
  const {
    getTags,
    data: tags,
    isLoading: isLoadingTags,
    error: errorTags,
  } = useTags();
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    getTags();
  }, [getTags]);

  const handleTagsChange = (selectedTags) => {
    setSelectedTags(selectedTags);
  };

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
      // Handle adding tags
      for (const tagId of selectedTags) {
        await addProjectTag({ project: result.id, tag: tagId });
      }

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

      <Form.Item label="Tags" name="project_tags">
        <Select
          mode="multiple"
          allowClear
          style={{ width: '100%' }}
          placeholder="Seleccione tags"
          options={
            tags ? tags.map((tag) => ({ label: tag.name, value: tag.id })) : []
          }
          loading={isLoadingTags}
          onChange={handleTagsChange}
        />
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
