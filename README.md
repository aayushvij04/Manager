# Social Media Content Management System (Manager)

A modern, role-based dashboard application for managing social media content, analytics, and collaborations. Built with HTML, CSS (Bootstrap), and JavaScript, this project simulates a multi-role environment for Admins, Content Creators, and Market Analysts.

---

## Project Description

**Manager** is a browser-based social media management platform designed for teams and individuals who want to simulate the workflow of managing multiple social media accounts. The application provides:
- **Role-based access** for Admins, Content Creators, and Market Analysts, each with their own dashboard and permissions.
- **Post creation, editing, and analytics** for Instagram and X (Twitter), including simulated engagement and follower statistics.
- **Brand and product management** for creators, and advanced analytics for analysts.
- **No backend required:** All data is stored in the browser using localStorage, making it ideal for demos, prototyping, and educational use.

### What Does This Project Do?
- Allows users to sign up and log in as one of three roles: Admin, Content Creator, or Market Analyst.
- Each role sees a custom dashboard tailored to their needs:
  - **Admins** can manage all posts, follow/unfollow users, and oversee the platform.
  - **Content Creators** can create posts, manage their brand affiliations, and track sponsored products.
  - **Market Analysts** can view and analyze simulated social media data, trends, and engagement metrics.
- The UI is responsive and modern, using Bootstrap and custom CSS for a professional look.
- All features are simulated for demonstration purposes—no real social media integration or server-side logic.

---

## Table of Contents
- [Project Description](#project-description)
- [Demo Walkthrough](#demo-walkthrough)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [File-by-File Breakdown](#file-by-file-breakdown)
- [How It Works](#how-it-works)
- [Setup & Usage](#setup--usage)
- [Customization](#customization)
- [License](#license)

---

## Demo Walkthrough

1. **Sign Up:**
   - Choose a username, password, and select your role (Admin, Content Creator, Market Analyst).
2. **Login:**
   - Enter your credentials to access your personalized dashboard.
3. **Dashboard:**
   - The sidebar and main content area change based on your role.
   - Admins can manage all users' posts and connections.
   - Creators can create posts, manage brands, and sponsored products.
   - Analysts can view analytics, trends, and generate charts.
4. **Post Management:**
   - Create, edit, or delete posts for Instagram and X.
   - View recent posts and engagement stats.
5. **Analytics:**
   - Market Analysts can view simulated growth, engagement, and hashtag trends with interactive charts.
6. **Brand/Product Management:**
   - Creators can update their brand affiliations and sponsored products.
7. **Logout:**
   - Securely log out and return to the login screen.

---

## Features
- **Role-based Dashboards:** Separate dashboards for Admin, Content Creator, and Market Analyst.
- **Authentication:** Login and signup with role selection (data stored in localStorage).
- **Post Management:** Create, edit, and delete posts for Instagram and X (Twitter).
- **Analytics:** View simulated analytics, follower growth, engagement, and trends.
- **Brand & Product Management:** Content Creators can manage brand affiliations and sponsored products.
- **Follow/Unfollow:** Admins can manage social media connections.
- **Responsive UI:** Modern, mobile-friendly design using Bootstrap and custom CSS.
- **No Backend Required:** All data is stored in the browser for easy demo and testing.

---

## Technologies Used
- **HTML5**: Semantic markup for structure.
- **CSS3 & Bootstrap 5**: Responsive, modern UI and layout.
- **Bootstrap Icons**: For visually appealing icons.
- **JavaScript (ES6+)**: Application logic, role management, and UI interactivity.
- **Chart.js**: For rendering analytics and trends charts.
- **localStorage**: For simulating persistent user data and posts.

---

## Project Structure

```
Manager/
├── frontend/
│   ├── css/
│   │   └── styles.css         # Custom styles for dashboard and UI
│   ├── js/
│   │   ├── admin.js           # Admin dashboard logic
│   │   ├── analyst.js         # Market Analyst dashboard logic
│   │   ├── app.js             # Main app logic (init, login, signup, dashboard)
│   │   ├── auth.js            # Authentication and role/permission utilities
│   │   └── creator.js         # Content Creator dashboard logic
│   └── index.html             # Main HTML entry point
├── README.md                  # Project documentation
└── render.yaml                # Deployment configuration (Render.com)
```

---

## User Roles

- **Admin:**
  - Full access to post management, follow/unfollow, and dashboard overview.
- **Content Creator:**
  - Manage posts, brand affiliations, and sponsored products.
- **Market Analyst:**
  - View analytics, trends, and platform statistics.

---

## File-by-File Breakdown

### `frontend/index.html`
- Main HTML file. Loads Bootstrap, icons, and all JS modules. Contains login/signup forms, dashboard container, sidebar, and modal for actions.
- Dynamically loads dashboard content and sidebar based on user role.

### `frontend/css/styles.css`
- Custom styles for sidebar, dashboard cards, posts, analytics, forms, and responsive adjustments.
- Ensures a modern, clean, and responsive look for all devices.

### `frontend/js/app.js`
- Initializes the app, manages user sessions, handles login/signup, and loads dashboards based on user role.
- Provides utility functions for alerts, modals, and user data management.
- Handles session persistence and role-based UI logic.

### `frontend/js/auth.js`
- Handles authentication logic, password visibility, role/permission checks, and simulates backend authentication using localStorage.
- Provides role name mapping and permission checks for actions based on user role.

### `frontend/js/admin.js`
- Admin dashboard logic: post management (create, edit, delete), follow/unfollow, and overview.
- Uses modals for user actions and manages posts/comments for both Instagram and X.
- Allows admins to manage all users' posts and connections.

### `frontend/js/creator.js`
- Content Creator dashboard logic: manage posts, brand affiliations, and sponsored products.
- Provides modals for updating brands/products and rendering lists.
- Allows creators to track their collaborations and sponsorships.

### `frontend/js/analyst.js`
- Market Analyst dashboard logic: analytics for Instagram and X, follower growth, engagement, hashtag trends, and chart rendering (Chart.js).
- Simulates analytics data and renders interactive charts for trends and engagement.

### `render.yaml`
- Deployment configuration for Render.com or similar PaaS. (Not required for local demo.)

---

## How It Works

- **Authentication:**
  - Users sign up or log in, selecting a role. Credentials and user data are stored in localStorage.
  - On login, the dashboard and sidebar are dynamically loaded based on the user's role.

- **Dashboard:**
  - Each role sees a different dashboard with relevant features and analytics.
  - All data (posts, brands, analytics) is simulated and stored in the browser.

- **UI/UX:**
  - Responsive design with Bootstrap and custom CSS for a modern look and feel.
  - Modals and alerts provide feedback and interactivity.

---

## Setup & Usage

1. **Clone the repository:**
   ```sh
   git clone https://github.com/aayushvij04/Manager.git
   cd Manager/frontend
   ```
2. **Open `index.html` in your browser.**
   - No build step or backend required.
   - All features work in the browser using localStorage.

---

## Customization
- You can extend the logic in the JS files to connect to a real backend, add more roles, or enhance analytics.
- For production use, implement secure authentication and server-side data storage.
- The UI and features can be easily adapted for real-world use cases or further prototyping.

---

## License

This project is for educational and demonstration purposes. Please contact the author for licensing details if you wish to use it commercially.