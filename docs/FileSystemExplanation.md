# Project File Structure Documentation

## Overview

This documentation outlines the file structure for the **WebB3Q1_Dupriez_Lamri_BACKEND** project located at `C:\Users\matdu\Documents\WebProject\WebB3Q1_Dupriez_Lamri_BACKEND\src`. The project is organized into several directories, each serving a specific purpose.

```
src/
├── configs/               # Application configurations
│   ├── dbConfig.ts        # Database connection and setup
│   └── tmdbConfig.ts      # Configuration for accessing the TMDB API (tokens, endpoints, etc.)
├── controllers/           # HTTP request handlers (controllers)
│   ├── movieController.ts  # Controller handling movie-related requests
│   ├── tokenController.ts  # Controller for token management
│   └── userController.ts   # Controller handling user-related requests
├── models/                # Data models and schemas
│   ├── movieModel.ts       # Model for movie entity
│   ├── serieModel.ts       # Model for series entity
│   ├── tokenModel.ts       # Model for token entity
│   └── userModel.ts        # Model for user entity
├── repositories/          # Data access layer (repositories following DAO pattern)
│   ├── movieRepository.ts   # Repository for managing movie interactions
│   ├── tokenRepository.ts   # Repository for managing token interactions
│   └── userRepository.ts    # Repository for managing user interactions
├── routes/                # API route definitions
│   ├── Router.ts           # Main routing file
│   └── endPoints/          # Subdirectory for specific API route definitions
│       ├── loginPath.ts    # Endpoint for user login
│       ├── moviesPath.ts   # Endpoint for movie-related operations
│       ├── registerPath.ts  # Endpoint for user registration
│       ├── seriesPath.ts   # Endpoint for series-related operations
│       └── testPath.ts     # Endpoint for testing purposes
├── services/              # Business logic and service layer
│   ├── loginService.ts     # Service for handling login operations
│   └── registerServices.ts  # Service for handling registration operations
├── utils/                 # Utility functions and classes
│   └── hasher.ts           # Utility for hashing data
└── server.ts              # Server entry point, starts and configures the Express application
```

### Detailed File Explanations

- **configs/**
  - **dbConfig.ts**: Contains the database connection settings and setup logic, including connection strings and configuration parameters for establishing a connection to the database.
  - **tmdbConfig.ts**: Holds configuration settings for accessing the TMDB (The Movie Database) API, including API tokens, endpoints, and other related settings.

- **controllers/**
  - **movieController.ts**: Manages the HTTP requests related to movie operations, handling actions such as fetching, creating, updating, and deleting movie records.
  - **tokenController.ts**: Handles token-related operations, including generating, validating, and refreshing tokens used for user authentication.
  - **userController.ts**: Manages user-related requests, such as registering new users, logging in, and managing user profiles.

- **models/**
  - **movieModel.ts**: Defines the data structure and schema for the movie entity, including properties and methods relevant to movie data manipulation.
  - **serieModel.ts**: Represents the schema for series entities, including attributes and methods for managing series data.
  - **tokenModel.ts**: Represents the data structure for tokens, including properties related to user authentication and session management.
  - **userModel.ts**: Defines the user entity schema, detailing user attributes and methods for handling user data.

- **repositories/**
  - **movieRepository.ts**: Implements data access methods for movie interactions with the database, including CRUD (Create, Read, Update, Delete) operations.
  - **tokenRepository.ts**: Manages interactions related to token storage and retrieval, providing methods for accessing and manipulating token data.
  - **userRepository.ts**: Handles data access for user entities, implementing methods for managing user data in the database.

- **routes/**
  - **Router.ts**: Main routing file that connects the application routes to their respective controllers, handling incoming HTTP requests and directing them to the appropriate handlers.
  - **endPoints/**: Subdirectory containing specific route definitions for various API endpoints.
    - **loginPath.ts**: Defines the route for user login operations, mapping requests to the appropriate controller methods.
    - **moviesPath.ts**: Contains routes related to movie operations, directing requests for movie data to the corresponding controller functions.
    - **registerPath.ts**: Handles routes for user registration, mapping requests to the user registration controller.
    - **seriesPath.ts**: Defines routes for managing series-related operations, directing requests to the relevant controller methods.
    - **testPath.ts**: Provides routes for testing purposes, often used for development and debugging.

- **services/**
  - **loginService.ts**: Contains business logic for handling login operations, such as validating credentials and managing session data.
  - **registerServices.ts**: Manages the business logic associated with user registration, including data validation and user creation.

- **utils/**
  - **hasher.ts**: A utility file for hashing data, typically used for securely storing passwords and sensitive information.

- **server.ts**: The entry point of the application that starts and configures the Express server, setting up middleware, routes, and other essential configurations.
