const express= require('express');
const mongoose = require('mongoose');
const cors= require('cors');
const dotenv = require('dotenv');
const routes=require('./routes/todo');
const authRoutes = require('./routes/auth');
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());

app.use('/api/todos',routes);
app.use('/api/users', authRoutes);


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,useUnifiedTopology: true})
.then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => {
    console.log("server running");
  });
})
.catch(err => console.log(err));