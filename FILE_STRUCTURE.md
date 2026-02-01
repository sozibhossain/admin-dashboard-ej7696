# Project File Structure

Complete file structure for the Inspector's Path Admin Dashboard

```
inspectors-path-admin/
├── app/
│   ├── admin/
│   │   ├── layout.tsx                    # Admin layout with sidebar (29 lines)
│   │   ├── page.tsx                      # Dashboard overview (274 lines)
│   │   ├── exams/
│   │   │   └── page.tsx                  # Exam management (257 lines)
│   │   ├── users/
│   │   │   └── page.tsx                  # User management (242 lines)
│   │   ├── revenue/
│   │   │   └── page.tsx                  # Revenue tracking (225 lines)
│   │   ├── testimonials/
│   │   │   └── page.tsx                  # Testimonials (189 lines)
│   │   ├── subscriptions/
│   │   │   └── page.tsx                  # Subscriptions (230 lines)
│   │   ├── announcements/
│   │   │   └── page.tsx                  # Announcements (179 lines)
│   │   └── settings/
│   │       └── page.tsx                  # Settings (210 lines)
│   │
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx                  # Login page (127 lines)
│   │   ├── forgot-password/
│   │   │   └── page.tsx                  # Forgot password (131 lines)
│   │   ├── verify-otp/
│   │   │   └── page.tsx                  # OTP verification (174 lines)
│   │   └── reset-password/
│   │       └── page.tsx                  # Reset password (156 lines)
│   │
│   ├── layout.tsx                        # Root layout (35 lines)
│   ├── providers.tsx                     # App providers (31 lines)
│   ├── page.tsx                          # Empty home page
│   └── globals.css                       # Global styles
│
├── components/
│   ├── admin/
│   │   ├── sidebar.tsx                   # Sidebar navigation (124 lines)
│   │   └── exams/
│   │       └── add-exam-modal.tsx        # Add exam modal (240 lines)
│   │
│   └── ui/                               # shadcn/ui components
│       ├── accordion.tsx
│       ├── alert.tsx
│       ├── alert-dialog.tsx
│       ├── avatar.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── checkbox.tsx
│       ├── dialog.tsx
│       ├── dropdown-menu.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── popover.tsx
│       ├── scroll-area.tsx
│       ├── select.tsx
│       ├── skeleton.tsx
│       ├── switch.tsx
│       ├── tabs.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       └── ... (other shadcn components)
│
├── lib/
│   ├── api.ts                            # All API functions (245 lines)
│   ├── axios-instance.ts                 # Axios configuration (44 lines)
│   └── utils.ts                          # Utility functions
│
├── auth.ts                               # NextAuth configuration (83 lines)
├── middleware.ts                         # Route protection middleware (30 lines)
│
├── public/
│   ├── icon-light-32x32.png
│   ├── icon-dark-32x32.png
│   ├── icon.svg
│   └── apple-icon.png
│
├── .env.example                          # Environment template (17 lines)
├── .env.local                            # Local environment (not in repo)
│
├── package.json                          # Dependencies
├── tsconfig.json                         # TypeScript config
├── next.config.mjs                       # Next.js config
├── tailwind.config.ts                    # Tailwind config
├── postcss.config.mjs                    # PostCSS config
│
├── SETUP.md                              # Setup instructions (296 lines)
├── IMPLEMENTATION_SUMMARY.md             # Implementation details (296 lines)
├── API_ENDPOINTS_USED.md                 # API reference (516 lines)
├── DEPLOYMENT_CHECKLIST.md               # Deployment guide (341 lines)
├── FILE_STRUCTURE.md                     # This file
│
└── .gitignore                            # Git ignore rules
```

## File Count Summary

- **Total files created**: 40+
- **Total lines of code**: ~3,500+
- **Components**: 2 custom admin components
- **shadcn/ui components**: 20+
- **API functions**: 50+
- **Pages**: 12

## Key Files Breakdown

### Authentication & Security
```
auth.ts                      (83 lines)   - NextAuth setup
middleware.ts                (30 lines)   - Route protection
lib/axios-instance.ts        (44 lines)   - Axios with interceptor
```

### API Integration
```
lib/api.ts                  (245 lines)   - All API functions
```

