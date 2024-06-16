import { Card, Button, Row, Col, Pagination } from 'antd';
import React, { useState, useEffect } from 'react';
import project1Image from '../images/test.jpg';
import project1Image2 from '../images/image-1@2x.png';
import { useNavigate } from 'react-router-dom';

const projects = [
  { id: 1, title: 'Proyecto 1', image: project1Image },
  { id: 2, title: 'Proyecto 2', image: project1Image2 },
  { id: 3, title: 'Proyecto 3', image: project1Image },
  { id: 4, title: 'Proyecto 4', image: project1Image2 },
  { id: 5, title: 'Proyecto 5', image: project1Image },
  { id: 6, title: 'Proyecto 6', image: project1Image2 },
  { id: 7, title: 'Proyecto 7', image: project1Image },
  { id: 8, title: 'Proyecto 8', image: project1Image2 },
  { id: 9, title: 'Proyecto 9', image: project1Image },
  { id: 10, title: 'Proyecto 10', image: project1Image2 },
  { id: 11, title: 'Proyecto 11', image: project1Image },
  { id: 12, title: 'Proyecto 12', image: project1Image2 },
  { id: 13, title: 'Proyecto 13', image: project1Image },
  { id: 14, title: 'Proyecto 14', image: project1Image2 },
  { id: 15, title: 'Proyecto 15', image: project1Image },
  { id: 16, title: 'Proyecto 16', image: project1Image2 },
  { id: 17, title: 'Proyecto 17', image: project1Image },
  { id: 18, title: 'Proyecto 18', image: project1Image2 },
  { id: 19, title: 'Proyecto 19', image: project1Image },
  { id: 20, title: 'Proyecto 20', image: project1Image2 },
  { id: 21, title: 'Proyecto 21', image: project1Image },
  { id: 22, title: 'Proyecto 22', image: project1Image2 },
  { id: 23, title: 'Proyecto 23', image: project1Image },
  { id: 24, title: 'Proyecto 24', image: project1Image2 },
  { id: 25, title: 'Proyecto 25', image: project1Image },
  { id: 26, title: 'Proyecto 26', image: project1Image2 },
  { id: 27, title: 'Proyecto 27', image: project1Image },
];

const PAGE_SIZE = 8; // Number of cards per page

const Inicio = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (transitioning) {
      const timer = setTimeout(() => setTransitioning(false), 300);
      return () => clearTimeout(timer);
    }
  }, [transitioning]);

  const navigate = useNavigate(); // Initialize useNavigate

  const handlePageChange = (page) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentPage(page);
    }, 300); // Duration of the transition animation
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const currentProjects = projects.slice(startIndex, startIndex + PAGE_SIZE);

  return (
    <div>
      <Row
        justify="center"
        gutter={[16, 16]}
        style={{ marginTop: '20px', marginBottom: '20px' }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.3s ease-in-out',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {currentProjects.map((project) => (
            <Col xs={24} sm={12} md={8} lg={6} key={project.id}>
              <Card
                onClick={() => navigate(`/Proyectos/${project.id}/Proyecto`)}
                hoverable
                style={{ marginBottom: '30px' }} // Add margin bottom to increase vertical spacing
                cover={
                  <img
                    alt={project.title}
                    src={project.image}
                    style={{
                      backgroundColor: '#f5f5f5',
                      height: '200px',
                      objectFit: 'cover',
                      width: '100%',
                    }}
                  />
                }
              >
                <Button disabled shape="round" style={{ marginBottom: '10px' }}>
                  #Arquitectura
                </Button>
                <Button disabled shape="round" style={{ marginLeft: '10px' }}>
                  #Infraestructura
                </Button>
                <Card.Meta
                  title={
                    <div style={{ fontSize: '120%', marginTop: '10px' }}>
                      {project.title}
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </div>
      </Row>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Pagination
          current={currentPage}
          pageSize={PAGE_SIZE}
          total={projects.length}
          onChange={handlePageChange}
        />
      </Row>
    </div>
  );
};

export default Inicio;
