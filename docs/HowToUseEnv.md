# How to Use Environment Variables in This Project

Environment variables are essential for managing configurations that vary between development and production environments. This project uses `.env` files to securely store these variables and switch between configurations based on the environment.

## Directory Structure
The `configs` directory contains several environment-related files:
- **`.env`**: Main file that specifies the current environment (`PROD` or `DEV`).
- **`.env.dev`**: File for development-specific environment variables.
- **`.env.prod`**: File for production-specific environment variables.
- **`.env.template`**, **`.env.dev.template`**, **`.env.prod.template`**: Template files that outline the required environment variables.

## Setting Up Environment Variables

### Step 1: Copy Template Files
Since the `.env` files are included in `.gitignore`, they are not stored in version control for security reasons. You need to create your `.env.dev` and `.env.prod` files by copying the templates provided.

1. **Copy the templates**:
   - Copy the content from `.env.template` to create your main `.env` file.
   - Copy the content from `.env.dev.template` to create your `.env.dev` file.
   - Copy the content from `.env.prod.template` to create your `.env.prod` file.

   ```bash
   cp configs/.env.template configs/.env
   cp configs/.env.dev.template configs/.env.dev
   cp configs/.env.prod.template configs/.env.prod
   ```

### Step 2: Populate the Environment Files
Fill in the necessary values for each environment file:

**Example for `.env.dev`**:
```env
TYPEORM_CONNECTION=sqlite  # Specifies the type of database connection (e.g., sqlite, mariadb)
TYPEORM_DATABASE=./dev.sqlite  # Path to the SQLite database file for development
TMDB_API_TOKEN=your_dev_tmdb_token  # API token for accessing TMDB services
JWT_SECRET=your_dev_jwt_secret  # Secret key for signing JWTs in development
FRONTEND_PATH=../testFile  # Path to the frontend build directory for development
FRONTEND_CONNECTED=false  # Indicates whether the frontend is connected (true or false)
```

**Example for `.env.prod`**:
```env
TYPEORM_CONNECTION=mariadb  # Specifies the type of database connection (e.g., sqlite, mariadb)
TYPEORM_HOST=your_mariadb_host  # Host address of the MariaDB database for production
TYPEORM_PORT=your_mariadb_port  # Port number for connecting to the MariaDB database
TYPEORM_USERNAME=your_mariadb_username  # Username for the MariaDB database connection
TYPEORM_PASSWORD=your_mariadb_password  # Password for the MariaDB database connection
TYPEORM_DATABASE=your_mariadb_database  # Name of the MariaDB database
TMDB_API_TOKEN=your_prod_tmdb_token  # API token for accessing TMDB services in production
JWT_SECRET=your_prod_jwt_secret  # Secret key for signing JWTs in production
FRONTEND_PATH=./path/to/frontend  # Path to the frontend build directory for production
FRONTEND_CONNECTED=false  # Indicates whether the frontend is connected (true or false)
```

### Step 3: Set the Environment Mode
Edit the main `.env` file to specify the current environment mode:
```env
NODE_ENV=DEV  # or PROD
```

## Validation and Loading
- The application automatically loads and validates the environment variables using the `Config` class during startup.
- If any required variables are missing, an error message will be displayed, and the server will stop running to prevent misconfiguration.

## Environment Variable Definitions
- **TYPEORM_CONNECTION**: Specifies the type of database connection (e.g., `sqlite`, `mariadb`).
- **TYPEORM_DATABASE**: Path to the database file (in development) or database name (in production).
- **TYPEORM_HOST**: Host address of the database (used in production).
- **TYPEORM_PORT**: Port number for the database connection (used in production).
- **TYPEORM_USERNAME**: Username for connecting to the database (used in production).
- **TYPEORM_PASSWORD**: Password for the database connection (used in production).
- **TMDB_API_TOKEN**: API token for accessing The Movie Database (TMDB) services.
- **JWT_SECRET**: Secret key for signing and verifying JSON Web Tokens (JWT).
- **FRONTEND_PATH**: Path to the directory where the frontend build files are stored.
- **FRONTEND_CONNECTED**: Boolean indicating whether a frontend is connected to the backend.

## Important Notes
- **Keep your environment files private**: Ensure `.env`, `.env.dev`, and `.env.prod` are listed in your `.gitignore` file to avoid exposing sensitive data in your repository.
- **Manual setup required**: Since the `.env` files are not committed to the repository, remember to manually copy and set up these files when setting up the project on a new machine or environment.

## Troubleshooting
- **Environment not loading**: Double-check that the paths to your `.env` files are correct and that the `NODE_ENV` variable is set properly.
- **Missing variables**: If the server logs indicate missing variables, verify that your `.env` files contain all required keys.

## Example Workflow
1. Copy the content of `.env.dev.template` to create your `.env.dev`.
2. Populate `.env.dev` with your development environment values.
3. Set `NODE_ENV=DEV` in `.env` and start the server for development.
4. Repeat the process for production with `.env.prod` and `NODE_ENV=PROD`.

---

This documentation ensures you have all the necessary steps for setting up and using environment variables securely and effectively.