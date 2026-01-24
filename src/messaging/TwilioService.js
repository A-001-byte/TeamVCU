/**
 * Twilio WhatsApp Service
 * Handles sending WhatsApp messages via Twilio
 */

import { TWILIO_CONFIG } from './twilio.config';

class TwilioService {
  /**
   * Send WhatsApp message via Twilio
   * Note: This should be called from your backend for security
   */
  static async sendWhatsAppMessage(phoneNumber, message) {
    try {
      // This calls your backend endpoint
      // The actual Twilio API call happens on the server to keep credentials secure
      const response = await fetch(`${process.env.REACT_APP_API_URL}/messaging/send-whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('thinktwice_token') || ''}`
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber, // User's phone number with country code
          message: message
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        messageId: data.messageId,
        status: 'sent'
      };
    } catch (error) {
      console.error('WhatsApp send error:', error);
      return {
        success: false,
        error: error.message,
        status: 'failed'
      };
    }
  }

  /**
   * Send savings alert when spending exceeds 80%
   */
  static async sendSavingsAlert(username, phoneNumber, spentAmount, budgetAmount) {
    const percentage = Math.round((spentAmount / budgetAmount) * 100);
    const message = TWILIO_CONFIG.MESSAGES.SAVINGS_ALERT_80(username, percentage, spentAmount);
    
    return this.sendWhatsAppMessage(phoneNumber, message);
  }

  /**
   * Send critical alert when budget is exceeded
   */
  static async sendBudgetExceededAlert(username, phoneNumber, spentAmount) {
    const message = TWILIO_CONFIG.MESSAGES.SAVINGS_ALERT_100(username, spentAmount);
    
    return this.sendWhatsAppMessage(phoneNumber, message);
  }

  /**
   * Send monthly summary
   */
  static async sendMonthlySummary(username, phoneNumber, saved, spent, remaining) {
    const message = TWILIO_CONFIG.MESSAGES.MONTHLY_SUMMARY(username, saved, spent, remaining);
    
    return this.sendWhatsAppMessage(phoneNumber, message);
  }
}

export default TwilioService;
