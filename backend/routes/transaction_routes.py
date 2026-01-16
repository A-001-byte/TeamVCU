from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from extensions import db
from models.transaction import Transaction
import csv

txn_bp = Blueprint("transactions", __name__)

# ------------------------
# Manual Transaction
# ------------------------
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


# ------------------------
# Fetch Transactions
# ------------------------
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
        }
        for t in txns
    ]), 200


# ------------------------
# CSV Upload
# ------------------------
@txn_bp.route("/upload", methods=["POST"])
@jwt_required()
def upload_transactions():
    user_id = get_jwt_identity()

    if "file" not in request.files:
        return {"error": "CSV file is required"}, 400

    file = request.files["file"]

    if file.filename == "":
        return {"error": "No selected file"}, 400

    if not file.filename.endswith(".csv"):
        return {"error": "Only CSV files allowed"}, 400

    stream = file.stream.read().decode("utf-8").splitlines()
    reader = csv.DictReader(stream)

    required_fields = {"amount", "type", "merchant"}

    created = 0
    failed = 0

    for row in reader:
        if not required_fields.issubset(row.keys()):
            failed += 1
            continue

        try:
            txn = Transaction(
                user_id=user_id,
                amount=float(row["amount"]),
                txn_type=row["type"].upper(),
                merchant=row["merchant"],
                category=row.get("category", "Uncategorized"),
                mode=row.get("mode", "UNKNOWN"),
                source="CSV"
            )
            db.session.add(txn)
            created += 1
        except Exception:
            failed += 1

    db.session.commit()

    return {
        "message": "CSV processed",
        "created": created,
        "failed": failed
    }, 201
