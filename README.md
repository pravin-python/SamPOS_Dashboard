# SamPOS Dashboard

A production-ready Point of Sale (POS) management dashboard built with Python and Flask. It helps businesses manage sales, inventory, customers, and reporting through a clean web interface and RESTful APIs.

## 📋 Project Overview
SamPOS Dashboard centralizes daily retail operations:
- Process sales and refunds
- Track stock in real time with low-stock alerts
- Maintain customers and purchase history
- Generate reports and analytics for decision making
- Role-based authentication and permissions

## ✨ Features
- Sales: create orders, line items, discounts, taxes, refunds
- Inventory: products, categories, stock levels, adjustments, suppliers
- Customers: profiles, purchase history, loyalty points (optional)
- Reports: daily/weekly/monthly sales, top products/customers, taxes
- Auth: JWT-based API auth, role-based access (Admin, Manager, Cashier)
- UI: Responsive Bootstrap-based dashboard

## 🛠️ Tech Stack
- Backend: Python, Flask (Flask-RESTful / Flask Blueprint), SQLAlchemy
- Frontend: HTML, CSS, JavaScript (Bootstrap)
- Database: SQLite (dev) / PostgreSQL (prod)
- Auth: JWT (PyJWT/Flask-JWT-Extended)
- Env/Config: python-dotenv

## 📦 Installation & Setup
### Prerequisites
- Python 3.9+ (3.8+ should work)
- pip and virtualenv
- PostgreSQL (for production)

### 1) Clone the repository
```bash
git clone https://github.com/pravin-python/SamPOS_Dashboard.git
cd SamPOS_Dashboard
```

### 2) Create and activate a virtual environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3) Install dependencies
```bash
pip install -r requirements.txt
```

### 4) Configure environment variables
Create a file named .env in the project root. Example:
```env
# Flask
FLASK_ENV=development
FLASK_APP=app.py
SECRET_KEY=change-this-in-production

# Database (SQLite for dev)
DATABASE_URL=sqlite:///sampos.db

# Database (PostgreSQL example for prod)
# DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:5432/DBNAME

# JWT
JWT_SECRET_KEY=change-this-too
TOKEN_EXPIRES_IN_DAYS=7

# App
ALLOWED_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```
Note: Previous README contained unrelated Django variables; this project uses Flask. Use the above variables instead.

### 5) Initialize the database
```bash
# Option A: Flask CLI (example)
flask db upgrade  # if Alembic migrations are configured

# Option B: Create tables programmatically (fallback)
python scripts/init_db.py
```

### 6) Run the development server
```bash
flask run --host=0.0.0.0 --port=8000
# App will be available at http://127.0.0.1:8000
```

## 🚀 Usage
- Access the web dashboard in your browser
- Use seeded admin credentials (if provided by seeds) or register an admin
- Generate an API token via login endpoint and use it in Authorization headers

Example Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## 📡 API Information
Base URL (dev): http://127.0.0.1:8000/api
Authentication: JWT in Authorization: Bearer <token>
Content-Type: application/json

Below is a representative API surface. Endpoints and fields may vary slightly depending on the current code. Adjust to your routes if names differ.

### Auth
- POST /api/auth/login
  - Purpose: Authenticate user and return JWT
  - Request
    ```json
    { "username": "admin", "password": "secret" }
    ```
  - Response
    ```json
    { "access_token": "<jwt>", "user": {"id": 1, "role": "admin"} }
    ```

- POST /api/auth/refresh
  - Purpose: Refresh access token
  - Response
    ```json
    { "access_token": "<jwt>" }
    ```

### Users
- GET /api/users (Admin)
- POST /api/users (Admin) – create user
- GET /api/users/:id
- PATCH /api/users/:id
- DELETE /api/users/:id (Admin)

### Products
- GET /api/products?search=&category=&page=&limit=
- POST /api/products
  - Request (example)
    ```json
    { "name": "Milk 1L", "sku": "MILK-1L", "price": 1.99, "category_id": 2, "stock": 50 }
    ```
  - Response (example)
    ```json
    { "id": 10, "name": "Milk 1L", "sku": "MILK-1L", "price": 1.99, "category_id": 2, "stock": 50 }
    ```
- GET /api/products/:id
- PATCH /api/products/:id
- DELETE /api/products/:id

### Inventory
- POST /api/inventory/adjustments
  - Request
    ```json
    { "product_id": 10, "delta": -2, "reason": "breakage" }
    ```
  - Response
    ```json
    { "id": 101, "product_id": 10, "before": 50, "after": 48, "reason": "breakage" }
    ```
- GET /api/inventory/low-stock?threshold=10

### Customers
- GET /api/customers?search=
- POST /api/customers
  - Request
    ```json
    { "name": "Jane Doe", "email": "jane@example.com", "phone": "+1-202-555-0101" }
    ```
- GET /api/customers/:id
- PATCH /api/customers/:id
- DELETE /api/customers/:id

### Sales
- POST /api/sales
  - Purpose: Create a sale with line items and update stock
  - Request
    ```json
    {
      "customer_id": 1,
      "items": [
        { "product_id": 10, "qty": 2, "unit_price": 1.99, "discount": 0 }
      ],
      "paid": 3.98,
      "tax": 0.20,
      "note": "cash"
    }
    ```
  - Response
    ```json
    {
      "id": 5001,
      "total": 4.18,
      "items": [ { "product_id": 10, "qty": 2 } ],
      "created_at": "2025-10-31T12:00:00Z"
    }
    ```
- GET /api/sales/:id
- GET /api/sales?from=2025-10-01&to=2025-10-31&page=1&limit=20
- POST /api/sales/:id/refund
  - Request
    ```json
    { "items": [ { "sale_item_id": 777, "qty": 1 } ], "reason": "customer return" }
    ```

### Reports
- GET /api/reports/sales/summary?from=&to=
- GET /api/reports/top-products?from=&to=&limit=10
- GET /api/reports/top-customers?from=&to=&limit=10

### Health
- GET /api/health
  - Response
    ```json
    { "status": "ok", "version": "1.0.0" }
    ```

### Error format
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Field price is required" } }
```

## 🤝 Contribution Guidelines
- Fork the repo and create a feature branch: git checkout -b feat/my-feature
- Follow conventional commits if possible (feat:, fix:, docs:, chore:)
- Write tests for new features and run the test suite
- Lint/format before committing (e.g., black, flake8, isort)
- Open a PR with clear description, screenshots (if UI), and checklist

## 📄 License
This project is licensed under the MIT License (see LICENSE file).

## 📬 Contact
- Author: Pravin (pravin-python)
- GitHub: https://github.com/pravin-python
- Issues: https://github.com/pravin-python/SamPOS_Dashboard/issues
