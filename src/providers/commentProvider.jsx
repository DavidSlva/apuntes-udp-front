import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './authProvider';
import { API_URL } from '../config';
import apiRequest from '../api/request';

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const { getAuthToken } = useAuth();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchComments = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(
        `${API_URL}/projects/${projectId}/comments/`,
        'GET',
        null,
        {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      );
      if (!response.error) {
        setComments(response);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (projectId, content) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(
        `${API_URL}/projects/${projectId}/comments/`,
        'POST',
        { content },
        {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      );
      if (!response.error) {
        setComments([...comments, response]);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deactivateComment = async (commentId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiRequest(
        `${API_URL}/comments/${commentId}/deactivate/`,
        'POST',
        null,
        {
          Authorization: `Bearer ${getAuthToken()}`,
        }
      );
      if (!response.error) {
        setComments(
          comments.map((comment) =>
            comment.id === commentId ? response : comment
          )
        );
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
    <CommentContext.Provider
      value={{
        comments,
        loading,
        error,
        fetchComments,
        createComment,
        deactivateComment,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

export const useComment = () => {
  return useContext(CommentContext);
};