### Core Layout
```
app/layout.tsx               (35 lines)   - Root layout
app/admin/layout.tsx         (29 lines)   - Admin layout
app/providers.tsx            (31 lines)   - Providers setup
components/admin/sidebar.tsx (124 lines)  - Navigation sidebar
```

### Authentication Pages (4 pages)
```
app/auth/login/page.tsx                  (127 lines)
app/auth/forgot-password/page.tsx        (131 lines)
app/auth/verify-otp/page.tsx             (174 lines)
app/auth/reset-password/page.tsx         (156 lines)
Total: 588 lines
```

### Admin Dashboard Pages (8 pages)
```
app/admin/page.tsx                       (274 lines) - Overview
app/admin/exams/page.tsx                 (257 lines) - Exams
app/admin/users/page.tsx                 (242 lines) - Users
app/admin/revenue/page.tsx               (225 lines) - Revenue
app/admin/testimonials/page.tsx          (189 lines) - Testimonials
app/admin/subscriptions/page.tsx         (230 lines) - Subscriptions
app/admin/announcements/page.tsx         (179 lines) - Announcements
app/admin/settings/page.tsx              (210 lines) - Settings
Total: 1,806 lines
```

### Components
```
components/admin/sidebar.tsx             (124 lines)
components/admin/exams/add-exam-modal.tsx (240 lines)
Total: 364 lines
```

### Documentation
```
SETUP.md                                 (296 lines)
IMPLEMENTATION_SUMMARY.md                (296 lines)
API_ENDPOINTS_USED.md                    (516 lines)
DEPLOYMENT_CHECKLIST.md                  (341 lines)
FILE_STRUCTURE.md                        (this file)
Total: 1,449 lines
```

## Dependencies

### Core
- next@16.0.10
- react@19.2.0
- react-dom@19.2.0

### Authentication
- next-auth@^5.0.0

### API & Data
- axios@^1.6.5
- react-query@^3.39.3

