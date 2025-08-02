# AssignHub - Assignment Submission Portal

A comprehensive full-stack web application that streamlines assignment management between instructors and students. Built with modern technologies to provide a seamless experience for creating, submitting, and reviewing assignments.

## 🌟 Live Demo

**🚀 [Visit AssignHub](https://assignhub-client.vercel.app/)**

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## ✨ Features

### 👨‍🏫 Instructor Capabilities
- **Assignment Management**: Create assignments with title, description, and deadlines
- **Submission Review**: View and evaluate all student submissions
- **Feedback System**: Provide detailed feedback on submissions
- **Status Management**: Update submission status (Pending, Accepted, Rejected)
- **Analytics Dashboard**: View submission statistics with interactive pie charts

### 👨‍🎓 Student Capabilities
- **Assignment Discovery**: Browse available assignments with details
- **Submission Portal**: Submit assignments with URLs and notes
- **Status Tracking**: Monitor submission status and feedback
- **Dashboard**: Personal overview of all submissions

### 🔐 Authentication & Security
- **NextAuth Integration**: Secure authentication system
- **Role-Based Access**: Separate interfaces for instructors and students
- **Route Protection**: Secured pages based on user roles
- **Session Management**: Persistent login sessions

### 📊 Analytics & Visualization
- **Interactive Charts**: Real-time pie charts showing submission statistics
- **Status Distribution**: Visual breakdown of Pending, Accepted, and Rejected submissions
- **Responsive Design**: Charts adapt to different screen sizes

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS + Shadcn/ui Components
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **UI Components**: Custom component library with Radix UI
- **State Management**: React Hooks
- **HTTP Client**: Fetch API

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcryptjs
- **Middleware**: CORS, body-parser
- **Development**: Nodemon for hot reloading

### Deployment
- **Frontend**: Vercel
- **Backend**: Vercel Serverless Functions
- **Database**: MongoDB Atlas

## 📁 Project Structure

### Frontend Structure
```
src/
├── app/
│   ├── dashboard/
│   │   ├── analytics/
│   │   ├── assignments/
│   │   │   ├── create/
│   │   │   └── [id]/
│   │   │       ├── submissions/
│   │   │       └── submit/
│   │   └── submissions/
│   │       └── [id]/
│   ├── login/
│   ├── register/
│   ├── globals.css
│   ├── layout.jsx
│   └── page.jsx
├── components/
│   ├── analytics/
│   ├── assignments/
│   ├── common/
│   ├── home/
│   ├── submissions/
│   └── ui/
└── services/
```

### Backend Structure
```
server/
├── api/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
└── node_modules/
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB database
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sumon-ray/AssignHub.git
   cd AssignHub
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up Environment Variables**
   
   Create `.env.local` in the client directory:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
   
   Create `.env` in the server directory:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   PORT=5000
   ```

5. **Start the Development Servers**
   
   Backend:
   ```bash
   cd server
   npm run dev
   ```
   
   Frontend (in a new terminal):
   ```bash
   cd client
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🔧 Environment Variables

### Frontend (.env.local)
| Variable | Description |
|----------|-------------|
| `NEXTAUTH_URL` | Base URL for NextAuth |
| `NEXTAUTH_SECRET` | Secret key for NextAuth |
| `NEXT_PUBLIC_API_URL` | Backend API URL |

### Backend (.env)
| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `PORT` | Server port (default: 5000) |

## 📖 Usage

### For Instructors

1. **Register/Login** as an instructor
2. **Create Assignments** from the dashboard
3. **Monitor Submissions** in real-time
4. **Review and Grade** student work
5. **Provide Feedback** and update status
6. **View Analytics** on the dashboard

### For Students

1. **Register/Login** as a student
2. **Browse Available Assignments**
3. **Submit Work** with URLs and notes
4. **Track Submission Status**
5. **View Feedback** from instructors

## 📊 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Assignment Endpoints
- `GET /api/assignments` - Get all assignments
- `POST /api/assignments` - Create assignment (instructor only)
- `GET /api/assignments/:id` - Get assignment by ID
- `PUT /api/assignments/:id` - Update assignment (instructor only)

### Submission Endpoints
- `GET /api/submissions` - Get user submissions
- `POST /api/submissions` - Submit assignment
- `PUT /api/submissions/:id` - Update submission status (instructor only)
- `GET /api/submissions/assignment/:id` - Get submissions for assignment

## 🖼 Screenshots

*Coming soon - Add screenshots of your application here*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Sumon Ray** - Full Stack Developer

- 🌐 **Portfolio**: [sumon-ray.vercel.app](https://sumon-ray.vercel.app/)
- 💼 **LinkedIn**: [linkedin.com/in/sumon60](https://www.linkedin.com/in/sumon60/)
- 📧 **GitHub**: [github.com/sumon-ray](https://github.com/sumon-ray)

---

## 🏆 Project Highlights

- ✅ **Full-Stack Implementation** with modern technologies
- ✅ **Responsive Design** works on all devices
- ✅ **Real-time Analytics** with interactive charts
- ✅ **Secure Authentication** with role-based access
- ✅ **RESTful API** with comprehensive endpoints
- ✅ **Production Ready** deployed on Vercel

**⭐ If you like this project, please give it a star on GitHub!**
