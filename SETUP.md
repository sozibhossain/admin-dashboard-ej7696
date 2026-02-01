# Inspector's Path Admin Dashboard - Setup Guide

## Overview

This is a fully functional admin dashboard for the Inspector's Path exam platform built with Next.js 16, NextAuth, React Query, Axios, and shadcn/ui.

## Features

✅ **Authentication**
- NextAuth integration with email/password login
- JWT-based sessions
- Forgot password & OTP verification
- Password reset functionality
- Middleware protection for admin routes

✅ **API Integration**
- Axios client with interceptor for token injection
- React Query for data fetching and caching
- Comprehensive API functions in `/lib/api.ts`
- Error handling and retry logic

✅ **Admin Dashboard**
- Dashboard Overview with stats and charts
- Exam Content Management with CRUD operations
- User Management with filtering and pagination
- Revenue Tracking with purchase history
- Testimonials Management
- Subscriptions Management
- Announcements Management
- Settings for pricing configuration

✅ **UI/UX**
- Responsive design (mobile-first)
- Skeleton loaders for all pages
- Toast notifications with Sonner
- Pagination support throughout
- Modal dialogs for actions
- Beautiful charts with Recharts

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running at `http://localhost:5000` (configurable)

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your values:
```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-min-32-char-secret-key
NEXT_PUBLIC_BASE_URL=http://localhost:5000
```

3. **Run the development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /admin                 # Protected admin routes
    /exams             # Exam management
    /users             # User management
    /revenue           # Revenue tracking
    /testimonials      # Testimonials
    /subscriptions     # Subscriptions
    /announcements     # Announcements
    /settings          # Settings
    layout.tsx         # Admin layout with sidebar
    page.tsx           # Dashboard overview
  /auth                  # Public auth routes
    /login             # Login page
    /forgot-password   # Forgot password
    /verify-otp        # OTP verification
    /reset-password    # Reset password
  layout.tsx             # Root layout
  providers.tsx          # App providers (QueryClient, SessionProvider)
  globals.css            # Global styles

/components
  /admin
    /exams
      add-exam-modal.tsx  # Modal for adding exams
    sidebar.tsx           # Admin sidebar navigation
  /ui                     # shadcn components

/lib
  api.ts                 # All API functions organized by module
  axios-instance.ts      # Configured Axios with interceptor
  utils.ts               # Utility functions

/auth.ts                 # NextAuth configuration
/middleware.ts           # Route protection middleware
```

## API Integration

All API calls are in `/lib/api.ts` and organized by module:

- `authAPI` - Authentication endpoints
- `userAPI` - User management endpoints
- `dashboardAPI` - Dashboard statistics
- `examAPI` - Exam CRUD operations
- `paymentAPI` - Payment and revenue endpoints
- `analyticsAPI` - Analytics endpoints
- `announcementAPI` - Announcement endpoints
- `testimonialAPI` - Testimonial endpoints
- `subscriptionAPI` - Subscription endpoints

### Axios Interceptor

The axios instance in `/lib/axios-instance.ts` automatically:
1. Injects the JWT token from NextAuth session
2. Handles 401 responses by redirecting to login
3. Manages request/response errors

## Authentication Flow

1. User visits `/auth/login`
2. Enters credentials and submits
3. NextAuth Credentials provider calls backend login endpoint
4. Backend returns `accessToken`, `role`, `_id`, and `user` object
5. NextAuth stores this in JWT session
6. User is redirected to `/admin`
7. Middleware checks session and role for route protection
8. Axios interceptor injects token into all API requests

## Data Fetching

React Query is configured in `/app/providers.tsx`:

```typescript
useQuery(
  'exams',
  () => examAPI.listAllExams(page, limit),
  {
    onError: (error) => {
      toast.error('Failed to load exams');
    }
  }
)
```

### Features
- Automatic caching (5 min stale time, 10 min gc time)
- Built-in refetch capabilities
- Error handling with Sonner toasts
- Loading states with skeleton loaders
- Pagination support

## Forms & Validation

- React Hook Form for form management
- Zod for schema validation (ready to use)
- Form states handled with component state
- Sonner for success/error notifications

## Adding New Pages

1. Create new route in `/app/admin/[feature]/page.tsx`
2. Import necessary API functions from `/lib/api.ts`
3. Use React Query for data fetching
4. Use skeleton loaders while loading
5. Use Sonner for notifications
6. Sidebar automatically updates via pathname matching

## Authentication Details

### Session Object Structure

```typescript
session.user = {
  name: string
  email: string
}
session.accessToken = string
session.role = "VENDOR" | "ADMIN" | string
session.userId = string
```

### Protected Routes

All `/admin/*` routes are protected by middleware:
- Requires valid JWT session
- Checks for VENDOR or ADMIN role
- Redirects to login if not authenticated

### Token Refresh

Token refresh should be handled by your backend. Update the token in the session as needed.

## Customization

### Colors & Theming
- Modify Tailwind classes in components
- Update design tokens in `globals.css`
- Colors use Tailwind's default palette

### API Endpoints
- Update `NEXT_PUBLIC_BASE_URL` in `.env.local`
- All endpoints use this base URL
- Modify specific endpoints in `/lib/api.ts`

### Sidebar Navigation
- Edit menu items in `/components/admin/sidebar.tsx`
- Add new menu items in the `menuItems` array
- Active state automatically detected from pathname

## Troubleshooting

### "Session not found"
- Check NEXTAUTH_SECRET is set correctly
- Verify NEXTAUTH_URL matches your app URL
- Clear browser cookies and try again

### "API calls failing with 401"
- Verify backend is running at NEXT_PUBLIC_BASE_URL
- Check that login endpoint returns `accessToken`
- Verify token format matches Bearer schema

### "Skeleton loaders showing indefinitely"
- Check network tab for API errors
- Verify API response structure matches expected format
- Check console for React Query errors

### "Pagination not working"
- Verify API returns `data` and `total` in response
- Check page param is being passed to API
- Ensure response structure matches expected format

## Deployment

1. **Build the project:**
```bash
npm run build
```

2. **Set production environment variables:**
```bash
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret
NEXT_PUBLIC_BASE_URL=https://api.your-domain.com
```

3. **Deploy to Vercel:**
```bash
vercel deploy
```

Or deploy to your preferred platform (AWS, Heroku, etc.)

## Performance Optimization

- ✅ React Query caching reduces API calls
- ✅ Skeleton loaders improve perceived performance
- ✅ Image optimization for thumbnails
- ✅ Responsive design with lazy loading
- ✅ Code splitting with Next.js App Router

## Security Best Practices

- ✅ JWT tokens in HTTP-only cookies (NextAuth default)
- ✅ CSRF protection (NextAuth built-in)
- ✅ Middleware route protection
- ✅ Secure password reset flow with OTP
- ✅ Proper error handling without exposing internals
- ✅ Role-based access control checks

## Support & Issues

For issues or questions:
1. Check the troubleshooting section above
2. Verify environment variables are set correctly
3. Check browser console for errors
4. Check network tab for API responses
5. Review React Query DevTools for caching issues

## License

Built with ❤️ using v0.app
