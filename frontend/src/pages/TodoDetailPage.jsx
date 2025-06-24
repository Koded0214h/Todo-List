import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTodo, updateTodo, deleteTodo } from '../api';

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useEffect(() => {
    getTodo(id)
      .then(res => {
        setTodo(res);
        setEditTitle(res.title);
        setEditDesc(res.description);
        setLoading(false);
      })
      .catch(() => {
        setError('Todo not found');
        setLoading(false);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateTodo(id, {
        title: editTitle,
        description: editDesc,
      });
      navigate('/');
    } catch (err) {
      setError('Failed to update todo');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(id);
      navigate('/');
    } catch (err) {
      setError('Failed to delete todo');
    }
  };

  if (loading) return <div className="glass-loading">Loading...</div>;
  if (error) return <div className="glass-empty">{error}</div>;

  return (
    <div className="glass-container">
      <h1 className="glass-title">Todo Details</h1>
      <form className="glass-form" onSubmit={handleUpdate} style={{flexDirection:'column',gap:16}}>
        <input
          className="glass-input glass-input-animated"
          type="text"
          value={editTitle}
          onChange={e => setEditTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="glass-input glass-input-animated"
          style={{minHeight:60}}
          value={editDesc}
          onChange={e => setEditDesc(e.target.value)}
          placeholder="Description"
        />
        <div style={{display:'flex',gap:8}}>
          <button className="glass-btn" type="submit">Update</button>
          <button className="glass-delete" type="button" onClick={handleDelete}>Delete</button>
        </div>
      </form>
    </div>
  );
};

export default TodoDetailPage; 