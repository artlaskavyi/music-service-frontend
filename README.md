# Music Service - A Pure JavaScript Single-Page Application

This repository contains the frontend for a music catalog application. It is a Single-Page Application (SPA) built with pure JavaScript (ES6+), communicating with a RESTful Java Spring Boot backend.

The application allows users to browse artists and albums, search the catalog, and log in to an account. It also includes an administrative section for user management.

## Frontend Implementation Details

* **Pure JavaScript Implementation:** The application is built entirely with standard JavaScript (ES6+), HTML, and CSS/SCSS, without any external frameworks like React or Vue.
* **Component-Based Rendering:** The UI is constructed from JavaScript functions that act as components (e.g., `artistCard`, `albumCard`) and page templates. These functions generate HTML strings which are then rendered into the DOM.
* **Hash-Based Routing:** Client-side navigation is handled by a lightweight, custom router that uses the `window.location.hash` and the `hashchange` event to load different page content without a full page refresh.
* **Dynamic Content Loading:** All content, such as artist lists, album details, and user information, is fetched from the backend API using the `Fetch API`. The DOM is dynamically updated with the received JSON data.
* **Client-Side State:** User authentication status is managed using `sessionStorage` to persist the session while the browser tab is open.
* **Role-Based UI:** The user interface changes based on user roles (standard user vs. admin). For example, administrative links and pages are only rendered for users with the 'ADMIN' role.
* **API-driven Search:** The search functionality sends a query to the backend `/search` endpoint and then renders the categorized results (artists, albums, songs, etc.) on the client side.

## Frontend Technology Stack

| Category      | Technology / Standard                 | Description                                    |
| ------------- | ------------------------------------- | ---------------------------------------------- |
| Core Language | JavaScript (ES6+)                     | `async/await`, template literals, modules.     |
| Styling       | CSS3 / SCSS                           | Modern styling, compiled to a single CSS file. |
| API Comms     | Fetch API                             | Native browser API for making HTTP requests.   |
| Routing       | Hash-based (`#`)                      | Using `window.location.hash` and `hashchange`. |
| Development   | Node.js / npm                         | For `http-server` and `eslint`.                |
| Linting       | ESLint                                | To ensure code quality and consistency.        |
| Server        | `http-server`                         | A simple, zero-configuration local server.     |

## Project Structure

The project has been converted from a static multi-page site to a Single-Page Application. All static `.html` files (except for the main `index.html`) are now obsolete.