# MotoSphere Backend API

A minimal backend for the MotoSphere platform - a fuel station finder and price comparison service.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update `.env` file with your MongoDB Atlas connection:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/MotoSphere
JWT_SECRET=your_secret_key
PORT=4000
```

3. Start the server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/location` - Update user location (auth required)

### Stations
- `POST /api/stations` - Create station (station_owner/admin only)
- `GET /api/stations/nearby?latitude=X&longitude=Y&radius=10000` - Get nearby stations
- `GET /api/stations/compare?latitude=X&longitude=Y&fuelType=petrol` - Compare fuel prices
- `GET /api/stations/:id` - Get station details
- `PUT /api/stations/:id` - Update station (owner/admin only)

### Alerts
- `POST /api/alerts` - Create price alert (auth required)
- `GET /api/alerts` - Get user alerts (auth required)
- `DELETE /api/alerts/:id` - Delete alert (auth required)

### Admin
- `GET /api/admin/stations/pending` - Get unverified stations (admin only)
- `PUT /api/admin/stations/:id/verify` - Verify station (admin only)
- `GET /api/admin/users` - Get all users (admin only)

## User Roles
- `user` - Regular users who search for stations
- `station_owner` - Can create and manage stations
- `admin` - Full platform access

## Sample Requests

### Register User
```json
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### Create Station
```json
POST /api/stations
Authorization: Bearer <token>
{
  "name": "Shell Station",
  "address": "123 Main St",
  "latitude": 40.7128,
  "longitude": -74.0060,
  "fuelPrices": {
    "petrol": 95.50,
    "diesel": 89.30
  },
  "services": ["car_wash", "convenience_store"]
}
```

### Create Alert
```json
POST /api/alerts
Authorization: Bearer <token>
{
  "stationId": "station_id_here",
  "fuelType": "petrol",
  "targetPrice": 90.00
}
```