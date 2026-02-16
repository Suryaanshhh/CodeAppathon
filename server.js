require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const sequelize = require('./configs/db');

// Import Routes
const authRoutes = require('./routes/authRoutes');

const app = express();


app.use(helmet()); 
app.use(cors());   
app.use(express.json());

// 2. Route Middlewares
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;


sequelize.sync()
  .then(() => {
   
    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error(' Unable to connect to the database:', err);
  });