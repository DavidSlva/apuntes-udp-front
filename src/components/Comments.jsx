import React, { useEffect, useState } from 'react';
import { Avatar, Card, Divider, Input, Button } from 'antd';
import { useComment } from '../providers/commentProvider';
import { useAuth } from '../providers/authProvider';
import moment from 'moment';

const { TextArea } = Input;

const placeholderUserImage =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const Comments = ({ projectId }) => {
  const { comments, createComment, deactivateComment, fetchComments } =
    useComment();
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchComments(projectId);
  }, [projectId]);

  const handleCreateComment = async () => {
    if (newComment.trim()) {
      await createComment(projectId, newComment);
      setNewComment('');
    }
  };

  const renderComment = (comment, index) => (
    <div key={index} className="mb-4">
      <div className="flex items-center">
        <Avatar size="small" src={placeholderUserImage} />
        <p className="ml-2 font-semibold">
          {comment.user.name} {comment.user.lastname}
        </p>
      </div>
      <p className="ml-8">{comment.content}</p>
      <p className="ml-8 text-gray-500 text-sm">
        {moment(comment.created_at).format('DD/MM/YYYY HH:mm')}
      </p>
      <Divider />
    </div>
  );

  return (
    <Card className="w-full">
      {comments?.map((comment, index) => renderComment(comment, index))}
      <TextArea
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Añadir un comentario"
        rows={4}
      />
      <Button
        type="primary"
        onClick={handleCreateComment}
        style={{ marginTop: '10px' }}
      >
        Enviar
      </Button>
    </Card>
  );
};

export default Comments;