### UI Components
- shadcn/ui (20+ components)
- @radix-ui/* (base UI components)
- lucide-react (icons)

### Forms & Validation
- react-hook-form@^7.60.0
- @hookform/resolvers@^3.10.0
- zod@3.25.76

### Notifications
- sonner@^1.7.4

### Charts
- recharts@2.15.4

### Styling
- tailwindcss@^4.1.9
- tailwindcss-animate@^1.0.7
- class-variance-authority@^0.7.1
- tailwind-merge@^3.3.1

### Utilities
- clsx@^2.1.1
- date-fns@4.1.0
- next-themes@^0.4.6

## Features by Module

### `/lib/api.ts` Organization (50+ functions)

**Auth Module** (8 functions)
- register, login, verifyEmail, forgotPassword
- resetPassword, changePassword, refreshToken, logout
- updateUserRole

**User Module** (10 functions)
- getProfile, updateProfile, changePassword
- listUsers, getUserDetails, updateUserStatus
- updateSubscription, updatePermissions
- sendPasswordResetEmail, setTemporaryPassword, deleteUser

**Dashboard Module** (1 function)
- getOverview

**Exam Module** (7 functions)
- listActiveExams, listAllExams, createExam
- updateExam, updateExamStatus, deleteExam
- startExam, submitExam

**Payment Module** (14 functions)
- PayPal exam/plan operations (4 functions)
- Stripe exam/plan operations (4 functions)
- Admin pricing & revenue (3 functions)
- Unlock exam, update pricing, get summary

**Support Module** (2 functions)
- createTicket, replyToTicket

**Analytics Module** (8 functions)
- User overview, performance, attempts
- Admin analytics (overview, performance, growth, revenue)

**Announcement Module** (4 functions)
- listAnnouncements, createAnnouncement
- updateAnnouncement, deleteAnnouncement

**Testimonial Module** (4 functions)
- listTestimonials, createTestimonial
- updateTestimonial, deleteTestimonial

**Subscription Module** (4 functions)
- listSubscriptions, getSubscriptionDetails
- updateSubscription, cancelSubscription

## Component Structure

### Admin Components
```
components/
├── admin/
│   ├── sidebar.tsx
│   │   - Logo
│   │   - Navigation menu (8 items)
│   │   - User info
│   │   - Logout button
│   │   - Mobile toggle
│   │
│   └── exams/
│       └── add-exam-modal.tsx
│           - Exam name input
│           - Effectivity content
│           - BOK content
│           - Questions & duration
│           - Image upload with preview
│           - Form validation
│           - Submit handling
```

### shadcn Components Used
- Accordion, Alert, AlertDialog, Avatar
- Badge, Button, Card, Checkbox
- Dialog, Dropdown, Input, Label
- Popover, Progress, Select
- Separator, Skeleton, Switch, Tabs
- Toast, Toggle, Tooltip, Textarea

## Styling Architecture

### Tailwind CSS v4
- Responsive prefixes: sm, md, lg, xl, 2xl
- Color palette: blue, red, green, gray, cyan
- Spacing scale: py-4, px-6, gap-4, etc.
- Rounded: rounded-lg, rounded-full
- Shadows: shadow-md, hover:shadow-lg
- Animations: animate-spin, transition-all

### Design Tokens
- Primary: blue-600 (#2563eb)
- Secondary: cyan-500 (#06b6d4)
- Danger: red-600 (#dc2626)
- Success: green-600 (#16a34a)
- Background: slate-50, slate-900
- Text: gray-900, gray-600

## API Integration Points

### Axios Interceptor
```
axios-instance.ts
└── Request interceptor
    ├── Injects JWT token
    └── Gets session via getSession()
└── Response interceptor
    ├── Handles 401 (redirect to login)
    └── Error pass-through
```

### React Query Setup
```
providers.tsx
└── QueryClientProvider
    ├── Stale time: 5 minutes
    ├── GC time: 10 minutes
    └── SessionProvider
        └── Sonner Toaster
```

## Authentication Flow

```
User visits /auth/login
    ↓
Enters credentials
    ↓
Calls signIn('credentials', {email, password})
    ↓
NextAuth calls backend /api/v1/auth/login
    ↓
Backend returns: {accessToken, _id, role, user}
    ↓
NextAuth stores in JWT session (HTTP-only cookie)
    ↓
Redirects to /admin
    ↓
Middleware checks session.role (VENDOR/ADMIN)
    ↓
Axios interceptor injects token in Authorization header
    ↓
All API calls include JWT token automatically
```

## Page Structure Pattern

```
app/admin/[feature]/page.tsx

1. useState for page state (currentPage, searchTerm, etc.)
2. useQuery for data fetching
3. UI Structure:
   - Header with title
   - Search/filter if applicable
   - Skeleton loaders during load
   - Data table/cards/grid
   - Pagination controls
   - Alert dialogs for actions
```

## Naming Conventions

### Files
- Pages: `page.tsx`
- Components: `PascalCase.tsx`
- Utilities: `kebab-case.ts`
- Directories: `kebab-case/` (except special dirs)

### Variables
- React hooks: `useXxx`
- State: `state, setState`
- Booleans: `isLoading, hasError`
- Data: `data, data.map(), data?.property`

### Functions
- API calls: `functionName(params)`
- Handlers: `handleActionName`
- Callbacks: `onActionName`

## Best Practices Implemented

✅ Server vs Client Components
- Layout: Server component
- Pages: Client component ('use client')
- Components: Client or server as needed

✅ Error Handling
- Try/catch in async functions
- Toast notifications for errors
- Fallback UI with skeletons

✅ Loading States
- Skeleton loaders on all pages
- Button loading spinners
- Input disabled during submit

✅ Accessibility
- Semantic HTML (main, nav, form)
- ARIA labels where needed
- Proper heading hierarchy
- Keyboard navigation support

✅ Performance
- React Query caching
- Image optimization
- Code splitting via App Router
- Lazy loading components

✅ Security
- JWT in HTTP-only cookies
- Axios token injection
- Middleware protection
- Role-based access control
- Secure password handling

## Quick Navigation

| Purpose | File |
|---------|------|
| Setup instructions | `SETUP.md` |
| Implementation details | `IMPLEMENTATION_SUMMARY.md` |
| API reference | `API_ENDPOINTS_USED.md` |
| Deployment guide | `DEPLOYMENT_CHECKLIST.md` |
| File structure | `FILE_STRUCTURE.md` (this file) |
| API functions | `lib/api.ts` |
| Sidebar navigation | `components/admin/sidebar.tsx` |
| Dashboard | `app/admin/page.tsx` |
| Authentication | `auth.ts` |
| Route protection | `middleware.ts` |

---

This structure is optimized for:
- Easy navigation and maintenance
- Clear separation of concerns
- Reusable components
- Scalability for new features
- Production-ready deployment
