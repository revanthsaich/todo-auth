import React from 'react';
import './Todo.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Todo = ({ id, text }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      window.location.reload();
    } catch (err) {
      console.error('error deleting', err);
    }
  };

  const handleUpdate = () => {
    navigate(`/update/${id}`);
  };

  return (
    <div className="todo-card">
      <span className="todo-text">{text}</span>
      <div className="button-group">
        <button className="updatebtn" onClick={handleUpdate}>Update</button>
        <button className="deletebtn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Todo;
