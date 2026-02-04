# React Account Manager

A premium React application for user account management, built for the React Interns Interview practical.

## Features

- **User Authentication**: Login and Registration pages (simulated with LocalStorage).
- **Profile Management**: View and Edit user details (Name, Bio, Phone).
- **Modern UI/UX**: Built with **Tailwind CSS** featuring Glassmorphism, responsive design, and smooth transitions.
- **State Management**: Uses React Context API.

## Project Structure

- `src/components`: Reusable components (Navigation).
- `src/pages`: Page components (Login, Register, Profile).
- `src/context`: Authentication context and logic.

## Getting Started

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Technologies

- React 18
- Vite
- **Tailwind CSS** (Replaced Bootstrap for custom styling)
- React Router Dom
- LocalStorage for data persistence

## Notes

- This app uses `localStorage` to simulate a backend database. Clearing your browser cache will remove all registered users.
- Design focuses on a clean, modern aesthetic with glassmorphism effects and Inter typography.
