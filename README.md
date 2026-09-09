<div align="center">
  <img src="https://lensflow-sable.vercel.app/assets/logo_2-UbCzOxfT.png" width="50px"/>

  <h1>Lensflow</h1>

  <p>
    A modern photo-sharing platform inspired by Unsplash.
  </p>
</div>
<br>
<br>
> **A modern photo-sharing platform inspired by the visual simplicity of Unsplash — built completely from scratch with the MERN stack.**

LensFlow is a full-stack photo-sharing web application where users can discover, upload, manage, bookmark, and organize photographs into collections.

The project focuses on building a complete application experience rather than just a frontend interface — including authentication, image uploads, cloud storage, database relationships, bookmarks, collections, profile management, and more.

🔗 **Live Demo:** https://lensflow-sable.vercel.app

---

## ✨ Features

### 🔐 Authentication & Account Management
- User registration and login
- JWT-based authentication
- Protected routes
- Password-protected account actions
- Profile management
- Secure logout flow
- Account deletion with password verification

### 📸 Photo Management
- Upload photographs
- Cloud-based image storage
- Photo metadata management
- Photo detail page
- Image viewing and zoom experience
- Photo views tracking
- Delete/manage uploaded photos

### 🔖 Bookmarks
- Bookmark photos
- Remove bookmarks
- Dedicated bookmarks page
- Persistent bookmark relationships stored in MongoDB

### 📚 Collections
- Create personal photo collections
- Add photos to collections
- Remove/manage collection photos
- Private collections support
- Collection-based photo organization

### 👤 Profile
- User profile page
- Profile image
- User information
- Uploaded photos
- Saved/bookmarked photos
- Personal collections

### 🎨 UI / UX
- Clean, modern photography-focused interface
- Unsplash-inspired visual direction
- Responsive layout *(currently being improved)*
- Skeleton loading states
- Image-focused cards
- Smooth interactions and modern UI components
- Lucide icons

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | UI development |
| Vite | Development & build tooling |
| Tailwind CSS | Styling |
| React Router | Client-side routing |
| Redux Toolkit | Global state management |
| TanStack React Query | Server-state management |
| Lucide React | Icons |
| React Medium Image Zoom | Image zoom experience |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | REST API |
| MongoDB | Database |
| Mongoose | MongoDB ODM |
| JWT | Authentication |
| bcrypt | Password hashing |
| Multer | File handling |
| Cloudinary | Image storage |
| Validator | Input validation |
| Helmet | Security headers |
| Express Rate Limit | API rate limiting |

### Deployment

- **Frontend:** Vercel
- **Backend:** Node.js / Express deployment
- **Database:** MongoDB Atlas
- **Image Storage:** Cloudinary
- **Version Control:** Git & GitHub

---

## 🏗️ Architecture

LensFlow follows a separated frontend/backend architecture:

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │      + Vite         │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │  Express Backend    │
                    │      + Node.js      │
                    └──────┬───────┬──────┘
                           │       │
                    ┌──────▼───┐ ┌─▼──────────┐
                    │ MongoDB  │ │ Cloudinary │
                    │  Atlas   │ │   Images   │
                    └──────────┘ └────────────┘
```

---

## 📂 Project Structure

LensFlow/
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       │   ├── common/
│       │   └── ...
│       ├── pages/
│       ├── redux/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
└── README.md

---

## 🔒 Security

LensFlow includes several security practices:

- Password hashing with **bcrypt**
- JWT authentication
- Protected API routes
- Authentication middleware
- HTTP security headers with **Helmet**
- API rate limiting
- Server-side validation
- Environment variables for secrets
- Password verification for sensitive account operations

---

## ⚙️ Environment Variables

PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

---

## 🧠 What I Learned

Building LensFlow helped me work with a complete full-stack workflow instead of treating frontend and backend as separate projects.

### Frontend
- Building reusable React components
- Managing global state with Redux Toolkit
- Handling server state with TanStack React Query
- Creating protected routes
- Working with asynchronous API requests
- Building loading and skeleton states
- Creating image-focused UI experiences

### Backend
- Designing REST APIs with Express
- Structuring controllers, routes, models, and middleware
- Working with MongoDB and Mongoose
- Implementing JWT authentication
- Hashing and verifying passwords
- Handling multipart uploads
- Integrating Cloudinary
- Implementing API security practices

### Full Stack
- Connecting React with an Express API
- Managing authentication across client and server
- Designing MongoDB relationships
- Handling cloud image storage
- Deploying a full-stack application
- Debugging production and deployment issues

---

## 🚧 Pending Improvements

LensFlow is actively being improved.

### Planned / Pending Features

- 📱 Better responsiveness across all screen sizes
- 🔎 Advanced search functionality
- 🎛️ Search filters
- 🏷️ Improved category and orientation filtering
- ⚡ Further performance optimization
- ✨ Additional UI animations and micro-interactions
- 📸 More advanced photo discovery features
- 🧩 Additional collection functionality

---

## 🎯 Project Goals

The main goal of LensFlow is to build a polished photo-sharing platform while gaining practical experience with:

**React → APIs → Authentication → MongoDB → Cloudinary → State Management → Deployment**

Rather than relying on a ready-made backend or an external photo API, the application is built around its own database and backend infrastructure.

---

## 🌐 Live Project

### LensFlow

**Live Website:**  
https://lensflow-sable.vercel.app

---

## 👨‍💻 Built By

**Kaif Soomro**

Full Stack Developer

Built from scratch with the **MERN Stack**.

---

## ⭐ Support

If you like the project, consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is created for learning, development, and portfolio purposes.
