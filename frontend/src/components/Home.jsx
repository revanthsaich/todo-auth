import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const userId = localStorage.getItem('userId');
  const username = localStorage.getItem('username');

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
    <div>
      <div>
        {userId ? (
          <div>
            <p>{username}</p>
            <button onClick={() => {
              localStorage.removeItem('userId');
              localStorage.removeItem('username');
              navigate('/login');
            }}>Logout</button>
          </div>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signin')}>Sign Up</button>
          </>
        )}

      </div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAdd}>
          Add
        </button>
      </div>

      <div>
        {todos.map((todo) => (
          <Todo key={todo._id} id={todo._id} text={todo.text} />
        ))}
      </div>
    </div>
  );
};

export default Home;
