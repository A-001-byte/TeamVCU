import uuid
from datetime import datetime
from ..extensions import db

class Budget(db.Model):
    __tablename__ = "budgets"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)  # Food, Shopping, Entertainment, etc.
    monthly_limit = db.Column(db.Float, nullable=False)
    alert_threshold = db.Column(db.Float, default=80)  # Alert when spent % of budget
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

