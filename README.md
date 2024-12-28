Here’s a refined version of your README file with added categories for each useful link:

# 🎬 Movie Choice - API Backend

**School Project - BAC3Q1 HELHA - End of 2024**

This repository contains the backend for a school project that aims to simplify choosing a movie to watch, using *The Movie Database* (TMDB) API to provide users with a wide range of movies and recommendations.

## 🚀 Technologies Used

- **Node.js** with **Express** for server and route management.
- **TypeScript** for robust typing and modern JavaScript features.
- **TypeORM** for database interactions.
- **TMDB API** for real-time movie information retrieval.

## 📂 Configuration

Before launching the project, ensure that the TMDB API and database are correctly configured:

1. **TMDB**: Add your TMDB API key in the configuration file `/src/configs/tmdbConfig.ts`.
2. **Database**: Configure database connection settings in `/src/configs/dbConfig.ts`.

For both development and production environments, the following packages are required:

- **TypeORM**: Install with 
  ```bash
  npm install typeorm --save
  ```
  and import with
  ```typescript
  import "reflect-metadata";
  ```
- **Node Types** (for TypeScript):
  ```bash
  npm install @types/node --save-dev
  ```
- **Database**:
   - **MariaDB** for production:
     ```bash
     npm install mysql --save
     ```
   - **SQLite3** for development:
     ```bash
     npm install sqlite3 --save
     ```

Here's the updated section with a reference to the environment setup documentation:

---

## ⚙️ Installation

To start the project, follow the steps below:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up the environment files:**

   Make sure to set up your environment files correctly. For detailed instructions, please refer to [How to Use Environment Variables](docs/HowToUseEnv.md).

   - Copy the template files to create your `.env` files:
     ```bash
     cp configs/.env.template configs/.env
     cp configs/.env.dev.template configs/.env.dev
     cp configs/.env.prod.template configs/.env.prod
     ```

   - Populate the `.env` files with the necessary values for your environment (DEV or PROD).

3. **Start the server:**
   ```bash
   npm start
   ```

   This will start the server based on the mode set in the `.env` file (`DEV` or `PROD`). Ensure that all required configurations, such as the TMDB API token and database connection details, are correctly set up to avoid connection errors.

---

This directs the user to read the detailed environment setup guide.

This will start the server in production mode. Make sure that all configurations (TMDB, database) are properly set up before starting to avoid connection errors.

## 🔗 Useful Links 

### Documentation

- [File Structure](docs/FileSystemExplanation.md)
- [Explanation of Error Codes](docs/ErrorCodeSystem.md)
- [Endpoint Overview](docs/EndPointOverview.md)

### Additional Resources

- **TMDB API Documentation**: [TMDB API](https://developers.themoviedb.org/)
- **TypeORM Documentation**: [TypeORM](https://typeorm.io/#/)
- **Express Documentation**: [Express](https://expressjs.com/)

### Notes ✍️

- **Modularity**: Each layer is separated to enhance code readability, maintainability, and scalability.
- **Extensibility**: Additional features or resources can be added by creating new files within the `controllers`, `services`, `repositories`, and `routes` directories.