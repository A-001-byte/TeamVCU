import uuid
from datetime import datetime
from ..extensions import db

class Bill(db.Model):
    __tablename__ = "bills"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, nullable=False)
    name = db.Column(db.String, nullable=False)  # "Electricity", "Water", etc.
    amount = db.Column(db.Float, nullable=False)
    due_date = db.Column(db.Integer, nullable=False)  # Day of month (1-31)
    frequency = db.Column(db.String, default="monthly")  # monthly, quarterly, annual
    category = db.Column(db.String)  # Utilities, Subscription, Insurance, etc.
    status = db.Column(db.String, default="pending")  # pending, paid, overdue
    last_paid_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

