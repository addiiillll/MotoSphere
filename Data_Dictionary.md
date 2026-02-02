# MotoSphere - Data Dictionary

## Data Stores

### **D1: Users**
| Field Name | Data Type | Length | Description | Constraints |
|------------|-----------|---------|-------------|-------------|
| _id | ObjectId | 24 chars | Unique user identifier | Primary Key |
| name | String | 50 chars | User's full name | Required, Not Null |
| email | String | 100 chars | User's email address | Required, Unique |
| password | String | 255 chars | Encrypted password | Required, Min 6 chars |
| role | String | 10 chars | User role (user/admin) | Required, Enum |
| location | Object | - | Geographic coordinates | Optional |
| createdAt | Date | - | Account creation date | Auto-generated |
| updatedAt | Date | - | Last update date | Auto-generated |

### **D2: Motorcycles**
| Field Name | Data Type | Length | Description | Constraints |
|------------|-----------|---------|-------------|-------------|
| _id | ObjectId | 24 chars | Unique motorcycle identifier | Primary Key |
| modelName | String | 100 chars | Motorcycle model name | Required, Not Null |
| brand | ObjectId | 24 chars | Reference to brand | Required, Foreign Key |
| price | Number | - | Price in currency | Required, Positive |
| type | String | 20 chars | Motorcycle category | Required, Enum |
| displacement | Number | - | Engine displacement (cc) | Required, Positive |
| specifications | Object | - | Technical specifications | Optional |
| features | Array | - | List of features | Optional |
| description | Text | 1000 chars | Detailed description | Required |
| images | Array | - | Image URLs | Required |
| isLatest | Boolean | - | Latest model flag | Default: false |
| isHighlighted | Boolean | - | Featured motorcycle flag | Default: false |
| slug | String | 150 chars | URL-friendly identifier | Required, Unique |
| createdAt | Date | - | Creation date | Auto-generated |
| updatedAt | Date | - | Last update date | Auto-generated |

### **D3: Reviews**
| Field Name | Data Type | Length | Description | Constraints |
|------------|-----------|---------|-------------|-------------|
| _id | ObjectId | 24 chars | Unique review identifier | Primary Key |
| user | ObjectId | 24 chars | Reference to user | Required, Foreign Key |
| motorcycle | ObjectId | 24 chars | Reference to motorcycle | Required, Foreign Key |
| rating | Number | - | Rating (1-5 stars) | Required, Range 1-5 |
| comment | Text | 500 chars | Review comment | Required, Not Null |
| createdAt | Date | - | Review creation date | Auto-generated |
| updatedAt | Date | - | Last update date | Auto-generated |

### **D4: Brands**
| Field Name | Data Type | Length | Description | Constraints |
|------------|-----------|---------|-------------|-------------|
| _id | ObjectId | 24 chars | Unique brand identifier | Primary Key |
| name | String | 50 chars | Brand name | Required, Unique |
| logo | String | 255 chars | Logo image URL | Optional |
| description | Text | 500 chars | Brand description | Optional |
| originCountry | String | 50 chars | Country of origin | Optional |
| isFeatured | Boolean | - | Featured brand flag | Default: false |
| createdAt | Date | - | Creation date | Auto-generated |
| updatedAt | Date | - | Last update date | Auto-generated |

## Data Flows

### **Input Data Flows**

| Flow Name | Source | Destination | Description | Data Elements |
|-----------|--------|-------------|-------------|---------------|
| Login Data | User | User Management | User authentication | email, password |
| Registration Data | Guest | User Management | New user signup | name, email, password, location |
| Review Data | User | Review System | User review submission | rating, comment, motorcycle_id |
| Search Query | Guest/User | Search System | Search request | keywords, filters, sort_order |
| Motorcycle Data | Admin | Motorcycle Management | New/updated motorcycle | model, brand, price, specs, images |
| Brand Data | Admin | Motorcycle Management | Brand information | name, logo, description, country |
| Contact Message | Guest/User | Communication | Support request | name, email, subject, message |

### **Output Data Flows**

| Flow Name | Source | Destination | Description | Data Elements |
|-----------|--------|-------------|-------------|---------------|
| User Profile | User Management | User | User account info | name, email, role, location |
| Motorcycle List | Motorcycle Management | Guest/User | Catalog display | model, brand, price, image, rating |
| Motorcycle Details | Motorcycle Management | Guest/User | Detailed view | full specifications, images, reviews |
| Search Results | Search System | Guest/User | Filtered results | matching motorcycles, count |
| Reviews | Review System | Guest/User | Review display | rating, comment, user_name, date |
| Authentication Token | User Management | User | Login success | JWT token, user_role |

## Data Elements Dictionary

### **Enumerated Values**

| Element | Values | Description |
|---------|--------|-------------|
| user_role | user, admin | System access level |
| motorcycle_type | Sport, Cruiser, Adventure, Touring, Naked, Off-road, Scooter | Motorcycle categories |
| contact_status | New, Read, Replied | Contact message status |
| post_category | Update, Tip, Buying Guide, Review, News | Blog post types |

### **Composite Data Elements**

| Element | Components | Description |
|---------|------------|-------------|
| location | type, coordinates | Geographic point data |
| specifications | engineType, maxPower, maxTorque, fuelCapacity, weight, topSpeed, seatHeight, gearbox, frontBrake, rearBrake, abs, suspension | Technical motorcycle specs |
| search_filters | brand, type, price_min, price_max, displacement_min, displacement_max | Search criteria |

### **Validation Rules**

| Field | Rule | Error Message |
|-------|------|---------------|
| email | Valid email format | "Please enter a valid email address" |
| password | Minimum 6 characters | "Password must be at least 6 characters" |
| rating | Integer between 1-5 | "Rating must be between 1 and 5 stars" |
| price | Positive number | "Price must be greater than 0" |
| displacement | Positive integer | "Displacement must be a positive number" |

## External Entities

| Entity | Description | Data Exchanged |
|--------|-------------|----------------|
| Guest | Anonymous website visitor | Browse requests, search queries, contact messages |
| User | Registered customer | Login credentials, reviews, profile updates |
| Admin | System administrator | Content management, user management, system monitoring |

## Data Storage Specifications

| Store | Type | Size Estimate | Backup Frequency |
|-------|------|---------------|------------------|
| Users | MongoDB Collection | 10MB per 1000 users | Daily |
| Motorcycles | MongoDB Collection | 50MB per 1000 motorcycles | Daily |
| Reviews | MongoDB Collection | 5MB per 1000 reviews | Daily |
| Brands | MongoDB Collection | 1MB per 100 brands | Weekly |
| Images | File System | 2MB per image | Daily |