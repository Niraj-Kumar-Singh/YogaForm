// routes/admissionRoutes.js
const express = require('express');
const router = express.Router();
const { validateAge, storeUserData } = require('../controllers/admissionController');
const { searchUser } = require('../controllers/admissionController');

router.get('/search-user', searchUser);


router.post('/submit-form', validateAge, storeUserData);


module.exports = router;
