const App = require('express'); // Use 'express' instead of 'app'
const routeC = require('../controllers/routeController');

const Approute = App.Router(); // Create a Router instance

// Define a route (e.g., GET request on the root path '/')
Approute.get('/', routeC.name); // Use a valid HTTP method

module.exports = Approute; // Correct export syntax
