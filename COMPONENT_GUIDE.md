# Admin Dashboard Component Guide

## Overview
This guide documents all custom components and their usage in the Inspector's Path admin dashboard.

## Directory Structure
```
components/
├── admin/
│   ├── sidebar.tsx              # Main navigation sidebar
│   ├── exams/
│   │   └── add-exam-modal.tsx   # Create/Edit exam modal
│   ├── users/
│   │   └── manage-user-modal.tsx # User management with permissions
│   ├── subscriptions/
│   │   └── plan-modal.tsx        # Subscription plan management
│   ├── settings/
│   │   └── profile-forms.tsx     # Profile and password modals
│   └── [other feature components]
└── ui/                           # shadcn/ui components
```

## Component Library

### Authentication Components

#### Login Page (`/app/auth/login/page.tsx`)
- Email and password form
- Forgot password link
- Form validation with Zod
- Error toast notifications

#### Forgot Password (`/app/auth/forgot-password/page.tsx`)
- Email input for password recovery
- OTP sending flow
- Link to enter OTP page

#### Verify OTP (`/app/auth/verify-otp/page.tsx`)
- 6-digit OTP input
- Resend OTP functionality
- Automatic form submission

#### Reset Password (`/app/auth/reset-password/page.tsx`)
- New password and confirmation fields
- Password strength validation
- Redirect to login after success

### Admin Components

#### Sidebar Navigation (`/components/admin/sidebar.tsx`)
**Props:**
- None (reads from session and router)

**Features:**
- Active route highlighting
- Icons for each section
- Logout button with confirmation
- User profile dropdown

**Menu Items:**
- Dashboard Overview
- Exam Content
- User Management
- Revenue
- Receiving Testimonials
- Subscriptions
- Announcements
- Settings
- Logout

#### Manage User Modal (`/components/admin/users/manage-user-modal.tsx`)
**Props:**
```typescript
interface ManageUserModalProps {
  isOpen: boolean;
  userId?: string;
  userName?: string;
  onClose: () => void;
  onSuccess?: () => void;
}
```

**Features:**
- Phone number and full name fields
- Role selection (User, Sub-Admin, Admin)
- Subscription tier selection
- Conditional permissions grid (Sub-Admin only)
- Manual exam unlocks with multi-select
- Account status toggle
- Temporary password management
- Impersonate user action

**API Integration:**
- Uses `api.updateUser(userId, formData)`
- Toast notifications on success/error

#### Add/Edit Exam Modal (`/components/admin/exams/add-exam-modal.tsx`)
**Props:**
```typescript
interface AddExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  examData?: any;
  isEdit?: boolean;
}
```

**Features:**
- Exam name input
- Effectiveness sheet content (rich text)
- Body of knowledge content (rich text)
- Image upload with drag-and-drop
- Image preview
- Cancel and save buttons

**Validation:**
- All fields required
- Image file size limits

#### Add/Edit Plan Modal (`/components/admin/subscriptions/plan-modal.tsx`)
**Props:**
```typescript
interface AddPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  planData?: any;
  isEdit?: boolean;
}
```

**Features:**
- Plan name input
- Price input with $ symbol
- Duration selection (Monthly, Quarterly, Yearly)
- Plan note field
- Dynamic plan items list
- Add/remove plan items
- Status display

**Plan Items:**
- Display with checkmark
- Editable text
- Remove button
- Add new items with input + button

#### Change Password Modal (`/components/admin/settings/profile-forms.tsx`)
**Props:**
```typescript
interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}
```

**Features:**
- Current password field
- New password field
- Confirm password field
- Password match validation
- Success/error toasts

#### Update Profile Modal (`/components/admin/settings/profile-forms.tsx`)
**Props:**
```typescript
interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData?: {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth: string;
    address: string;
  };
}
```

**Features:**
- Full name input
- Email input
- Phone number input
- Gender dropdown (Male, Female, Other)
- Date of birth picker
- Address input
- Pre-filled form data

## Page Components

### Dashboard Overview (`/app/admin/page.tsx`)
**Features:**
- 4 stat cards (Total Users, Starter Users, Professional Users, Revenue)
- Analytics bar chart
- Subscription type pie chart
- Recent users table with pagination
- Skeleton loaders during data fetch

