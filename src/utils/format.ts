/**
 * Formatting utilities for Colombian locale
 * Handles currency (COP), dates, and numbers
 */

import { format, parseISO } from 'date-fns';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { es } from 'date-fns/locale';
import {
  TIMEZONE,
  CURRENCY_SYMBOL,
  DISPLAY_DATE_FORMAT,
  DISPLAY_TIME_FORMAT,
} from './constants';

/**
 * Format amount in Colombian Pesos (COP)
 * No decimals, dot as thousands separator
 * Example: 1250000 -> $1.250.000
 */
export function formatCurrency(amount: number): string {
  const absAmount = Math.abs(amount);
  const formatted = absAmount
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${amount < 0 ? '-' : ''}${CURRENCY_SYMBOL}${formatted}`;
}

/**
 * Parse COP string to number
 * Example: "$1.250.000" -> 1250000
 */
export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d-]/g, '');
  return parseInt(cleaned, 10) || 0;
}

/**
 * Format input while typing (for AmountInput component)
 * Example: "1250000" -> "1.250.000"
 */
export function formatCurrencyInput(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  if (!cleaned) return '';

  const number = parseInt(cleaned, 10);
  return number.toLocaleString('es-CO');
}

/**
 * Get current date in Colombia timezone
 * Returns YYYY-MM-DD format
 */
export function getCurrentDate(): string {
  return formatInTimeZone(new Date(), TIMEZONE, 'yyyy-MM-dd');
}

/**
 * Get current time in Colombia timezone
 * Returns HH:mm format
 */
export function getCurrentTime(): string {
  return formatInTimeZone(new Date(), TIMEZONE, 'HH:mm');
}

/**
 * Get current datetime in Colombia timezone
 */
export function getCurrentDateTime(): Date {
  return toZonedTime(new Date(), TIMEZONE);
}

/**
 * Format date for display
 * Example: "2025-11-27" -> "27 Nov 2025"
 */
export function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, DISPLAY_DATE_FORMAT, { locale: es });
  } catch {
    return dateString;
  }
}

/**
 * Format time for display
 * Example: "14:30" -> "2:30 PM"
 */
export function formatTime(timeString: string): string {
  try {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
    return format(date, DISPLAY_TIME_FORMAT, { locale: es });
  } catch {
    return timeString;
  }
}

/**
 * Format date and time together
 * Example: "2025-11-27", "14:30" -> "27 Nov 2025, 2:30 PM"
 */
export function formatDateTime(dateString: string, timeString: string): string {
  return `${formatDate(dateString)}, ${formatTime(timeString)}`;
}

/**
 * Format relative date (today, yesterday, date)
 */
export function formatRelativeDate(dateString: string): string {
  const today = getCurrentDate();
  const yesterday = formatInTimeZone(
    new Date(Date.now() - 24 * 60 * 60 * 1000),
    TIMEZONE,
    'yyyy-MM-dd'
  );

  if (dateString === today) {
    return 'Hoy';
  } else if (dateString === yesterday) {
    return 'Ayer';
  } else {
    return formatDate(dateString);
  }
}

/**
 * Get month name in Spanish
 * Example: "2025-11" -> "Noviembre 2025"
 */
export function formatMonth(monthString: string): string {
  try {
    const [year, month] = monthString.split('-');
    const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return format(date, 'MMMM yyyy', { locale: es });
  } catch {
    return monthString;
  }
}

/**
 * Get current month in YYYY-MM format
 */
export function getCurrentMonth(): string {
  return formatInTimeZone(new Date(), TIMEZONE, 'yyyy-MM');
}

/**
 * Format percentage
 * Example: 0.1234 -> "12.3%"
 */
export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

/**
 * Format large numbers with K, M suffixes
 * Example: 1250000 -> "1.25M"
 */
export function formatCompactNumber(value: number): string {
  const absValue = Math.abs(value);

  if (absValue >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  } else if (absValue >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }

  return value.toString();
}

/**
 * Capitalize first letter
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Truncate string with ellipsis
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return `${str.slice(0, maxLength)}...`;
}
