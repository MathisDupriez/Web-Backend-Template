import { DataSource } from 'typeorm';
import { User } from '../../1.models/UserModel';
import { Token } from '../../1.models/TokenModel';
import Config from '../config'; // Import the Config class
import path from 'path';

const dbPath = path.join(__dirname, '..', '..', '..', 'dev.sqlite');

// Database source configuration based on environment
export const AppDataSource = new DataSource({
    type: Config.typeormConnection as 'sqlite' | 'mariadb', // Specify the type of connection
    ...(Config.typeormConnection === 'sqlite' 
        ? {
            database: 'dev.sqlite', // SQLite database file for development
        }
        : {
            // NOT ALREADY TESTED /!\ DO NOT USE IN PRODUCTION NOW
            host: Config.typeormConfig.host, // MariaDB configuration for production
            port: Config.typeormConfig.port,
            username: Config.typeormConfig.username,
            password: Config.typeormConfig.password,
            database: Config.typeormConfig.database,
        }
    ),
    //synchronize: !Config.isProd(), // Synchronize schema in non-production environments
    synchronize: true, // Synchronize schema in non-production environments
    entities: [User, Token], // List of entities
    logging: false // added to see the sql requests (temporary)
});
