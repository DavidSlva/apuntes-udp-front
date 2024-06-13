import React, { useState } from 'react';
import { Avatar, Card, Modal, Tag, Typography } from 'antd';
import ScrollableContainer from '../components/ScrollableList';
import { PlusCircleOutlined } from '@ant-design/icons';
import UploadFile from '../components/UploadFile';
const { Title } = Typography;

const Proyecto = () => {
  const archivos = ['Archivo 1', 'Archivo 2', 'Archivo 3', 'Archivo 4'];
  const miembros = ['Miembro 1', 'Miembro 2', 'Miembro 3', 'Miembro 4'];
  const referentes = [
    'Referente 1',
    'Referente 2',
    'Referente 3',
    'Referente 4',
  ];
  const tags = [
    'Tag 1',
    'Tag 2',
    'Tag 3',
    'Tag 4',
    'Tag 5',
    'Tag 2',
    'Tag 3',
    'Tag 4',
    'Tag 5',
    'Tag 2',
    'Tag 3',
    'Tag 4',
    'Tag 5',
  ];
  const imageUrl = null;

  const renderArchivo = (archivo, index) => (
    <Card
      key={index}
      className="min-w-[120px] min-h-[120px] flex-shrink-0 bg-gray-300"
    >
      {/* {archivo} */}
    </Card>
  );

  const renderMiembro = (miembro, index) => (
    <div key={index} className="flex flex-col items-center ">
      <Avatar size={64} className="bg-gray-300" />
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
      {/* <div className="w-full bg-black h-10"></div> */}
      <Modal open={isModalVisible} onCancel={handleModal} width={'80%'}>
        <UploadFile />
      </Modal>
      <Card className="p-8">
        <div className="flex flex-col lg:flex-row justify-around mb-8">
          <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0 ">
            <Title level={3} className="text-center lg:text-left">
              Nombre Proyecto
            </Title>
            <p className="text-center lg:text-left">00/00/00</p>
            <Title level={4} className="mb-2 text-center lg:text-left">
              Imagen Opcional
            </Title>
            <div className="lg:w-[500px] h-[500px]">
              {imageUrl ? (
                <img
                  src="path-to-image.jpg"
                  alt="Imagen del proyecto"
                  className="w-full h-full  bg-gray-300 rounded-lg"
                />
              ) : (
                <Card className="w-full h-full bg-gray-300 rounded-lg"></Card>
              )}
              <ScrollableContainer
                items={tags}
                renderItem={renderTag}
                maxVisibleItems={5}
              />
            </div>
          </div>
          <div className="flex flex-col items-start ">
            <div className="flex flex-row justify-start text-center">
              <Title level={4} className="text-center lg:text-left !m-0">
                Archivos
              </Title>
              <PlusCircleOutlined
                className="ml-2"
                size={20}
                onClick={handleModal}
              />
            </div>
            <ScrollableContainer
              items={archivos}
              renderItem={renderArchivo}
              maxVisibleItems={3}
            />
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
          <div className="flex flex-col items-start ">
            <div className="flex flex-row justify-start text-center">
              <Title level={4} className="text-center lg:text-left !m-0">
                Archivos
              </Title>
              <PlusCircleOutlined
                className="ml-2"
                size={20}
                onClick={handleModal}
              />
            </div>
            <ScrollableContainer
              items={archivos}
              renderItem={renderArchivo}
              maxVisibleItems={3}
            />
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
        <div className="flex flex-col lg:flex-row  mb-8 w-full">
          <div>
            <div className="flex flex-row justify-start text-center "></div>
          </div>
          <div>Hola</div>
        </div>
      </Card>
    </>
  );
};

export default Proyecto;
