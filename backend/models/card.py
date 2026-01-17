import uuid
from datetime import datetime
from ..extensions import db

class Card(db.Model):
    __tablename__ = "cards"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, nullable=False)
    card_name = db.Column(db.String, nullable=False)  # "Personal Visa", "Corporate Amex"
    card_type = db.Column(db.String, nullable=False)  # CREDIT, DEBIT, PREPAID
    last_four_digits = db.Column(db.String)  # Last 4 digits of card number
    bank_name = db.Column(db.String)
    credit_limit = db.Column(db.Float)  # For credit cards
    expiry_date = db.Column(db.String)  # MM/YY format
    is_primary = db.Column(db.Boolean, default=False)
    status = db.Column(db.String, default="active")  # active, inactive, blocked
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

