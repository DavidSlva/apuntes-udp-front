import React, { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from './authProvider';
import { API_URL } from '../config';
import apiRequest from '../api/request';
import { message, Modal } from 'antd';

const ProjectMemberContext = createContext();

export const ProjectMemberProvider = ({ children }) => {
  const { getAuthToken } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [users, setUsers] = useState({});

  const fetchUserById = useCallback(
    async (userId) => {
      if (userDetails[userId]) {
        return; // User data already fetched
      }
      try {
        const response = await apiRequest(
          `${API_URL}/users/${userId}/`,
          'GET',
          null,
          { Authorization: `Bearer ${getAuthToken()}` }
        );
        if (response) {
          setUserDetails((prev) => ({ ...prev, [userId]: response }));
        }
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    },
    [getAuthToken, userDetails]
  );

  const fetchMembers = useCallback(
    async (projectId, ownerId) => {
      setLoading(true);
      try {
        const response = await apiRequest(
          `${API_URL}/projects/${projectId}/members/`,
          'GET',
          null,
          { Authorization: `Bearer ${getAuthToken()}` }
        );
        if (response && !response.error) {
          setMembers(response);
          response.forEach((member) => {
            fetchUserById(member.user); // Fetch details for each member
          });
          if (ownerId) {
            fetchUserById(ownerId); // Fetch the owner's details if ownerId is provided
            setMembers((prevMembers) => [
              { user: ownerId, isOwner: true },
              ...prevMembers,
            ]);
          }
          console.log('Members:', response);
        } else {
          setError(response.error);
        }
      } catch (error) {
        setError('Failed to load members');
      } finally {
        setLoading(false);
      }
    },
    [getAuthToken, fetchUserById]
  );

  const addMember = useCallback(
    async (projectId, email) => {
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
          setMembers((prev) => [...prev, response]);
          fetchUserById(response.user); // Fetch details for the new member
          message.success('Member added successfully');
        } else {
          setError(response.error);
          message.error(
            'Failed to add member: ' +
              (response.error.message || 'Unknown error')
          );
        }
      } catch (error) {
        setError('API request failed: ' + error.message);
        message.error('API request failed: ' + error.message);
      } finally {
        setLoading(false);
      }
    },
    [getAuthToken, fetchUserById]
  );

  const removeMember = useCallback(
    (memberId) => {
      Modal.confirm({
        title: '¿Estás seguro de que quieres eliminar este miembro?',
        content:
          'Esta acción es irreversible y eliminará al miembro del proyecto.',
        okText: 'Eliminar',
        okType: 'danger',
        cancelText: 'Cancelar',
        onOk: async () => {
          setLoading(true);
          try {
            const response = await apiRequest(
              `${API_URL}/project-members/${memberId}/`,
              'DELETE',
              null,
              { Authorization: `Bearer ${getAuthToken()}` }
            );
            if (response.status === 204) {
              setMembers(members.filter((member) => member.id !== memberId));
              message.success('Miembro eliminado exitosamente');
            } else {
              message.error('Error al eliminar miembro');
            }
          } catch (error) {
            message.error('Error al eliminar miembro: ' + error.message);
          } finally {
            setLoading(false);
          }
        },
      });
    },
    [getAuthToken, members]
  );

  return (
    <ProjectMemberContext.Provider
      value={{
        members,
        userDetails,
        loading,
        fetchMembers,
        fetchUserById,
        error,
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
