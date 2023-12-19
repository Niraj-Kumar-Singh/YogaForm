// controllers/admissionController.js
const User = require('../models/User');
const CompletePayment = require('../services/paymentService');

const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (age >= 18 && age <= 65) {
    next();
  } else {
    res.status(400).json({ error: 'Invalid age range' });
  }
};



  

const storeUserData = (req, res) => {
  const userData = req.body;

  User.create(userData)
    .then(() => {
      // Mock payment call
      const paymentResponse = CompletePayment(userData);
      res.status(paymentResponse.success ? 200 : 400).json(paymentResponse);
    })
    .catch((error) => {
      console.error('Error storing user data:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
};


const searchUser = (req, res) => {
    const { name, age } = req.query;
  
    User.findOne({ name, age })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ error: 'User not found' });
        }
      })
      .catch((error) => {
        console.error('Error searching for user:', error);
        res.status(500).json({ error: 'Internal server error' });
      });
  };




module.exports = { validateAge, storeUserData, searchUser };
