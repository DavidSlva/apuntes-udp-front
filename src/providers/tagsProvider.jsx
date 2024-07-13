import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import useApiRequest from '../hooks/useApiRequest';
import { API_URL } from '../config';

const TagsContext = createContext(null);

const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState(null);
  const { call, isLoading, error, response } = useApiRequest('GET');

  const getTags = useCallback(async () => {
    if (!tags) {
      await call(API_URL + '/tags/');
    }
  }, [call, tags]);

  useEffect(() => {
    if (response) {
      setTags(response);
    }
  }, [response]);

  const addTag = useCallback(
    async (data) => {
      try {
        const response = await call(API_URL + '/tags/', 'POST', data);
        setTags((prevTags) => [...prevTags, response]);
      } catch (err) {
        throw err;
      }
    },
    [call]
  );

  const deleteTag = useCallback(
    async (id) => {
      try {
        await call(API_URL + `/tags/${id}/`, 'DELETE');
        setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
      } catch (err) {
        throw err;
      }
    },
    [call]
  );

  return (
    <TagsContext.Provider
      value={{
        data: tags,
        isLoading,
        error,
        getTags,
        addTag,
        deleteTag,
      }}
    >
      {children}
    </TagsContext.Provider>
  );
};

export const useTags = () => useContext(TagsContext);

export default TagsProvider;
