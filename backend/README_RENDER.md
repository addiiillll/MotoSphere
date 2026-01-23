# Deploying to Render.com

Render is a great choice for this backend. Here is how to set it up:

## 1. Create a New Web Service
1. Connect your GitHub repository to Render.
2. Select the `backend` directory as the **Root Directory**.
3. Environment: `Node`

## 2. Configuration
- **Build Command**: `npm install`
- **Start Command**: `npm start`

## 3. Environment Variables
You MUST add these in the Render Dashboard (**Environment** tab):

| Key | Value (Example) | Description |
|-----|-----------------|-------------|
| `NODE_ENV` | `production` | Enables production middleware (Helmet, Rate Limiting) |
| `PORT` | `10000` | (Render provides this automatically, but good to have) |
| `MONGODB_URI` | `mongodb+srv://...` | Your production database connection string |
| `JWT_SECRET` | `your_random_string` | Secret for signing tokens |
| `ALLOWED_ORIGINS` | `https://your-frontend.vercel.app` | **CRITICAL**: The URL where your frontend is hosted |

## 4. Troubleshooting
- If your server keeps restarting, check the `MONGODB_URI` logs to ensure the database is reachable from Render's IP.
- Ensure `ALLOWED_ORIGINS` matches your frontend exactly.
