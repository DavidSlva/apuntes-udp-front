import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../images/image-1@2x.png';
import { useAuth } from '../providers/authProvider';

const { Title } = Typography;

export const Login = ({ className, buttonText = 'Login' }) => {
  const { login } = useAuth(); // Use the useAuth hook
  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState(null); // State to handle errors

  const onFinish = async (values) => {
    try {
      await login(values.email, values.password); // Use the login method from useAuth
      navigate('/inicio'); // Redirect to another page using useNavigate
    } catch (err) {
      setError(err.message); // Set error message
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      className="login-container h-screen"
      style={{
        ...styles.container,
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${backgroundImage})`,
      }}
    >
      <div className={`login-form ${className}`} style={styles.form}>
        <Title level={2} className="login-title" style={styles.title}>
          ArquiUDP
        </Title>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          layout="vertical" // Set form layout to 'vertical'
        >
          <Form.Item
            label="Mail UDP"
            name="email"
            rules={[
              { required: true, message: 'Porfavor Ingrese su Correo' },
              { type: 'email', message: 'Porfavor Ingrese un correo valido' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[
              { required: true, message: 'Porfavor Ingrese su Contraseña' },
            ]}
          >
            <Input.Password />
          </Form.Item>

          {error && (
            <p style={{ color: 'red' }}>{error}</p> // Display error message
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-button"
              style={{
                ...styles.button,
                backgroundColor: 'white',
                borderColor: '#c23633',
                color: '#c23633',
                borderWidth: '2px',
                fontWeight: 'bold',
              }}
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
  buttonText: 'Iniciar Sesión',
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '100vh',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  form: {
    position: 'relative', // Set position to relative
    zIndex: 1, // Set z-index to 1 to ensure form appears above overlay
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
    borderColor: '#c23633',
  },
  title: {
    marginBottom: '1rem',
    color: '#c23633',
  },
  button: {
    width: '100%',
  },
};
