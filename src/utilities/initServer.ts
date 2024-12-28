import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

import config from '../0.configs/config';
import router from '../5.routes/Router';
import { AppDataSource } from '../0.configs/configFiles/dbConfig';
import { tokenController } from '../4.controllers/TokenController';
import { Logger } from './logger';

export class InitServer {
    private app: Application;
    private PORT: number;
    private logger = new Logger('Initalization');

    constructor(port: number = 3000) {
        this.app = express();
        this.PORT = port;
        
        this.logger.info('InitServer instance created.');
    }

    public async start() {
        this.logger.info('Initializing application...');
        this.validateEnvironment();
        this.configureStaticFiles();
        this.configureMiddlewares();
        this.configureRoutes();
        await this.startServer();
    }

    private validateEnvironment() {
        const configValidation = config.validateEnv();
        if (configValidation.isValid) {
            this.logger.info('Environment variables validation successful.');
        } else {
            this.logger.error(`Missing environment variables: ${configValidation.missingVars.join(', ')}`);
            this.logger.error('Please check your .env file and environment variable configurations.');
            process.exit(1); // Stop the server if essential variables are missing
        }
    }

    private configureStaticFiles() {
        if (config.isFrontendConnected) {
            const frontendPath = path.resolve(__dirname, config.frontendPath);
            this.app.use(express.static(frontendPath));
            this.logger.info(`Serving frontend files from: ${frontendPath}`);
        } else {
            this.logger.info('Frontend connection not detected. Skipping static file serving.');
        }
    }

    private configureMiddlewares() {
        if (!config.isProd()) {
            this.app.use(cors());
            this.logger.info('CORS enabled (development mode).');
        } else {
            this.logger.info('CORS disabled (production mode).');
        }
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.logger.info('Middlewares configured successfully.');
    }

    private configureRoutes() {
        this.logger.info('Configuring routes...');
        this.app.use(router);
        this.logger.info('Routes configured successfully.');
    }

    private async startServer() {
        try {
            await AppDataSource.initialize();
            this.logger.info('Database connection initialized successfully.');

            // Start token cleaner service
            tokenController.startTokenCleaner();
            this.logger.info('Token cleaner service started successfully.');

            this.app.listen(this.PORT, '0.0.0.0', () => {
                this.logger.info(`Server is running at http://localhost:${this.PORT}`);
            });
        } catch (error) {
            this.logger.error('Failed to initialize the database connection:', error);
            process.exit(1);
        }
    }
}
