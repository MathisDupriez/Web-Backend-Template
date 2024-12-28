import { tokenRepository } from '../2.repositories/TokenRepository';
import { Token } from '../1.models/TokenModel';
import { User } from '../1.models/UserModel';

class TokenService {
    // Create a new token for a user in the database
    async createTokenForUser(tokenData: string, user: User, expiresInHours: number = 3): Promise<Token | null> {
        try {
            const token = new Token();
            token.token = tokenData;
            token.user = user;
            token.expiresAt = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);
            token.status = 'valid';
            
            return await tokenRepository.createToken(token);
        } catch (error) {
            console.error('Error creating token:', error);
            return null;
        }
    }

    // Find a token by ID
    async findTokenById(id: number): Promise<Token | null> {
        try {
            return await tokenRepository.findTokenById(id);
        } catch (error) {
            console.error('Error finding token by ID:', error);
            return null;
        }
    }

    // Find all tokens associated with a user
    async findTokensByUser(user: User): Promise<Token[] | null> {
        try {
            return await tokenRepository.findTokensByUser(user);
        } catch (error) {
            console.error('Error finding tokens for user:', error);
            return null;
        }
    }

    // Delete a token by ID
    async deleteTokenById(id: number): Promise<boolean> {
        try {
            await tokenRepository.deleteTokenById(id);
            return true;
        } catch (error) {
            console.error('Error deleting token by ID:', error);
            return false;
        }
    }

    // Delete all tokens associated with a user
    async deleteTokensByUser(user: User): Promise<boolean> {
        try {
            await tokenRepository.deleteTokensByUser(user);
            return true;
        } catch (error) {
            console.error('Error deleting tokens for user:', error);
            return false;
        }
    }

    // Find all tokens
    async findAllTokens(): Promise<Token[]> {
        try {
            return await tokenRepository.findAllTokens();
        } catch (error) {
            console.error('Erreur lors de la récupération de tous les tokens:', error);
            return [];
        }
    }
}

const tokenService: TokenService = new TokenService();

export { tokenService };