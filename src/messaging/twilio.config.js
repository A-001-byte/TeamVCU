/**
 * Twilio Configuration
 * Store your Twilio credentials here
 * Never commit this file with real credentials
 */

export const TWILIO_CONFIG = {
  // Get these from https://www.twilio.com/console
  ACCOUNT_SID: process.env.US001967517f6725b16a8be2bc1758fee3,
  AUTH_TOKEN: process.env.526db05b85f67ae83e49dbfb714ca243,
  WHATSAPP_FROM: process.env.REACT_APP_TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886', // Twilio sandbox number
  API_ENDPOINT: process.env.REACT_APP_API_URL || 'http://localhost:5000'
  
  // Message templates
  MESSAGES: {
    SAVINGS_ALERT_80: (username, percentage, amount) => `
Hi ${username}! 🚨

Your monthly savings have reached ${percentage}% (₹${amount}). 

You're approaching your savings limit. Plan your expenses wisely to avoid overspending.

📊 Check your dashboard for detailed insights.

Best regards,
Think Twice Finance Team
    `.trim(),
    
    SAVINGS_ALERT_100: (username, amount) => `
⚠️ ALERT ${username}!

Your monthly savings budget has been EXCEEDED! 
Current spending: ₹${amount}

❌ No more savings available this month.
Avoid further spending to prevent debt.

📊 Review your budget on the dashboard immediately.

Best regards,
Think Twice Finance Team
    `.trim(),

    MONTHLY_SUMMARY: (username, saved, spent, remaining) => `
📊 Monthly Summary for ${username}

💰 Total Budget: ₹${saved + spent}
✅ Saved: ₹${saved}
❌ Spent: ₹${spent}
⏳ Remaining: ₹${remaining}

Keep monitoring your finances!

Think Twice Finance Team
    `.trim(),
  }
};
