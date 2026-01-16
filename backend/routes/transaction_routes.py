from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.transaction import Transaction

txn_bp = Blueprint("transactions", __name__)

@txn_bp.route("/manual", methods=["POST"])
@jwt_required()
def add_transaction():
    user_id = get_jwt_identity()
    data = request.json

    txn = Transaction(
        user_id=user_id,
        amount=data["amount"],
        txn_type=data["txn_type"],
        category=data["category"],
        merchant=data["merchant"],
        mode=data["mode"],
        source="MANUAL"
    )

    db.session.add(txn)
    db.session.commit()

    return jsonify({"message": "Transaction added"}), 201


@txn_bp.route("/", methods=["GET"])
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    txns = Transaction.query.filter_by(user_id=user_id).all()

    return jsonify([
        {
            "amount": t.amount,
            "category": t.category,
            "merchant": t.merchant,
            "source": t.source
        } for t in txns
    ])
