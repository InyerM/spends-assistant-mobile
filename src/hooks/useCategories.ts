/**
 * Hook for managing categories
 */

import { useDatabase } from '@/providers/DatabaseProvider';
import { Category } from '@/database/models';
import { useEffect, useState } from 'react';
import { Q } from '@nozbe/watermelondb';
import type { CategoryType } from '@/types';

export function useCategories(type?: CategoryType) {
  const { database, isReady } = useDatabase();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;

    loadCategories();

    const collection = database.get<Category>('categories');
    const conditions = [Q.where('is_active', true)];

    if (type) {
      conditions.push(Q.where('type', type));
    }

    const subscription = collection
      .query(...conditions)
      .observe()
      .subscribe((records) => {
        setCategories(records);
      });

    return () => subscription.unsubscribe();
  }, [isReady, type]);

  async function loadCategories() {
    try {
      setLoading(true);
      const collection = database.get<Category>('categories');
      const conditions = [Q.where('is_active', true)];

      if (type) {
        conditions.push(Q.where('type', type));
      }

      const records = await collection.query(...conditions).fetch();
      setCategories(records);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  }

  return { categories, loading };
}
