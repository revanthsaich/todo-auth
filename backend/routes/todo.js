const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text }); 
    const savedTodo = await todo.save();            
    res.status(201).json(savedTodo);                
  } catch (err) {
    res.status(400).json({ message: 'Error creating todo' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
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
