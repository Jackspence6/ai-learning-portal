# AI Learning Portal: Interactive AI and Coding Tutorials

## Description

An interactive platform dedicated to teaching fundamental AI concepts through hands-on tutorials. This app provides a unique learning experience, combining theoretical knowledge with practical coding exercises, making AI learning accessible and engaging.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Usage](#usage)
- [Interactive Features](#interactive-features)
- [API Routes](#api-routes)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

Clone the repository to your local machine:

```
git clone git@github.com:Jackspence6/ai-learning-portal.git
```

Navigate to the application directory and install dependencies:

```
npm install
```

## Configuration

Set up your environment variables. Create a `.env` file in the root directory with the following content:

```
DB_NAME="aiPortal_db"
DB_USER="[your_mysql_username]"
DB_PW="[your_mysql_password]"  
SESS_SECRET="[your_session_secret]"
```

## Database Setup

Create the database using the provided schema:

```
source db/schema.sql
```

Seed the database with initial data:

```
npm run seed
```

## Usage

Start the server and sync the Sequelize models to the MySQL database:

```
npm start
```

The application will be running on `localhost:3001`.

## Interactive Features

### Tutorial Interaction and Code Editing

- Embedded code editors in tutorials for live interaction.
- Preloaded code snippets to illustrate AI concepts.

### Quiz and Assessment Tools

- End-of-tutorial quizzes to test knowledge.
- Immediate feedback on quiz submissions.

### User Progress Tracking

- Track user progress through tutorials.
- Save progress with user accounts.

## API Routes

### Tutorial and Content Management Routes

- `GET /api/tutorials` - Retrieve all tutorials.
- `GET /api/tutorials/:id` - Retrieve a specific tutorial.

### Interactive Code Example Routes

- `GET /api/examples/:tutorialId` - Retrieve code examples for a specific tutorial.
- `POST /api/examples` - Add a new code example (requires authentication).
- `PUT /api/examples/:id` - Update an existing code example (requires authentication).
- `DELETE /api/examples/:id` - Delete a code example (requires authentication).

### Quiz and Assessment Routes

- `GET /api/quizzes/:tutorialId` - Retrieve quizzes for a specific tutorial.
- `POST /api/quizzes` - Create a new quiz (requires authentication).
- `PUT /api/quizzes/:id` - Update an existing quiz (requires authentication).
- `DELETE /api/quizzes/:id` - Delete a quiz (requires authentication).

### User Authentication and Management Routes

- `POST /api/users` - Register a new user.
- `POST /api/users/login` - Authenticate and log in a user.
- `POST /api/users/logout` - Log out a user.

### User Progress Tracking Routes

- `GET /api/users/:userId/progress` - Retrieve a user's learning progress (requires authentication).
- `POST /api/users/:userId/progress` - Update a user's learning progress (requires authentication).

### Error and Miscellaneous Routes

- `GET /api/*` - Handle any unmatched API routes, returning a 404 JSON response.

## Contributing

Contributions are welcome. For major changes, please open an issue first to discuss your suggestions or improvements.

## License

[MIT](LICENSE)

## Contact

GitHub: [Jackspence6](https://github.com/Jackspence6)  
Email: [jackspence.dev@gmail.com](mailto:jackspence.dev@gmail.com)
