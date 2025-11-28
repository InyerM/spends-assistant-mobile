/**
 * Hook for managing accounts
 */

import { useDatabase } from '@/providers/DatabaseProvider';
import { Account } from '@/database/models';
import { useEffect, useState } from 'react';
import { Q } from '@nozbe/watermelondb';

export function useAccounts() {
  const { database, isReady } = useDatabase();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;

    loadAccounts();

    const collection = database.get<Account>('accounts');
    const subscription = collection
      .query(Q.where('is_active', true))
      .observe()
      .subscribe((records) => {
        setAccounts(records);
      });

    return () => subscription.unsubscribe();
  }, [isReady]);

  async function loadAccounts() {
    try {
      setLoading(true);
      const collection = database.get<Account>('accounts');
      const records = await collection.query(Q.where('is_active', true)).fetch();
      setAccounts(records);
    } catch (error) {
      console.error('Error loading accounts:', error);
    } finally {
      setLoading(false);
    }
  }

  return { accounts, loading };
}
