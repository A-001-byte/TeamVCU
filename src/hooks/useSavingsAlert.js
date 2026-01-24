/**
 * Custom Hook for Savings Alerts
 * Monitors user spending and triggers WhatsApp alerts
 */

import { useState, useEffect } from 'react';
import { savingsAlertManager } from '../messaging/SavingsAlertManager';

export const useSavingsAlert = (userData, monthlyBudget, currentSpending) => {
  const [alertStatus, setAlertStatus] = useState({
    alert80Sent: false,
    alert100Sent: false,
    lastAlertTime: null,
    spendingPercentage: 0,
  });
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userData || !monthlyBudget || currentSpending === undefined) {
      return;
    }

    const checkSavingsAlert = async () => {
      setIsChecking(true);
      setError(null);

      try {
        const spendingPercentage = (currentSpending / monthlyBudget) * 100;
        const result = await savingsAlertManager.checkAndAlert(
          userData,
          monthlyBudget,
          currentSpending
        );

        const month = new Date().toISOString().slice(0, 7);
        const monthAlertStatus = savingsAlertManager.getMonthAlertStatus?.(userData.id) || {};

        setAlertStatus(prev => ({
          ...prev,
          alert80Sent: monthAlertStatus.alert80Sent || spendingPercentage >= 80,
          alert100Sent: monthAlertStatus.alert100Sent || spendingPercentage >= 100,
          spendingPercentage: Math.round(spendingPercentage),
          lastAlertTime: result.sent ? Date.now() : prev.lastAlertTime
        }));

        if (result.sent) {
          console.log(`Savings alert sent: ${result.threshold} threshold`);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error checking savings alert:', err);
      } finally {
        setIsChecking(false);
      }
    };

    // Check on mount
    checkSavingsAlert();

    // Check periodically (every 5 minutes)
    const interval = setInterval(checkSavingsAlert, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [userData, monthlyBudget, currentSpending]);

  return {
    alertStatus,
    isChecking,
    error,
    sendManualAlert: async (messageType) => {
      if (!userData?.phone) return { success: false };
      return savingsAlertManager.sendWhatsAppMessage(userData.phone, messageType);
    }
  };
};
          monthlyBudget,
          currentSpending
        );

        if (result.sent) {
          setAlertStatus({
            warning: result.type === 'WARNING',
            critical: result.type === 'CRITICAL',
            lastAlertTime: new Date().toISOString(),
            message: result.message,
            percentage: result.percentage,
          });
        }
      } catch (err) {
        setError(err.message);
        console.error('Error checking savings alert:', err);
      } finally {
        setIsChecking(false);
      }
    };

    // Check spending every time it changes
    checkSavingsAlert();
  }, [userData, monthlyBudget, currentSpending]);

  const manualAlert = async () => {
    if (!userData || !monthlyBudget || currentSpending === undefined) {
      setError('Missing required data for alert');
      return;
    }

    setIsChecking(true);
    try {
      const result = await SavingsAlertManager.checkAndSendAlert(
        userData,
        monthlyBudget,
        currentSpending
      );

      if (result.sent) {
        setAlertStatus({
          warning: result.type === 'WARNING',
          critical: result.type === 'CRITICAL',
          lastAlertTime: new Date().toISOString(),
          message: `Manual alert sent: ${result.message}`,
          percentage: result.percentage,
        });
      } else {
        setAlertStatus(prev => ({
          ...prev,
          message: result.reason,
        }));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsChecking(false);
    }
  };

  const clearAlerts = () => {
    SavingsAlertManager.clearAlertHistory();
    setAlertStatus({
      warning: false,
      critical: false,
      lastAlertTime: null,
      message: null,
    });
  };

  return {
    alertStatus,
    isChecking,
    error,
    manualAlert,
    clearAlerts,
  };
};
