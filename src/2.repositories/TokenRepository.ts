import { AppDataSource } from '../0.configs/configFiles/dbConfig';
import { Token } from '../1.models/TokenModel';
import { User } from '../1.models/UserModel';

class TokenRepository {
    // Method to create a new token and save it to the database
    async createToken(token: Token): Promise<Token> {
        return await AppDataSource.getRepository(Token).save(token);
    }

    // Method to find a token by its ID
    async findTokenById(id: number): Promise<Token | null> {
        return AppDataSource.getRepository(Token).findOne({
            where: { id }
        });
    }

    // Method to find a token by its string value
    async findTokenByTokenString(tokenString: string): Promise<Token | null> {
        return AppDataSource.getRepository(Token).findOne({
            where: { token: tokenString },
            relations: ['user'], // Include user if necessary
        });
    }

    // Method to find all tokens associated with a user
    async findTokensByUser(user: User): Promise<Token[]> {
        return AppDataSource.getRepository(Token).find({
            where: { user }
        });
    }

    // Method to delete a token by its ID
    async deleteTokenById(id: number): Promise<void> {
        await AppDataSource.getRepository(Token).delete({ id });
    }

    // Method to delete all tokens associated with a user
    async deleteTokensByUser(user: User): Promise<void> {
        await AppDataSource.getRepository(Token).delete({ user });
    }

    // Method to revoke a token by its ID
    async revokeToken(id: number): Promise<void> {
        await AppDataSource.getRepository(Token).update({ id }, { status: 'revoked' });
    }

    // Method to find all tokens in the database
    async findAllTokens(): Promise<Token[]> {
        return AppDataSource.getRepository(Token).find();
    }
}

const tokenRepository: TokenRepository = new TokenRepository();

export { tokenRepository };