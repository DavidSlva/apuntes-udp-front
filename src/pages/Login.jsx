import PropTypes from 'prop-types';
import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import backgroundImage from '../images/image-1@2x.png'; // Import the image


const { Title } = Typography;

export const Login = ({ className, buttonText = "Iniciar Sesión" }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const onFinish = (values) => {
    console.log('Success:', values);
    navigate('/'); // Redirect to another page using useNavigate
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="login-container" style={{...styles.container, backgroundImage: `url(${backgroundImage})`}}>
      <div className={`login-form ${className}`} style={styles.form}>
        <Title level={2} className="login-title" style={styles.title}>
          ArquiUDP
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Mail UDP"
            name="username"
            rules={[{ required: true, message: 'Porfavor Ingrese su Correo' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Porfavor Ingrese su Contraseña' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              style={{...styles.button, backgroundColor: "white" , borderColor: '#c23633', color: '#c23633', borderWidth: '2px', fontWeight: 'bold'}}
            >
              {buttonText}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

Login.propTypes = {
  className: PropTypes.string,
  buttonText: PropTypes.string,
};

Login.defaultProps = {
  className: '',
  buttonText: 'Login',
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
    borderColor: '#c23633',
    
  },
  title: {
    marginBottom: '1rem',
    color: '#c23633'
  },
  button: {
    width: '100%',
  },
};
