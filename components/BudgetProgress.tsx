'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Transaction } from '@/lib/types';
import { CATEGORIES, DEFAULT_BUDGETS } from '@/lib/constants';

interface BudgetProgressProps {
  transactions: Transaction[];
}

export default function BudgetProgress({ transactions }: BudgetProgressProps) {
  const categoryProgress = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyExpenses = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && 
             date.getFullYear() === currentYear &&
             t.type === 'expense';
    });

    const expensesByCategory = monthlyExpenses.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    return CATEGORIES.map(category => {
      const budget = DEFAULT_BUDGETS.find(b => b.category === category.value)?.amount || 0;
      const spent = expensesByCategory[category.value] || 0;
      const percentage = budget > 0 ? (spent / budget) * 100 : 0;

      return {
        category: category.label,
        spent,
        budget,
        percentage: Math.min(percentage, 100),
        color: category.color,
        overBudget: spent > budget,
      };
    });
  }, [transactions]);

  return (
    <div className="space-y-4">
      {categoryProgress.map((category) => (
        <Card key={category.category} className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">{category.category}</span>
            <span className={`text-sm ${category.overBudget ? 'text-red-500' : 'text-muted-foreground'}`}>
              ${category.spent.toFixed(2)} / ${category.budget.toFixed(2)}
            </span>
          </div>
          <Progress
            value={category.percentage}
            className={`h-2 ${category.overBudget ? 'bg-red-200' : ''}`}
          />
        </Card>
      ))}
    </div>
  );
}