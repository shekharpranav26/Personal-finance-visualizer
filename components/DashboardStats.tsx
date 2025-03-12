'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Transaction } from '@/lib/types';
import { ArrowUpCircle, ArrowDownCircle, PiggyBank, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  transactions: Transaction[];
}

export default function DashboardStats({ transactions }: DashboardStatsProps) {
  const stats = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyTransactions = transactions.filter(t => {
      const date = new Date(t.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });

    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const savings = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (savings / totalIncome) * 100 : 0;

    return {
      income: totalIncome,
      expenses: totalExpenses,
      savings,
      savingsRate,
    };
  }, [transactions]);

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="p-4 flex items-center space-x-4">
        <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
          <ArrowUpCircle className="h-6 w-6 text-green-600 dark:text-green-300" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Monthly Income</p>
          <h3 className="text-2xl font-bold">${stats.income.toFixed(2)}</h3>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className="p-3 rounded-full bg-red-100 dark:bg-red-900">
          <ArrowDownCircle className="h-6 w-6 text-red-600 dark:text-red-300" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Monthly Expenses</p>
          <h3 className="text-2xl font-bold">${stats.expenses.toFixed(2)}</h3>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
          <PiggyBank className="h-6 w-6 text-blue-600 dark:text-blue-300" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Monthly Savings</p>
          <h3 className="text-2xl font-bold">${stats.savings.toFixed(2)}</h3>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
          <TrendingUp className="h-6 w-6 text-purple-600 dark:text-purple-300" />
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Savings Rate</p>
          <h3 className="text-2xl font-bold">{stats.savingsRate.toFixed(1)}%</h3>
        </div>
      </Card>
    </div>
  );
}