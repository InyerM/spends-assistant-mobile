/**
 * Database provider with seed data initialization
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { database } from '@/database';
import { DEFAULT_CATEGORIES, DEFAULT_ACCOUNTS } from '@/utils/constants';
import { Database } from '@nozbe/watermelondb';

interface DatabaseContextValue {
  database: Database;
  isReady: boolean;
}

const DatabaseContext = createContext<DatabaseContextValue | undefined>(undefined);

export function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initializeDatabase();
  }, []);

  async function initializeDatabase() {
    try {
      // Check if we need to seed the database
      const categoriesCollection = database.get('categories');
      const accountsCollection = database.get('accounts');

      const categoriesCount = await categoriesCollection.query().fetchCount();
      const accountsCount = await accountsCollection.query().fetchCount();

      // Seed categories if empty
      if (categoriesCount === 0) {
        await database.write(async () => {
          for (const categoryData of DEFAULT_CATEGORIES) {
            await categoriesCollection.create((category) => {
              category._raw.id = `cat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
              // @ts-expect-error - WatermelonDB model properties
              category.serverId = null;
              // @ts-expect-error - WatermelonDB model properties
              category.name = categoryData.name;
              // @ts-expect-error - WatermelonDB model properties
              category.type = categoryData.type;
              // @ts-expect-error - WatermelonDB model properties
              category.icon = categoryData.icon;
              // @ts-expect-error - WatermelonDB model properties
              category.color = categoryData.color;
              // @ts-expect-error - WatermelonDB model properties
              category.parentId = categoryData.parentId || null;
              // @ts-expect-error - WatermelonDB model properties
              category.isActive = true;
            });
          }
        });
        console.log('✅ Categories seeded');
      }

      // Seed accounts if empty
      if (accountsCount === 0) {
        await database.write(async () => {
          for (const accountData of DEFAULT_ACCOUNTS) {
            await accountsCollection.create((account) => {
              account._raw.id = `acc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
              // @ts-expect-error - WatermelonDB model properties
              account.serverId = null;
              // @ts-expect-error - WatermelonDB model properties
              account.name = accountData.name;
              // @ts-expect-error - WatermelonDB model properties
              account.type = accountData.type;
              // @ts-expect-error - WatermelonDB model properties
              account.institution = accountData.institution;
              // @ts-expect-error - WatermelonDB model properties
              account.lastFour = accountData.lastFour;
              // @ts-expect-error - WatermelonDB model properties
              account.balance = accountData.balance;
              // @ts-expect-error - WatermelonDB model properties
              account.isActive = true;
              // @ts-expect-error - WatermelonDB model properties
              account.color = accountData.color;
              // @ts-expect-error - WatermelonDB model properties
              account.icon = accountData.icon;
            });
          }
        });
        console.log('✅ Accounts seeded');
      }

      setIsReady(true);
      console.log('✅ Database initialized');
    } catch (error) {
      console.error('❌ Error initializing database:', error);
      setIsReady(true); // Set ready anyway to allow app to load
    }
  }

  return (
    <DatabaseContext.Provider value={{ database, isReady }}>
      {children}
    </DatabaseContext.Provider>
  );
}

export function useDatabase() {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error('useDatabase must be used within DatabaseProvider');
  }
  return context;
}
