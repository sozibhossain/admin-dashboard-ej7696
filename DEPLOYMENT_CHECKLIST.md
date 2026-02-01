# Admin Dashboard - Deployment Checklist

## Pre-Deployment Tasks

### Code Quality
- [ ] Run `npm run build` and verify no errors
- [ ] Check console for any warnings in development
- [ ] Test all pages load correctly
- [ ] Verify forms submit without errors
- [ ] Check pagination works on all pages
- [ ] Test search/filter functionality
- [ ] Verify delete confirmations work

### Authentication
- [ ] Test login with valid credentials
- [ ] Test login with invalid credentials
- [ ] Test forgot password flow
- [ ] Test OTP verification
- [ ] Test password reset
- [ ] Test logout functionality
- [ ] Verify middleware redirects unauthenticated users
- [ ] Verify role-based access control works

### API Integration
- [ ] Verify backend is accessible
- [ ] Test all CRUD operations (Create, Read, Update, Delete)
- [ ] Verify token is being sent in requests
- [ ] Test 401 handling (redirect to login)
- [ ] Test error handling and toast notifications
- [ ] Verify pagination API calls work correctly
- [ ] Test search API calls
- [ ] Check all network requests in DevTools

### Responsive Design
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Verify sidebar toggle works on mobile
- [ ] Check all buttons are clickable on mobile
- [ ] Verify tables scroll properly on mobile
- [ ] Test modals display correctly on all sizes

### Performance
- [ ] Check Lighthouse score
- [ ] Verify skeleton loaders show during load
- [ ] Check React Query caching works
- [ ] Verify images load quickly
- [ ] Check no console errors or warnings
- [ ] Test with slow network (DevTools throttle)

## Environment Setup

### Development
```bash
# Copy environment file
cp .env.example .env.local

# Set values
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=dev-secret-min-32-chars-here
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

### Production
```bash
# Set secure values
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=prod-secret-min-32-chars-strong
NEXT_PUBLIC_BASE_URL=https://api.your-domain.com
```

## Browser Testing Checklist

### Chrome/Edge
- [ ] Login flow
- [ ] Dashboard loads
- [ ] Admin pages accessible
- [ ] Charts render
- [ ] Modals open/close
- [ ] No console errors

### Firefox
- [ ] Login flow
- [ ] Dashboard loads
- [ ] Admin pages accessible
- [ ] Charts render
- [ ] Modals open/close
- [ ] No console errors

### Safari
- [ ] Login flow
- [ ] Dashboard loads
- [ ] Admin pages accessible
- [ ] Charts render
- [ ] Modals open/close
- [ ] No console errors

### Mobile (iOS Safari)
- [ ] Responsive layout
- [ ] Touch interactions
- [ ] Form inputs work
- [ ] Navigation works

### Mobile (Android Chrome)
- [ ] Responsive layout
- [ ] Touch interactions
- [ ] Form inputs work
- [ ] Navigation works

## Page Functionality Checklist

### Login Page
- [ ] Email input accepts text
- [ ] Password input hides text
- [ ] Submit button works
- [ ] Forgot password link navigates
- [ ] Loading state shows
- [ ] Error messages display
- [ ] Success redirects to dashboard

### Dashboard Overview
- [ ] 4 stat cards load
- [ ] Charts render correctly
- [ ] Recent users table loads
- [ ] Pagination buttons work
- [ ] Data updates on refresh
- [ ] Skeleton loaders display

### Exam Management
- [ ] Exam list loads with images
- [ ] Search filters exams
- [ ] Add exam button opens modal
- [ ] Modal form validates
- [ ] Image upload shows preview
- [ ] Submit creates exam
- [ ] Delete shows confirmation
- [ ] Status badges display
- [ ] Pagination works
- [ ] Edit button available

### User Management
- [ ] User list loads
- [ ] Search filters by name/email
- [ ] Avatar displays
- [ ] Status badges show
- [ ] Plan name displays
- [ ] Delete button available
- [ ] Edit button available
- [ ] Pagination works
- [ ] Table responsive

### Revenue Page
- [ ] Revenue cards load
- [ ] Purchases table displays
- [ ] Search works
- [ ] Status badges correct
- [ ] Pagination works
- [ ] Dates format correctly

### Testimonials Page
- [ ] Grid loads
- [ ] Star ratings show
- [ ] Edit/delete buttons work
- [ ] Pagination works
- [ ] Responsive grid

### Subscriptions Page
- [ ] Table loads
- [ ] Status shows active/cancelled
- [ ] Cancel button works
- [ ] Edit button available
- [ ] Pagination works
- [ ] Search filters

### Announcements Page
- [ ] Announcements list loads
- [ ] Cards display content
- [ ] Dates show
- [ ] Edit/delete work
- [ ] Pagination works
- [ ] Add button available

### Settings Page
- [ ] Pricing fields load
- [ ] Can edit values
- [ ] Save button works
- [ ] Loading state displays
- [ ] Success/error toast shows
- [ ] Security section displays

## Sidebar Navigation

- [ ] Logo displays correctly
- [ ] All menu items present (8 items)
- [ ] Active item highlighted
- [ ] Links navigate correctly
- [ ] Mobile toggle works
- [ ] Logout button works
- [ ] User name displays
- [ ] Responsive on mobile

## Data Validation

- [ ] Forms validate required fields
- [ ] Email format validated
- [ ] Password requirements enforced
- [ ] File uploads validate type
- [ ] File size limits enforced
- [ ] Date formats correct
- [ ] Currency formats correct
- [ ] Number inputs accept decimals

## Security Verification

- [ ] Tokens sent in Authorization header
- [ ] No passwords logged to console
- [ ] No sensitive data in localStorage
- [ ] CSRF tokens used (NextAuth)
- [ ] 401 redirects to login
- [ ] Role-based access enforced
- [ ] Middleware blocks unauthorized access
- [ ] Logout clears session

## Error Handling

- [ ] Network errors show toast
- [ ] 404 errors handled
- [ ] 500 errors handled
- [ ] Validation errors display
- [ ] Form errors clear on fix
- [ ] Loading states prevent double submit
- [ ] Retry logic works

## Performance Targets

- [ ] First Contentful Paint < 3s
- [ ] Largest Contentful Paint < 5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Time to Interactive < 4s
- [ ] Lighthouse score > 85
- [ ] No JavaScript errors
- [ ] No unhandled promises

## Deployment Steps (Vercel)

### Step 1: Prepare
```bash
# Ensure code is clean
git status

