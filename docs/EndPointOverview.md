# API Endpoint Documentation

This documentation describes the various endpoints available in the API, along with their methods, paths, and descriptions.

## Endpoints

### 1. Login

- **Method**: `POST`
- **Path**: `/login`
- **Description**: Authenticates a user using the information provided in the request body.
- **Example Request**:

    ```json
    {
      "email": "johndoe@example.com",
      "password": "yourSecurePassword123"
    }
    ```

- **Response**: Returns a JSON object containing the authentication status.

---

### 2. Register

- **Method**: `POST`
- **Path**: `/register`
- **Description**: Registers a new user using the information provided in the request body.
- **Example Request**:

    ```json
    {
      "firstname": "John",
      "lastname": "Doe",
      "username": "johndoe",
      "password": "yourSecurePassword123",
      "email": "johndoe@example.com",
      "birthdate": "1990-01-01"
    }
    ```

- **Response**: Returns a JSON object containing the registration status.

---

### 3. Movies

#### 3.1 Create a Movie

- **Method**: `POST`
- **Path**: `/movies`
- **Description**: Creates a new movie with the information provided in the request body.
- **Example Request**:

    ```json
    {
      "adult": false,
      "backdrop_path": "/path/to/backdrop.jpg",
      "genre_ids": [1, 2, 3],
      "original_language": "en",
      "original_title": "Original Movie Title",
      "overview": "A brief overview of the movie.",
      "popularity": 12.34,
      "poster_path": "/path/to/poster.jpg",
      "release_date": "2023-01-01",
      "title": "Movie Title",
      "video": false,
      "vote_average": 8.5,
      "vote_count": 100
    }
    ```

- **Response**: Returns a JSON object containing the details of the created movie.

#### 3.2 Find a Movie by ID

- **Method**: `GET`
- **Path**: `/movies/:id`
- **Description**: Retrieves the details of a movie by its identifier.
- **Example Request**: `GET /movies/123`

- **Response**: Returns a JSON object containing the details of the movie.

#### 3.3 Find a Movie by Title

- **Method**: `GET`
- **Path**: `/movies/title/:title`
- **Description**: Retrieves the details of a movie by its title.
- **Example Request**: `GET /movies/title/Inception`

- **Response**: Returns a JSON object containing the details of the movie.

---

### 4. Test

- **Method**: `GET`
- **Path**: `/test`
- **Description**: Test endpoint to check if the API is functioning correctly. Returns a status message.
- **Example Request**: `GET /test`

- **Response**:

    ```json
    {
      "api": "Api is running",
      "message": "Authorized",
      "status": "ok",
      "time": "2024-10-30T10:00:00.000Z" // Example date
    }
    ```

---

### 5. Protected Test

- **Method**: `POST`
- **Path**: `/test`
- **Description**: Protected route that tests the authentication middleware. This route requires an `Authorization` header containing a valid JWT token.

- **Example Request**:

    - **Headers**:
        ```http
        Authorization: Bearer <your_jwt_token>
        ```
        
    - **Headers in json**:
        ```json
        {
          "Authorization": "Bearer yourToken"
        }
        ```
    
    - **Body**:
        ```json
        {
          // Optional body parameters if needed
        }
        ```

- **Response**:

    ```json
    {
      "success": true,
      "status": "You reached the protected route",
      "time": "2024-10-30T10:00:00.000Z", // Example date
      "message": "Access granted",
      "user": {
        "id": "user_id",
        "email": "user@example.com",
        // other user details from the token payload
      }
    }
    ```

- **Notes**:
  - Ensure that the `Authorization` header is formatted as `Bearer <your_jwt_token>`.
  - The token must be valid and not expired for successful authentication.

## Notes

- Ensure that POST requests contain the correct headers, including `Content-Type: application/json`, so that the server can process the data correctly.
- For GET requests, ensure that the URL parameters are properly encoded.