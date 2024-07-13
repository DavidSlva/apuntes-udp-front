// Proyecto.js
import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Card,
  Divider,
  Modal,
  Tag,
  Typography,
  Button,
  Input,
  message,
  Popconfirm,
} from 'antd';
import {
  PlusCircleOutlined,
  DownloadOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import ScrollableContainer from '../components/ScrollableList';
import UploadFile from '../components/UploadFile';
import { useProject } from '../providers/projectProvider';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { API_URL, MEDIA_URL } from '../config';
import Comments from '../components/Comments';
import AddFileForm from '../forms/AddFileForm';
import { useProjectMember } from '../providers/projectMemberProvider';
import { useAuth } from '../providers/authProvider';
import UpdateProjectForm from '../forms/UpdateProjectForm';
import './style.css';
const { Title } = Typography;

const placeholderUserImage =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png';
const placeholderFileImage =
  'https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png';
const placeholderProyectImage =
  'https://static.dezeen.com/uploads/2022/07/sq-university-of-oregon-schoolshows_dezeen_2364_col_0.jpg';

const Proyecto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddMemberModalVisible, setIsAddMemberModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);

  const {
    getProject,
    project,
    isLoadingProject,
    errorProject,
    addFileProject,
    updateProject,
    deleteProject,
  } = useProject();
  const {
    members,
    loading,
    error,
    fetchMembers,
    addMember,
    userDetails,
    removeMember,
    fetchUserById,
  } = useProjectMember();
  const { currentUser, fetchUserData } = useAuth();

  useEffect(() => {
    if (project && project.owner) {
      fetchUserById(project.owner);
      fetchMembers(id, project.owner);
    }
  }, [project, fetchUserById, fetchMembers, id]);

  useEffect(() => {
    if (id) {
      getProject(id);
    } else {
      navigate('/not-found');
    }
  }, [id]);

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleDownload = (fileRoute) => {
    const link = document.createElement('a');
    link.href = `${MEDIA_URL}/${fileRoute}`;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const showUpdateModal = () => {
    setIsUpdateModalVisible(true);
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
  };

  const submitUpdateProject = async (values) => {
    try {
      const result = await updateProject(id, values);
      if (result.error) return result;
      else {
        getProject(id);
        setIsUpdateModalVisible(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      return { error };
    }
  };

  const confirmDelete = async () => {
    try {
      const result = await deleteProject(id);
      if (!result.error) {
        message.success('Proyecto eliminado con éxito');
        navigate('/Proyectos');
      } else {
        message.error('Error al eliminar el proyecto: ' + result.error);
      }
    } catch (error) {
      message.error('Error al procesar la solicitud: ' + error.message);
    }
  };

  const renderArchivo = (archivo, index) => (
    <div
      key={index}
      className="flex items-center bg-gray-200 p-2 mb-2 rounded-lg w-full"
    >
      <img
        src={placeholderFileImage}
        alt="Archivo adjunto"
        draggable="false"
        style={{
          width: '40px',
          height: '40px',
          objectFit: 'cover',
          borderRadius: '8px',
          userSelect: 'none',
          pointerEvents: 'none',
          marginRight: '10px',
        }}
      />
      <div style={{ flexGrow: 1 }}>
        <p style={{ fontSize: '14px', margin: 0 }}>{archivo.title}</p>
        <p style={{ fontSize: '12px', color: 'gray', margin: 0 }}>
          {archivo.fileSize}
        </p>
      </div>
      <Button
        type="text"
        icon={<DownloadOutlined />}
        onClick={() => handleDownload(archivo.file.route)}
      />
    </div>
  );

  const renderMiembro = (member, index) => {
    const user = userDetails[member.user];
    const isOwner = member.isOwner || project.owner === member.user;
    const canRemove =
      (project.owner === currentUser.id && member.user !== currentUser.id) ||
      (member.user === currentUser.id && member.user !== project.owner);

    return (
      <div key={index} className={`member-container ${isOwner ? 'owner' : ''}`}>
        <Avatar
          size={64}
          src={user && user.avatarUrl ? user.avatarUrl : placeholderUserImage}
          className="avatar"
        />
        <div className="member-info">
          <p>{user ? `${user.name} ${user.lastname}` : 'Cargando...'}</p>
          <p>{user ? user.email : 'Cargando...'}</p>
          {canRemove && (
            <Button
              className="member-delete"
              danger
              onClick={() => removeMember(member.id)}
            >
              Eliminar
            </Button>
          )}
          <p className="owner-tag">Dueño</p>
        </div>
      </div>
    );
  };

  const renderReferente = (referente, index) => (
    <Card
      key={index}
      className="min-w-[120px] min-h-[120px] flex-shrink-0 bg-gray-300"
    >
      {/* {referente} */}
    </Card>
  );

  const renderTag = (project_tag, index) => (
    <Tag key={index} color="blue">
      {project_tag?.tag?.name}
    </Tag>
  );

  if (isLoadingProject) {
    return <p>Cargando...</p>;
  }

  if (errorProject) {
    return <p>Error loading data: {errorProject?.message}</p>;
  }

  if (!project) {
    return <p>Project not found</p>;
  }

  const { archivos = [], miembros = [], referentes = [], tags = [] } = project;
  const addFile = async (values) => {
    try {
      const result = await addFileProject(values);
      if (result.error) return result;
      else {
        getProject(id);
        setIsModalVisible(false);
      }
      return result;
    } catch (error) {
      console.log(error);
      return { error };
    }
  };

  const handleAddUser = async (userId) => {
    if (
      members.some(
        (member) => member.user === userId || project.owner === userId
      )
    ) {
      message.error('El usuario ya es miembro o el dueño del proyecto.');
      return;
    }
    try {
      const response = await addMember(id, userId);
      if (!response.error) {
        message.success('Miembro agregado con éxito');
        getProject(id);
        fetchMembers(id, project.owner);
      } else {
        message.error('Error al agregar miembro: ' + response.error);
      }
    } catch (error) {
      message.error('Error al procesar la solicitud: ' + error.message);
    } finally {
      setIsAddMemberModalVisible(false);
    }
  };

  return (
    <>
      <Modal open={isModalVisible} onCancel={handleModal} footer={null}>
        <AddFileForm onSubmit={addFile} initialValues={{ project: id }} />
      </Modal>
      <div className="p-8">
        <div className="flex flex-col lg:flex-row justify-around mb-8 md:space-x-20">
          <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0 w-full lg:w-auto">
            {project.owner === currentUser.id && (
              <div
                style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}
              >
                <Button type="primary" onClick={showUpdateModal}>
                  Editar Proyecto
                </Button>
                <Popconfirm
                  title="¿Estás seguro de eliminar este proyecto?"
                  onConfirm={confirmDelete}
                  okText="Sí"
                  cancelText="No"
                  icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                >
                  <Button
                    type="primary"
                    danger
                    style={{
                      backgroundColor: '#CC3C38',
                      borderColor: '#CC3C38',
                      color: 'white',
                    }}
                  >
                    Eliminar Proyecto
                  </Button>
                </Popconfirm>
              </div>
            )}

            <Title level={3} className="text-center lg:text-left uppercase">
              {project.name || 'Nombre Proyecto'}
            </Title>
            <p className="text-center lg:text-left">
              {moment(project.created_at).format('DD/MM/YYYY')}
            </p>
            <p className="text-center lg:text-left">
              {project.description || 'Descripción del proyecto'}
            </p>
            <Title level={4} className="mb-2 text-center lg:text-left">
              Imagen
            </Title>
            <div className="w-full lg:w-[500px] h-[500px]">
              <img
                src={
                  `${MEDIA_URL}/${project.portrait_file?.route}` ||
                  placeholderProyectImage
                }
                alt="Imagen del proyecto"
                className="w-full h-full bg-gray-300 rounded-lg"
              />
              <ScrollableContainer
                items={project?.project_tags}
                renderItem={renderTag}
                maxVisibleItems={5}
              />
            </div>
          </div>
          <div className="flex flex-col items-start !w-full lg:w-auto">
            <div className="flex flex-row justify-start text-center mb-2">
              <Title level={4} className="text-center lg:text-left mt-3">
                Archivos
              </Title>
              <PlusCircleOutlined
                className="ml-2 mt-2"
                size={40}
                onClick={handleModal}
              />
            </div>
            <div className="w-full">
              {project?.project_files?.map((archivo, index) =>
                renderArchivo(archivo, index)
              )}
            </div>
            <Title level={4} className="mt-8 text-center lg:text-left">
              Miembros
            </Title>
            <ScrollableContainer
              items={members}
              renderItem={renderMiembro}
              maxVisibleItems={4}
            />
            {project.owner === currentUser.id && (
              <Button
                type="primary"
                icon={<PlusCircleOutlined />}
                onClick={() => setIsAddMemberModalVisible(true)}
                style={{ marginBottom: '16px', marginLeft: '10px' }}
              >
                Agregar Miembro
              </Button>
            )}
            <Title level={4} className="mt-8 text-center lg:text-left">
              Referentes
            </Title>
            <ScrollableContainer
              items={referentes}
              renderItem={renderReferente}
              maxVisibleItems={3}
            />
            <Title level={4} className="mt-8 text-center lg:text-left">
              Comentarios
            </Title>
            <Comments projectId={project.id} />
          </div>
        </div>
      </div>
      <Modal
        title="Agregar Miembro al Proyecto"
        visible={isAddMemberModalVisible}
        onCancel={() => setIsAddMemberModalVisible(false)}
        footer={null}
      >
        <Input.Search
          placeholder="Ingresar correo electrónico"
          enterButton="Agregar"
          onSearch={handleAddUser}
          style={{ marginBottom: '20px' }}
        />
      </Modal>
      <Modal
        title="Editar Proyecto"
        visible={isUpdateModalVisible}
        footer={null}
        onCancel={handleUpdateCancel}
      >
        <UpdateProjectForm project={project} onSubmit={submitUpdateProject} />
      </Modal>
    </>
  );
};

export default Proyecto;
