# 🎓 AssignHub Client

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://assignhub-client.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/sumon-ray/AssignHub/tree/main/client)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

> **A modern, responsive frontend application for an Assignment Submission Portal built with Next.js 14, featuring role-based authentication, interactive dashboards, and real-time analytics.**

## 🌟 Overview

AssignHub Client is a sophisticated frontend application that provides an intuitive interface for instructors and students to manage assignments efficiently. Built with cutting-edge technologies and deployed on Vercel, it offers a seamless user experience with responsive design and interactive data visualizations.

### 🎯 Key Features

- 🔐 **NextAuth Integration** - Secure authentication with role-based access
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI/UX** - Clean interface with Shadcn/ui components
- 📊 **Interactive Analytics** - Real-time charts and data visualization
- ⚡ **Server-Side Rendering** - Fast loading with Next.js App Router
- 🛡️ **Route Protection** - Secured pages based on user roles

## 📁 Project Structure

```
AssignHub/client/
├── 📁 .next/                   # Next.js build output (auto-generated)
├── 📁 .vercel/                 # Vercel deployment configuration
├── 📁 node_modules/            # Project dependencies (auto-generated)
├── 📁 public/                  # Static assets
│   ├── 📄 favicon.ico         # Site favicon  
│   ├── 📄 logo.png            # Application logo
│   └── 📄 images/             # Image assets
├── 📁 src/                     # Source code directory
│   ├── 📁 app/                # Next.js App Router
│   │   ├── 📁 dashboard/      # Dashboard pages
│   │   │   ├── 📁 analytics/  # Analytics dashboard
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📁 assignments/ # Assignment management
│   │   │   │   ├── 📁 create/ # Create assignment page
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   ├── 📁 [id]/   # Dynamic assignment routes
│   │   │   │   │   ├── 📁 submissions/ # View submissions
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   ├── 📁 submit/ # Submit assignment
│   │   │   │   │   │   └── 📄 page.jsx
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📁 submissions/ # Submission management
│   │   │   │   ├── 📁 [id]/   # Dynamic submission routes
│   │   │   │   │   └── 📄 page.jsx
│   │   │   │   └── 📄 page.jsx
│   │   │   ├── 📄 layout.jsx  # Dashboard layout
│   │   │   └── 📄 page.jsx    # Dashboard home
│   │   ├── 📁 login/          # Authentication pages
│   │   │   └── 📄 page.jsx
│   │   ├── 📁 register/
│   │   │   └── 📄 page.jsx
│   │   ├── 📁 api/            # API routes (NextAuth)
│   │   │   └── 📁 auth/
│   │   │       └── 📁 [...nextauth]/
│   │   │           └── 📄 route.js
│   │   ├── 📄 globals.css     # Global styles
│   │   ├── 📄 layout.jsx      # Root layout
│   │   └── 📄 page.jsx        # Home page
│   ├── 📁 components/         # Reusable React components
│   │   ├── 📁 analytics/      # Analytics components
│   │   │   ├── 📄 SubmissionChart.jsx
│   │   │   └── 📄 StatCard.jsx
│   │   ├── 📁 assignments/    # Assignment components
│   │   │   ├── 📄 AssignmentCard.jsx
│   │   │   ├── 📄 AssignmentForm.jsx
│   │   │   └── 📄 AssignmentList.jsx
│   │   ├── 📁 common/         # Common UI components
│   │   │   ├── 📄 Header.jsx
│   │   │   ├── 📄 Footer.jsx
│   │   │   ├── 📄 Navigation.jsx
│   │   │   └── 📄 LoadingSpinner.jsx
│   │   ├── 📁 home/           # Homepage components
│   │   │   ├── 📄 Hero.jsx
│   │   │   ├── 📄 Features.jsx
│   │   │   └── 📄 CTA.jsx
│   │   ├── 📁 submissions/    # Submission components
│   │   │   ├── 📄 SubmissionCard.jsx
│   │   │   ├── 📄 SubmissionForm.jsx
│   │   │   ├── 📄 SubmissionList.jsx
│   │   │   └── 📄 StatusBadge.jsx
│   │   └── 📁 ui/             # Shadcn/ui components
│   │       ├── 📄 button.jsx
│   │       ├── 📄 card.jsx
│   │       ├── 📄 input.jsx
│   │       ├── 📄 badge.jsx
│   │       └── 📄 dialog.jsx
│   ├── 📁 lib/                # Utility libraries
│   │   ├── 📄 auth.js         # NextAuth configuration
│   │   ├── 📄 utils.js        # Utility functions
│   │   └── 📄 cn.js           # Class name utility
│   ├── 📁 services/           # API service layer
│   │   ├── 📄 api.js          # Base API configuration
│   │   ├── 📄 auth.js         # Authentication services
│   │   ├── 📄 assignments.js  # Assignment API calls
│   │   └── 📄 submissions.js  # Submission API calls
│   └── 📁 hooks/              # Custom React hooks
│       ├── 📄 useAuth.js      # Authentication hook
│       ├── 📄 useApi.js       # API data fetching hook
│       └── 📄 useLocalStorage.js # Local storage hook
├── 📄 .env.local              # Environment variables
├── 📄 .gitignore             # Git ignore rules
├── 📄 components.json        # Shadcn/ui configuration
├── 📄 next.config.js         # Next.js configuration
├── 📄 package.json           # Project dependencies & scripts
├── 📄 package-lock.json      # Locked dependency versions
├── 📄 postcss.config.js      # PostCSS configuration
├── 📄 README.md              # Project documentation
├── 📄 tailwind.config.js     # TailwindCSS configuration
└── 📄 tsconfig.json          # TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sumon-ray/AssignHub.git
   cd AssignHub/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   ```bash
   # Create .env.local file and add the following variables:
   
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key
   NEXT_PUBLIC_API_URL=https://assignhub-server.vercel.app
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   ```
   Local: http://localhost:3000
   Live:  https://assignhub-client.vercel.app/
   ```

