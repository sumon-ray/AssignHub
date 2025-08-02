# 🎓 AssignHub Server

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://assignhub-server.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/sumon-ray/AssignHub/tree/main/server)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://mongodb.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

> **A robust Node.js backend API for an Assignment Submission Portal supporting role-based authentication, assignment management, and submission tracking.**

## 🌟 Overview

AssignHub Server is the backend API for a comprehensive assignment submission portal that facilitates seamless interaction between instructors and students. Built with modern technologies and deployed on Vercel, it provides secure authentication, role-based access control, and efficient data management.

### 🎯 Key Features

- 🔐 **JWT-based Authentication** - Secure user registration and login
- 👥 **Role-based Access Control** - Separate permissions for instructors and students  
- 📝 **Assignment Management** - CRUD operations for assignments
- 📊 **Submission Tracking** - Handle student submissions with status updates
- ⚡ **RESTful API Design** - Clean, scalable API architecture
- 🚀 **Vercel Deployment** - Serverless deployment with optimal performance

## 📁 Project Structure

```
AssignHub/server/
├── 📁 .vercel/                 # Vercel deployment configuration
├── 📁 .vscode/                 # VS Code workspace settings
├── 📁 api/                     # API route handlers
│   └── 📄 index.js            # Main API entry point
├── 📁 config/                  # Configuration files
│   └── 📄 db.js               # Database connection setup
├── 📁 controllers/             # Business logic controllers
│   ├── 📄 assignmentController.js  # Assignment operations
│   ├── 📄 authController.js        # Authentication logic
│   └── 📄 submissionController.js  # Submission handling
├── 📁 middleware/              # Custom middleware functions
│   └── 📄 authMiddleware.js    # Authentication middleware
├── 📁 models/                  # Database models (Mongoose schemas)
│   ├── 📄 Assignment.js        # Assignment model
│   ├── 📄 Submission.js        # Submission model
│   └── 📄 User.js              # User model
├── 📁 routes/                  # Route definitions
│   ├── 📄 assignmentRoutes.js  # Assignment routes
│   ├── 📄 authRoutes.js        # Authentication routes
│   └── 📄 submissionRoutes.js  # Submission routes
├── 📄 .env                     # Environment variables
├── 📄 .gitignore              # Git ignore rules
├── 📄 app.js                  # Express app configuration
├── 📄 index.js                # Main server entry point
├── 📄 package.json            # Project dependencies & scripts
├── 📄 README.md               # Project documentation
└── 📄 vercel.json             # Vercel deployment config
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sumon-ray/AssignHub.git
   cd AssignHub/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   # Create .env file and add the following variables:
   
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRE=7d
   NODE_ENV=production
   ```

4. **Start the development server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   
   # Direct execution
   node index.js
   ```

5. **Access the API**
   ```
   Local: http://localhost:5000
   Live:  https://assignhub-server.vercel.app/
   ```

## 📋 API Documentation

### 🔐 Authentication Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `POST` | `/api/auth/register` | User registration (instructor/student) | Public |
| `POST` | `/api/auth/login` | User authentication | Public |
| `GET` | `/api/auth/profile` | Get user profile | Private |
| `POST` | `/api/auth/logout` | User logout | Private |

### 📝 Assignment Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/assignments` | Get all assignments | Private |
| `POST` | `/api/assignments` | Create new assignment | Instructor |
| `GET` | `/api/assignments/:id` | Get assignment by ID | Private |
| `PUT` | `/api/assignments/:id` | Update assignment | Instructor |
| `DELETE` | `/api/assignments/:id` | Delete assignment | Instructor |

### 📊 Submission Endpoints
| Method | Endpoint | Description | Access |
|--------|----------|-------------|---------|
| `GET` | `/api/submissions` | Get all submissions | Instructor |
| `POST` | `/api/submissions` | Submit assignment | Student |
| `GET` | `/api/submissions/:id` | Get submission by ID | Private |
| `PUT` | `/api/submissions/:id` | Update submission status | Instructor |
| `GET` | `/api/submissions/student/:studentId` | Get student's submissions | Student |

## 🏗️ Architecture & Design

### 🔧 Technology Stack
- **Runtime:** Node.js v18+
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Deployment:** Vercel (Serverless)
- **Development:** VS Code with ESLint

### 🗄️ Database Schema

#### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['instructor', 'student']),
  createdAt: Date,
  updatedAt: Date
}
```

#### Assignment Model
```javascript
{
  title: String (required),
  description: String (required),
  deadline: Date (required),
  instructor: ObjectId (ref: 'User'),
  createdAt: Date,
  updatedAt: Date
}
```

#### Submission Model
```javascript
{
  assignment: ObjectId (ref: 'Assignment'),
  student: ObjectId (ref: 'User'),
  submissionUrl: String (required),
  note: String,
  status: String (enum: ['Pending', 'Accepted', 'Rejected']),
  feedback: String,
  submittedAt: Date,
  reviewedAt: Date
}
```

## 🔒 Security Features

- **JWT Authentication** - Stateless authentication with secure tokens
- **Password Hashing** - bcrypt for secure password storage
- **CORS Protection** - Configured for cross-origin requests
- **Input Validation** - Mongoose schema validation
- **Route Protection** - Middleware-based access control
- **Environment Variables** - Sensitive data protection

## 🌐 Deployment

### Vercel Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.js"
    }
  ]
}
```

### Environment Variables (Production)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_production_jwt_secret
NODE_ENV=production
```

## 🧪 API Testing

You can test the API endpoints using tools like:
- **Postman** - Import collection for easy testing
- **Thunder Client** - VS Code extension for API testing
- **curl** - Command line testing

### Sample API Calls

**User Registration:**
```bash
curl -X POST https://assignhub-server.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"student"}'
```

**Create Assignment:**
```bash
curl -X POST https://assignhub-server.vercel.app/api/assignments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Math Assignment","description":"Solve calculus problems","deadline":"2024-12-31"}'
```

## 📈 Performance & Scalability

- **Serverless Architecture** - Auto-scaling with Vercel
- **Database Indexing** - Optimized MongoDB queries
- **Connection Pooling** - Efficient database connections
- **Error Handling** - Comprehensive error management
- **Response Caching** - Optimized API responses

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Follow ESLint configuration
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed

## 📞 Support & Contact

- **🌐 Portfolio:** [sumon-ray.vercel.app](https://sumon-ray.vercel.app/)
- **💼 LinkedIn:** [linkedin.com/in/sumon60](https://www.linkedin.com/in/sumon60/)
- **📧 GitHub:** [@sumon-ray](https://github.com/sumon-ray)

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Express.js community for the robust framework
- MongoDB team for the flexible database solution
- Vercel for seamless deployment experience
- Open source contributors who made this project possible

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ by [Sumon Ray](https://github.com/sumon-ray)

</div>
