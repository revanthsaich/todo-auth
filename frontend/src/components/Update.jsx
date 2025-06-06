import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/todos/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setText(res.data.text);
      } catch (err) {
        console.error('Error fetching todo:', err);
      }
    };
    fetchTodo();
  }, [id, token]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { text }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  return (
    <div>
      <h2>Update Todo</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Edit todo text"
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
};

export default Update;
