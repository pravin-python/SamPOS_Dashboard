# SamPOS Dashboard

A comprehensive Django-based Point-of-Sale (POS) dashboard system for managing sales, customers, subscriptions, transactions, reports, and coupons.

## 📋 Project Overview

SamPOS Dashboard is built with **Django** and **Django REST Framework** to provide a robust backend API for point-of-sale operations. The project follows Django best practices with a modular app structure, environment-based settings, and RESTful API design.

## 🏗️ Project Structure

```
SamPOS_Dashboard/
├── sampos/
│   ├── apps/
│   │   ├── core/              # Core functionality and shared utilities
│   │   ├── customers/         # Customer management
│   │   ├── reports/           # Sales reports and analytics
│   │   ├── coupons/           # Coupon and discount management
│   │   ├── subscriptions/     # Subscription management
│   │   ├── transactions/      # Transaction processing
│   │   └── manageusers/       # User management
│   ├── config/
│   │   ├── settings/
│   │   │   ├── base.py        # Base settings
│   │   │   ├── development.py # Development settings
│   │   │   └── production.py  # Production settings
│   │   ├── urls.py            # Main URL configuration
│   │   └── wsgi.py            # WSGI configuration
│   ├── manage.py              # Django management script
│   └── gunicorn-cfg.py        # Gunicorn configuration
├── templates/                  # HTML templates
├── requirements.txt           # Python dependencies
├── .gitignore
└── README.md
```

## 🔧 Installation & Setup

### Prerequisites
- Python 3.8+
- pip
- virtualenv (recommended)
- PostgreSQL/MySQL (or SQLite for development)

### Step 1: Clone the Repository
```bash
git clone https://github.com/pravin-python/SamPOS_Dashboard.git
cd SamPOS_Dashboard
```

### Step 2: Create Virtual Environment
```bash
# Create virtual environment
python -m venv venv

# Activate on Linux/Mac
source venv/bin/activate

# Activate on Windows
venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Environment Configuration
Create a `.env` file in the project root with the following variables:

```env
# Django Settings
DJANGO_SETTINGS_MODULE=config.settings.development
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database Configuration
DB_ENGINE=django.db.backends.postgresql
DB_NAME=sampos_db
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=5432

# --- Optional: SSL Database Connection (for cloud databases like AWS RDS) ---
DB_SSL_MODE=require

# --- Additional DJANGO_ Prefixed Security Settings ---
DJANGO_SECURE_SSL_REDIRECT=True
DJANGO_SESSION_COOKIE_SECURE=True
DJANGO_SECURE_CONTENT_TYPE_NOSNIFF=True
DJANGO_SECURE_HSTS_SECONDS=31536000
DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS=True
DJANGO_SECURE_HSTS_PRELOAD=True

# --- Logging ---
DJANGO_LOGLEVEL=info
API_KEY=sam4pos

# For development, you can use SQLite:
# DB_ENGINE=django.db.backends.sqlite3
# DB_NAME=db.sqlite3
```

### Step 5: Database Setup
```bash
cd sampos

python manage.py makemigrations
python manage.py migrate

python manage.py makemigrations subscriptions customers coupons transactions reports
python manage.py migrate


# Create superuser for admin access
python manage.py createsuperuser
```

### Step 6: Run Development Server
```bash
# Run Django development server
python manage.py runserver

