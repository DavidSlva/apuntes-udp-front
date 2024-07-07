import { Card, Skeleton, Table, Tag } from 'antd';
import {
  SearchOutlined,
  FileAddOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import {
  Button,
  Divider,
  Flex,
  Radio,
  Space,
  Tooltip,
  Row,
  Col,
  Modal,
  Input,
} from 'antd';
import React, { useEffect, useState } from 'react';
import project1Image from '../images/image.png';
import { useNavigate } from 'react-router-dom';
import { useProject } from '../providers/projectProvider';
import Title from 'antd/es/typography/Title';
import { useTags } from '../providers/tagsProvider';
import AddProjectForm from '../forms/AddProjectForm';

const projects = [
  { id: 1, title: 'Proyecto 1', image: project1Image },
  { id: 2, title: 'Proyecto 2', image: project1Image },
  { id: 3, title: 'Proyecto 3', image: project1Image },
  { id: 4, title: 'Proyecto 4', image: project1Image },
  { id: 5, title: 'Proyecto 5', image: project1Image },
  { id: 6, title: 'Proyecto 6', image: project1Image },
  { id: 7, title: 'Proyecto 7', image: project1Image },
  { id: 8, title: 'Proyecto 8', image: project1Image },
  { id: 9, title: 'Proyecto 9', image: project1Image },
  { id: 10, title: 'Proyecto 10', image: project1Image },
  { id: 11, title: 'Proyecto 11', image: project1Image },
  { id: 12, title: 'Proyecto 12', image: project1Image },
  { id: 13, title: 'Proyecto 13', image: project1Image },
  { id: 14, title: 'Proyecto 14', image: project1Image },
  { id: 15, title: 'Proyecto 15', image: project1Image },
  { id: 16, title: 'Proyecto 16', image: project1Image },
  { id: 17, title: 'Proyecto 17', image: project1Image },
  { id: 18, title: 'Proyecto 18', image: project1Image },
  { id: 19, title: 'Proyecto 19', image: project1Image },
  { id: 20, title: 'Proyecto 20', image: project1Image },
  { id: 21, title: 'Proyecto 21', image: project1Image },
  { id: 22, title: 'Proyecto 22', image: project1Image },
  { id: 23, title: 'Proyecto 23', image: project1Image },
  { id: 24, title: 'Proyecto 24', image: project1Image },
  { id: 25, title: 'Proyecto 25', image: project1Image },
  { id: 26, title: 'Proyecto 26', image: project1Image },
  { id: 27, title: 'Proyecto 27', image: project1Image },
];

const Proyectos = () => {
  const [position, setPosition] = useState('end');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { getProjects, hasCalled, isLoading, error, data, addProject } =
    useProject();
  const {
    getTags,
    hasCalled: hasCalledTags,
    isLoading: isLoadingTags,
    error: errorTags,
    data: dataTags,
  } = useTags();
  useEffect(() => {
    if (!hasCalled) getProjects();
  }, [hasCalled]);

  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const navigate = useNavigate(); // Initialize useNavigate
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
            ></Button>
          </Col>
        </Row>
      </div>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button
            shape="round"
            type="primary"
            icon={<FileAddOutlined />}
            iconPosition={position}
            onClick={showModal}
            style={{ width: '300px', height: '40px', fontSize: '18px' }} // Ajusta el ancho según sea necesario
          >
            Crear un Nuevo Proyecto
          </Button>
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
          {data?.map((project) => (
            <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
              <Card
                onClick={() => navigate(`/Proyectos/${project.id}/Proyecto`)}
                hoverable
                className="!h-full"
                cover={
                  <img
                    alt={project.title}
                    src={project.image}
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
                  description={project?.project_tags.map((projectTag) => (
                    <Tag key={projectTag.id} color="blue">
                      {projectTag?.tag?.name}
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
