import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Update.css';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/todos/${id}`);
        setText(res.data.text);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching todo:', err);
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, { text });
      navigate('/');
    } catch (err) {
      console.error('Error updating todo:', err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="update-container">
      <h2>Update Todo</h2>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="update-input"
        placeholder="Edit todo text"
      />
      <button onClick={handleUpdate} className="update-button">Update</button>
    </div>
  );
};

export default Update;
