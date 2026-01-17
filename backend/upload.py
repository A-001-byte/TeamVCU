from flask import Blueprint, request, jsonify
import pandas as pd
import io
from werkzeug.utils import secure_filename
import os
from datetime import datetime

upload_bp = Blueprint('upload', __name__, url_prefix='/api')

# Allowed file extensions
ALLOWED_EXTENSIONS = {'csv'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@upload_bp.route('/upload-csv', methods=['POST'])
def upload_csv():
    """
    Upload and parse CSV file containing financial transactions
    Expected CSV columns: date, description, amount, category (optional)
    """
    try:
        # Check if file is in request
        if 'file' not in request.files:
            return jsonify({'error': 'No file part in request'}), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Check file extension
        if not allowed_file(file.filename):
            return jsonify({'error': 'Only CSV files are allowed'}), 400
        
        # Read CSV file
        try:
            # Read the file content
            file_content = file.stream.read().decode('utf-8')
            df = pd.read_csv(io.StringIO(file_content))
            
            # Log columns for debugging
            print(f"CSV Columns: {df.columns.tolist()}")
            print(f"CSV Shape: {df.shape}")
            
        except Exception as e:
            return jsonify({'error': f'Failed to parse CSV: {str(e)}'}), 400
        
        # Validate required columns (adjust based on your CSV format)
        required_columns = ['date', 'amount']
        missing_columns = [col for col in required_columns if col not in df.columns]
        
        if missing_columns:
            return jsonify({
                'error': f'Missing required columns: {missing_columns}',
                'available_columns': df.columns.tolist()
            }), 400
        
        # Process and clean data
        try:
            # Convert date to datetime
            df['date'] = pd.to_datetime(df['date'])
            
            # Convert amount to float
            df['amount'] = pd.to_numeric(df['amount'], errors='coerce')
            
            # Add default category if not present
            if 'category' not in df.columns:
                df['category'] = 'Uncategorized'
            
            # Add description if not present
            if 'description' not in df.columns:
                df['description'] = 'Transaction'
            
            # Determine transaction type (income vs expense)
            df['type'] = df['amount'].apply(lambda x: 'income' if x > 0 else 'expense')
            
            # Remove rows with null amounts
            df = df.dropna(subset=['amount'])
            
            # Sort by date
            df = df.sort_values('date', ascending=False)
            
        except Exception as e:
            return jsonify({'error': f'Failed to process data: {str(e)}'}), 400
        
        # Convert to JSON-serializable format
        transactions = []
        for _, row in df.iterrows():
            transactions.append({
                'date': row['date'].strftime('%Y-%m-%d'),
                'description': str(row['description']),
                'amount': float(row['amount']),
                'category': str(row['category']),
                'type': row['type']
            })
        
        # Calculate summary statistics
        total_income = float(df[df['amount'] > 0]['amount'].sum())
        total_expenses = float(abs(df[df['amount'] < 0]['amount'].sum()))
        net_balance = total_income - total_expenses
        
        # Category breakdown
        category_summary = df.groupby('category')['amount'].sum().to_dict()
        category_summary = {k: float(v) for k, v in category_summary.items()}
        
        # Monthly breakdown
        df['month'] = df['date'].dt.to_period('M').astype(str)
        monthly_summary = df.groupby('month')['amount'].sum().to_dict()
        monthly_summary = {k: float(v) for k, v in monthly_summary.items()}
        
        summary = {
            'totalTransactions': len(df),
            'totalIncome': total_income,
            'totalExpenses': total_expenses,
            'netBalance': net_balance,
            'dateRange': {
                'start': df['date'].min().strftime('%Y-%m-%d'),
                'end': df['date'].max().strftime('%Y-%m-%d')
            },
            'categories': category_summary,
            'monthlyBreakdown': monthly_summary
        }
        
        return jsonify({
            'success': True,
            'message': f'Successfully processed {len(transactions)} transactions',
            'transactions': transactions,
            'summary': summary
        }), 200
        
    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@upload_bp.route('/test', methods=['GET'])
def test_upload():
    """Test endpoint to verify upload route is working"""
    return jsonify({
        'status': 'success',
        'message': 'Upload route is working',
        'endpoint': '/api/upload-csv'
    }), 200
