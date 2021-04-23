import { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { ThemeContext } from 'styled-components';
import api from '../services/api';

interface Transaction {
  id: number,
  title: string,
  type: string,
  category: string,
  amount: number,
  createdAt: Date,
}

interface TransactionProviderProps {
  children: ReactNode;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>

interface TransactionContextData {
  transactions: Transaction[],
  createTransaction: (transaction: TransactionInput) => Promise<void>
}

export const TransactionContext = createContext<TransactionContextData>({} as TransactionContextData)

export function TransactionProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('/transactions')
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction(transactionData: TransactionInput) {
    try {
      const response = await api.post('/transactions', {...transactionData, createdAt: new Date().getDate()})
      const transaction =  response.data.transactions;
      setTransactions([...transactions, transaction]);
    } catch(error) {
      console.log('error', error)
    }
  }

  return (
    <TransactionContext.Provider value={{transactions, createTransaction}}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  return context
}