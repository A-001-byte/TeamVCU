import uuid
from datetime import datetime
from ..extensions import db

class Transaction(db.Model):
    __tablename__ = "transactions"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = db.Column(db.String, nullable=False)
    amount = db.Column(db.Float, nullable=False)
    txn_type = db.Column(db.String)  # CREDIT / DEBIT
    category = db.Column(db.String)
    merchant = db.Column(db.String)
    mode = db.Column(db.String)      # UPI / CARD / CASH
    source = db.Column(db.String)    # MANUAL / CSV / SMS
    txn_date = db.Column(db.DateTime, default=datetime.utcnow)
