const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const tokenValidationMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();


// router.post("/signup/:role", registration)
router.get('/refresh', refreshAccessToken);


module.exports = router;
