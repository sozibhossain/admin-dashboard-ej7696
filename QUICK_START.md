# Quick Start Guide - Inspector's Path Admin Dashboard

## Installation & Setup (5 minutes)

### 1. Clone and Install Dependencies
```bash
# Install all required packages
npm install

# This includes:
# - next-auth (authentication)
# - axios (HTTP client)
# - react-query (data fetching)
# - sonner (toast notifications)
# - shadcn/ui (component library)
# - tailwindcss (styling)
```

### 2. Set Environment Variables
Create `.env.local` file in project root:
```env
# Required - Your backend API URL
NEXT_PUBLIC_BASE_URL=http://localhost:3001

# Required - NextAuth configuration
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Optional - Analytics/Monitoring
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

## Accessing the Dashboard

### First Login
1. Navigate to `http://localhost:3000/auth/login`
2. Use your credentials (must exist in backend database)
3. You're redirected to `/admin` dashboard

### Forgot Password Flow
1. Click "Forgot Password?" on login page
2. Enter registered email
3. Check email for OTP
4. Enter OTP on verification page
5. Set new password
6. Login with new password

## Key Features Overview

### Dashboard Overview (`/admin`)
- **Stats Cards**: Total users, subscription counts, revenue
- **Charts**: User growth and subscription distribution
- **Recent Users**: Last 8 active users table

### Exam Management (`/admin/exams`)
- **View Exams**: Paginated list (8 per page)
- **Add Exam**: Modal form with:
  - Exam name
  - Effectiveness sheet content
  - Body of knowledge content
  - Image upload
- **Edit/Delete**: Inline actions for each exam
- **Status**: Toggle between Active/Inactive

### User Management (`/admin/users`)
- **Filter Users**: By tier and role
- **View Users**: Table with columns:
  - User name & avatar
  - Email
  - Subscription tier
  - Status (Active/Inactive)
  - Exam tokens
  - Average score
  - Last active date
- **Add User**: Create new user with role and tier
- **Edit User**: 
  - Update personal info
  - Manage permissions (Sub-Admin)
  - Unlock specific exams
  - Set temporary password
- **Export**: Download all users as CSV
- **Delete**: Remove user with confirmation

### Revenue Tracking (`/admin/revenue`)
- **Revenue Summary**: Total revenue and stats
- **Purchase History**: All transactions with pagination
- **Date Filtering**: View transactions by date range

### Subscriptions (`/admin/subscriptions`)
- **View Plans**: Starter and Professional plan cards
- **Plan Details**: Price, duration, included features
- **Add Plan**: 
  - Plan name and price
  - Duration selection
  - Add multiple plan items
  - Plan note
- **Edit/Delete Plans**: Update or remove plans

### Testimonials (`/admin/testimonials`)
- **View Testimonials**: Grid layout of testimonials
- **Testimonial Card**: User avatar, name, location, rating, text
- **Add Testimonial**: Create new testimonial

### Announcements (`/admin/announcements`)
- **View Announcements**: List of all announcements
- **Add/Edit/Delete**: Full CRUD operations

### Settings (`/admin/settings`)
- **Profile Information**: View current user info
- **Change Password**: Modal form with:
  - Current password verification
  - New password input
  - Password confirmation
- **Update Profile**: Modal with:
  - Full name
  - Email
  - Phone number
  - Gender dropdown
  - Date of birth picker
  - Address
- **Logout**: Safe logout with confirmation

## Common Tasks

### Create a New User
1. Go to `/admin/users`
2. Click "Add New User" button
3. Fill form with:
   - Full name
   - Email address
   - Password (auto-generated or custom)
   - Phone number (optional)
   - Role (User, Sub-Admin, Admin)
   - Subscription tier
4. Click "Add User"
5. Toast confirmation shown

### Create a New Exam
1. Go to `/admin/exams`
2. Click "Add New Exam" button
3. Fill form with:
   - Exam name (e.g., "API 510 - Pressure Vessel Inspection")
   - Effectiveness sheet content
   - Body of knowledge content
   - Upload exam image (drag-drop or click to select)
4. Click "Add Exam"
5. Exam appears in list

### Manage User Permissions
1. Go to `/admin/users`
2. Click edit icon (pencil) on user row
3. Manage User modal opens
4. If user is Sub-Admin, see permissions checkboxes
5. Check/uncheck permissions:
   - View user list
   - Send password reset email
   - Suspend or unsuspend users
   - Manage exams & questions
   - View billing summary
   - Edit user profiles
   - Manage subscription
   - Manage announcements
   - Access performance analytics
   - View activity logs
6. Click "Save Changes"

### Unlock Exam for User
1. Open user's manage modal
2. Scroll to "Manual Exam Unlocks"
3. Check exams to unlock:
   - API 510 - Pressure Vessel Piping Inspection
   - API 570 Piping Inspector
   - SIFE - Source Inspector Electrical Equipment
   - API 653 - Aboveground Storage Tank Inspector
   - SIRE - Source Inspector Rotating Equipment
   - API 1169 - Pipeline Construction Inspector
   - SIFE - Source Inspector Fixed Equipment
   - API 936 - Refractory Personnel
4. Click "Save Changes"

### Export Users to CSV
1. Go to `/admin/users`
2. Click "Export Users (CSV)" button
3. CSV file downloads with:
   - All user information
   - Formatted columns
   - One user per row

