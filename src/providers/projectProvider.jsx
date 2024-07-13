// src/providers/projectProvider.jsx
import React, { createContext, useCallback, useContext, useState } from 'react';
import useApiRequest from '../hooks/useApiRequest';
import { API_URL } from '../config';
import apiRequest from '../api/request';
import { notification } from 'antd';

const ProjectContext = createContext(null);

const ProjectProvider = ({ children }) => {
  const { call, isLoading, hasCalled, error, response } = useApiRequest('GET');
  const { call: callPost, isLoading: isLoadingPost } = useApiRequest('POST');
  const { call: callDelete } = useApiRequest('DELETE');
  const [reference, setReference] = useState(null);
  const [isLoadingReference, setIsLoadingReference] = useState(false);
  const [errorReference, setErrorReference] = useState(null);

  const getProjects = useCallback(async () => {
    await call(API_URL + '/projects/');
  }, [call]);

  const getProject = useCallback(
    async (id) => {
      await call(API_URL + `/projects/${id}/`);
    },
    [call]
  );

  const getReference = useCallback(async (id) => {
    setIsLoadingReference(true);
    setErrorReference(null);
    try {
      const response = await apiRequest(`${API_URL}/references/${id}/`, 'GET');
      setReference(response);
      setIsLoadingReference(false);
      return response;
    } catch (error) {
      setErrorReference(error);
      setIsLoadingReference(false);
    }
  }, []);

  const addProject = useCallback(async (data) => {
    try {
      return await apiRequest(API_URL + '/projects/', 'POST', data);
    } catch (error) {
      notification.error({
        message: 'Error al crear el proyecto',
        description: error.message,
      });
      return { error };
    }
  }, []);

  const addFileProject = useCallback(async (data) => {
    try {
      return await apiRequest(API_URL + '/files/', 'POST', data);
    } catch (error) {
      notification.error({
        message: 'Error al crear el archivo del proyecto',
        description: error.message,
      });
      return { error };
    }
  }, []);
  const updateProject = useCallback(async (id, data) => {
    try {
      return await apiRequest(API_URL + `/projects/${id}/`, 'PUT', data);
    } catch (error) {
      notification.error({
        message: 'Error al actualizar el proyecto',
        description: error.message,
      });
      return { error };
    }
  }, []);
  const deleteProject = useCallback(async (id) => {
    try {
      await apiRequest(API_URL + `/projects/${id}/`, 'DELETE');
      notification.success({
        message: 'Proyecto eliminado con éxito',
      });
    } catch (error) {
      notification.error({
        message: 'Error al eliminar el proyecto',
        description: error.message,
      });
      return { error };
    }
  }, []);

  const addProjectTag = useCallback(async (data) => {
    try {
      return await apiRequest(API_URL + '/project-tags/', 'POST', data);
    } catch (error) {
      notification.error({
        message: 'Error al agregar tag al proyecto',
        description: error.message,
      });
      return { error };
    }
  }, []);

  const deleteProjectTag = useCallback(async (id) => {
    try {
      await apiRequest(API_URL + `/project-tags/${id}/`, 'DELETE');
      notification.success({
        message: 'Tag del proyecto eliminado con éxito',
      });
    } catch (error) {
      notification.error({
        message: 'Error al eliminar el tag del proyecto',
        description: error.message,
      });
      return { error };
    }
  }, []);

  const addReferenceProject = useCallback(async (data) => {
    try {
      return await apiRequest(API_URL + '/references/', 'POST', data);
    } catch (error) {
      notification.error({
        message: 'Error al crear la referencia del proyecto',
        description: error.message,
      });
      return { error };
    }
  }, []);

  const deleteReference = useCallback(
    async (id) => {
      try {
        await callDelete(API_URL + `/references/${id}/`);
        notification.success({
          message: 'Referencia eliminada',
          description: 'La referencia ha sido eliminada correctamente',
        });
      } catch (error) {
        notification.error({
          message: 'Error al eliminar la referencia',
          description: error.message,
        });
      }
    },
    [callDelete]
  );

  return (
    <ProjectContext.Provider
      value={{
        data: response,
        isLoading,
        hasCalled,
        error,
        getProjects,
        addProject,
        getProject,
        isLoadingProject: isLoading,
        hasCalledProject: hasCalled,
        errorProject: error,
        project: response,
        addFileProject,
        updateProject,
        deleteProject,
        addProjectTag,
        deleteProjectTag,
        addReferenceProject,
        deleteReference,
        getReference,
        reference,
        isLoadingReference,
        errorReference,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => useContext(ProjectContext);

export default ProjectProvider;
