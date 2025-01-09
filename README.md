# Recipe Sharing Platform

## Overview
This project is a fully functional web application that allows users to share and explore recipes. With interactive features, it aims to provide a seamless experience for discovering and contributing culinary creations. Users can register, log in, search for recipes, rate them, and even upload their own.

## Features

### Homepage
- **Frontend**:
  - Displays the top 3 rated recipes in the “Top Rated Recipes” section.
  - Includes a contact form for user feedback.
- **Backend**:
  - Provides an endpoint to fetch the top 3 recipes sorted by rating.

### User Profile Page
- **Frontend**:
  - Shows the logged-in user's details in an interactive card.
  - Includes a button to navigate to the recipe addition page.
- **Backend**:
  - Provides user-specific details and manages authentication to ensure secure access.

### Register & Login
- **Frontend**:
  - Registration page with fields like name, phone, email, and password.
  - Login page with email and password fields.
  - Data persistence using local storage or cookies.
  - Feedback for successful registration/login or errors.
- **Backend**:
  - Endpoints for user registration and login with token-based authentication (e.g., JWT).
  - Includes functionality for password reset.

### Recipe Page & Search
- **Frontend**:
  - Displays a scrollable list of all recipes with name, rating, and other details.
  - Includes search, filter, and sort functionalities for improved navigation.
  - Allows users to delete their own recipes.
- **Backend**:
  - Endpoint to fetch all available recipes.
  - Search functionality by multiple fields, including username.
  - Voting system for recipes with hover and click interactions to rate recipes.
  - Restricts users from voting multiple times for the same recipe.

### Recipe Addition Page
- **Frontend**:
  - Form with fields like name and description for adding new recipes.
  - Confirmation or error messages based on the success of the operation.
  - Image upload functionality for recipes.
- **Backend**:
  - Endpoint to accept and store new recipe data.

## Technical Details

### Endpoints
1. **Authentication**:
   - `/register`: Handles user registration.
   - `/login`: Handles user login and token generation.
2. **Homepage**:
   - `/recipes/top`: Fetches the top 3 rated recipes.
3. **Recipes**:
   - `/recipes`: Fetches all recipes.
   - `/recipes/add`: Adds a new recipe.
   - `/recipes/vote`: Records a vote for a recipe.
4. **User Profile**:
   - `/user`: Fetches user-specific details.

## Development Details

### Tools & Technologies
- **Frontend**:
  - React for UI development.
  - Figma for design and mockups.
- **Backend**:
  - Node.js with Express.js for server-side logic.
  - Database: PostgreSQL or MongoDB.
- **Authentication**:
  - JSON Web Tokens (JWT) for secure user authentication.

## How to Run the Project
1. Clone the repository.
2. Set up the database schema using the provided migration files.
3. Install dependencies for both frontend and backend:

4. Start the development servers:
- Frontend: `npm run dev`
- Backend: `npm run utzu`
5. Access the application at `http://localhost:3000`.

## Lessons Learned
During this project, the following skills were enhanced:
- Building full-stack web applications.
- Designing responsive and user-friendly interfaces with React.
- Implementing secure authentication with JWT.
- Developing and testing RESTful APIs.
- Managing database schemas for relational and non-relational databases.

## Future Improvements
- Adding social login functionality (e.g., Google, Facebook).
- Implementing recipe categories for better organization.
- Enhancing the rating system with weighted averages.

## Acknowledgments
- The project team and mentors for their guidance and support.
- Open-source communities for the tools and libraries used in the development.
