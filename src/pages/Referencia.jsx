import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col, Typography } from 'antd';
import { useProject } from '../providers/projectProvider';
import image from '../images/test2.jpg';

const { Title, Paragraph } = Typography;

const Referencia = () => {
  const { id } = useParams();
  const { getReference, reference, isLoadingReference, errorReference } = useProject();
  const [referenceData, setReferenceData] = useState(null);

  useEffect(() => {
    if (id) {
      getReference(id).then(data => setReferenceData(data));
    }
  }, [id, getReference]);

  if (isLoadingReference) {
    return <p>Cargando...</p>;
  }

  if (errorReference) {
    return <p>Error al cargar la referencia: {errorReference.message}</p>;
  }

  if (!referenceData) {
    return <p>Referencia no encontrada</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Row gutter={[50, 20]} style={{ height: '100%', width: '100%' }}>
        <Col xs={24} md={9}>
          <div>
            <img className="w-full h-full" src={image} alt="Big Square" />
          </div>
          <Title level={3}>{referenceData.description}</Title>
          <Title level={5}>{referenceData.author}</Title>
        </Col>
        <Col xs={24} md={15}>
          <div>
            <Title level={3}>Apuntes</Title>
            <Paragraph>
              {referenceData.notes || 'No hay notas disponibles.'}
            </Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Referencia;
