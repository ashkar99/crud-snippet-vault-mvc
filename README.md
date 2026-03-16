# The Capital Vault
A secure, MVC-architected Node.js web application for creating, managing, and storing multiline code snippets. Built in strict adherence to emphasizes cryptographic security, session integrity, and ownership validation.

## Core Features

* **MVC Architecture:** Clean separation of Models, Views, and Controllers.
* **Cryptographic Authentication:** Passwords securely salted and hashed via `bcrypt` prior to database persistence.
* **Session Integrity:** Defends against Session Fixation attacks by regenerating the `express-session` identifier upon login. Secure `httpOnly` cookies restrict client-side script access.
* **Ownership Validation:** Custom authorization middleware ensures users can only Edit or Delete snippets they cryptographically own. (Returns `403 Forbidden` on unauthorized access).
* **PRG Pattern & Flash Messages:** Strict Post/Redirect/Get flow combined with `connect-flash` for seamless UI feedback.
* **Graceful Error Handling:** Custom EJS views for `404 Not Found`, `403 Forbidden`, and `500 Internal Server Error`.
* **Standard JS Compliance:** Zero-tolerance linting via ESLint and Stylelint.

## Tech Stack

* **Backend:** Node.js, Express.js (ESM)
* **Database:** MongoDB, Mongoose v9
* **Views:** EJS, express-ejs-layouts, Bootstrap 5 (CDN)
* **Dev Tools:** Docker, Nodemon, ESLint, JSDoc

## Installation & Setup

### Prerequisites
* **Node.js:** (v20 or higher recommended)
* **npm:** (Node Package Manager)
* **Docker Desktop:** (for running the local MongoDB instance)

### 1. Clone the repository
```bash
git clone https://github.com/ashkar99/crud-snippet-vault-mvc.git
cd crud-snippet-vault-mvc
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setting up the Environment

For detailed instructions on configuring your development environment, please refer to: **[LNU Course Content: HTML, CSS, & JS Dev Tools](https://gitlab.lnu.se/1dv528/course-content/html-css-javascript-dev-tools)**

### 4. Database Initialization
Spin up a local MongoDB container on port 27017:
```bash
docker run -d -p 27017:27017 --name mongodb mongo:8.2.4
```

### 5. Environment Variables

Create a `.env` file in the root directory and configure the following parameters:

```bash
CONNECTION_STRING="mongodb://localhost:27017/snippetapp"
SESSION_SECRET="generate_a_very_long_random_string_here"
PORT=3000
```

### 6. Boot the Server

Start the development server with Nodemon hot-reloading:

```bash
npm run dev
```

Or run the server using:
```bash
npm start
```
Navigate to `http://localhost:3000` in your browser.


## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the server using Nodemon for local development. |
| `npm start` | Starts the server using standard Node (Production mode). |
| `npm run lint` | Runs ESLint, Stylelint, and HTMLHint to audit code quality. |
| `npm run eslint:fix` | Auto-formats code to comply with Standard JS rules. |

## License
This project is licensed under the MIT License, see [LICENSE](LICENSE) for details.