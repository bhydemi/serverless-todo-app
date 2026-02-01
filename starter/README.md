# Serverless TODO Application

A serverless TODO application built with AWS Lambda, API Gateway, DynamoDB, and S3, using the Serverless Framework.

## Deployment Details

### API Endpoint
```
https://wjmrrmw8gk.execute-api.us-east-1.amazonaws.com/dev
```

### Auth0 Configuration
```
Domain: dev-tmfehhgvloaytq76.us.auth0.com
Client ID: XdY9Xe73FAsQgXfhao4k4wlE5KMg62BS
```

### AWS Resources
| Resource | Name |
|----------|------|
| DynamoDB Table | Todos-dev |
| S3 Bucket | serverless-todo-attachments-dev-739867042884 |
| Region | us-east-1 |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /todos | Get all TODOs for authenticated user |
| POST | /todos | Create a new TODO |
| PATCH | /todos/{todoId} | Update a TODO |
| DELETE | /todos/{todoId} | Delete a TODO |
| POST | /todos/{todoId}/attachment | Get presigned URL for file upload |

## Project Structure

```
starter/
├── backend/
│   ├── serverless.yml              # AWS resources & Lambda config
│   ├── models/                     # Request validation schemas
│   └── src/
│       ├── auth/                   # Auth utilities
│       ├── businessLogic/          # Business logic layer
│       ├── dataLayer/              # DynamoDB access layer
│       ├── fileStorage/            # S3 operations
│       ├── lambda/
│       │   ├── auth/               # Auth0 JWT authorizer
│       │   └── http/               # Lambda handlers
│       └── utils/                  # Logger
│
└── client/                         # React frontend
    └── .env                        # Auth0 & API configuration
```

## Architecture

### Layered Architecture
- **Lambda Handlers** - HTTP request/response handling
- **Business Logic** - Core application logic (`businessLogic/todos.mjs`)
- **Data Layer** - DynamoDB operations (`dataLayer/todosAccess.mjs`)
- **File Storage** - S3 operations (`fileStorage/attachmentUtils.mjs`)

### Database Design
- **Partition Key**: userId (HASH)
- **Sort Key**: todoId (RANGE)
- **Local Secondary Index**: CreatedAtIndex (for sorting by creation date)

### Best Practices Implemented
- IAM roles per function (least privilege)
- X-Ray distributed tracing enabled
- Winston JSON logging
- Request validation with JSON schemas
- CORS properly configured
- Auth0 JWT verification with JWKS

## Running the Application

### Backend Deployment
```bash
cd backend
npm install
serverless deploy
```

### Frontend
```bash
cd client
npm install
npm start
```

Then open http://localhost:3000

## Testing

1. Open the frontend at http://localhost:3000
2. Log in with Auth0
3. Create, update, and delete TODOs
4. Upload image attachments using the pencil icon

## Author
Udacity Cloud Developer Nanodegree Project
