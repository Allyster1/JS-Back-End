# FriendlyWorld

FriendlyWorld is a Node.js / JavaScript backend project intended as a practical exam for Softuni's JS Back-End (2025) course.

---

## 🏗 Project Structure - Three-Tier Architecture

```
src/
├── controllers/         # HTTP request handlers
├── middleware/          # Auth, error handling, etc.
├── models/              # Database schemas / models
├── public/              # Static files (css and images)
├── services/            # Business logic
├── utils/               # Helper functions (e.g. JWT utils, hashing)
├── views/
   ├── helpers - pageHelpers.js           # Helper for dynamic page title
   ├── layouts                            # Main layout with header/footer
   ├── home.hbs                           # Home page template
   ├── 404.hbs                            # 404 page template
   └── partials/                          # Reusable partial templates
└── index.js                              # Entry point / server setup

generateSecret.js        # Optional function for generating a JWT Secret

.env                     # Environment variables
.env.example             # Template file for required env vars
.gitignore               # Exclude .env and other sensitive files
package.json             # Dependencies, scripts, metadata
```

---

## ✅ Setup / Getting Started

<!-- 1. **Clone the repo**

   ```bash
   git clone https://github.com/Allyster1/JS-Back-End.git
   cd JS-Back-End/exam-prep/FriendlyWorld
   ``` -->

<!-- 1. **Copy `.env.example` to `.env`**

   ```bash
   cp .env.example .env
   ```

   (Then fill in actual values: database URI, JWT secret, etc.) -->

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Optional: generate a new JWT secret**

   ```bash
   npm run generate-secret
   ```

   (Paste new secret into your JWT_SECRET at `.env` afterwards.)

3. **Run the app in development**

   ```bash
   npm run dev
   ```

---

## 🔐 Environment variables & JWT / Secrets

-  **Environment variables**
   Uses `.env.example / .env` to define what environment variables the project needs (e.g. `PORT`, `MONGODB_URI`, `JWT_SECRET`).

-  **JWT / Secrets**

   -  Use `crypto.randomBytes(...)` to generate a strong secret (e.g. 64 bytes).
   -  Store it in env (via `.env`) and load via `dotenv` or similar.
   -  Don’t regenerate the secret on every startup — that would invalidate existing tokens.

## 🛠 Scripts (in `package.json`)

-  `npm run dev` — Run in development mode (with auto-reload)
-  `npm start` — Run in production mode
-  `npm run generate-secret` (optional) — Generates the JWT Secret

---

## 🧾 Sample `.env.example`

```
# Server
PORT=3000

# MongoDB
MONGODB_URI=mongodb://localhost:27017/friendlyworld

# JWT secret
JWT_SECRET=your_jwt_secret_here
```
