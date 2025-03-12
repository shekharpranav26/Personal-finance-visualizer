import { TransactionCategory } from './types';

export const CATEGORIES: { value: TransactionCategory; label: string; color: string }[] = [
  { value: 'housing', label: 'Housing', color: 'hsl(var(--chart-1))' },
  { value: 'transportation', label: 'Transportation', color: 'hsl(var(--chart-2))' },
  { value: 'food', label: 'Food & Dining', color: 'hsl(var(--chart-3))' },
  { value: 'utilities', label: 'Utilities', color: 'hsl(var(--chart-4))' },
  { value: 'healthcare', label: 'Healthcare', color: 'hsl(var(--chart-5))' },
  { value: 'entertainment', label: 'Entertainment', color: 'hsl(var(--chart-1))' },
  { value: 'shopping', label: 'Shopping', color: 'hsl(var(--chart-2))' },
  { value: 'education', label: 'Education', color: 'hsl(var(--chart-3))' },
  { value: 'savings', label: 'Savings', color: 'hsl(var(--chart-4))' },
  { value: 'other', label: 'Other', color: 'hsl(var(--chart-5))' },
];

export const DEFAULT_BUDGETS: { category: TransactionCategory; amount: number }[] = [
  { category: 'housing', amount: 1500 },
  { category: 'transportation', amount: 400 },
  { category: 'food', amount: 600 },
  { category: 'utilities', amount: 300 },
  { category: 'healthcare', amount: 200 },
  { category: 'entertainment', amount: 200 },
  { category: 'shopping', amount: 300 },
  { category: 'education', amount: 200 },
  { category: 'savings', amount: 500 },
  { category: 'other', amount: 200 },
];