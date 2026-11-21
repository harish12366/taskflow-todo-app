# TaskFlow – React Todo Application

TaskFlow is a modern and responsive Todo Application built using React. It uses the **useReducer Hook** for state management and **Axios with MockAPI.io** for backend integration and persistent data storage.

## Features

- **Add Tasks:** Create tasks with a name and description.
- **View Tasks:** Display all saved tasks.
- **Edit Tasks:** Update existing task details.
- **Delete Tasks:** Remove unwanted tasks.
- **Task Status:** Mark tasks as Completed or Not Completed.
- **Task Filtering:** Filter tasks based on their status.
- **Statistics Dashboard:** View total, completed and pending tasks.
- **Form Validation:** Validate task name and description.
- **Hide / Show Tasks:** Hide or display the task list.
- **Persistent Storage:** Tasks remain available after refreshing the browser.
- **Responsive Design:** Works across desktop, tablet and mobile devices.

## Tech Stack

- React.js
- JavaScript (ES6+)
- CSS3
- Axios
- React Hooks:
  - useState
  - useEffect
  - useReducer
  - useRef
- MockAPI.io (REST API Backend)
- Git & GitHub

## API Operations

| Operation | HTTP Method | Description |
|---|---|---|
| Fetch Tasks | GET | Retrieve all tasks |
| Add Task | POST | Create a new task |
| Edit Task | PUT | Update task details |
| Change Status | PUT | Update task status |
| Delete Task | DELETE | Remove a task |

## Installation and Setup

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Navigate to the project folder**

```bash
cd todoapp-usereducer
```

**3. Install dependencies**

```bash
npm install
```

**4. Install Axios**

```bash
npm install axios
```

**5. Configure MockAPI**

Create a MockAPI project and a resource named `todos`.

Add the following fields:

- name – String
- description – String
- status – String

Update the API base URL in `src/api/todoApi.js` with your MockAPI endpoint.

**6. Start the development server**

```bash
npm run dev
```

## State Management

The application uses the React `useReducer` Hook to manage todo-related state changes.

Reducer actions include:

- SET_TODOS
- ADD_TODO
- UPDATE_TODO
- DELETE_TODO
- SET_LOADING
- SET_ERROR
- CLEAR_ERROR

Axios handles communication with the MockAPI backend, while useReducer updates the application state.

## Project Structure

```text
src/
│
├── api/
│   └── todoApi.js
│
├── components/
│   ├── Header.jsx
│   ├── Main.jsx
│   └── TodoCard.jsx
│
├── App.jsx
├── index.css
└── main.jsx
```

## What I Learned

Through this project, I practiced:

- Building reusable React components.
- Managing application state using useReducer.
- Handling local UI state using useState.
- Using useEffect for API data fetching.
- Integrating REST APIs using Axios.
- Implementing CRUD operations.
- Handling asynchronous operations with async/await.
- Managing API loading and error states.
- Maintaining data persistence using a backend API.
- Building responsive user interfaces.

## Author

Developed as a React practice project to improve frontend development and API integration skills.