### Change Your Password
1. Go to `/admin/settings`
2. Click "Change Password" button
3. Enter current password
4. Enter new password
5. Confirm new password
6. Click "Update Password"
7. Success toast shown

### Create Subscription Plan
1. Go to `/admin/subscriptions`
2. Click "Add New Plan" button
3. Fill form with:
   - Plan name (e.g., "Starter")
   - Plan price (e.g., "$9.99")
   - Duration (Monthly, Quarterly, Yearly)
   - Plan note (optional)
   - Plan items (features included):
     - Add item (e.g., "15 free practice questions")
     - Add more items with "+ Add More" button
4. Click "Save Plan"
5. Plan appears in subscription list

## API Integration

### Authentication
All API calls automatically include JWT token via axios interceptor.

**Example API Call:**
```typescript
import { api } from '@/lib/api';

// List users
const response = await api.listUsers(1, 10);

// Update user
await api.updateUser(userId, formData);

// Delete exam
await api.deleteExam(examId);
```

### Handling Errors
```typescript
try {
  await api.updateUser(userId, data);
  toast.success('User updated');
} catch (error: any) {
  toast.error(error?.response?.data?.message || 'Failed to update');
}
```

## File Structure

```
project-root/
├── app/
│   ├── admin/
│   │   ├── page.tsx                 # Dashboard
│   │   ├── exams/page.tsx           # Exam management
│   │   ├── users/page.tsx           # User management
│   │   ├── revenue/page.tsx         # Revenue tracking
│   │   ├── subscriptions/page.tsx   # Subscriptions
│   │   ├── testimonials/page.tsx    # Testimonials
│   │   ├── announcements/page.tsx   # Announcements
│   │   ├── settings/page.tsx        # Settings
│   │   └── layout.tsx               # Admin layout
│   ├── auth/
│   │   ├── login/page.tsx           # Login
│   │   ├── forgot-password/page.tsx # Forgot password
│   │   ├── verify-otp/page.tsx      # Verify OTP
│   │   └── reset-password/page.tsx  # Reset password
│   ├── layout.tsx                   # Root layout
│   ├── globals.css                  # Global styles
│   └── providers.tsx                # Providers (QueryClient, Toaster)
├── components/
│   ├── admin/
│   │   ├── sidebar.tsx              # Navigation
│   │   ├── exams/
│   │   ├── users/
│   │   ├── subscriptions/
│   │   └── settings/
│   └── ui/                          # shadcn components
├── lib/
│   ├── api.ts                       # API client functions
│   ├── api-config.ts                # API configuration
│   ├── axios-instance.ts            # Axios with interceptor
│   └── utils.ts                     # Utility functions
├── middleware.ts                    # Route protection
├── auth.ts                          # NextAuth config
├── .env.example                     # Example env file
└── package.json
```

## Troubleshooting

### Login not working
- Check backend is running on NEXT_PUBLIC_BASE_URL
- Verify user exists in database with correct password
- Check NEXTAUTH_SECRET is set correctly
- Clear browser cookies and try again

### API calls failing
- Verify NEXT_PUBLIC_BASE_URL is correct
- Check backend API is accessible
- Verify JWT token is being sent (check Network tab)
- Check backend is returning correct response format

### Modals not opening
- Clear browser cache
- Check console for JavaScript errors
- Verify React Query is working (check React Query DevTools)
- Restart dev server

### Images not loading
- Check image URL is accessible from backend
- Verify image file is uploaded correctly
- Check CORS is enabled on backend

### Styles not loading
- Verify Tailwind CSS is working
- Clear Next.js cache: `rm -rf .next`
- Restart dev server
- Check globals.css is imported in layout.tsx

## Performance Tips

### Optimize API Calls
```typescript
// Use React Query caching
const { data } = useQuery(['users', page], () => api.listUsers(page), {
  staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  keepPreviousData: true,    // Keep old data while loading new
});
```

### Optimize Images
- Keep images under 500KB
- Use JPEG/WebP formats
- Implement lazy loading for lists

### Optimize Lists
- Use pagination (8-10 items per page)
- Implement virtual scrolling for large lists
- Debounce search inputs

## Support

### Documentation Files
- `SETUP.md` - Detailed setup instructions
- `COMPONENT_GUIDE.md` - Component documentation
- `INTEGRATION_CHECKLIST.md` - Integration testing guide
- `API_ENDPOINTS_USED.md` - Full API reference
- `FILE_STRUCTURE.md` - Project structure
- `IMPLEMENTATION_SUMMARY.md` - Implementation overview

### Getting Help
1. Check documentation files
2. Review component guides
3. Check API endpoints reference
4. Review example code in components
5. Check browser console for errors
6. Check backend API logs

## Deployment

### To Vercel
```bash
# Push to GitHub
git push origin main

# Deploy via Vercel Dashboard
# Or use Vercel CLI
vercel deploy --prod
```

### Environment Variables on Vercel
1. Go to Vercel Project Settings
2. Set environment variables:
   - `NEXT_PUBLIC_BASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`

## Next Steps

1. ✅ Setup development environment
2. ✅ Test local functionality
3. ✅ Integrate with backend API
4. ✅ Run through checklist
5. ✅ Deploy to staging
6. ✅ Test on staging
7. ✅ Deploy to production
8. ✅ Monitor for issues
9. ✅ Gather user feedback
10. ✅ Iterate and improve
