import express from 'express';
import { registerController } from '../../4.controllers/RegisterController';

const registerPath = express.Router();

// Route to register a new user with a POST request
registerPath.post('/register', (req, res) => {
    // Call the register service with req and res
    registerController.register(req, res);
});

export default registerPath;
