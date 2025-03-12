'use client';

import { Transaction } from '@/lib/types';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useMemo } from 'react';

interface MonthlyExpensesChartProps {
  transactions: Transaction[];
}

export default function MonthlyExpensesChart({ transactions }: MonthlyExpensesChartProps) {
  const monthlyData = useMemo(() => {
    const months: { [key: string]: { expenses: number; income: number; savings: number } } = {};
    
    transactions.forEach((transaction) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!months[monthKey]) {
        months[monthKey] = { expenses: 0, income: 0, savings: 0 };
      }

      if (transaction.type === 'expense') {
        months[monthKey].expenses += transaction.amount;
      } else {
        months[monthKey].income += transaction.amount;
      }
    });

    // Calculate savings
    Object.keys(months).forEach((month) => {
      months[month].savings = months[month].income - months[month].expenses;
    });

    return Object.entries(months)
      .sort()
      .map(([month, data]) => ({
        month,
        ...data,
      }));
  }, [transactions]);

  if (monthlyData.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-muted-foreground">
        No data to display
      </div>
    );
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickFormatter={(value) => {
              const [year, month] = value.split('-');
              return `${month}/${year.slice(2)}`;
            }}
          />
          <YAxis
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
            labelFormatter={(label) => {
              const [year, month] = label.split('-');
              return `${month}/${year}`;
            }}
          />
          <Legend />
          <Bar dataKey="income" name="Income" fill="hsl(var(--chart-1))" />
          <Bar dataKey="expenses" name="Expenses" fill="hsl(var(--chart-2))" />
          <Bar dataKey="savings" name="Savings" fill="hsl(var(--chart-3))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}