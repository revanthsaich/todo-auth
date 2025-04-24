import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Todo = ({ id, text }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.reload();
    } catch (err) {
      console.error('Error deleting todo', err);
    }
  };

  const handleUpdate = () => {
    navigate(`/update/${id}`);
  };

  return (
    <div>
      <span>{text}</span>
      <div>
        <button className="updatebtn" onClick={handleUpdate}>Update</button>
        <button className="deletebtn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default Todo;
