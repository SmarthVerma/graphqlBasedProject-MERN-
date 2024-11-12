// Define types for input objects for each mutation
export interface CreateTransactionInput {
  userId: string;
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location?: string;
  date: string;
}

export interface UpdateTransactionInput {
  _id: string;
  userId: string;
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location?: string;
  date: string;
}

// Define the Transaction type based on your schema
export interface Transaction {
  _id: string;
  userId: string;
  description: string;
  paymentType: string;
  category: string;
  amount: number;
  location?: string;
  date: string;
}

// Define types for the mutation responses
export interface CreateTransactionResponse {
  createTransaction: Transaction;
}

export interface UpdateTransactionResponse {
  updateTransaction: Transaction;
}

export interface DeleteTransactionResponse {
  deleteTransaction: Transaction;
}