import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, PieChart, Line, Bar, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Home, TrendingUp, Target, Bell, Plus, Calendar, Wallet, PiggyBank, CreditCard } from 'lucide-react';

// Mock data for demonstration
const mockTransactions = [
  { id: 1, date: '2023-10-15', amount: 12.50, category: 'Food', merchant: 'Campus Cafe', processed: true },
  { id: 2, date: '2023-10-16', amount: 45.00, category: 'Transportation', merchant: 'Bus Pass', processed: true },
  { id: 3, date: '2023-10-17', amount: 22.99, category: 'Entertainment', merchant: 'Streaming Service', processed: true },
  { id: 4, date: '2023-10-18', amount: 8.75, category: 'Food', merchant: 'Groceries', processed: true },
  { id: 5, date: '2023-10-19', amount: 65.00, category: 'Utilities', merchant: 'Internet Bill', processed: true },
  { id: 6, date: '2023-10-20', amount: 15.00, category: 'Food', merchant: 'Restaurant', processed: false },
];

const spendingData = [
  { name: 'Jan', amount: 420 },
  { name: 'Feb', amount: 380 },
  { name: 'Mar', amount: 450 },
  { name: 'Apr', amount: 520 },
  { name: 'May', amount: 480 },
  { name: 'Jun', amount: 550 },
  { name: 'Jul', amount: 610 },
  { name: 'Aug', amount: 590 },
  { name: 'Sep', amount: 530 },
  { name: 'Oct', amount: 480 },
  { name: 'Nov', amount: 510 },
  { name: 'Dec', amount: 570 },
];

const categoryData = [
  { name: 'Food', value: 35 },
  { name: 'Transportation', value: 20 },
  { name: 'Entertainment', value: 15 },
  { name: 'Utilities', value: 18 },
  { name: 'Other', value: 12 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const StudentFinanceManager = () => {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [budget, setBudget] = useState(500);
  const [goals, setGoals] = useState([
    { id: 1, name: 'New Laptop', target: 1200, current: 450, deadline: '2024-03-15' },
    { id: 2, name: 'Spring Break Trip', target: 800, current: 320, deadline: '2024-04-01' },
  ]);

  const totalSpent = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const remainingBudget = budget - totalSpent;
  const budgetPercentage = (totalSpent / budget) * 100;

  const predictedSpending = spendingData[spendingData.length - 1].amount * 1.1;

  const addTransaction = (amount: number, category: string, merchant: string) => {
    const newTransaction = {
      id: transactions.length + 1,
      date: new Date().toISOString().split('T')[0],
      amount,
      category,
      merchant,
      processed: false,
    };
    setTransactions([...transactions, newTransaction]);
  };

  const addGoal = (name: string, target: number, deadline: string) => {
    const newGoal = {
      id: goals.length + 1,
      name,
      target,
      current: 0,
      deadline,
    };
    setGoals([...goals, newGoal]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <Wallet className="h-8 w-8 text-blue-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-800">Student Finance</h1>
        </div>
        
        <nav className="flex-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Home className="h-5 w-5 mr-3" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${activeTab === 'transactions' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <CreditCard className="h-5 w-5 mr-3" />
            Transactions
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${activeTab === 'goals' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Target className="h-5 w-5 mr-3" />
            Goals
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${activeTab === 'analytics' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <TrendingUp className="h-5 w-5 mr-3" />
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('alerts')}
            className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === 'alerts' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Bell className="h-5 w-5 mr-3" />
            Alerts
          </button>
        </nav>
        
        <div className="mt-auto p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center mb-2">
            <PiggyBank className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium text-blue-600">Budget Remaining</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">${remainingBudget.toFixed(2)}</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Financial Dashboard</h2>
          <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="h-5 w-5 text-blue-600" />
              </div>
              <span className="ml-2 text-gray-600">Total Spent</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">${totalSpent.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <span className="ml-2 text-gray-600">Predicted Spending</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">${predictedSpending.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-1">Next month</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Target className="h-5 w-5 text-purple-600" />
              </div>
              <span className="ml-2 text-gray-600">Goals Progress</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{goals.length}</p>
            <p className="text-sm text-gray-500 mt-1">Active goals</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-red-100 rounded-lg">
                <Bell className="h-5 w-5 text-red-600" />
              </div>
              <span className="ml-2 text-gray-600">Alerts</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">2</p>
            <p className="text-sm text-gray-500 mt-1">Needs attention</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Spending Trend</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="amount" stroke="#0088FE" name="Monthly Spending" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Expense Categories</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <Plus className="h-4 w-4 mr-1" />
              Add Transaction
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 text-gray-600 font-medium">Date</th>
                  <th className="text-left py-3 text-gray-600 font-medium">Merchant</th>
                  <th className="text-left py-3 text-gray-600 font-medium">Category</th>
                  <th className="text-right py-3 text-gray-600 font-medium">Amount</th>
                  <th className="text-left py-3 text-gray-600 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 5).map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">{transaction.date}</td>
                    <td className="py-3">{transaction.merchant}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-3 text-right">${transaction.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.processed 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {transaction.processed ? 'Processed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Savings Goals</h3>
            <button className="flex items-center text-blue-600 hover:text-blue-800">
              <Plus className="h-4 w-4 mr-1" />
              Add Goal
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {goals.map((goal) => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <div key={goal.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-800">{goal.name}</h4>
                    <span className="text-sm text-gray-500">{goal.deadline}</span>
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">${goal.current.toFixed(2)} saved</span>
                    <span className="text-gray-800 font-medium">${goal.target.toFixed(2)} target</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFinanceManager;
