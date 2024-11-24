const { getAllUsers, updateUser, deleteUser, getUserById} = require('../Controllers/UserController.js');


const express = require('express');
const router = express.Router();


router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.get('/users/:id', getUserById);
router.delete('/users/:id', deleteUser);
// router.get('/api/users/delete/:id', deleteUser);

module.exports = router;
