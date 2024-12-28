import e, { Request, Response } from 'express';
import { userService } from '../3.services/UserService';
import HasherUtil from '../utilities/hasherUtil';
import { User } from '../1.models/UserModel';
import { tokenController } from './TokenController';

class LoginController {
    // method to authenticate a user
    async authenticate(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const user: User | null = await userService.findUserByEmail(email);
            
            // if the user does not exist, return an error
            if (!user) {
                res.status(404).json({ success: false, error: 'Invalid credentials' });
                return;
            }

            // verify the password using the Hasher utility
            const isPasswordValid = await HasherUtil.verify(password, user.password);
            
            // if the password is invalid, return an error
            if (!isPasswordValid) {
                res.status(404).json({ success: false, error: 'Invalid credentials' });
                return;
            }

            // if the authentication is successful, create a JWT token
            const token = tokenController.generateToken({ id: user.id, email: user.email });

            // save the token in the database
            const savedToken = await tokenController.saveToken(token, user);

            // if the token could not be saved, return an error
            if (!savedToken) {
                console.error('Authentication error, cannot save the token into the database, error code: LS1');
                res.status(500).json({ success: false, error: 'Authentication error, error code: LS1: ' + Date.now() });
                return;
            }

            // return the token to the client
            res.status(200).json({ success: true, token });

        } catch (error) {
            console.error('Authentication error: error code LS2:', error);
            res.status(500).json({ success: false, error: 'Authentication error, error code: LS2: ' + Date.now() });
        }
    }
}

const loginController : LoginController = new LoginController();

export { loginController };