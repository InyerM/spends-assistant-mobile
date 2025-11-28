/**
 * App constants
 */

import type { CategorySeed, AccountSeed } from '../types';

// Colombia timezone
export const TIMEZONE = 'America/Bogota';

// Currency
export const CURRENCY_CODE = 'COP';
export const CURRENCY_SYMBOL = '$';

// Date formats
export const DATE_FORMAT = 'yyyy-MM-dd';
export const TIME_FORMAT = 'HH:mm';
export const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm';
export const DISPLAY_DATE_FORMAT = 'dd MMM yyyy';
export const DISPLAY_TIME_FORMAT = 'h:mm a';

// Seed data - Colombian categories
export const DEFAULT_CATEGORIES: CategorySeed[] = [
  // Expenses
  { name: 'Comida', type: 'expense', icon: '🍽️', color: '#FF6B6B' },
  { name: 'Transporte', type: 'expense', icon: '🚗', color: '#4ECDC4' },
  { name: 'Entretenimiento', type: 'expense', icon: '🎬', color: '#9B59B6' },
  { name: 'Compras', type: 'expense', icon: '🛒', color: '#3498DB' },
  { name: 'Servicios', type: 'expense', icon: '💡', color: '#F39C12' },
  { name: 'Salud', type: 'expense', icon: '💊', color: '#E74C3C' },
  { name: 'Educación', type: 'expense', icon: '📚', color: '#1ABC9C' },
  { name: 'Hogar', type: 'expense', icon: '🏠', color: '#95A5A6' },
  { name: 'Tecnología', type: 'expense', icon: '💻', color: '#2C3E50' },
  { name: 'Suscripciones', type: 'expense', icon: '📱', color: '#8E44AD' },
  { name: 'Otros', type: 'expense', icon: '📦', color: '#7F8C8D' },

  // Income
  { name: 'Salario', type: 'income', icon: '💰', color: '#27AE60' },
  { name: 'Freelance', type: 'income', icon: '💼', color: '#2ECC71' },
  { name: 'Inversiones', type: 'income', icon: '📈', color: '#16A085' },

  // Transfer
  { name: 'Transferencia', type: 'transfer', icon: '↔️', color: '#3498DB' },
];

// Seed data - Colombian accounts
export const DEFAULT_ACCOUNTS: AccountSeed[] = [
  {
    name: 'Bancolombia Débito',
    type: 'checking',
    institution: 'bancolombia',
    lastFour: '7799',
    balance: 0,
    color: '#FFD700',
    icon: '💳',
  },
  {
    name: 'Nequi',
    type: 'savings',
    institution: 'nequi',
    lastFour: '0000',
    balance: 0,
    color: '#FF69B4',
    icon: '📱',
  },
  {
    name: 'Efectivo',
    type: 'cash',
    institution: 'cash',
    lastFour: '0000',
    balance: 0,
    color: '#2ECC71',
    icon: '💵',
  },
  {
    name: 'Bancolombia Crédito',
    type: 'credit_card',
    institution: 'bancolombia',
    lastFour: '1234',
    balance: 0,
    color: '#E74C3C',
    icon: '💳',
  },
];

// Sync settings
export const SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes

// UI constants
export const BORDER_RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
