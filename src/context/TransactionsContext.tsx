import React, { createContext, useContext, useState, useCallback } from 'react';
import { useWatchPendingTransactions, useWaitForTransactionReceipt } from 'wagmi';
import { toast } from 'react-hot-toast';
import { Hash } from 'viem';

interface TransactionWatcherProps {
    hash: Hash;
    description: string;
}

function TransactionWatcher({ hash, description }: TransactionWatcherProps) {
    const toastId = hash;

    const result = useWaitForTransactionReceipt({
        hash,
    });


    if (result.status === 'success') {
        toast.success(`${description}: Confirmed!`, { id: toastId });
    } else if (result.status === 'error') {
        toast.error(`${description}: Failed - ${result.error?.message}`, { id: toastId });
    }

    return null;    
}

interface TransactionsContextType {
    watchTransaction: (params: TransactionWatcherProps) => void;
}

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<TransactionWatcherProps[]>([]);

    const watchTransaction = useCallback(({ hash, description }: TransactionWatcherProps) => {
        toast.loading(`${description}: Waiting for confirmation...`, { id: hash });
        setTransactions(prev => [...prev, { hash, description }]);
    }, []);

    return (
        <TransactionsContext.Provider value={{ watchTransaction }}>
            {transactions.map(tx => (
                <TransactionWatcher key={tx.hash} {...tx} />
            ))}
            {children}
        </TransactionsContext.Provider>
    );
}

export function useTransactions() {
    const context = useContext(TransactionsContext);
    if (context === undefined) {
        throw new Error('useTransactions must be used within a TransactionsProvider');
    }
    return context;
} 