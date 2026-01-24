from flask import Flask
from flask_cors import CORS
from .config import Config
from .extensions import db, jwt
from .routes.auth_routes import auth_bp
from .routes.transaction_routes import txn_bp

app = Flask(__name__)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
jwt.init_app(app)

# CORS - Must be applied BEFORE registering routes
CORS(app, 
     origins=["http://localhost:5173", "http://localhost:3000"],
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# Register blueprints (after CORS is configured)
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(txn_bp, url_prefix='/transactions')

@app.route('/health', methods=['GET'])
def health_check():
    return {'status': 'healthy', 'message': 'Flask backend is running'}, 200

# Create database tables
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=5000)