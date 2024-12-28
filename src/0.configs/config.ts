import dotenv from 'dotenv';
import path from 'path';

// Load the main .env file to determine the environment (DEV or PROD)
dotenv.config({ path: path.resolve(__dirname, './.env') });

class Config {
  // Method to load the appropriate environment file (.env.dev or .env.prod) based on the NODE_ENV variable
  static loadEnv(): void {
    // Determine the path of the environment file based on whether it's production or development
    const envFilePath = this.isProd() ? '.env.prod' : '.env.dev';
    // Load the environment variables from the specified file
    dotenv.config({ path: path.resolve(__dirname, './', envFilePath) });
  }

  // Method to check if the current environment is production
  static isProd(): boolean {
    return process.env.NODE_ENV === 'PROD';
  }

  // Method to validate that essential environment variables are present
  static validateEnv(): { isValid: boolean, missingVars: string[] } {
    // List of required environment variables
    const requiredVars = [
      'JWT_SECRET',
      'TYPEORM_CONNECTION',
      'FRONTEND_PATH',
      'FRONTEND_CONNECTED'
    ];
    // Filter out variables that are missing from the environment
    const missingVars = requiredVars.filter((varName) => !process.env[varName]);

    // Return an object indicating if the environment is valid and a list of missing variables (if any)
    return {
      isValid: missingVars.length === 0,
      missingVars,
    };
  }

  // Getter to retrieve the JWT secret from the environment variables
  static get jwtSecret(): string {
    return this.getEnvVariable('JWT_SECRET');
  }

  // Getter to retrieve the TypeORM connection type from the environment variables
  static get typeormConnection(): string {
    return this.getEnvVariable('TYPEORM_CONNECTION');
  }

  // Getter to retrieve the full TypeORM configuration, with defaults for non-critical values
  static get typeormConfig() {
    return {
      host: this.getEnvVariable('TYPEORM_HOST', 'localhost'), // Default to 'localhost' if not specified
      port: parseInt(this.getEnvVariable('TYPEORM_PORT', '3306'), 10), // Default to port 3306 if not specified
      username: this.getEnvVariable('TYPEORM_USERNAME', ''), // Default to an empty string if not specified
      password: this.getEnvVariable('TYPEORM_PASSWORD', ''), // Default to an empty string if not specified
      database: this.getEnvVariable('TYPEORM_DATABASE', ''), // Default to an empty string if not specified
    };
  }

  // Getter to retrieve the frontend path from the environment variables
  static get frontendPath(): string {
    return this.getEnvVariable('FRONTEND_PATH');
  }

  // Getter to check if a frontend is connected based on the environment variable
  static get isFrontendConnected(): boolean {
    const value = this.getEnvVariable('FRONTEND_CONNECTED', 'false');
    return value.toLowerCase() === 'true'; // Convert the string to a boolean
  }

  // Private method to retrieve an environment variable or a default value
  private static getEnvVariable(varName: string, defaultValue?: string): string {
    // Use the nullish coalescing operator to return the value or the default if undefined or null
    const value = process.env[varName] ?? defaultValue;
    // If the value is still undefined or null, log a warning and return an empty string
    if (value === undefined || value === null) {
      console.warn(`Warning: The environment variable ${varName} is missing.`);
      return ''; // Return an empty string if the variable is missing
    }
    return value;
  }
}

// Load the appropriate environment file when the Config class is imported
Config.loadEnv();

export default Config;
