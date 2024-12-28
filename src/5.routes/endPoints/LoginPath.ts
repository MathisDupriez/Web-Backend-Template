import express from 'express';
import { loginController } from '../../4.controllers/LoginController';

const loginPath = express.Router();

// Route to authenticate a user with a POST request
loginPath.post('/login', (req, res) => {
    // Call the Login service with req and res
    loginController.authenticate(req, res); 
});

export default loginPath;
