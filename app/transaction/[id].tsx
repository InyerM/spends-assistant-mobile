/**
 * Transaction detail screen
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Card, Button, Badge } from '@/components/ui';
import { useDatabase } from '@/providers/DatabaseProvider';
import { Transaction, Category, Account } from '@/database/models';
import { colors } from '@/utils/colors';
import { SPACING } from '@/utils/constants';
import { formatCurrency, formatDate, formatTime } from '@/utils/format';

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { database } = useDatabase();

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransaction();
  }, [id]);

  async function loadTransaction() {
    try {
      setLoading(true);
      const collection = database.get<Transaction>('transactions');
      const txn = await collection.find(id as string);
      setTransaction(txn);

      // Load related data
      const cat = await txn.category.fetch();
      const acc = await txn.account.fetch();
      setCategory(cat);
      setAccount(acc);
    } catch (error) {
      console.error('Error loading transaction:', error);
      Alert.alert('Error', 'No se pudo cargar la transacción');
      router.back();
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    Alert.alert(
      'Eliminar Transacción',
      '¿Estás seguro de que deseas eliminar esta transacción?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await database.write(async () => {
                await transaction?.destroyPermanently();
              });
              router.back();
            } catch (error) {
              console.error('Error deleting transaction:', error);
              Alert.alert('Error', 'No se pudo eliminar la transacción');
            }
          },
        },
      ]
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (!transaction || !category || !account) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Transacción no encontrada</Text>
      </View>
    );
  }

  const amountColor =
    transaction.type === 'income'
      ? colors.income
      : transaction.type === 'expense'
      ? colors.expense
      : colors.transfer;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Card style={styles.amountCard}>
        <Text style={styles.amountLabel}>Monto</Text>
        <Text style={[styles.amount, { color: amountColor }]}>
          {transaction.type === 'income' && '+'}
          {transaction.type === 'expense' && '-'}
          {formatCurrency(Math.abs(transaction.amount))}
        </Text>
        <Badge
          label={
            transaction.type === 'income'
              ? 'Ingreso'
              : transaction.type === 'expense'
              ? 'Gasto'
              : 'Transferencia'
          }
          variant={
            transaction.type === 'income'
              ? 'success'
              : transaction.type === 'expense'
              ? 'error'
              : 'info'
          }
        />
      </Card>

      <Card>
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Descripción</Text>
          <Text style={styles.fieldValue}>{transaction.description}</Text>
        </View>

        {transaction.notes && (
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Notas</Text>
            <Text style={styles.fieldValue}>{transaction.notes}</Text>
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Categoría</Text>
          <View style={styles.categoryRow}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.fieldValue}>{category.name}</Text>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Cuenta</Text>
          <View style={styles.accountRow}>
            <Text style={styles.accountIcon}>{account.icon}</Text>
            <View>
              <Text style={styles.fieldValue}>{account.name}</Text>
              <Text style={styles.accountDetails}>
                {account.institution} • {account.maskedNumber}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Fecha y Hora</Text>
          <Text style={styles.fieldValue}>
            {formatDate(transaction.date)} • {formatTime(transaction.time)}
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Fuente</Text>
          <Text style={styles.fieldValue}>
            {transaction.source === 'manual'
              ? 'Manual'
              : transaction.source === 'bancolombia_email'
              ? 'Email Bancolombia'
              : 'SMS Nequi'}
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Estado de Sincronización</Text>
          <Badge
            label={transaction.isSynced ? 'Sincronizado' : 'Sin Sincronizar'}
            variant={transaction.isSynced ? 'success' : 'warning'}
          />
        </View>
      </Card>

      <View style={styles.actions}>
        <Button
          title="Eliminar"
          onPress={handleDelete}
          variant="outline"
          style={styles.deleteButton}
          textStyle={{ color: colors.error }}
        />
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
  errorText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 16,
  },
  amountCard: {
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  amountLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: SPACING.xs,
  },
  amount: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
  },
  field: {
    marginBottom: SPACING.lg,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: SPACING.xs,
    textTransform: 'uppercase',
  },
  fieldValue: {
    fontSize: 16,
    color: colors.text,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  accountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountIcon: {
    fontSize: 24,
    marginRight: SPACING.sm,
  },
  accountDetails: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  actions: {
    marginTop: SPACING.lg,
  },
  deleteButton: {
    borderColor: colors.error,
  },
});
