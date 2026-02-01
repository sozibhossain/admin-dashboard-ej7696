# Admin Dashboard Integration Checklist

## Pre-Deployment Requirements

### 1. Environment Variables Setup
- [ ] Set `NEXT_PUBLIC_BASE_URL` to your backend URL
  - Example: `http://localhost:3001` or `https://api.yourdomain.com`
- [ ] Set `NEXTAUTH_SECRET` to a secure random value
  - Generate: `openssl rand -base64 32`
- [ ] Set `NEXTAUTH_URL` to your frontend URL
  - Example: `http://localhost:3000` or `https://yourdomain.com`

### 2. API Integration

#### Backend Endpoint Verification
Ensure your backend implements these endpoints:

**Authentication:**
- [ ] POST `/api/v1/auth/login` - User login
- [ ] POST `/api/v1/auth/forget` - Request password reset
- [ ] POST `/api/v1/auth/reset-password` - Reset password with token
- [ ] POST `/api/v1/auth/change-password` - Change password (authenticated)
- [ ] POST `/api/v1/auth/logout` - Logout (invalidate token)

**User Management:**
- [ ] GET `/api/v1/user` - List users with pagination
- [ ] GET `/api/v1/user/:userId` - Get user details
- [ ] PUT `/api/v1/user/:userId` - Update user (all fields)
- [ ] DELETE `/api/v1/user/:userId` - Delete user
- [ ] GET `/api/v1/user/export/csv` - Export users as CSV

**Dashboard:**
- [ ] GET `/api/v1/admin/dashboard` - Get overview stats

**Exam Management:**
- [ ] GET `/api/v1/exam` - List exams with pagination
- [ ] POST `/api/v1/exam` - Create exam (multipart form-data)
- [ ] PUT `/api/v1/exam/:examId` - Update exam (multipart form-data)
- [ ] PATCH `/api/v1/exam/:examId/status` - Update exam status
- [ ] DELETE `/api/v1/exam/:examId` - Delete exam

**Payments & Revenue:**
- [ ] GET `/api/v1/payments/admin/summary` - Revenue summary
- [ ] GET `/api/v1/payments/admin/purchases` - Purchase list with pagination
- [ ] PATCH `/api/v1/payments/admin/pricing` - Update pricing

**Subscriptions & Plans:**
- [ ] GET `/api/v1/subscription-plan` - List all plans
- [ ] POST `/api/v1/subscription-plan` - Create new plan
- [ ] PUT `/api/v1/subscription-plan/:planId` - Update plan
- [ ] DELETE `/api/v1/subscription-plan/:planId` - Delete plan

**Testimonials:**
- [ ] GET `/api/v1/testimonial` - List testimonials with pagination
- [ ] POST `/api/v1/testimonial` - Create testimonial
- [ ] PUT `/api/v1/testimonial/:testimonialId` - Update testimonial
- [ ] DELETE `/api/v1/testimonial/:testimonialId` - Delete testimonial

**Announcements:**
- [ ] GET `/api/v1/announcement` - List announcements with pagination
- [ ] POST `/api/v1/announcement` - Create announcement
- [ ] PUT `/api/v1/announcement/:announcementId` - Update announcement
- [ ] DELETE `/api/v1/announcement/:announcementId` - Delete announcement

#### Authentication Response Format
Ensure login endpoint returns:
```json
{
  "success": true,
  "data": {
    "accessToken": "jwt-token-here",
    "user": {
      "_id": "user-id",
      "email": "user@example.com",
      "name": "User Name",
      "role": "VENDOR" | "ADMIN"
    }
  }
}
```

