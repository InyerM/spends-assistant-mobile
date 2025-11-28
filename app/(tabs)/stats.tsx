/**
 * Statistics screen
 */

import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Card } from '@/components/ui';
import EmptyState from '@/components/EmptyState';
import { useTransactions } from '@/hooks/useTransactions';
import { useCategories } from '@/hooks/useCategories';
import { colors } from '@/utils/colors';
import { SPACING } from '@/utils/constants';
import { formatCurrency, formatMonth, getCurrentMonth } from '@/utils/format';

export default function StatsScreen() {
  const { transactions, loading } = useTransactions();
  const { categories } = useCategories('expense');

  // Calculate category summaries
  const categorySummaries = useMemo(() => {
    const summaries = new Map<string, { total: number; count: number }>();

    const expenseTransactions = transactions.filter((t) => t.type === 'expense');
    const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);

    expenseTransactions.forEach((transaction) => {
      const current = summaries.get(transaction.categoryId) || { total: 0, count: 0 };
      summaries.set(transaction.categoryId, {
        total: current.total + transaction.amount,
        count: current.count + 1,
      });
    });

    return categories
      .map((category) => {
        const summary = summaries.get(category.id) || { total: 0, count: 0 };
        return {
          category,
          ...summary,
          percentage: totalExpenses > 0 ? (summary.total / totalExpenses) * 100 : 0,
        };
      })
      .filter((s) => s.total > 0)
      .sort((a, b) => b.total - a.total);
  }, [transactions, categories]);

  const totalExpenses = useMemo(() => {
    return transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
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
          icon="📊"
          title="No hay datos"
          message="Agrega algunas transacciones para ver tus estadísticas"
        />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Month Header */}
      <View style={styles.header}>
        <Text style={styles.monthTitle}>{formatMonth(getCurrentMonth())}</Text>
        <Text style={styles.totalExpenses}>
          Total: {formatCurrency(totalExpenses)}
        </Text>
      </View>

      {/* Category Breakdown */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gastos por Categoría</Text>

        {categorySummaries.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>No hay gastos en este mes</Text>
          </Card>
        ) : (
          categorySummaries.map(({ category, total, count, percentage }) => (
            <Card key={category.id} style={styles.categoryCard}>
              <View style={styles.categoryRow}>
                <View style={styles.categoryLeft}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <Text style={styles.categoryCount}>
                      {count} {count === 1 ? 'transacción' : 'transacciones'}
                    </Text>
                  </View>
                </View>
                <View style={styles.categoryRight}>
                  <Text style={styles.categoryAmount}>
                    {formatCurrency(total)}
                  </Text>
                  <Text style={styles.categoryPercentage}>
                    {percentage.toFixed(1)}%
                  </Text>
                </View>
              </View>

              {/* Progress bar */}
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${percentage}%`,
                      backgroundColor: category.color,
                    },
                  ]}
                />
              </View>
            </Card>
          ))
        )}
      </View>

      {/* Placeholder for future chart */}
      <Card style={styles.chartPlaceholder}>
        <Text style={styles.chartPlaceholderText}>
          📊 Gráfico de torta - Próximamente
        </Text>
        <Text style={styles.chartPlaceholderSubtext}>
          Se agregará con Victory Native
        </Text>
      </Card>
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
    marginBottom: SPACING.xs,
  },
  totalExpenses: {
    fontSize: 16,
    color: colors.textSecondary,
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
  emptyText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 14,
  },
  categoryCard: {
    marginBottom: SPACING.sm,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    fontSize: 32,
    marginRight: SPACING.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  categoryRight: {
    alignItems: 'flex-end',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.expense,
    marginBottom: 2,
  },
  categoryPercentage: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.backgroundTertiary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  chartPlaceholder: {
    padding: SPACING.xl,
    alignItems: 'center',
  },
  chartPlaceholderText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: SPACING.xs,
  },
  chartPlaceholderSubtext: {
    fontSize: 14,
    color: colors.textTertiary,
  },
});