## 🎨 User Interface Features

### 🏠 **Landing Page**
- Hero section with call-to-action
- Feature highlights
- Responsive navigation
- Clean, modern design

### 🔐 **Authentication Pages**
- Login/Register forms
- Role selection (Instructor/Student)
- Form validation
- Redirect after authentication

### 📊 **Dashboard (Role-based)**

#### Instructor Dashboard
- Assignment creation form
- Submission review panel
- Analytics with pie charts
- Feedback management system

#### Student Dashboard
- Available assignments list
- Submission status tracking
- Personal submission history
- Assignment details view

### 📱 **Responsive Design**
- Mobile-first approach
- Tablet optimized layouts
- Desktop full-screen experience
- Touch-friendly interactions

## 🛠 Technology Stack

### **Core Technologies**
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript/JavaScript
- **Styling:** TailwindCSS
- **UI Components:** Shadcn/ui + Radix UI
- **Authentication:** NextAuth.js

### **Data & State Management**
- **HTTP Client:** Fetch API
- **State Management:** React Hooks (useState, useEffect)
- **Data Visualization:** Recharts
- **Form Handling:** React Hook Form

### **Development Tools**
- **Package Manager:** npm/yarn
- **Linting:** ESLint
- **Code Formatting:** Prettier
- **Build Tool:** Next.js built-in bundler

### **Deployment & Performance**
- **Hosting:** Vercel
- **CDN:** Vercel Edge Network
- **Performance:** Image optimization, Code splitting
- **SEO:** Server-side rendering, Meta tags

## 🎯 Core Features Implementation

### 👨‍🏫 **Instructor Features**
```jsx
// Assignment Creation
const CreateAssignment = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: ''
  });
  
  const handleSubmit = async (data) => {
    await createAssignment(data);
  };
};
```

### 👨‍🎓 **Student Features**
```jsx
// Assignment Submission
const SubmitAssignment = () => {
  const [submission, setSubmission] = useState({
    submissionUrl: '',
    note: ''
  });
  
  const handleSubmit = async (data) => {
    await submitAssignment(assignmentId, data);
  };
};
```

### 📊 **Analytics Dashboard**
```jsx
// Submission Statistics
const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0
  });
  
  return (
    <PieChart data={chartData}>
      <Pie dataKey="value" />
    </PieChart>
  );
};
```

## 🔒 Authentication & Security

### **NextAuth Configuration**
```javascript
// lib/auth.js
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Authentication logic
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    }
  }
};
```

### **Route Protection**
```jsx
// Middleware for protected routes
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*"]
};
```

## 📱 Responsive Design Breakpoints

```css
/* Tailwind CSS Responsive Design */
/* Mobile First Approach */

/* Mobile: default (< 640px) */
.container { @apply px-4; }

/* Tablet: sm (640px+) */
@media (min-width: 640px) {
  .container { @apply px-6; }
}

/* Desktop: lg (1024px+) */
@media (min-width: 1024px) {
  .container { @apply px-8; }
}

/* Large Desktop: xl (1280px+) */
@media (min-width: 1280px) {
  .container { @apply px-12; }
}
```

## 🚀 Performance Optimizations

- **Image Optimization** - Next.js automatic image optimization
- **Code Splitting** - Automatic route-based code splitting
- **Server-Side Rendering** - Fast initial page loads
- **Static Generation** - Pre-rendered pages where possible
- **Bundle Analysis** - Webpack bundle analyzer integration

## 🧪 Testing & Quality Assurance

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type checking (if TypeScript)
npm run type-check
```

## 🌐 Deployment

### **Vercel Configuration**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm install"
}
```

### **Environment Variables (Production)**
```env
NEXTAUTH_URL=https://assignhub-client.vercel.app
NEXTAUTH_SECRET=your_production_secret
NEXT_PUBLIC_API_URL=https://assignhub-server.vercel.app
```

## 🎨 UI Component Examples

### **Assignment Card Component**
```jsx
const AssignmentCard = ({ assignment }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{assignment.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{assignment.description}</p>
        <Badge variant="outline">
          Due: {formatDate(assignment.deadline)}
        </Badge>
      </CardContent>
    </Card>
  );
};
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow React/Next.js best practices
- Use TypeScript for type safety
- Implement responsive design
- Write meaningful commit messages
- Test components thoroughly

## 📞 Support & Contact

- **🌐 Portfolio:** [sumon-ray.vercel.app](https://sumon-ray.vercel.app/)
- **💼 LinkedIn:** [linkedin.com/in/sumon60](https://www.linkedin.com/in/sumon60/)
- **📧 GitHub:** [@sumon-ray](https://github.com/sumon-ray)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the incredible framework
- Vercel for seamless deployment experience
- Shadcn/ui for beautiful component library
- TailwindCSS for utility-first styling
- Open source community for inspiration

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Sumon Ray](https://github.com/sumon-ray)

</div>
