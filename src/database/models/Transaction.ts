/**
 * Transaction WatermelonDB model
 */

import { Model, Q } from '@nozbe/watermelondb';
import { date, field, relation, readonly } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import type Category from './Category';
import type Account from './Account';

export default class Transaction extends Model {
  static table = 'transactions';

  static associations: Associations = {
    categories: { type: 'belongs_to', key: 'category_id' },
    accounts: { type: 'belongs_to', key: 'account_id' },
  };

  @field('server_id') serverId!: string | null;
  @field('date') date!: string;
  @field('time') time!: string;
  @field('amount') amount!: number;
  @field('description') description!: string;
  @field('notes') notes!: string | null;
  @field('category_id') categoryId!: string;
  @field('account_id') accountId!: string;
  @field('type') type!: 'expense' | 'income' | 'transfer';
  @field('payment_method') paymentMethod!: string;
  @field('source') source!: 'manual' | 'bancolombia_email' | 'nequi_sms';
  @field('confidence') confidence!: number;
  @field('is_synced') isSynced!: boolean;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @relation('categories', 'category_id') category!: Category;
  @relation('accounts', 'account_id') account!: Account;

  // Helper method to get full datetime
  get datetime(): string {
    return `${this.date} ${this.time}`;
  }

  // Helper to check if transaction is today
  get isToday(): boolean {
    const today = new Date().toISOString().split('T')[0];
    return this.date === today;
  }
}
