export type TransactionCategory = 
  | 'housing'
  | 'transportation'
  | 'food'
  | 'utilities'
  | 'healthcare'
  | 'entertainment'
  | 'shopping'
  | 'education'
  | 'savings'
  | 'other';

export interface Transaction {
  id: string;
  amount: number;
  description: string;
  date: Date;
  category: TransactionCategory;
  type: 'expense' | 'income';
  tags?: string[];
}

export interface TransactionFormData {
  amount: number;
  description: string;
  date: Date;
  category: TransactionCategory;
  type: 'expense' | 'income';
  tags?: string[];
}

export interface Budget {
  category: TransactionCategory;
  amount: number;
}

export interface CategoryTotal {
  category: TransactionCategory;
  total: number;
  percentage: number;
}

export interface MonthlyTotal {
  month: string;
  expenses: number;
  income: number;
  savings: number;
}