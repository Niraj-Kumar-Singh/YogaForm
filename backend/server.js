// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const admissionRoutes = require('./routes/admissionRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas connection string
const uri = 'mongodb+srv://UserFirst:12345@yogaform.miypgtw.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

// Set up API routes
app.use('/api/admissions', admissionRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
