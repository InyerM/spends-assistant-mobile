/**
 * Hook for managing transactions
 */

import { useDatabase } from '@/providers/DatabaseProvider';
import { Transaction } from '@/database/models';
import { useEffect, useState } from 'react';
import { Q } from '@nozbe/watermelondb';
import { getCurrentMonth } from '@/utils/format';

export function useTransactions(month?: string) {
  const { database, isReady } = useDatabase();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;

    loadTransactions();

    // Subscribe to changes
    const collection = database.get<Transaction>('transactions');
    const subscription = collection
      .query()
      .observe()
      .subscribe((records) => {
        setTransactions(records);
      });

    return () => subscription.unsubscribe();
  }, [isReady, month]);

  async function loadTransactions() {
    try {
      setLoading(true);
      const collection = database.get<Transaction>('transactions');

      const targetMonth = month || getCurrentMonth();
      const [year, monthNum] = targetMonth.split('-');

      const query = collection.query(
        Q.where('date', Q.gte(`${year}-${monthNum}-01`)),
        Q.where('date', Q.lte(`${year}-${monthNum}-31`)),
        Q.sortBy('date', Q.desc),
        Q.sortBy('time', Q.desc)
      );

      const records = await query.fetch();
      setTransactions(records);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setLoading(false);
    }
  }

  return { transactions, loading, refresh: loadTransactions };
}

export function useRecentTransactions(limit: number = 5) {
  const { database, isReady } = useDatabase();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;

    loadRecentTransactions();

    const collection = database.get<Transaction>('transactions');
    const subscription = collection
      .query(Q.sortBy('created_at', Q.desc), Q.take(limit))
      .observe()
      .subscribe((records) => {
        setTransactions(records);
      });

    return () => subscription.unsubscribe();
  }, [isReady, limit]);

  async function loadRecentTransactions() {
    try {
      setLoading(true);
      const collection = database.get<Transaction>('transactions');
      const records = await collection
        .query(Q.sortBy('created_at', Q.desc), Q.take(limit))
        .fetch();
      setTransactions(records);
    } catch (error) {
      console.error('Error loading recent transactions:', error);
    } finally {
      setLoading(false);
    }
  }

  return { transactions, loading };
}