**API Used:**
- `api.getDashboardOverview()`
- `api.listUsers(page, limit)`

### Exam Management (`/app/admin/exams/page.tsx`)
**Features:**
- Exam list with images
- Status badges (Active/Inactive)
- Edit and delete buttons
- Add new exam button
- Delete confirmation modal
- Pagination controls
- Skeleton loaders for list items

**API Used:**
- `api.listExams(page, limit)`
- `api.createExam(formData)`
- `api.updateExam(examId, formData)`
- `api.deleteExam(examId)`
- `api.updateExamStatus(examId, data)`

### User Management (`/app/admin/users/page.tsx`)
**Features:**
- Tier and role filters
- User table with columns:
  - User (name with avatar)
  - Email
  - Subscription tier
  - Status
  - Exam tokens
  - Average score
  - Last active
  - Actions (edit, delete)
- Add new user button
- Export users to CSV
- Pagination
- Search functionality

**API Used:**
- `api.listUsers(page, limit)`
- `api.updateUser(userId, data)`
- `api.deleteUser(userId)`
- `api.bulkExportUsers()`

### Revenue Tracking (`/app/admin/revenue/page.tsx`)
**Features:**
- Revenue statistics cards
- Purchase history table
- Date range filtering
- Pagination
- Skeleton loaders

**API Used:**
- `api.getRevenueSummary()`
- `api.getPurchasesList(page, limit)`

### Subscriptions (`/app/admin/subscriptions/page.tsx`)
**Features:**
- Plan cards display (Starter, Professional)
- Plan status badges
- Price and duration display
- Features list with checkmarks
- Edit plan button
- Plan management modal
- Add new plan button

**API Used:**
- `api.listPlans()`
- `api.createSubscriptionPlan(data)`
- `api.updateSubscriptionPlan(planId, data)`
- `api.deleteSubscriptionPlan(planId)`

### Testimonials (`/app/admin/testimonials/page.tsx`)
**Features:**
- Testimonial cards in grid
- User avatar and name
- Location
- Star ratings
- Testimonial text
- Create button

**API Used:**
- `api.listTestimonials(page, limit)`
- `api.createTestimonial(data)`
- `api.updateTestimonial(testimonialId, data)`
- `api.deleteTestimonial(testimonialId)`

### Announcements (`/app/admin/announcements/page.tsx`)
**Features:**
- Announcement list
- Create announcement button
- Edit/delete actions

**API Used:**
- `api.listAnnouncements(page, limit)`
- `api.createAnnouncement(data)`
- `api.updateAnnouncement(announcementId, data)`
- `api.deleteAnnouncement(announcementId)`

### Settings (`/app/admin/settings/page.tsx`)
**Features:**
- User profile display with avatar
- Profile information display
- Change password button → modal
- Update profile button → modal
- Logout with confirmation

**API Used:**
- `api.getProfile()`
- `api.updateProfile(formData)`
- `api.changePassword(data)`
- `api.logout()`

## Shared UI Components

All shadcn/ui components are pre-installed:
- Button
- Input
- Label
- Select
- Dialog
- Switch
- Checkbox
- Table
- Tabs
- Alert
- Toast (via Sonner)
- Skeleton

## Data Fetching Patterns

### Using React Query (TanStack Query)
```tsx
const { data, isLoading, error } = useQuery(
  ['users', page],
  () => api.listUsers(page),
  {
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5, // 5 minutes
  }
);
```

### Using Mutations
```tsx
const { mutate, isLoading } = useMutation(
  (data) => api.updateUser(userId, data),
  {
    onSuccess: () => {
      toast.success('User updated');
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  }
);
```

## Error Handling

All components use Sonner toast notifications:
```tsx
import { toast } from 'sonner';

// Success
toast.success('Action completed');

// Error
toast.error('Something went wrong');

// Loading
const id = toast.loading('Loading...');
toast.success('Done!', { id });
```

## Authentication

- Sessions managed by NextAuth 5
- JWT token stored in session
- Automatic token injection via axios interceptor
- Middleware protects admin routes

## Environment Variables Required

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

## Styling

- Tailwind CSS v4 with custom theme
- Primary color: Blue (#0052CC)
- Secondary/Accent: Cyan (#00BCD4)
- Responsive design (mobile-first)
- Dark mode support
