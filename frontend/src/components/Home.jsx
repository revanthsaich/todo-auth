import React, { useState, useEffect } from 'react';
import './Home.css';
import Todo from './Todo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/todos/user/${userId}`)
        .then((response) => {
          setTodos(response.data);
        })
        .catch((error) => {
          console.error('Error', error);
        });
    }
  }, [userId]);

  const handleAdd = () => {
    const newTask = { text: task, userId };
    axios
      .post('http://localhost:5000/api/todos', newTask)
      .then((res) => {
        setTodos([...todos, res.data]);
        setTask('');
      })
      .catch((err) => {
        console.error('Failed', err);
      });
  };

  return (
    <div className="container">
      <div className="top-right-buttons">
        {userId ? (
          <button onClick={() => {
            localStorage.removeItem('userId');
            navigate('/login');
          }}>Logout</button>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signin')}>Sign Up</button>
          </>
        )}

      </div>
      <h1 className="title">Todo List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="todo-input"
        />
        <button onClick={handleAdd} className="add">
          Add
        </button>
      </div>

      <div className="todo-container">
        {todos.map((todo) => (
          <Todo key={todo._id} id={todo._id} text={todo.text} />
        ))}
      </div>
    </div>
  );
};

export default Home;
