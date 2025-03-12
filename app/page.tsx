'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import TransactionList from '@/components/TransactionList';
import TransactionForm from '@/components/TransactionForm';
import MonthlyExpensesChart from '@/components/MonthlyExpensesChart';
import CategoryChart from '@/components/CategoryChart';
import DashboardStats from '@/components/DashboardStats';
import BudgetProgress from '@/components/BudgetProgress';
import { Transaction } from '@/lib/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleAddTransaction = (transaction: Transaction) => {
    if (editingTransaction) {
      setTransactions(transactions.map(t => 
        t.id === editingTransaction.id ? transaction : t
      ));
      setEditingTransaction(null);
    } else {
      setTransactions([...transactions, { ...transaction, id: Date.now().toString() }]);
    }
    setIsFormOpen(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Personal Finance Tracker</h1>
          <Button onClick={() => setIsFormOpen(true)} className="bg-primary">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>

        <DashboardStats transactions={transactions} />

        <div className="grid gap-8 mt-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="budgets">Budgets</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <Card className="p-6">
                <h2 className="text-2xl font-semibold mb-4">Monthly Overview</h2>
                <MonthlyExpensesChart transactions={transactions} />
              </Card>
            </TabsContent>

            <TabsContent value="categories">
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Expense Categories</h2>
                  <CategoryChart transactions={transactions} />
                </Card>
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Recent Transactions</h2>
                  <TransactionList 
                    transactions={transactions.slice(0, 5)}
                    onEdit={handleEditTransaction}
                    onDelete={handleDeleteTransaction}
                  />
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="budgets">
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Budget Progress</h2>
                  <BudgetProgress transactions={transactions} />
                </Card>
                <Card className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">Monthly Expenses</h2>
                  <MonthlyExpensesChart transactions={transactions} />
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <TransactionForm 
          open={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingTransaction(null);
          }}
          onSubmit={handleAddTransaction}
          editingTransaction={editingTransaction}
        />
      </div>
    </div>
  );
}