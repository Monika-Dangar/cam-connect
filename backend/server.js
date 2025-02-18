const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const deviceRoutes = require('./routes/deviceRoutes');
const cameraRoutes = require('./routes/cameraRoutes');
const { connectMongoDB } = require('./connection');

const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// connect mongodb
connectMongoDB(`${process.env.MONGODB_URI}`)
  .then(() => {
    console.log(`MongoDB connected successfully!`);
  })
  .catch((err) => {
    console.log(`Error while connecting DB ${err}`);
  });

// routes
app.use('/api/user', userRoutes);
app.use('/api/device', deviceRoutes);
app.use('/api/camera', cameraRoutes);

app.listen(3000, () => {
  console.log(`Server listening on port 3000!`);
});
