from flask import Flask
from config import Config
from extensions import db, jwt

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    jwt.init_app(app)

    from routes.auth_routes import auth_bp
    from routes.transaction_routes import txn_bp

    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(txn_bp, url_prefix="/transactions")

    with app.app_context():
        db.create_all()

    return app


app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
