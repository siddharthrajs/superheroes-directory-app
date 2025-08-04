<<<<<<< HEAD
# Superheroes Directory

A full-stack web application for managing a superheroes database with CRUD operations, featuring a React frontend and Express.js backend with MongoDB.

## 🚀 Features

- **Full CRUD Operations**: Create, read, update, and delete superheroes
- **Real-time Search & Filter**: Search by name, filter by alignment and universe
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern Tech Stack**: React 19, TypeScript, Node.js, Express, MongoDB
- **Beautiful UI**: Tailwind CSS with DaisyUI components

## 🏗️ Project Structure

```
superheroes-directory/
├── superheroes-frontend/          # React frontend application
│   ├── src/
│   │   ├── components/           # React components
│   │   ├── types/               # TypeScript type definitions
│   │   ├── utils/               # Utility functions
│   │   └── App.tsx              # Main application component
│   ├── package.json
│   └── vite.config.ts
├── superheroes-backend/           # Node.js backend API
│   ├── models/                  # Mongoose schemas
│   ├── routes/                  # Express routes
│   ├── seeds/                   # Database seed data
│   ├── server.js                # Main server file
│   └── package.json
├── ARCHITECTURE.md               # Detailed technical documentation
├── package.json                 # Root package.json for monorepo
└── README.md
```

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** + **DaisyUI** for styling
- **Fetch API** for HTTP requests

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **CORS** for cross-origin requests
- **dotenv** for environment configuration

### Database
- **MongoDB Atlas** (cloud database)

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm (v8 or higher)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/siddharthrajs/superheroes-directory.git
   cd superheroes-directory
   ```

2. **Install dependencies for all packages**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `superheroes-backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3001
   NODE_ENV=development
   ```

4. **Seed the database (optional)**
   ```bash
   npm run seed
   ```

### Development

**Start both frontend and backend concurrently:**
```bash
npm run dev
```

**Or start them separately:**
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend  
npm run dev:frontend
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

### Production Build

```bash
npm run build
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/superheroes` | Get all superheroes |
| GET | `/api/superheroes/:id` | Get superhero by ID |
| POST | `/api/superheroes` | Create new superhero |
| PUT | `/api/superheroes/:id` | Update superhero |
| DELETE | `/api/superheroes/:id` | Delete superhero |
| GET | `/api/health` | Health check |

## 🗄️ Data Model

```typescript
interface Superhero {
  _id: string;
  name: string;
  realName: string;
  powers: string[];
  originStory: string;
  imageUrl: string;
  alignment: 'hero' | 'villain';
  universe: 'marvel' | 'dc' | 'other';
  createdAt: Date;
  updatedAt: Date;
}
```

## 🚀 Deployment

### Option 1: Separate Deployment (Recommended)
- **Frontend**: Deploy to Vercel or Netlify
- **Backend**: Deploy to Railway, Render, or Heroku
- **Database**: MongoDB Atlas (already configured)

### Option 2: Full-Stack Platform
- Deploy both frontend and backend to Railway or Render

### Environment Variables for Production

**Backend:**
```env
MONGODB_URI=your_production_mongodb_uri
PORT=3001
NODE_ENV=production
```

**Frontend:**
```env
VITE_API_URL=https://your-backend-url.com/api
```

## 📝 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm run build` - Build frontend for production
- `npm run install:all` - Install dependencies for all packages
- `npm run seed` - Seed the database with sample data
- `npm run clean` - Remove all node_modules and build files

### Frontend (`superheroes-frontend/`)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (`superheroes-backend/`)
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with sample data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Sample superhero data inspired by Marvel and DC Comics
- UI components powered by DaisyUI
- Icons and styling with Tailwind CSS

---

**Happy coding! 🦸‍♂️🦸‍♀️**
=======
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
# superheroes-directory
>>>>>>> 72668753c4ba812572a351ee9308d22c737b2196
# superheroes-directory-app
