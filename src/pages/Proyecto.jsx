import React, { useState } from 'react';
import { Avatar, Card, Modal, Tag, Typography } from 'antd';
import ScrollableContainer from '../components/ScrollableList';
import { PlusCircleOutlined } from '@ant-design/icons';
import UploadFile from '../components/UploadFile';
const { Title } = Typography;

const placeholderUserImage =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png';
const placeholderFileImage =
  'https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png';
const placeholderProyectImage =
  'https://static.dezeen.com/uploads/2022/07/sq-university-of-oregon-schoolshows_dezeen_2364_col_0.jpg';

const Proyecto = () => {
  const archivos = [
    { name: 'Archivo 1', fileSize: '2 MB' },
    { name: 'Archivo 2', fileSize: '1.5 MB' },
    { name: 'Archivo 3', fileSize: '3.2 MB' },
    { name: 'Archivo 4', fileSize: '700 KB' },
  ];
  const miembros = ['Miembro 1', 'Miembro 2', 'Miembro 3', 'Miembro 4'];
  const referentes = [
    'Referente 1',
    'Referente 2',
    'Referente 3',
    'Referente 4',
  ];
  const tags = ['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5', 'Tag 2'];

  const renderArchivo = (archivo, index) => (
    <div
      key={index}
      className="flex items-center bg-gray-200 p-2 mb-2 rounded-lg cursor-pointer"
      onClick={() => alert(`Downloading ${archivo.name}`)} // Add your download logic here
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
      <div>
        <p style={{ fontSize: '14px', margin: 0 }}>{archivo.name}</p>
        <p style={{ fontSize: '12px', color: 'gray', margin: 0 }}>
          {archivo.fileSize}
        </p>
      </div>
    </div>
  );

  const renderMiembro = (miembro, index) => (
    <div key={index} className="flex flex-col items-center ">
      <Avatar size={64} className="bg-gray-300" src={placeholderUserImage} />
      <p>{miembro}</p>
    </div>
  );

  const renderReferente = (referente, index) => (
    <Card
      key={index}
      className="min-w-[120px] min-h-[120px] flex-shrink-0 bg-gray-300"
    >
      {/* {referente} */}
    </Card>
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const renderTag = (tag, index) => (
    <Tag key={index} color="blue">
      {tag}
    </Tag>
  );

  return (
    <>
      <Modal open={isModalVisible} onCancel={handleModal} width={'80%'}>
        <UploadFile />
      </Modal>
      <div className="p-8">
        <div className="flex flex-col lg:flex-row justify-around mb-8">
          <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0 w-full lg:w-auto">
            <Title level={3} className="text-center lg:text-left">
              Nombre Proyecto
            </Title>
            <p className="text-center lg:text-left">16/06/2024</p>
            <Title level={4} className="mb-2 text-center lg:text-left">
              Imagen Opcional
            </Title>
            <div className="w-full lg:w-[500px] h-[500px]">
              <img
                src={placeholderProyectImage}
                alt="Imagen del proyecto"
                className="w-full h-full bg-gray-300 rounded-lg"
              />
              <ScrollableContainer
                items={tags}
                renderItem={renderTag}
                maxVisibleItems={5}
              />
            </div>
          </div>
          <div className="flex flex-col items-start w-full lg:w-auto">
            <div className="flex flex-row justify-start text-center mb-2">
              <Title level={4} className="text-center lg:text-left mt-3">
                Archivos
              </Title>
              <PlusCircleOutlined
                className="ml-2"
                size={20}
                onClick={handleModal}
              />
            </div>
            <div className="w-full">
              {archivos.map((archivo, index) => renderArchivo(archivo, index))}
            </div>
            <Title level={4} className="mt-8 text-center lg:text-left">
              Miembros
            </Title>
            <ScrollableContainer
              items={miembros}
              renderItem={renderMiembro}
              maxVisibleItems={4}
            />
            <Title level={4} className="mt-8 text-center lg:text-left">
              Referentes
            </Title>
            <ScrollableContainer
              items={referentes}
              renderItem={renderReferente}
              maxVisibleItems={3}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Proyecto;
