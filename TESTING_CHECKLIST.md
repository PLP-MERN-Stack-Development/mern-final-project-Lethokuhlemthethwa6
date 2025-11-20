# Testing Checklist

Use this checklist to verify all features are working correctly.

## Prerequisites
- [ ] Backend server is running on port 5000
- [ ] Frontend dev server is running on port 5173
- [ ] MongoDB is connected
- [ ] No console errors in browser

---

## 1. User Registration

- [ ] Navigate to `/register`
- [ ] Enter a username (e.g., "testuser")
- [ ] Enter a password (at least 6 characters)
- [ ] Enter matching password in confirm field
- [ ] Click "Sign Up"
- [ ] Should redirect to home page
- [ ] Should see "Hi, testuser!" in header

### Error Cases
- [ ] Password less than 6 characters shows error
- [ ] Non-matching passwords show error
- [ ] Duplicate username shows error message

---

## 2. User Login

- [ ] Click logout
- [ ] Navigate to `/login`
- [ ] Enter correct username and password
- [ ] Click "Sign In"
- [ ] Should redirect to home page
- [ ] Should remain logged in after page refresh

### Error Cases
- [ ] Wrong password shows error message
- [ ] Non-existent username shows error
- [ ] Empty fields prevent submission

---

## 3. Authentication Persistence

- [ ] Login to the application
- [ ] Refresh the page (F5)
- [ ] Should still be logged in
- [ ] Should see username in header
- [ ] Close browser and reopen
- [ ] Navigate to the app URL
- [ ] Should still be logged in

---

## 4. Protected Routes

- [ ] Logout of the application
- [ ] Try to access `/` directly
- [ ] Should redirect to `/login`
- [ ] Try to access `/profile` directly
- [ ] Should redirect to `/login`

---

## 5. Create Post

- [ ] Login to the application
- [ ] On home page, find "What's on your mind?" input
- [ ] Type some text (e.g., "My first post!")
- [ ] Click "Post" button
- [ ] Post should appear at the top of the feed
- [ ] Post should show your username
- [ ] Post should show timestamp

### Error Cases
- [ ] Empty post shows error or button is disabled
- [ ] Loading state shows "Posting..." during submission

---

## 6. View Posts

- [ ] Home page shows all posts
- [ ] Posts are sorted by newest first
- [ ] Each post shows:
  - [ ] User avatar (first letter of username)
  - [ ] Username
  - [ ] Post content
  - [ ] Timestamp
  - [ ] Comments count

---

## 7. Add Comments

- [ ] Click "Show Comments" on a post
- [ ] Comments section expands
- [ ] Type a comment in the input field
- [ ] Click "Comment" button
- [ ] Comment appears immediately
- [ ] Comment shows your username
- [ ] Comment shows timestamp

### Error Cases
- [ ] Empty comment doesn't submit
- [ ] Loading state shows "..." during submission

---

## 8. Real-time Comment Updates (Socket.io)

**Setup**: Open the app in TWO different browser windows

Window 1:
- [ ] Login as user1
- [ ] Keep on home page

Window 2:
- [ ] Login as user2 (or use incognito mode)
- [ ] Navigate to home page

**Test**:
- [ ] In Window 2, add a comment to any post
- [ ] Comment appears immediately in Window 2
- [ ] Comment appears immediately in Window 1 (without refresh!)
- [ ] Both windows show the same comment
- [ ] Username is correct in both windows

---

## 9. Profile Page

- [ ] Login to the application
- [ ] Click "Profile" in header
- [ ] Should navigate to `/profile`
- [ ] Should see large user avatar
- [ ] Should see username
- [ ] Should see post count
- [ ] Should see only YOUR posts (not others' posts)

**Test with multiple users**:
- [ ] Create posts from different accounts
- [ ] Each profile should only show that user's posts

---

## 10. Logout

- [ ] Click "Logout" button in header
- [ ] Should redirect to `/login`
- [ ] Token should be removed from localStorage
- [ ] Accessing `/` should redirect to login
- [ ] Cannot access protected routes

---

## 11. Navigation

- [ ] From home page, click "Profile" → goes to profile
- [ ] From profile page, click "Home" → goes to home
- [ ] From login page, click "Sign up" → goes to register
- [ ] From register page, click "Sign in" → goes to login
- [ ] Click browser back button → navigates correctly
- [ ] Direct URL access works for all routes

---

## 12. UI/UX

- [ ] All buttons have hover effects
- [ ] Forms have focus states on inputs
- [ ] Loading spinners appear during async operations
- [ ] Error messages are clearly visible (red background)
- [ ] Layout is centered and looks clean
- [ ] Responsive on different screen sizes
- [ ] No layout shifts or jumps

---

## 13. Console Checks

Open browser DevTools (F12) and check:

**Console Tab**:
- [ ] No JavaScript errors
- [ ] Socket.io connection successful
- [ ] "New client connected" message (if backend logs are visible)

**Network Tab**:
- [ ] All API calls return 200/201 status
- [ ] Authorization headers present on protected routes
- [ ] WebSocket connection established for Socket.io

**Application Tab** (localStorage):
- [ ] `token` is present when logged in
- [ ] `user` object is present when logged in
- [ ] Both are removed after logout

---

## 14. Error Handling

**Network Errors**:
- [ ] Stop backend server
- [ ] Try to login → shows error message
- [ ] Try to create post → shows error message
- [ ] Error messages are user-friendly

**Invalid Data**:
- [ ] Submit form with invalid data → shows validation error
- [ ] Malformed requests show appropriate errors

---

## 15. Performance

- [ ] Initial page load is quick
- [ ] Posts load without noticeable delay
- [ ] Comments appear instantly
- [ ] No lag when typing in forms
- [ ] Smooth transitions and animations

---

## Common Issues & Solutions

### "Cannot connect to server"
✅ Check backend is running on port 5000
✅ Check MongoDB is connected
✅ Check CORS settings

### "Socket.io not working"
✅ Check Socket.io server is running
✅ Check browser console for connection errors
✅ Check firewall settings

### "Token expired" or "Unauthorized"
✅ Logout and login again
✅ Clear localStorage
✅ Check JWT_SECRET in backend .env

### "Posts not showing"
✅ Check MongoDB has data
✅ Check API endpoint returns data
✅ Check browser console for errors

---

## Bonus Tests

### Multiple Users
- [ ] Create 3+ user accounts
- [ ] Each user creates 2+ posts
- [ ] Each user comments on others' posts
- [ ] Verify all interactions work correctly

### Stress Test
- [ ] Create 20+ posts
- [ ] Add 10+ comments to a single post
- [ ] Verify performance remains good
- [ ] Check scrolling is smooth

### Browser Compatibility
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Edge
- [ ] Test in Safari (if available)

---

## Final Checklist

- [ ] All features working as expected
- [ ] No console errors
- [ ] UI looks clean and professional
- [ ] Real-time features work correctly
- [ ] Authentication is secure
- [ ] Error handling is robust

**Status**: Ready for deployment! 🚀
