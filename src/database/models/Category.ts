/**
 * Category WatermelonDB model
 */

import { Model } from '@nozbe/watermelondb';
import { field, readonly, date, children } from '@nozbe/watermelondb/decorators';
import { Associations } from '@nozbe/watermelondb/Model';
import type Transaction from './Transaction';

export default class Category extends Model {
  static table = 'categories';

  static associations: Associations = {
    transactions: { type: 'has_many', foreignKey: 'category_id' },
  };

  @field('server_id') serverId!: string | null;
  @field('name') name!: string;
  @field('type') type!: 'expense' | 'income' | 'transfer';
  @field('icon') icon!: string;
  @field('color') color!: string;
  @field('parent_id') parentId!: string | null;
  @field('is_active') isActive!: boolean;

  @readonly @date('created_at') createdAt!: Date;
  @readonly @date('updated_at') updatedAt!: Date;

  @children('transactions') transactions!: Transaction[];
}
