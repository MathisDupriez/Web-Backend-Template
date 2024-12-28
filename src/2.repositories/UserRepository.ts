import { AppDataSource } from '../0.configs/configFiles/dbConfig';
import { User } from '../1.models/UserModel';

class UserRepository {
    // Method to create a new user
    async createUser(user: User): Promise<User> {
        return await AppDataSource.getRepository(User).save(user);
    }

    // Method to find a user by id
    async findUserById(id: number): Promise<User | null> {
        return AppDataSource.getRepository(User).findOne({
            where: { id }
        });
    }

    // Method to find a user by username
    async findUserByUsername(username: string): Promise<User | null> {
        return AppDataSource.getRepository(User).findOne({
            where: { username }
        });
    }

    // Method to find a user by email
    async findUserByEmail(email: string): Promise<User | null> {
        return AppDataSource.getRepository(User).findOne({
            where: { email }
        });
    }
}

const userRepository : UserRepository = new UserRepository();

export { userRepository };