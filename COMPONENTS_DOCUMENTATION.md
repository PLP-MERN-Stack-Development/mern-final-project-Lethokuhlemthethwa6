# Frontend Components Documentation

## Context

### AuthContext.jsx
Location: `src/context/AuthContext.jsx`

**Purpose**: Manages global authentication state across the application.

**Key Features**:
- Stores user data and JWT token in state
- Persists authentication in localStorage
- Provides login, register, and logout functions
- Automatically sets Axios authorization headers
- Custom `useAuth` hook for easy access

**Exported Functions**:
- `login(username, password)` - Authenticates user
- `register(username, password)` - Creates new user account
- `logout()` - Clears authentication data
- `isAuthenticated()` - Returns authentication status
- `user` - Current user object
- `token` - JWT token

---

## Pages

### LoginPage.jsx
Location: `src/pages/LoginPage.jsx`

**Features**:
- Username and password input fields
- Error message display
- Loading state during authentication
- Link to registration page
- Redirects to home page on successful login

**Styling**: Clean form with gradient background, centered layout

---

### RegisterPage.jsx
Location: `src/pages/RegisterPage.jsx`

**Features**:
- Username, password, and confirm password fields
- Client-side password validation
- Password matching check
- Error message display
- Loading state during registration
- Link to login page
- Auto-login after successful registration

**Validations**:
- Password minimum length (6 characters)
- Password confirmation match

---

### HomePage.jsx
Location: `src/pages/HomePage.jsx`

**Features**:
- Displays all posts from all users
- Create new post component (for authenticated users)
- Real-time comment updates via Socket.io
- Navigation header with user info
- Profile and logout buttons
- Responsive layout

**Socket.io Integration**:
- Connects to backend on mount
- Listens for `commentAdded` events
- Updates posts in real-time
- Disconnects on unmount

**State Management**:
- Posts list
- Loading state
- Error handling
- Socket connection

---

### ProfilePage.jsx
Location: `src/pages/ProfilePage.jsx`

**Features**:
- Displays user avatar (first letter of username)
- Shows username and post count
- Filters and displays only current user's posts
- Navigation back to home
- Logout functionality

**Data Fetching**:
- Fetches all posts
- Client-side filtering by user ID

---

## Components

### CreatePost.jsx
Location: `src/components/CreatePost.jsx`

**Features**:
- Textarea for post content
- Submit button with loading state
- Error message display
- Only visible to authenticated users
- Clears input after successful post

**Props**:
- `onPostCreated(newPost)` - Callback when post is created

**API Integration**:
- POST request to `/api/posts`
- Includes JWT token in headers

---

### PostItem.jsx
Location: `src/components/PostItem.jsx`

**Features**:
- Displays post content and author
- Shows creation timestamp
- User avatar (first letter)
- Expandable comments section
- Add comment functionality
- Real-time comment updates via Socket.io

**Props**:
- `post` - Post object to display
- `onCommentAdded(postId, comment)` - Callback for new comments
- `socket` - Socket.io instance for real-time updates

**Styling**:
- Card-based design
- Hover effects
- Nested comments with distinct styling

---

### PostList.jsx
Location: `src/components/PostList.jsx`

**Features**:
- Maps through posts array
- Loading spinner
- Error message display
- Empty state with helpful message
- Passes socket connection to child components

**Props**:
- `posts` - Array of post objects
- `loading` - Boolean loading state
- `error` - Error message string
- `onCommentAdded(postId, comment)` - Comment callback
- `socket` - Socket.io instance

**States Handled**:
- Loading: Shows spinner
- Error: Displays error message
- Empty: Shows "No posts yet" message
- Success: Renders post list

---

### ProtectedRoute.jsx
Location: `src/components/ProtectedRoute.jsx`

**Purpose**: Wrapper component for protected routes.

**Features**:
- Checks authentication status
- Shows loading spinner during auth check
- Redirects to login if not authenticated
- Renders children if authenticated

**Props**:
- `children` - Components to render when authenticated

---

## Routing Structure

### App.jsx
Location: `src/App.jsx`

**Routes**:

**Public Routes**:
- `/login` - LoginPage
- `/register` - RegisterPage

**Protected Routes**:
- `/` - HomePage (requires authentication)
- `/profile` - ProfilePage (requires authentication)

**Special Routes**:
- `*` - Redirects to `/` for unknown routes

**Providers**:
- Wrapped in `BrowserRouter`
- Wrapped in `AuthProvider` for global auth state

---

## API Integration

### Base URL
`http://localhost:5000/api`

### Endpoints Used

**Authentication**:
- `POST /users/login` - User login
- `POST /users/register` - User registration

**Posts**:
- `GET /posts` - Fetch all posts
- `POST /posts` - Create new post (requires auth)

**Comments**:
- `POST /posts/:postId/comments` - Add comment (requires auth)

### Authentication Headers
All protected requests include:
```javascript
headers: {
  'Authorization': `Bearer ${token}`
}
```

---

## Socket.io Integration

### Connection
```javascript
const socket = io('http://localhost:5000');
```

### Events

**Client Emits**:
- `newComment` - When user adds a comment
  ```javascript
  socket.emit('newComment', { postId, comment });
  ```

**Client Listens**:
- `commentAdded` - When any user adds a comment
  ```javascript
  socket.on('commentAdded', ({ postId, comment }) => {
    // Update local state
  });
  ```

---

## Styling

### Tailwind CSS Classes

**Color Scheme**:
- Primary: Blue (blue-500, blue-600, blue-700)
- Danger: Red (red-500, red-600)
- Background: Gray (gray-50, gray-100)
- Text: Gray scale

**Common Patterns**:
- Rounded corners: `rounded-lg`
- Shadows: `shadow-md`, `shadow-xl`
- Transitions: `transition` on interactive elements
- Responsive padding: `px-4 py-2`

**Layout**:
- Max width containers: `max-w-4xl mx-auto`
- Flexbox for alignment
- Grid not used (simple layouts)

---

## Error Handling

All components implement:
- Try-catch blocks for async operations
- Error state management
- User-friendly error messages
- Loading states during operations
- Network error handling

---

## Local Storage

**Stored Items**:
- `token` - JWT authentication token
- `user` - User object (JSON string)

**Cleared On**:
- Logout
- Authentication failure

---

## Best Practices Implemented

✅ Modular component structure
✅ Separation of concerns (pages vs components)
✅ Context API for global state
✅ Protected routes
✅ Loading and error states
✅ Responsive design
✅ Real-time updates with Socket.io
✅ Token-based authentication
✅ Clean UI with Tailwind CSS
✅ Proper error handling
✅ Form validation
