import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './authProvider';
import { API_URL } from '../config';
import apiRequest from '../api/request';
import { message } from 'antd';

const ProjectMemberContext = createContext();

export const ProjectMemberProvider = ({ children }) => {
  const { getAuthToken } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMembers = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(
        `${API_URL}/projects/${projectId}/members/`,
        'GET',
        null,
        {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      );
      if (!response.error) {
        setMembers(response);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const addMember = async (projectId, email) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(
        `${API_URL}/projects/${projectId}/members/`,
        'POST',
        { email: email, project: projectId },
        {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      );
      if (!response.error) {
        setMembers([...members, response]);
        message.success('Member added successfully');
      } else {
        setError(response.error);
        message.error('Failed to add member: ' + response.error);
      }
    } catch (error) {
      setError(error.message);
      message.error('API request failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const removeMember = async (projectId, memberId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(
        `${API_URL}/projects/${projectId}/members/${memberId}/`,
        'DELETE',
        null,
        {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      );
      if (!response.error) {
        setMembers(members.filter((member) => member.id !== memberId));
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProjectMemberContext.Provider
      value={{
        members,
        loading,
        error,
        fetchMembers,
        addMember,
        removeMember,
      }}
    >
      {children}
    </ProjectMemberContext.Provider>
  );
};

export const useProjectMember = () => {
  return useContext(ProjectMemberContext);
};
