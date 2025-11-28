/**
 * Transactions list screen
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import TransactionCard from '@/components/TransactionCard';
import EmptyState from '@/components/EmptyState';
import { useTransactions } from '@/hooks/useTransactions';
import { colors } from '@/utils/colors';
import { SPACING } from '@/utils/constants';
import { formatRelativeDate } from '@/utils/format';

export default function TransactionsScreen() {
  const { transactions, loading, refresh } = useTransactions();

  // Group transactions by date
  const groupedTransactions = React.useMemo(() => {
    const groups: { [key: string]: typeof transactions } = {};

    transactions.forEach((transaction) => {
      const date = transaction.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });

    return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
  }, [transactions]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (transactions.length === 0) {
    return (
      <View style={styles.container}>
        <EmptyState
          icon="📝"
          title="No hay transacciones"
          message="Comienza a trackear tus gastos agregando tu primera transacción"
        />
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={groupedTransactions}
      keyExtractor={([date]) => date}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refresh} />
      }
      renderItem={({ item: [date, items] }) => (
        <View style={styles.dateGroup}>
          <Text style={styles.dateHeader}>{formatRelativeDate(date)}</Text>
          <View style={styles.transactionsList}>
            {items.map((transaction) => (
              <TransactionCard key={transaction.id} transaction={transaction} />
            ))}
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  contentContainer: {
    padding: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSecondary,
  },
  dateGroup: {
    marginBottom: SPACING.lg,
  },
  dateHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: SPACING.sm,
    textTransform: 'uppercase',
  },
  transactionsList: {
    gap: SPACING.sm,
  },
});
