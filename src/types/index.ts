/**
 * Type definitions for the Expense Tracker app
 */

// Transaction types
export type TransactionType = 'expense' | 'income' | 'transfer';
export type PaymentMethod = 'cash' | 'debit_card' | 'credit_card' | 'transfer' | 'other';
export type TransactionSource = 'manual' | 'bancolombia_email' | 'nequi_sms';

// Account types
export type AccountType = 'checking' | 'savings' | 'credit_card' | 'cash';
export type Institution = 'bancolombia' | 'nequi' | 'cash' | 'other';

// Category types
export type CategoryType = 'expense' | 'income' | 'transfer';

// Main entity interfaces
export interface Transaction {
  id: string;
  serverId: string | null;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  amount: number;
  description: string;
  notes: string | null;
  categoryId: string;
  accountId: string;
  type: TransactionType;
  paymentMethod: PaymentMethod;
  source: TransactionSource;
  confidence: number;
  isSynced: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface Category {
  id: string;
  serverId: string | null;
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
  parentId: string | null;
  isActive: boolean;
}

export interface Account {
  id: string;
  serverId: string | null;
  name: string;
  type: AccountType;
  institution: Institution;
  lastFour: string;
  balance: number;
  isActive: boolean;
  color: string;
  icon: string;
}

// View models with relations
export interface TransactionWithRelations extends Transaction {
  category?: Category;
  account?: Account;
}

// Seed data types
export interface CategorySeed {
  name: string;
  type: CategoryType;
  icon: string;
  color: string;
  parentId?: string;
}

export interface AccountSeed {
  name: string;
  type: AccountType;
  institution: Institution;
  lastFour: string;
  balance: number;
  color: string;
  icon: string;
}

// Stats and summaries
export interface MonthSummary {
  month: string; // YYYY-MM
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  transactionCount: number;
}

export interface CategorySummary {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  categoryColor: string;
  total: number;
  count: number;
  percentage: number;
}

// Sync related
export interface SyncStatus {
  lastSyncAt: number | null;
  isSyncing: boolean;
  hasUnsyncedChanges: boolean;
  error: string | null;
}

// Network status
export interface NetworkStatus {
  isConnected: boolean;
  isInternetReachable: boolean;
}

// Form types
export interface TransactionFormData {
  amount: string;
  description: string;
  notes?: string;
  categoryId: string;
  accountId: string;
  date: Date;
  type: TransactionType;
  paymentMethod: PaymentMethod;
}

// Filter types
export interface TransactionFilters {
  startDate?: string;
  endDate?: string;
  categoryIds?: string[];
  accountIds?: string[];
  type?: TransactionType;
  searchQuery?: string;
}