# Server will be available at http://127.0.0.1:8000/
```

### Optional: Collect Static Files (for production)
```bash
python manage.py collectstatic
```

## 🚀 Running the Server

### Development Mode
```bash
cd sampos
python manage.py runserver
```

### Production Mode (with Gunicorn)
```bash
cd sampos
gunicorn --config gunicorn-cfg.py config.wsgi:application
```

## 📱 Django Apps Included

### 1. **core**
Core functionality, utilities, and shared components used across other apps.

### 2. **customers**
Manages customer data, profiles, and customer-related operations.
- CRUD operations for customers
- Customer search and filtering
- Customer history tracking

### 3. **reports**
Generates sales reports, analytics, and business intelligence.
- Sales summaries
- Top products analysis
- Top customers analysis
- Date-range reporting

### 4. **coupons**
Handles discount coupons and promotional codes.
- Coupon creation and management
- Validation and redemption
- Usage tracking

### 5. **subscriptions**
Manages customer subscriptions and recurring billing.
- Subscription plans
- Subscription status tracking
- Renewal management

### 6. **transactions**
Processes and records all financial transactions.
- Transaction logging
- Payment processing
- Transaction history

### 7. **manageusers**
User authentication, authorization, and user management.
- User registration and login
- Role-based access control
- User profiles

## 🔌 API Endpoints

The application provides RESTful API endpoints using Django REST Framework:

### Authentication
The API uses token-based authentication (Django REST Framework Token Authentication or JWT).

**Headers required for authenticated requests:**
```
Authorization: Token <your-auth-token>
```

### Customer Endpoints
```
GET    /api/customers/           # List all customers
POST   /api/customers/           # Create new customer
GET    /api/customers/{id}/      # Get customer details
PUT    /api/customers/{id}/      # Update customer
PATCH  /api/customers/{id}/      # Partial update customer
DELETE /api/customers/{id}/      # Delete customer
```

### Subscription Endpoints
```
GET    /api/subscription/        # List all subscriptions
POST   /api/subscription/        # Create new subscription
GET    /api/subscription/{id}/   # Get subscription details
PUT    /api/subscription/{id}/   # Update subscription
DELETE /api/subscription/{id}/   # Delete subscription
```

### Transaction Endpoints
```
GET    /api/transactions/        # List all transactions
POST   /api/transactions/        # Create new transaction
GET    /api/transactions/{id}/   # Get transaction details
```

### Reports Endpoints
```
GET    /api/reports/sales/summary/       # Sales summary report
GET    /api/reports/top-products/        # Top selling products
GET    /api/reports/top-customers/       # Top customers by sales
```

**Query Parameters for Reports:**
- `from` - Start date (format: YYYY-MM-DD)
- `to` - End date (format: YYYY-MM-DD)
- `limit` - Number of results (default: 10)

### Coupon Endpoints
```
GET    /api/coupons/             # List all coupons
POST   /api/coupons/             # Create new coupon
GET    /api/coupons/{id}/        # Get coupon details
PUT    /api/coupons/{id}/        # Update coupon
DELETE /api/coupons/{id}/        # Delete coupon
POST   /api/coupons/validate/    # Validate coupon code
```

### Example API Request

**Create Customer:**
```bash
curl -X POST http://127.0.0.1:8000/api/customers/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Token your-token-here" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890"
  }'
```

**Get Sales Report:**
```bash
curl -X GET "http://127.0.0.1:8000/api/reports/sales/summary/?from=2025-10-01&to=2025-10-31" \
  -H "Authorization: Token your-token-here"
```

## ⚙️ Settings & Environment

### Settings Structure
The project uses environment-based settings:

- **`base.py`**: Common settings shared across all environments
- **`development.py`**: Development-specific settings (DEBUG=True, SQLite, etc.)
- **`production.py`**: Production-specific settings (DEBUG=False, PostgreSQL, security settings)

### Switching Environments
Set the `DJANGO_SETTINGS_MODULE` environment variable:

```bash
# Development
export DJANGO_SETTINGS_MODULE=config.settings.development

# Production
export DJANGO_SETTINGS_MODULE=config.settings.production
```

Or specify it when running commands:
```bash
python manage.py runserver --settings=config.settings.development
```

## 🔐 Authentication

The API uses Django REST Framework's token authentication:

1. **Obtain Token:**
```bash
curl -X POST http://127.0.0.1:8000/api/auth/token/ \
  -H "Content-Type: application/json" \
  -d '{"username": "your_username", "password": "your_password"}'
```

2. **Use Token in Requests:**
```
Authorization: Token <your-token-here>
```

## 🛠️ Management Commands

### Common Django Commands
```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Run tests
python manage.py test

# Collect static files
python manage.py collectstatic

# Open Django shell
python manage.py shell

# Show all URLs
python manage.py show_urls  # (if django-extensions installed)
```

## 📦 Key Dependencies

- **Django** - Web framework
- **Django REST Framework** - API framework
- **djangorestframework-simplejwt** - JWT authentication (if used)
- **python-decouple** - Environment variable management
- **psycopg2-binary** - PostgreSQL adapter
- **gunicorn** - WSGI HTTP server for production
- **whitenoise** - Static file serving

## 🧪 Testing

Run tests with:
```bash
cd sampos
python manage.py test

# Run specific app tests
python manage.py test apps.customers

# Run with coverage
coverage run --source='.' manage.py test
coverage report
```

## 🤝 Contribution Guidelines

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Follow Django coding conventions and PEP 8
4. Write tests for new features
5. Run tests and ensure they pass: `python manage.py test`
6. Format code with `black` and `isort`:
   ```bash
   black .
   isort .
   ```
7. Commit with conventional commits: `git commit -m "feat: add customer export"`
8. Push to your fork: `git push origin feat/my-feature`
9. Open a Pull Request with:
   - Clear description of changes
   - Screenshots (if UI changes)
   - Test results

## 📄 License

This project is licensed under the MIT License (see LICENSE file).

## 📬 Contact

- **Author**: Pravin (pravin-python)
- **GitHub**: https://github.com/pravin-python
- **Issues**: https://github.com/pravin-python/SamPOS_Dashboard/issues

## 🙏 Acknowledgments

- Built with Django and Django REST Framework
- Inspired by modern POS systems
- Community contributions welcome!

---

**Note**: This is a Django project. Make sure to use `python manage.py` commands from the `sampos/` directory, not Flask commands.
