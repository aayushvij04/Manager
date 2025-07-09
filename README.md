# Social Media Content Management System (Manager)

A modern, role-based dashboard application for managing social media content, analytics, and collaborations. Built with HTML, CSS (Bootstrap), and JavaScript, this project simulates a multi-role environment for Admins, Content Creators, and Market Analysts.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [File-by-File Breakdown](#file-by-file-breakdown)
- [How It Works](#how-it-works)
- [Setup & Usage](#setup--usage)
- [Customization](#customization)
- [License](#license)

---

## Project Overview

This application provides a simulated environment for managing social media accounts, posts, analytics, and collaborations. It is designed for demonstration and educational purposes, with all data stored in the browser (no backend required).

---

## Features
- **Role-based Dashboards:** Separate dashboards for Admin, Content Creator, and Market Analyst.
- **Authentication:** Login and signup with role selection (data stored in localStorage).
- **Post Management:** Create, edit, and delete posts for Instagram and X (Twitter).
- **Analytics:** View simulated analytics, follower growth, engagement, and trends.
- **Brand & Product Management:** Content Creators can manage brand affiliations and sponsored products.
- **Follow/Unfollow:** Admins can manage social media connections.
- **Responsive UI:** Modern, mobile-friendly design using Bootstrap and custom CSS.

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

### `frontend/css/styles.css`
- Custom styles for sidebar, dashboard cards, posts, analytics, forms, and responsive adjustments.

### `frontend/js/app.js`
- Initializes the app, manages user sessions, handles login/signup, and loads dashboards based on user role. Provides utility functions for alerts, modals, and user data management.

### `frontend/js/auth.js`
- Handles authentication logic, password visibility, role/permission checks, and simulates backend authentication using localStorage.

### `frontend/js/admin.js`
- Admin dashboard logic: post management (create, edit, delete), follow/unfollow, and overview. Uses modals for user actions and manages posts/comments for both Instagram and X.

### `frontend/js/creator.js`
- Content Creator dashboard logic: manage posts, brand affiliations, and sponsored products. Provides modals for updating brands/products and rendering lists.

### `frontend/js/analyst.js`
- Market Analyst dashboard logic: analytics for Instagram and X, follower growth, engagement, hashtag trends, and chart rendering (Chart.js).

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

---

## License

This project is for educational and demonstration purposes. Please contact the author for licensing details if you wish to use it commercially.