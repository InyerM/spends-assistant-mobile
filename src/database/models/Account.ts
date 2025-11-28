/**
 * Account WatermelonDB model
 */

import { Model } from '@nozbe/watermelondb';
import { field, readonly, date, children } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import type Transaction from './Transaction';

export default class Account extends Model {
  static table = 'accounts';

  static associations: Associations = {
    transactions: { type: 'has_many', foreignKey: 'account_id' },
  };

  @field('server_id') serverId!: string | null;
  @field('name') name!: string;
  @field('type') type!: 'checking' | 'savings' | 'credit_card' | 'cash';
  @field('institution') institution!: string;
  @field('last_four') lastFour!: string;
  @field('balance') balance!: number;
  @field('is_active') isActive!: boolean;
  @field('color') color!: string;
  @field('icon') icon!: string;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @children('transactions') transactions!: Transaction[];

  // Helper to get masked account number
  get maskedNumber(): string {
    return `*${this.lastFour}`;
  }
}
