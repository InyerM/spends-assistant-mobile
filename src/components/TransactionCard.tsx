/**
 * Transaction card component
 */

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Card } from './ui';
import { colors } from '@/utils/colors';
import { SPACING } from '@/utils/constants';
import { formatCurrency, formatTime } from '@/utils/format';
import type { Transaction } from '@/database/models';

interface TransactionCardProps {
  transaction: Transaction;
  showDate?: boolean;
}

export default function TransactionCard({
  transaction,
  showDate = false,
}: TransactionCardProps) {
  const router = useRouter();

  const amountColor =
    transaction.type === 'income'
      ? colors.income
      : transaction.type === 'expense'
      ? colors.expense
      : colors.transfer;

  const amountPrefix = transaction.type === 'income' ? '+' : '-';

  return (
    <Card onPress={() => router.push(`/transaction/${transaction.id}`)}>
      <View style={styles.row}>
        <View style={styles.left}>
          <View style={styles.header}>
            <Text style={styles.description}>{transaction.description}</Text>
            {showDate && (
              <Text style={styles.time}>{formatTime(transaction.time)}</Text>
            )}
          </View>
          {transaction.notes && (
            <Text style={styles.notes} numberOfLines={1}>
              {transaction.notes}
            </Text>
          )}
        </View>
        <View style={styles.right}>
          <Text style={[styles.amount, { color: amountColor }]}>
            {amountPrefix}
            {formatCurrency(Math.abs(transaction.amount))}
          </Text>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
    marginRight: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  description: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: colors.textTertiary,
    marginLeft: SPACING.sm,
  },
  notes: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  right: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
});
