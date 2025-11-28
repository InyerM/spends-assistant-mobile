/**
 * Home screen - Dashboard
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Card } from '@/components/ui';
import EmptyState from '@/components/EmptyState';
import TransactionCard from '@/components/TransactionCard';
import { useRecentTransactions } from '@/hooks/useTransactions';
import { colors } from '@/utils/colors';
import { SPACING } from '@/utils/constants';
import { formatCurrency, getCurrentMonth, formatMonth } from '@/utils/format';

export default function HomeScreen() {
  const { transactions, loading } = useRecentTransactions(5);

  // Calculate month summary
  const summary = useMemo(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpenses += transaction.amount;
      }
    });

    return {
      income: totalIncome,
      expenses: totalExpenses,
      balance: totalIncome - totalExpenses,
    };
  }, [transactions]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={() => {}} />
      }
    >
      {/* Month Header */}
      <View style={styles.header}>
        <Text style={styles.monthTitle}>{formatMonth(getCurrentMonth())}</Text>
      </View>

      {/* Balance Card */}
      <Card style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Balance del mes</Text>
        <Text
          style={[
            styles.balanceAmount,
            { color: summary.balance >= 0 ? colors.income : colors.expense },
          ]}
        >
          {formatCurrency(summary.balance)}
        </Text>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Ingresos</Text>
            <Text style={[styles.summaryAmount, { color: colors.income }]}>
              {formatCurrency(summary.income)}
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Gastos</Text>
            <Text style={[styles.summaryAmount, { color: colors.expense }]}>
              {formatCurrency(summary.expenses)}
            </Text>
          </View>
        </View>
      </Card>

      {/* Recent Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transacciones Recientes</Text>

        {transactions.length === 0 ? (
          <EmptyState
            icon="📝"
            title="No hay transacciones"
            message="Agrega tu primera transacción para comenzar a trackear tus gastos"
          />
        ) : (
          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                showDate
              />
            ))}
          </View>
        )}
      </View>

      {/* Sync Status Indicator */}
      <View style={styles.syncStatus}>
        <View style={[styles.syncDot, { backgroundColor: colors.textTertiary }]} />
        <Text style={styles.syncText}>Offline (mock data)</Text>
      </View>
    </ScrollView>
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
  header: {
    marginBottom: SPACING.lg,
  },
  monthTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    textTransform: 'capitalize',
  },
  balanceCard: {
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: SPACING.xs,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: SPACING.lg,
  },
  summaryRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: SPACING.xs,
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '600',
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: SPACING.md,
  },
  transactionsList: {
    gap: SPACING.sm,
  },
  syncStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.md,
  },
  syncDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: SPACING.sm,
  },
  syncText: {
    fontSize: 12,
    color: colors.textTertiary,
  },
});
