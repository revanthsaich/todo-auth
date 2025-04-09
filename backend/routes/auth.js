const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    const exists = await User.findOne({ username });
    if (exists) return res.status(400).json({ message: 'User exists' });

    const hash_pw = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash_pw });
    await user.save();

    res.status(201).json({ message: 'registered' , userId: user._id} );
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid' });

    res.json({ message: 'successful' , userId: user._id });
  } catch (err) {
    res.status(500).json({ message: 'error' });
  }
});

module.exports = router;
