//Provider para manejar el estado del proyecto
import React, { createContext, useCallback, useContext } from 'react';
import useApiRequest from '../hooks/useApiRequest';

const TagsContext = createContext(null);

// eslint-disable-next-line react/prop-types
const TagsProvider = ({ children }) => {
  const { call, isLoading, hasCalled, error, response } = useApiRequest('GET');
  const getTags = useCallback(async () => {
    await call('http://localhost:8000/api/v1/tags/');
  }, [call]);

  return (
    <TagsContext.Provider
      value={{ data: response, isLoading, hasCalled, error, getTags }}
    >
      {children}
    </TagsContext.Provider>
  );
};
export const useTags = () => useContext(TagsContext);

export default TagsProvider;
