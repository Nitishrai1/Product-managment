product-management-backend/
│── src/
│   ├db/ 
│   ├── controllers/
│   │   ├── authController.ts   # Authentication logic (Signup, Login)
│   │   ├── productController.ts # CRUD operations for products
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.ts   # JWT authentication for protected routes
│   │
│   
│   ├── routes/
│   │   ├── authRoutes.ts       # Authentication routes
│   │   ├── productRoutes.ts    # Product-related routes
│   │
│   ├── services/
│   │   ├── authService.ts      # Business logic for authentication
│   │   ├── productService.ts   # Business logic for products
│   │
│   ├── utils/
│   │   ├── generateToken.ts    # JWT token generator function
│   │   ├── validateInputs.ts   # Zod input validation functions
│   │
│   ├── app.js                  # Express app setup
│   ├── server.js               # Starts the server
│
│── .env                         # Environment variables (DB URL, JWT secret)
│── .gitignore                    # Ignore node_modules & env files
│── package.json                  # Dependencies & scripts
│── prisma/
│   ├── migrations/               # Database migrations
│── README.md                     # Doc

Success (2xx)
✅ 200 OK – The request was successful (used for GET, POST, PUT, DELETE).
✅ 201 Created – The request created a new resource (commonly used for POST requests).
✅ 204 No Content – The request was successful, but there’s no content to return (often used for DELETE).

Redirection (3xx)
🔁 301 Moved Permanently – The requested resource has a new permanent URL.
🔁 302 Found (Temporary Redirect) – The resource is temporarily available at another location.
🔁 304 Not Modified – The client can use a cached version of the resource.

Client Errors (4xx)
⚠️ 400 Bad Request – The request was malformed or invalid.
⚠️ 401 Unauthorized – Authentication is required (e.g., missing/invalid token).
⚠️ 403 Forbidden – The client is authenticated but not allowed to access the resource.
⚠️ 404 Not Found – The requested resource does not exist.
⚠️ 405 Method Not Allowed – The request method (e.g., GET, POST) is not allowed for the resource.
⚠️ 429 Too Many Requests – The client has exceeded the rate limit.

Server Errors (5xx)
❌ 500 Internal Server Error – A generic error on the server side.
❌ 502 Bad Gateway – The server received an invalid response from an upstream server.
❌ 503 Service Unavailable – The server is overloaded or down for maintenance.
❌ 504 Gateway Timeout – The server did not get a response in time from another server.