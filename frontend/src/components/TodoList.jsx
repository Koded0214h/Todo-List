import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from '../api';
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      // Handle error
    }
    setLoading(false);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const todo = { title: newTodo, description: newDesc, completed: false };
    try {
      await createTodo(todo);
      setNewTodo('');
      setNewDesc('');
      fetchTodos();
    } catch (err) {}
  };

  const handleToggle = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed });
      fetchTodos();
    } catch (err) {}
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      fetchTodos();
    } catch (err) {}
  };

  return (
    <div className="glass-container">
      <h1 className="glass-title">Futuristic Todo List</h1>
      <form className="glass-form" onSubmit={handleAdd} style={{flexDirection:'column',gap:12}}>
        <input
          className="glass-input glass-input-animated"
          type="text"
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          required
        />
        <textarea
          className="glass-input glass-input-animated"
          placeholder="Description (optional)"
          value={newDesc}
          onChange={e => setNewDesc(e.target.value)}
          style={{minHeight:40}}
        />
        <button className="glass-btn" type="submit">Add</button>
      </form>
      <div className="glass-list">
        {loading ? (
          <div className="glass-loading">Loading...</div>
        ) : todos.length === 0 ? (
          <div className="glass-empty">No todos yet!</div>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className={`glass-todo${todo.completed ? ' completed' : ''}`}> 
              <span
                className="glass-checkbox"
                onClick={() => handleToggle(todo.id, todo.completed)}
                title="Toggle complete"
              >
                {todo.completed ? '✔️' : '⭕'}
              </span>
              <div style={{flex:1}}>
                <Link to={`/todos/${todo.id}`} className="glass-todo-title" style={{textDecoration:'none'}}>{todo.title}</Link>
                {todo.description && (
                  <div className="glass-todo-desc">{todo.description}</div>
                )}
              </div>
              <button className="glass-delete" onClick={() => handleDelete(todo.id)} title="Delete">✖</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodoList; 