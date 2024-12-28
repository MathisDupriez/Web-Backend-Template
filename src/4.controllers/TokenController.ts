import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { tokenService } from '../3.services/TokenService';
import config from '../0.configs/config';
import { User } from '../1.models/UserModel';
import { Token } from '../1.models/TokenModel';

class TokenController {
    // Secret key for signing the JWT token
    private secretKey: string = config.jwtSecret;

    // Method to generate a JWT token
    generateToken(payload: object, expiresIn: string = '3h'): string {
        try {
            return jwt.sign(payload, this.secretKey, { expiresIn });
        } catch (error) {
            console.error('Error generating token:', error);
            throw new Error('Failed to generate token');
        }
    }

    // Method to verify a JWT token
    verifyToken(token: string): any {
        try {
            return jwt.verify(token, this.secretKey);
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                console.error('JWT Error:', error.message);
            } else if (error instanceof jwt.TokenExpiredError) {
                console.error('Token expired:', error.message);
            } else if (error instanceof jwt.NotBeforeError) {
                console.error('Token not active yet:', error.message);
            } else {
                console.error('Unknown error during token verification:', error);
            }
            throw new Error('Invalid or expired token');
        }
    }

    // Middleware to authenticate a token
    async authenticateToken(req: Request, res: Response, next: NextFunction): Promise<void> {
        const authHeader = req.headers['authorization'];
        const tokenString = authHeader && authHeader.split(' ')[1]; // Expected format: "Bearer <token>"

        if (!tokenString) {
            console.log('No token found in the request header');
            res.status(401).json({ success: false, error: 'Access token is missing or invalid' });
            return;
        }

        try {
            // Call the verifyToken method using TokenUtil
            const decoded = this.verifyToken(tokenString);

            // Retrieve the token from the database through the controller
            const tokenRecord = await tokenService.findTokenById(decoded.id);
            if (!tokenRecord || tokenRecord.token !== tokenString) {
                console.log('Token not found or mismatched in the database');
                res.status(401).json({ success: false, error: 'Token not found or revoked' });
                return;
            }

            // Check the token status
            if (tokenRecord.status !== 'valid') {
                console.log('Token has been revoked');
                res.status(401).json({ success: false, error: 'Token has been revoked' });
                return;
            }

            // Check if the token has expired
            if (tokenRecord.expiresAt < new Date()) {
                console.log('Token has expired');
                res.status(401).json({ success: false, error: 'Token has expired' });
                return;
            }

            // Attach the decoded token data to the request
            (req as any).user = decoded;

            // Proceed to the next middleware
            next();
        } catch (error) {
            console.error('Token authentication failed:', error);
            res.status(403).json({ success: false, error: 'Invalid or expired token' });
        }
    }

    // Method to save a token in the database
    async saveToken(token: string, user: User, expiresInHours: number = 3): Promise<Token | null> {
        try {
            return await tokenService.createTokenForUser(token, user, expiresInHours);
        } catch (error) {
            console.error('Error saving token:', error);
            return null;
        }
    }

    // Method to find a token by its ID
    async findTokenById(id: number): Promise<Token | null> {
        try {
            return await tokenService.findTokenById(id);
        } catch (error) {
            console.error('Error finding token by ID:', error);
            return null;
        }
    }

    // Method to find all tokens associated with a user
    async findTokensByUser(user: User): Promise<Token[]> {
        try {
            return await tokenService.findTokensByUser(user) || [];
        } catch (error) {
            console.error('Error finding tokens for user:', error);
            return [];
        }
    }

    // Method to delete a token by its ID
    async deleteTokenById(id: number): Promise<void> {
        try {
            const result = await tokenService.deleteTokenById(id);
            if (!result) {
                console.log('Failed to delete token by ID');
            }
        } catch (error) {
            console.error('Error deleting token by ID:', error);
        }
    }

    // Method to delete all tokens associated with a user
    async deleteTokensByUser(user: User): Promise<void> {
        try {
            const result = await tokenService.deleteTokensByUser(user);
            if (!result) {
                console.log('Failed to delete tokens for user');
            }
        } catch (error) {
            console.error('Error deleting tokens for user:', error);
        }
    }

    // Method to revoke a token by its ID
    async revokeTokenById(id: number): Promise<void> {
        try {
            await tokenService.deleteTokenById(id); // Adjust as needed if you have a specific revoke logic
        } catch (error) {
            console.error('Error revoking token:', error);
        }
    }
    // Method to clear expired or revoked tokens
    async clearExpiredOrRevokedTokens(): Promise<void> {
        try {
            const tokens = await tokenService.findAllTokens();
            
            if (tokens.length === 0) {
                console.log('No tokens found in the database to clear');
                return;
            }
    
            for (const token of tokens) {
                if (token.status === 'revoked' || token.expiresAt < new Date()) {
                    console.log(`Deleting token with ID ${token.id}`);
                    await tokenService.deleteTokenById(token.id);
                }
            }
            console.log('Token cleanup completed');
        } catch (error) {
            console.error('Error clearing tokens:', error);
        }
    }

    // Method to start the token cleaner
    startTokenCleaner(): void {
        // Run the token cleaner every hour
        setInterval(async () => {
            console.log('Clearing expired or revoked tokens ...');
            await this.clearExpiredOrRevokedTokens();
        }, 3600000);
    }
    
}

const tokenController: TokenController = new TokenController();

export { tokenController };
