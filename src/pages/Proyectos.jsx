import React, { useEffect, useState } from 'react';
import { Card, Skeleton, Tag, Input, Space } from 'antd';
import { SearchOutlined, FileAddOutlined } from '@ant-design/icons';
import { Button, Row, Col, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../providers/projectProvider';
import Title from 'antd/es/typography/Title';
import { useTags } from '../providers/tagsProvider';
import AddProjectForm from '../forms/AddProjectForm';
import { MEDIA_URL } from '../config';

const { Search } = Input;

const Proyectos = () => {
  const [position, setPosition] = useState('end');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { getProjects, hasCalled, isLoading, error, data, addProject } =
    useProject();
  const {
    getTags,
    hasCalled: hasCalledTags,
    isLoading: isLoadingTags,
    error: errorTags,
    data: tags,
  } = useTags();

  useEffect(() => {
    getTags();
  }, [getTags]);

  useEffect(() => {
    if (!hasCalled) getProjects();
  }, [hasCalled, getProjects]);

  const getTagNameById = (id) => {
    const tag = tags?.find((tag) => tag.id === id);
    return tag ? tag.name : 'Unknown Tag';
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const navigate = useNavigate();

  const submitProject = async (values) => {
    try {
      const result = await addProject(values);
      if (result.error) return result;
      else {
        getProjects();
        setIsModalVisible(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      return { error };
    }
  };

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const filteredData = data?.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm) ||
      project.project_tags.some((tag) =>
        getTagNameById(tag.tag.id).toLowerCase().includes(searchTerm)
      )
  );

  return (
    <div>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <Row justify="center" gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6} style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              style={{ width: '80px', height: '40px' }}
              icon={<SearchOutlined style={{ fontSize: '30px' }} />}
              iconPosition={position}
              shape="round"
              onClick={console.log('CLIICK-CLICK')}
            ></Button>
          </Col>
        </Row>
      </div>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={12} style={{ textAlign: 'center' }}>
          <Space>
            <Search
              placeholder="Buscar proyectos"
              enterButton
              onSearch={handleSearch}
              style={{ width: '300px' }}
            />
            <Button
              shape="round"
              type="primary"
              icon={<FileAddOutlined />}
              iconPosition={position}
              onClick={showModal}
              style={{ width: '300px', height: '40px', fontSize: '18px' }}
            >
              Crear un Nuevo Proyecto
            </Button>
          </Space>
        </Col>
      </Row>
      <Modal
        style={{ marginTop: '200px' }}
        visible={isModalVisible}
        footer={null}
        title="Crear un nuevo proyecto"
        onCancel={handleCancel}
      >
        <AddProjectForm onSubmit={submitProject} />
      </Modal>

      <Skeleton avatar paragraph={{ rows: 4 }} loading={isLoading}>
        <Row justify="center" gutter={[16, 16]} style={{ marginTop: '20px' }}>
          {filteredData?.map((project) => (
            <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
              <Card
                onClick={() => navigate(`/Proyectos/${project.id}/Proyecto`)}
                hoverable
                className="!h-full"
                cover={
                  <img
                    alt={project.title}
                    src={`${MEDIA_URL}/${project?.portrait_file?.route}`}
                    style={{
                      backgroundColor: '#f5f5f5',
                      height: '400px',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                  />
                }
              >
                <Card.Meta
                  title={
                    <Title level={3} className="!m-0 pb-4">
                      {project.name}
                    </Title>
                  }
                  description={project?.project_tags?.map((projectTag) => (
                    <Tag key={projectTag.id} color="blue">
                      {getTagNameById(projectTag.tag.id)}
                    </Tag>
                  ))}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Skeleton>
    </div>
  );
};

export default Proyectos;
