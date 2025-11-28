/**
 * WatermelonDB schema definition
 * Mirrors Supabase PostgreSQL schema for offline-first architecture
 */

import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const schema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'transactions',
      columns: [
        { name: 'server_id', type: 'string', isOptional: true },
        { name: 'date', type: 'string' }, // YYYY-MM-DD
        { name: 'time', type: 'string' }, // HH:mm
        { name: 'amount', type: 'number' },
        { name: 'description', type: 'string' },
        { name: 'notes', type: 'string', isOptional: true },
        { name: 'category_id', type: 'string', isIndexed: true },
        { name: 'account_id', type: 'string', isIndexed: true },
        { name: 'type', type: 'string' }, // expense | income | transfer
        { name: 'payment_method', type: 'string' },
        { name: 'source', type: 'string' }, // manual | bancolombia_email | nequi_sms
        { name: 'confidence', type: 'number' },
        { name: 'is_synced', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'categories',
      columns: [
        { name: 'server_id', type: 'string', isOptional: true },
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' }, // expense | income | transfer
        { name: 'icon', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'parent_id', type: 'string', isOptional: true, isIndexed: true },
        { name: 'is_active', type: 'boolean' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'accounts',
      columns: [
        { name: 'server_id', type: 'string', isOptional: true },
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string' }, // checking | savings | credit_card | cash
        { name: 'institution', type: 'string' },
        { name: 'last_four', type: 'string' },
        { name: 'balance', type: 'number' },
        { name: 'is_active', type: 'boolean' },
        { name: 'color', type: 'string' },
        { name: 'icon', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
  ],
});
