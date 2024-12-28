import { userRepository } from '../2.repositories/UserRepository';
import { User } from '../1.models/UserModel';

class UserService {
    // Create a new user
    async createUser(userData: User): Promise<User | null> {
        try {
            const user = await userRepository.createUser(userData);
            return user; // Return the user object
        } catch (error) {
            console.error('Error creating user:', error);
            return null; 
        }
    }

    // Find a user by id
    async findUserById(id: number): Promise<User | null> {
        try {
            return await userRepository.findUserById(id);
        } catch (error) {
            console.error('Error finding user by ID:', error);
            return null; 
        }
    }

    // Find a user by username
    async findUserByUsername(username: string): Promise<User | null> {
        try {
            return await userRepository.findUserByUsername(username);
        } catch (error) {
            console.error('Error finding user by username:', error);
            return null; 
        }
    }

    // Find a user by email
    async findUserByEmail(email: string): Promise<User | null> {
        try {
            return await userRepository.findUserByEmail(email);
        } catch (error) {
            console.error('Error finding user by email:', error);
            return null; 
        }
    }

}

const userService : UserService = new UserService();

export { userService };