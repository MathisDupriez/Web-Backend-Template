import bcrypt from 'bcrypt';

class HasherUtil {
    // Method to hash a password
    static async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    }

    // method to verify a password
    static async verify(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }
}

export default HasherUtil;
