# Task Management System

A full-stack task management system that allows users to create, edit, delete, and prioritize tasks. The application features drag-and-drop functionality and authentication mechanisms.

## Features

- User Authentication (Register/Login)
- Task CRUD operations
- Task prioritization with drag-and-drop support
- Pagination for tasks
- Filter tasks by priority
- Status update for tasks (Pending/Completed)
- Responsive UI with TailwindCSS

---

## Screenshots

### Login Page
![Login Page](screenshots/login_page.png)

### Register Page
![Register Page](screenshots/register_page.png)

### Dashboard - Task List
![Dashboard Task List](screenshots/dashboard_task_list.png)

### Task Details Modal
![Task Details Modal](screenshots/task_details_modal.png)

---

## Tech Stack

### Frontend
- React.js
- TailwindCSS

### Backend
- Node.js
- Express.js
- MongoDB

---

## Installation

### Prerequisites

- Node.js (v14 or above)
- MongoDB (local or cloud instance)

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository/task-management-system.git
   ```

2. Navigate to the project directory:
   ```bash
   cd task-management-system
   ```

3. Install dependencies for the backend:
   ```bash
   cd server
   npm install
   ```

4. Configure environment variables in `server/.env`:
   ```env
   PORT=5000
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

5. Start the backend server:
   ```bash
   npm start
   ```

6. Navigate to the `client` directory and install dependencies:
   ```bash
   cd ../client
   npm install
   ```

7. Start the React development server:
   ```bash
   npm start
   ```

8. Open your browser and visit:
   ```
   http://localhost:3000
   ```

---

## API Endpoints

### Authentication

- **POST** `/api/auth/register`
  - Registers a new user.
  - **Request Body:**
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

- **POST** `/api/auth/login`
  - Logs in a user.
  - **Request Body:**
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```

### Tasks

- **GET** `/api/tasks`
  - Retrieves all tasks for the authenticated user.

- **POST** `/api/tasks`
  - Creates a new task.
  - **Request Body:**
    ```json
    {
      "title": "New Task",
      "description": "Task description",
      "dueDate": "2024-12-31",
      "priority": "high"
    }
    ```

- **PUT** `/api/tasks/:id`
  - Updates an existing task.
  - **Request Body:**
    ```json
    {
      "title": "Updated Task",
      "status": "completed"
    }
    ```

- **DELETE** `/api/tasks/:id`
  - Deletes a task.

---

## Deployment

### Backend
- Use platforms like Heroku, Render, or AWS.
- Ensure environment variables are set up in the platform.

### Frontend
- Deploy using Vercel, Netlify, or any static hosting platform.
- Ensure the `baseURL` in the `api.js` file points to your deployed backend.

---

## Contributing

Contributions are welcome! Please follow the guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

---

## Acknowledgments

Special thanks to all contributors and open-source libraries that made this project possible.
