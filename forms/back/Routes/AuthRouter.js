const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const router =require('express').Router();
const { signup, login} = require('../Controllers/AuthController');
router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

// New route to update user details
// router.put('/users/:id', updateUser);

module.exports=router;