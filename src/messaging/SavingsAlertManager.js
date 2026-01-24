/**
 * Savings Alert Manager
 * Monitors spending and triggers WhatsApp alerts when thresholds are reached
 */

import { TWILIO_CONFIG } from './twilio.config';

class SavingsAlertManager {
  constructor() {
    this.alertSent = {}; // Track alerts sent in current month
    this.apiEndpoint = TWILIO_CONFIG.API_ENDPOINT;
  }

  /**
   * Check spending and send alerts if needed
   * @param {Object} userData - User data with phone and savings info
   * @param {number} monthlyBudget - Monthly savings budget
   * @param {number} currentSpent - Current spending amount
   */
  async checkAndAlert(userData, monthlyBudget, currentSpent) {
    try {
      // Validate required data
      if (!userData?.phone) {
        console.warn('User phone number not available for alerts');
        return { sent: false, reason: 'No phone number' };
      }

      if (!monthlyBudget || currentSpent === undefined) {
        console.warn('Invalid budget or spending data');
        return { sent: false, reason: 'Invalid data' };
      }

      const spendingPercentage = (currentSpent / monthlyBudget) * 100;
      const month = new Date().toISOString().slice(0, 7); // YYYY-MM
      const alertKey80 = `savings_alert_80_${month}`;
      const alertKey100 = `savings_alert_100_${month}`;

      // Alert at 80% spending
      if (spendingPercentage >= 80 && spendingPercentage < 100) {
        if (!this.alertSent[alertKey80]) {
          const result = await this.sendSavingsAlert80(
            userData,
            currentSpent,
            monthlyBudget,
            Math.round(spendingPercentage)
          );

          if (result.success) {
            this.alertSent[alertKey80] = true;
            localStorage.setItem(alertKey80, JSON.stringify({ sent: true, timestamp: Date.now() }));
            console.log('80% savings alert sent successfully');
            return { sent: true, threshold: '80%', messageId: result.messageId };
          }
        }
      }

      // Alert at 100%+ spending (exceeded budget)
      if (spendingPercentage >= 100) {
        if (!this.alertSent[alertKey100]) {
          const result = await this.sendSavingsAlert100(
            userData,
            currentSpent,
            monthlyBudget
          );

          if (result.success) {
            this.alertSent[alertKey100] = true;
            localStorage.setItem(alertKey100, JSON.stringify({ sent: true, timestamp: Date.now() }));
            console.log('100% savings alert (exceeded) sent successfully');
            return { sent: true, threshold: '100%', messageId: result.messageId };
          }
        }
      }

      return { sent: false, reason: 'No threshold reached' };
    } catch (error) {
      console.error('Error in checkAndAlert:', error);
      return { sent: false, reason: error.message };
    }
  }

  /**
   * Send 80% threshold alert
   */
  async sendSavingsAlert80(userData, spent, budget, percentage) {
    const message = `Hi ${userData.name}! 🚨

Your monthly savings have reached ${percentage}% (₹${Math.round(spent)}).

You're approaching your savings limit. Plan your expenses wisely to avoid overspending.

📊 Check your dashboard for detailed insights.

Best regards,
Think Twice Finance Team`;

    return this.sendWhatsAppMessage(userData.phone, message);
  }

  /**
   * Send 100% threshold alert (budget exceeded)
   */
  async sendSavingsAlert100(userData, spent, budget) {
    const exceeded = Math.round(spent - budget);
    const message = `⚠️ ALERT ${userData.name}!

Your monthly savings budget has been EXCEEDED!
Current spending: ₹${Math.round(spent)}
Exceeded by: ₹${exceeded}

❌ No more savings available this month.
Avoid further spending to prevent debt.

📊 Review your budget on the dashboard immediately.

Best regards,
Think Twice Finance Team`;

    return this.sendWhatsAppMessage(userData.phone, message);
  }

  /**
   * Send custom WhatsApp message via backend
   */
  async sendWhatsAppMessage(phoneNumber, message) {
    try {
      const response = await fetch(`${this.apiEndpoint}/send-whatsapp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('thinktwice_token')}`
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          message: message
        })
      });

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.statusText}`);
      }

      const result = await response.json();
      return { success: true, messageId: result.sid };
    } catch (error) {
      console.error('Error sending WhatsApp message:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Send monthly summary alert
   */
  async sendMonthlySummary(userData, summary) {
    if (!userData?.phone) return { sent: false };

    const message = `📊 Monthly Summary - ${userData.name}

💰 Total Budget: ₹${Math.round(summary.totalBudget)}
✅ Saved: ₹${Math.round(summary.saved)}
❌ Spent: ₹${Math.round(summary.spent)}
⏳ Remaining: ₹${Math.round(summary.remaining)}

Great job on tracking your finances! 🎯

Best regards,
Think Twice Finance Team`;

    return this.sendWhatsAppMessage(userData.phone, message);
  }

  /**
   * Reset monthly alerts (call on month change)
   */
  resetMonthlyAlerts() {
    this.alertSent = {};
  }
}

export const savingsAlertManager = new SavingsAlertManager();
      }

      // Critical alert at 100% spending (budget exceeded)
      if (spendingPercentage >= 100) {
        if (!localStorage.getItem(alertKey100)) {
          const result = await TwilioService.sendBudgetExceededAlert(
            userData.name || 'User',
            userData.phone_number,
            currentSpent
          );

          if (result.success) {
            localStorage.setItem(alertKey100, JSON.stringify({ sent: true, timestamp: Date.now() }));
            console.log('Budget exceeded alert sent successfully');
            return { sent: true, threshold: '100%', messageId: result.messageId };
          }
        }
      }

      return { sent: false, reason: 'No threshold reached or alert already sent' };
    } catch (error) {
      console.error('Error in savings alert manager:', error);
      return { sent: false, error: error.message };
    }
  }

  /**
   * Send monthly summary report
   */
  static async sendMonthlySummary(userData, budgetData) {
    try {
      if (!userData?.phone_number) {
        console.warn('User phone number not available');
        return { sent: false };
      }

      const result = await TwilioService.sendMonthlySummary(
        userData.name || 'User',
        userData.phone_number,
        budgetData.saved,
        budgetData.spent,
        budgetData.remaining
      );

      if (result.success) {
        console.log('Monthly summary sent successfully');
        return { sent: true, messageId: result.messageId };
      }

      return result;
    } catch (error) {
      console.error('Error sending monthly summary:', error);
      return { sent: false, error: error.message };
    }
  }

  /**
   * Clear monthly alert flags (run at month start)
   */
  static clearMonthlyAlerts() {
    const keys = Object.keys(localStorage);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    keys.forEach(key => {
      if (key.startsWith('savings_alert_')) {
        const [, , month, year] = key.split('_');
        if (parseInt(month) !== currentMonth || parseInt(year) !== currentYear) {
          localStorage.removeItem(key);
        }
      }
    });
  }
}

export default SavingsAlertManager;
