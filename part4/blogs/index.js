const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');

const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');

const app = express();

mongoose.set('strictQuery', false);
mongoose.connect(config.MONGODB_URI);

app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});