# Build locally
npm run build

# No errors should appear
```

### Step 2: Push to Git
```bash
git add .
git commit -m "Admin dashboard complete"
git push origin main
```

### Step 3: Deploy to Vercel
```bash
# Option 1: Via CLI
vercel deploy --prod

# Option 2: Via dashboard
# Connect GitHub repo to Vercel
# Push to main branch
# Vercel auto-deploys
```

### Step 4: Configure Environment
In Vercel Dashboard:
1. Go to Settings > Environment Variables
2. Add:
   ```
   NEXTAUTH_URL=https://your-domain.com
   NEXTAUTH_SECRET=your-production-secret
   NEXT_PUBLIC_BASE_URL=https://api.your-domain.com
   ```
3. Trigger redeploy

### Step 5: Verify Deployment
```bash
# Check deployment logs
vercel logs [deployment-id]

# Test live site
https://your-domain.com/auth/login
```

## Post-Deployment

### Monitoring
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Monitor API response times
- [ ] Check user feedback
- [ ] Monitor uptime

### Maintenance
- [ ] Plan regular backups
- [ ] Update dependencies monthly
- [ ] Monitor security advisories
- [ ] Plan feature updates
- [ ] Document any customizations

## Rollback Plan

If issues occur:
1. Revert to previous commit: `git revert HEAD`
2. Rebuild and test locally
3. Push to deployment
4. Verify deployment succeeded

## Support Resources

- **Documentation**: See `SETUP.md`
- **API Reference**: See `API_ENDPOINTS_USED.md`
- **Implementation Details**: See `IMPLEMENTATION_SUMMARY.md`
- **Issues**: Check browser console and network tab
- **Logs**: Check deployment logs in Vercel dashboard

## Sign-off

- [ ] Code review completed
- [ ] QA testing passed
- [ ] Security review completed
- [ ] Performance review passed
- [ ] All checklist items completed
- [ ] Ready for production deployment

---

**Deployment Date**: ___________
**Deployed By**: ___________
**Notes**: ___________
