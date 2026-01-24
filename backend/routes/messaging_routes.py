"""
Messaging routes for WhatsApp alerts using Twilio
"""

from flask import Blueprint, request, jsonify
from functools import wraps
import os
from twilio.rest import Client

messaging_bp = Blueprint('messaging', __name__, url_prefix='/api')

# Initialize Twilio Client
TWILIO_ACCOUNT_SID = os.getenv('TWILIO_ACCOUNT_SID')
TWILIO_AUTH_TOKEN = os.getenv('TWILIO_AUTH_TOKEN')
TWILIO_WHATSAPP_FROM = os.getenv('TWILIO_WHATSAPP_FROM', 'whatsapp:+14155238886')

# Initialize Twilio client only if credentials are available
twilio_client = None
if TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN:
    twilio_client = Client(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
else:
    print("⚠️  WARNING: Twilio credentials not configured. WhatsApp alerts will not work.")


def require_auth(f):
    """Decorator to validate Bearer token (simplified for now)"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        
        # For now, just check if Bearer token exists
        # In production, validate against actual user tokens
        if not auth_header.startswith('Bearer '):
            return jsonify({'error': 'Unauthorized'}), 401
        
        return f(*args, **kwargs)
    return decorated_function


def validate_phone_number(phone):
    """Validate WhatsApp phone number format"""
    if not phone:
        return False
    
    # Remove common formatting characters
    cleaned = ''.join(c for c in phone if c.isdigit())
    
    # WhatsApp numbers should be 10+ digits (country code + number)
    if len(cleaned) < 10:
        return False
    
    return True


@messaging_bp.route('/send-whatsapp', methods=['POST'])
@require_auth
def send_whatsapp_message():
    """
    Send WhatsApp message via Twilio
    
    Request body:
    {
        "phoneNumber": "+919876543210",  # Include country code
        "message": "Your savings alert message"
    }
    """
    try:
        if not twilio_client:
            return jsonify({
                'success': False,
                'error': 'Twilio not configured',
                'message': 'WhatsApp service is not available'
            }), 503

        data = request.get_json()
        
        # Validate input
        if not data:
            return jsonify({
                'success': False,
                'error': 'Invalid request',
                'message': 'Request body is required'
            }), 400
        
        phone_number = data.get('phoneNumber', '').strip()
        message_text = data.get('message', '').strip()
        
        # Validation
        if not phone_number:
            return jsonify({
                'success': False,
                'error': 'Missing phoneNumber',
                'message': 'Phone number is required'
            }), 400
        
        if not message_text:
            return jsonify({
                'success': False,
                'error': 'Missing message',
                'message': 'Message text is required'
            }), 400
        
        if not validate_phone_number(phone_number):
            return jsonify({
                'success': False,
                'error': 'Invalid phoneNumber',
                'message': 'Phone number must include country code (e.g., +919876543210)'
            }), 400
        
        if len(message_text) > 4096:
            return jsonify({
                'success': False,
                'error': 'Message too long',
                'message': 'Message must be 4096 characters or less'
            }), 400
        
        # Format WhatsApp number
        if not phone_number.startswith('whatsapp:'):
            if not phone_number.startswith('+'):
                phone_number = '+' + phone_number
            phone_number = 'whatsapp:' + phone_number
        
        # Send via Twilio
        try:
            msg = twilio_client.messages.create(
                from_=TWILIO_WHATSAPP_FROM,
                to=phone_number,
                body=message_text
            )
            
            return jsonify({
                'success': True,
                'messageSid': msg.sid,
                'status': msg.status,
                'message': 'WhatsApp message sent successfully'
            }), 200
            
        except Exception as twilio_error:
            # Twilio-specific errors
            error_msg = str(twilio_error)
            
            # Check for common Twilio errors
            if 'not a valid WhatsApp number' in error_msg:
                return jsonify({
                    'success': False,
                    'error': 'Invalid WhatsApp number',
                    'message': 'The phone number is not registered for WhatsApp. Please verify the number.'
                }), 400
            
            if 'Account is not authorized' in error_msg:
                return jsonify({
                    'success': False,
                    'error': 'Service not authorized',
                    'message': 'Twilio account is not authorized for this operation'
                }), 403
            
            return jsonify({
                'success': False,
                'error': 'Twilio error',
                'message': error_msg
            }), 500
    
    except Exception as e:
        print(f"Error sending WhatsApp message: {str(e)}")
        return jsonify({
            'success': False,
            'error': 'Server error',
            'message': str(e)
        }), 500


@messaging_bp.route('/test-whatsapp', methods=['POST'])
@require_auth
def test_whatsapp_connection():
    """
    Test WhatsApp connection (requires valid credentials)
    Can be called without message - just tests connectivity
    """
    try:
        if not twilio_client:
            return jsonify({
                'success': False,
                'message': 'Twilio not configured'
            }), 503
        
        # Attempt to fetch account details as a connectivity test
        account = twilio_client.api.accounts(TWILIO_ACCOUNT_SID).fetch()
        
        return jsonify({
            'success': True,
            'message': 'Twilio connection successful',
            'accountStatus': account.status,
            'whatsappFrom': TWILIO_WHATSAPP_FROM
        }), 200
        
    except Exception as e:
        print(f"Error testing Twilio connection: {str(e)}")
        return jsonify({
            'success': False,
            'message': 'Twilio connection failed',
            'error': str(e)
        }), 500


@messaging_bp.route('/whatsapp-status', methods=['GET'])
def whatsapp_status():
    """
    Check if WhatsApp service is available (public endpoint, no auth needed)
    """
    is_configured = bool(TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN)
    
    return jsonify({
        'available': is_configured,
        'configured': is_configured,
        'whatsappFrom': TWILIO_WHATSAPP_FROM if is_configured else None
    }), 200
