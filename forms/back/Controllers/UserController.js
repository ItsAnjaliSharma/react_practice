// Import your model (assumed to be named 'User'
const mongoose = require('mongoose');
const UserModel = require('../Models/getalluser');
const bcrypt = require('bcrypt');

// Function to get all users
const getAllUsers = async (req, res) => {
  try {
    // Fetch users from the database
    const users = await UserModel.find();
    
    // Log users for debugging (remove this in production)
    console.log(users);
    
    // Send response with users
    res.status(200).json({
      success: true,
      users
    });
  } catch (err) {
    // Return error response
    res.status(500).json({

      message: "Internal Server Error",
      success: false,
      error: err.message // Optional: include the error message for debugging
    });
  }
};
const updateUser = async (req, res) => {
  try {
    console.log('Update request received:', req.params.id, req.body);

    const { name, email, password } = req.body;
    const userId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error(`Invalid ObjectId: ${userId}`);
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const updates = {};
    if (name) updates.name = name;
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    console.log('Updating user with data:', updates);

    const updatedUser = await UserModel.findByIdAndUpdate(userId, updates, {
      new: true,
    });

    if (!updatedUser) {
      console.error('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User updated successfully:', updatedUser);
    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error.message, error.stack);
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    console.log('Delete request received for ID:', req.params.id);

    const userId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error(`Invalid ObjectId: ${userId}`);
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    console.log('Attempting to delete user with ID:', userId);

    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      console.error('User not found for deletion:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User deleted successfully:', deletedUser);
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error.message, error.stack);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



const getUserById = async (req, res) => {
  try {
    const id = req.params.id; // Access the 'id' parameter
    console.log(`Fetching user with ID: ${id}`); // Debugging

    const user = await UserModel.findById(id); // Fetch user from database
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }

};


module.exports = {
  getAllUsers, updateUser, deleteUser, getUserById
};
