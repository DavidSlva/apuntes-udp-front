import React from 'react';
import { Row, Col, Typography } from 'antd';
import image from '../images/test2.jpg';

const { Title, Paragraph } = Typography;

const Referencia = () => {
  const styles = {
    container: {
      width: '1300px', // Fixed width (1200px)
      height: '505px', // Fixed height (505px)
      padding: '30px 0 0 0', // Padding: 30px top, 0 right, 0 bottom, 0 left
      gap: '30px', // Gap between items in the Row
      opacity: '0.8', // Opacity
      margin: '0 auto', // Center content horizontally
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      width: '100%',
      height: '100%',
      position: 'relative',
      borderRadius: '10px', // Rounded corners
      overflow: 'hidden', // Ensure rounded corners are applied
      marginBottom: '20px', // Increase margin bottom to create space between image and text
    },
    bigImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
    textContainer: {
      width: '100%', // Full width of the column
    },
    title: {
      marginTop: '20px', // Margin top reduced for better alignment
      fontWeight: 'bold', // Make titles bold
    },
    subtitle: {
      marginTop: '10px', // Margin top for subtitle
      color: '#888', // Subtitle color
    },
    paragraph: {
      fontSize: '16px', // Font size for paragraph text
      lineHeight: '1.5', // Line height for better readability
    },
  };

  return (
    <div style={styles.container}>
      <Row gutter={[50, 20]} style={{ height: '100%', width: '100%' }}>
        <Col xs={24} md={9}>
          <div style={styles.imageContainer}>
            <img 
              src={image}
              alt="Big Square" 
              style={styles.bigImage} 
            />
          </div>
          <Title level={3} style={styles.title}>Titulo de la Referencia</Title>
          <Title level={5} style={styles.subtitle}>Autor de la Referencia</Title>
        </Col>
        <Col xs={24} md={15}>
          <div style={styles.textContainer}>
            <Title level={3} style={styles.title}>Apuntes</Title>
            <Paragraph style={styles.paragraph}>
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            </Paragraph>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Referencia;