#### List Response Format
Ensure list endpoints follow this structure:
```json
{
  "success": true,
  "data": [
    { /* item data */ }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

### 3. Database Schema Verification

**Users Table Required Fields:**
- [ ] `_id` (MongoDB ObjectId)
- [ ] `email` (string, unique)
- [ ] `password` (hashed string)
- [ ] `name` (string)
- [ ] `phone` (string, optional)
- [ ] `role` (string: "User", "Sub-Admin", "Admin")
- [ ] `subscriptionTier` (string: "Starter", "Professional")
- [ ] `status` (string: "Active", "Inactive", "Suspended")
- [ ] `permissions` (array of strings)
- [ ] `unlockedExams` (array of exam IDs)
- [ ] `createdAt` (timestamp)
- [ ] `updatedAt` (timestamp)
- [ ] `lastLogin` (timestamp)

**Exams Table Required Fields:**
- [ ] `_id` (MongoDB ObjectId)
- [ ] `name` (string)
- [ ] `image` (file URL or path)
- [ ] `effectivitySheetContent` (text)
- [ ] `bodyOfKnowledgeContent` (text)
- [ ] `status` (string: "Active", "Inactive", "Draft")
- [ ] `createdAt` (timestamp)
- [ ] `updatedAt` (timestamp)

**Subscription Plans Table Required Fields:**
- [ ] `_id` (MongoDB ObjectId)
- [ ] `name` (string)
- [ ] `price` (number)
- [ ] `duration` (string: "Monthly", "Quarterly", "Yearly")
- [ ] `items` (array of strings)
- [ ] `note` (string)
- [ ] `status` (string: "Active", "Inactive")
- [ ] `createdAt` (timestamp)

### 4. Authentication Flow Testing

#### Test Login Flow
1. [ ] Navigate to `/auth/login`
2. [ ] Enter credentials
3. [ ] Verify successful login redirects to `/admin`
4. [ ] Verify session is created with JWT token
5. [ ] Verify token is sent in API requests via axios interceptor

#### Test Forgot Password Flow
1. [ ] Click "Forgot Password?"
2. [ ] Enter email
3. [ ] Verify OTP is sent
4. [ ] Enter OTP on verification page
5. [ ] Set new password
6. [ ] Verify login works with new password

#### Test Session Persistence
1. [ ] Login successfully
2. [ ] Refresh page
3. [ ] Verify still logged in (session restored)
4. [ ] Clear cookies
5. [ ] Verify redirected to login

### 5. API Integration Testing

#### Test User Management
- [ ] Create new user via modal
  - [ ] All fields populated correctly
  - [ ] API called with correct payload
  - [ ] Success toast shown
  - [ ] User appears in list
- [ ] Edit user
  - [ ] Form pre-fills with user data
  - [ ] Permissions checkboxes work
  - [ ] Exam unlocks checkboxes work
  - [ ] Account status toggle works
  - [ ] Temporary password can be set
  - [ ] Update API called correctly
- [ ] Delete user
  - [ ] Confirmation modal shown
  - [ ] API called on confirm
  - [ ] User removed from list
- [ ] Export users as CSV
  - [ ] CSV file downloads correctly
  - [ ] All columns present
  - [ ] Data formatted properly

#### Test Exam Management
- [ ] Create exam with image
  - [ ] Image upload works
  - [ ] Image preview displays
  - [ ] All fields required
  - [ ] Create API called with multipart form-data
- [ ] Edit exam
  - [ ] Image can be replaced
  - [ ] Content updates correctly
  - [ ] Status change reflected
- [ ] Delete exam
  - [ ] Confirmation shown
  - [ ] Deletion reflected in list
- [ ] Pagination
  - [ ] Page navigation works
  - [ ] Items limit respected (8-10 per page)
  - [ ] Total items count correct

#### Test Dashboard
- [ ] Stats cards display correct numbers
  - [ ] Total users
  - [ ] Starter subscription users
  - [ ] Professional subscription users
  - [ ] Total revenue
- [ ] Charts render correctly
  - [ ] Bar chart displays data
  - [ ] Pie chart shows subscription breakdown
- [ ] Recent users table
  - [ ] Displays 8 most recent users
  - [ ] All columns visible
  - [ ] Action buttons work

#### Test Subscription Plans
- [ ] List plans displays both Starter and Professional
- [ ] Plan cards show correct information
- [ ] Create new plan
  - [ ] Form accepts plan data
  - [ ] Plan items can be added/removed
  - [ ] Create API called
  - [ ] New plan appears in list
- [ ] Edit plan
  - [ ] Form pre-fills correctly
  - [ ] Plan items can be edited
  - [ ] Update API called

#### Test Settings
- [ ] Profile displays current user info
- [ ] Change password modal
  - [ ] Current password required
  - [ ] New password validation works
  - [ ] Confirm password match checked
  - [ ] Password change API called
  - [ ] Success message shown
- [ ] Update profile modal
  - [ ] Form pre-fills with current data
  - [ ] Gender dropdown works
  - [ ] Date picker works
  - [ ] Update profile API called
- [ ] Logout button
  - [ ] Confirmation shown
  - [ ] Logout API called
  - [ ] Redirected to login page
  - [ ] Session cleared

### 6. UI/UX Verification

#### Responsive Design
- [ ] Mobile view (< 768px)
  - [ ] Sidebar collapses/hidden
  - [ ] Tables stack vertically
  - [ ] Modals responsive
  - [ ] Touch-friendly buttons
- [ ] Tablet view (768px - 1024px)
  - [ ] Layout adapts properly
  - [ ] Content readable
- [ ] Desktop view (> 1024px)
  - [ ] Full sidebar visible
  - [ ] Tables horizontal scrollable
  - [ ] Multi-column layouts work

#### Loading States
- [ ] Skeleton loaders show while fetching
- [ ] Buttons disabled during API calls
- [ ] Loading spinners on async actions
- [ ] Proper text ("Saving...", "Loading...", etc.)

#### Error Handling
- [ ] Toast notifications on errors
- [ ] Error messages descriptive
- [ ] Modals can be closed on error
- [ ] Retry capability provided

#### Accessibility
- [ ] Keyboard navigation works (Tab through all elements)
- [ ] Form labels associated with inputs
- [ ] Buttons have proper role/aria attributes
- [ ] Color contrast meets WCAG AA standard
- [ ] Images have alt text (if applicable)

### 7. Performance Optimization

- [ ] Implement pagination (not all items loaded at once)
- [ ] Lazy load images in lists
- [ ] Debounce search inputs
- [ ] Cache frequently accessed data
- [ ] Skeleton loaders for perceived performance

### 8. Security Checks

#### Authentication Security
- [ ] JWT token stored securely (HttpOnly in session)
- [ ] Passwords never logged
- [ ] Passwords hashed on backend (bcrypt/argon2)
- [ ] Session timeout implemented
- [ ] CSRF protection enabled

#### API Security
- [ ] All API calls require authentication
- [ ] Rate limiting implemented
- [ ] Input validation on both client and server
- [ ] SQL injection prevention (parameterized queries)
- [ ] CORS properly configured

#### Data Protection
- [ ] Sensitive data (passwords, tokens) not logged
- [ ] User permissions enforced on backend
- [ ] Admin-only endpoints protected by role check
- [ ] Audit logs for critical actions

### 9. Browser Compatibility Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### 10. Deployment Checklist

#### Pre-Production
- [ ] All environment variables set
- [ ] API endpoints tested and verified
- [ ] Database backups configured
- [ ] Monitoring/logging setup
- [ ] Error tracking (Sentry, LogRocket, etc.)
- [ ] Analytics tracking
- [ ] Security audit completed

#### Production
- [ ] SSL certificate installed (HTTPS)
- [ ] CDN configured for static assets
- [ ] Database backups automated
- [ ] Monitoring alerts configured
- [ ] Uptime monitoring active
- [ ] Health check endpoint available
- [ ] Rollback plan documented

### 11. Performance Benchmarks

- [ ] Page load time < 3 seconds
- [ ] API response time < 500ms
- [ ] Modal opens < 200ms
- [ ] List pagination smooth
- [ ] Search results instant (< 100ms)

### 12. Documentation

- [ ] API documentation updated
- [ ] Component guide reviewed
- [ ] Setup guide created
- [ ] Deployment guide created
- [ ] Troubleshooting guide created

## Testing Results

### Unit Tests
- [ ] API functions tested
- [ ] Form validation tested
- [ ] State management tested

### Integration Tests
- [ ] Full user flow tested
- [ ] API integration tested
- [ ] Authentication flow tested

### E2E Tests
- [ ] Complete user workflows tested
- [ ] All features tested end-to-end

## Sign-Off

- **Tested By:** ___________________
- **Date:** ___________________
- **Status:** ✓ Ready for Production / ✗ Issues Found

### Known Issues (if any)
- Issue 1: ...
- Issue 2: ...

### Notes
- Note 1: ...
- Note 2: ...
