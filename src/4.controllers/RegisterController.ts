import { Request, Response } from 'express';
import { userService } from '../3.services/UserService';
import { User } from '../1.models/UserModel';
import HasherUtil from '../utilities/hasherUtil';

class RegisterController {
    // Method to register a new user
    async register(req: Request, res: Response): Promise<void> {
        try {
            const userData: User = req.body;

            // Verify if the user already exists
            const existingUser = await userService.findUserByEmail(userData.email);
            if (existingUser) {
                // Return a 409 error if the user already exists
                res.status(409).json({ success: false, error: 'Email already in use.' });
                return;
            }

            // Hash the password
            const hashedPassword: string = await HasherUtil.hash(userData.password);

            // Create a new user object with the hashed password
            const userToAdd = new User(
                userData.firstname,
                userData.lastname,
                userData.username,
                hashedPassword,
                userData.email,
                userData.birthdate
            );

            // Save the user in the database
            const newUser = await userService.createUser(userToAdd);
            
            // verify if the user has been created
            if (newUser) {
                res.status(201).json({ success: true }); 
            } else {
                console.error('Registration error, cannot save the user into the database, userstate : ' + newUser);
                res.status(500).json({ success: false, error: 'Registration error, error code : RS1 :' + Date.now() }); // Répond avec une erreur
            }
        } catch (error) {
            console.error('Registration error: error code : RS2 : ', error);
            res.status(500).json({ success: false, error: 'Registration error, error code : RS2 : ' + Date.now()  }); // Gestion des erreurs
        }
    }
}

const registerController: RegisterController = new RegisterController();

export { registerController };