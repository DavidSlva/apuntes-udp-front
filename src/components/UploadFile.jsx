import React, { useState } from 'react';
import { Avatar, Row, Col, Modal, Input, Button } from 'antd';
import {
  UserAddOutlined,
  FileAddOutlined,
  UpOutlined,
} from '@ant-design/icons';

const UploadFile = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false); // Estado para controlar la visibilidad del popup de subida exitosa

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del navegador
  };

  const handleDrop = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del navegador
    const files = e.dataTransfer.files; // Obtiene los archivos arrastrados
    console.log('Archivos arrastrados:', files);
    // Aquí puedes manejar los archivos, por ejemplo subirlos a un servidor

    // Simulamos un tiempo de carga para demostrar el popup
    setTimeout(() => {
      setUploadSuccess(true);
    }, 1000); // Popup se muestra después de 1 segundo
  };

  const handlePopupClose = () => {
    setUploadSuccess(false);
  };
  return (
    <div
      //   style={{
      //     // display: 'flex',
      //     // justifyContent: 'center',
      //     // alignItems: 'center',
      //     backgroundColor: '#f2f0e6', // Añadido para asegurar que el fondo completo sea del mismo color
      //   }}
      //   className="w-full h-full p-10"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="m-10"
    >
      <div
        style={{
          backgroundColor: '#f2f0e6',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="w-full h-full"
      >
        <UpOutlined style={{ fontSize: '200px', marginBottom: '20px' }} />
        <h1 style={{ fontSize: '48px', textAlign: 'center', margin: 0 }}>
          Arrastrar Archivo
        </h1>
      </div>

      <Modal
        open={uploadSuccess}
        title="Archivo Subido Exitosamente"
        onCancel={handlePopupClose}
        footer={[
          <Button key="ok" type="primary" onClick={handlePopupClose}>
            Ok
          </Button>,
        ]}
      >
        <p>El archivo ha sido subido exitosamente.</p>
      </Modal>
    </div>
  );
};

export default UploadFile;
