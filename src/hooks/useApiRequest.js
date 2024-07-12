import { useState, useCallback } from 'react';
import apiRequest from '../api/request';
// import apiRequest from './apiRequest';

const useApiRequest = (method, data = null, headers = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCalled, setHasCalled] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);

  const call = useCallback(
    async (url) => {
      setIsLoading(true);
      setHasCalled(true);
      setError(null);

      try {
        const result = await apiRequest(url, method, data, headers);
        setResponse(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [method, data, headers]
  );

  return { isLoading, hasCalled, error, response, call };
};

export default useApiRequest;
