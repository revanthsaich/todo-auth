const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/authMiddleware');

router.use(auth); 

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
});

router.get('/user/:userId', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.params.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { text, userId } = req.body;
    const todo = new Todo({ text, userId });
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ message: 'Error creating' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: 'not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    if (deletedTodo) {
      res.json({ message: 'Deleted' });
    } else {
      res.status(404).json({ message: 'not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid' });
  }
});

module.exports = router;
