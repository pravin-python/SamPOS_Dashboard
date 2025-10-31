# SamPOS Dashboard

## 📋 Project Overview
SamPOS Dashboard is a comprehensive Point of Sale (POS) management system built with Python and Flask. This web-based dashboard provides businesses with an intuitive interface to manage sales, inventory, customers, and generate insightful reports for better decision-making.

## ✨ Features
- **Sales Management**: Process transactions quickly and efficiently
- **Inventory Tracking**: Real-time inventory management and stock alerts
- **Customer Management**: Maintain customer database and purchase history
- **Reporting & Analytics**: Generate detailed sales reports and visualizations
- **User Authentication**: Secure login system for authorized access
- **Responsive Design**: Mobile-friendly interface for on-the-go access

## 🛠️ Tech Stack
- **Backend**: Python, Flask
- **Frontend**: HTML, CSS, JavaScript
- **Database**: SQLite/PostgreSQL
- **UI Framework**: Bootstrap

## 📦 Installation & Setup

### Prerequisites
- Python 3.7 or higher
- pip (Python package manager)
- Virtual environment (recommended)

### Step-by-Step Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pravin-python/SamPOS_Dashboard.git
   cd SamPOS_Dashboard
   ```

2. **Create and activate virtual environment**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # Linux/Mac
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory and add necessary configurations:
   ```
   FLASK_APP=app.py
   FLASK_ENV=development
   SECRET_KEY=your_secret_key_here
   DATABASE_URL=sqlite:///sampos.db
   ```

5. **Initialize the database**
   ```bash
   flask db init
   flask db migrate
   flask db upgrade
   ```

6. **Run the application**
   ```bash
   python app.py
   # or
   flask run
   ```

7. **Access the dashboard**
   Open your browser and navigate to `http://localhost:5000`

## 📁 Project Structure
```
SamPOS_Dashboard/
│
├── sampos/                 # Main application package
│   ├── __init__.py        # Application factory
│   ├── models.py          # Database models
│   ├── routes.py          # Application routes
│   ├── forms.py           # WTForms definitions
│   └── static/            # Static files (CSS, JS, images)
│
├── templates/             # HTML templates
│   ├── base.html         # Base template
│   ├── index.html        # Dashboard home
│   ├── sales.html        # Sales page
│   ├── inventory.html    # Inventory management
│   └── reports.html      # Reports page
│
├── .gitignore            # Git ignore file
├── requirements.txt      # Project dependencies
├── README.md            # Project documentation
└── app.py               # Application entry point
```

## 🚀 Usage Instructions

### Dashboard Navigation
- **Home**: Overview of daily sales and key metrics
- **Sales**: Process new transactions and view sales history
- **Inventory**: Manage products, stock levels, and suppliers
- **Customers**: View and manage customer information
- **Reports**: Generate and export various business reports

### Creating a Sale
1. Navigate to the Sales section
2. Select products from inventory
3. Enter quantity and apply any discounts
4. Process payment
5. Generate receipt

### Managing Inventory
1. Go to Inventory section
2. Add new products with details (name, price, quantity, category)
3. Update stock levels when receiving shipments
4. Set low-stock alerts

### Generating Reports
1. Access the Reports section
2. Select report type (Sales, Inventory, Customer)
3. Choose date range
4. Generate and view report
5. Export to PDF or Excel

## ⚙️ Configuration
Configuration settings can be modified in the `config.py` file or through environment variables:
- `SECRET_KEY`: Flask secret key for session management
- `DATABASE_URL`: Database connection string
- `UPLOAD_FOLDER`: Path for file uploads
- `MAX_CONTENT_LENGTH`: Maximum file upload size

## 🤝 Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author
**Pravin Kumar**
- GitHub: [@pravin-python](https://github.com/pravin-python)

## 📞 Support
For support, please open an issue in the GitHub repository or contact the maintainer.

---
⭐ If you find this project helpful, please consider giving it a star!
