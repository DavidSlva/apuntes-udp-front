import React from 'react';
import { Avatar, Card, Typography } from 'antd';
import ScrollableContainer from '../components/ScrollableList';
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

  return (
    <>
      {/* <div className="w-full bg-black h-10"></div> */}
      <Card className="p-8">
        <div className="flex flex-col lg:flex-row justify-around mb-8">
          <div className="flex flex-col items-center lg:items-start mb-8 lg:mb-0">
            <Title level={3} className="text-center lg:text-left">
              Nombre Proyecto
            </Title>
            <p className="text-center lg:text-left">00/00/00</p>
            <Title level={4} className="mb-2 text-center lg:text-left">
              Imagen Opcional
            </Title>
            {imageUrl ? (
              <img
                src="path-to-image.jpg"
                alt="Imagen del proyecto"
                className="w-full lg:w-[500px] h-[500px] bg-gray-300 rounded-lg"
              />
            ) : (
              <Card className="w-full lg:w-[500px] h-[500px] bg-gray-300 rounded-lg"></Card>
            )}
          </div>
          <div className="flex flex-col items-start">
            <Title level={4} className="text-center lg:text-left">
              Archivos
            </Title>
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
        <div className="flex flex-col lg:flex-row justify-around mb-8">
          <div>Hola</div>
          <div>Hola</div>
        </div>
      </Card>
    </>
  );
};

export default Proyecto;
