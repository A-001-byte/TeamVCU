from flask import Blueprint, request, jsonify
from ..extensions import db
from ..models.user import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json

    user = User(
        name=data["name"],
        email=data["email"],
        password=data["password"],  # hashing later
        monthly_income=data["monthly_income"],
        income_type=data["income_type"]
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User created"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email", "").lower()
    password = data.get("password", "")

    # Demo admin credentials (for testing/demo purposes)
    DEMO_ADMIN_EMAIL = "admin@thinktwice.com"
    DEMO_ADMIN_PASSWORD = "admin123"
    
    # Check for demo admin
    if email == DEMO_ADMIN_EMAIL and password == DEMO_ADMIN_PASSWORD:
        # Create a demo admin token with a fixed identity
        token = create_access_token(identity="demo-admin-001")
        return jsonify({
            "access_token": token,
            "user": {
                "id": "demo-admin-001",
                "name": "Demo Admin",
                "email": DEMO_ADMIN_EMAIL,
                "role": "admin"
            }
        })
    
    # Regular user login
    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    
    # Note: Password verification should be added here (e.g., using bcrypt)
    # For now, we'll just check if user exists
    # TODO: Add password hashing and verification

    token = create_access_token(identity=user.id)
    return jsonify({
        "access_token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    })
