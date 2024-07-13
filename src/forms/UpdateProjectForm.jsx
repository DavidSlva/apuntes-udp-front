import { Button, Form, Input, notification, Upload, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import { API_URL, MEDIA_URL } from '../config';
import { PlusOutlined } from '@ant-design/icons';
import { useTags } from '../providers/tagsProvider';
import { useProject } from '../providers/projectProvider';

const UpdateProjectForm = ({ project, onSubmit }) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { getTags, data: tags } = useTags();
  const { addProjectTag, deleteProjectTag } = useProject();
  const [initialTags, setInitialTags] = useState([]);
  const [currentTags, setCurrentTags] = useState([]);

  useEffect(() => {
    getTags();
    if (project && project.project_tags) {
      const initialTagIds = project.project_tags.map((tag) => tag.tag.id);
      setInitialTags(initialTagIds);
      setCurrentTags(initialTagIds);
    }
  }, [project, getTags]);

  useEffect(() => {
    if (project) {
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
        project_tags: initialTags,
      });
    }
  }, [project, initialTags, form]);

  const handleTagsChange = (selectedTags) => {
    setCurrentTags(selectedTags);
  };

  const onFinish = async (values) => {
    const { portrait_file, project_tags } = values;
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
      // Handle adding and removing tags
      const addedTags = currentTags.filter((tag) => !initialTags.includes(tag));
      const removedTags = initialTags.filter(
        (tag) => !currentTags.includes(tag)
      );

      for (const tagId of addedTags) {
        await addProjectTag({ project: project.id, tag: tagId });
      }
      for (const tagId of removedTags) {
        const projectTag = project.project_tags.find(
          (pt) => pt.tag.id === tagId
        );
        if (projectTag) {
          await deleteProjectTag(projectTag.id);
        }
      }

      console.log('Proyecto actualizado');
      form.resetFields();
      // Refresh the initialTags and currentTags after updating
      setInitialTags(currentTags);
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
          onChange={handleTagsChange}
        />
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
