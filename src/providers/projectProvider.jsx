//Provider para manejar el estado del proyecto
import React, { createContext, useCallback, useContext } from 'react';
import useApiRequest from '../hooks/useApiRequest';
import { API_URL } from '../config';
import apiRequest from '../api/request';
import { notification } from 'antd';

const ProjectContext = createContext(null);

// eslint-disable-next-line react/prop-types
const ProjectProvider = ({ children }) => {
  const { call, isLoading, hasCalled, error, response } = useApiRequest('GET');
  const getProjects = useCallback(async () => {
    await call(API_URL + '/projects/');
  }, [call]);

  const {
    call: callProject,
    isLoading: isLoadingProject,
    hasCalled: hasCalledProject,
    error: errorProject,
    response: responseProject,
  } = useApiRequest('GET');
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

  const getProject = useCallback(
    async (id) => {
      await callProject(API_URL + `/projects/${id}/`);
    },
    [callProject]
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
        isLoadingProject,
        hasCalledProject,
        errorProject,
        project: responseProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
export const useProject = () => useContext(ProjectContext);

export default ProjectProvider;
