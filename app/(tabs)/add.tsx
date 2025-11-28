/**
 * Add transaction screen
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button, Input, Card } from '@/components/ui';
import { useDatabase } from '@/providers/DatabaseProvider';
import { useCategories } from '@/hooks/useCategories';
import { useAccounts } from '@/hooks/useAccounts';
import { colors } from '@/utils/colors';
import { SPACING } from '@/utils/constants';
import {
  formatCurrencyInput,
  parseCurrency,
  getCurrentDate,
  getCurrentTime,
} from '@/utils/format';

export default function AddScreen() {
  const router = useRouter();
  const { database } = useDatabase();
  const { categories } = useCategories('expense');
  const { accounts } = useAccounts();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAmountChange = (value: string) => {
    const formatted = formatCurrencyInput(value);
    setAmount(formatted);
  };

  const handleSave = async () => {
    // Validation
    if (!amount || parseCurrency(amount) === 0) {
      Alert.alert('Error', 'Por favor ingresa un monto');
      return;
    }

    if (!description.trim()) {
      Alert.alert('Error', 'Por favor ingresa una descripción');
      return;
    }

    if (!categoryId) {
      Alert.alert('Error', 'Por favor selecciona una categoría');
      return;
    }

    if (!accountId) {
      Alert.alert('Error', 'Por favor selecciona una cuenta');
      return;
    }

    try {
      setLoading(true);

      await database.write(async () => {
        const transactionsCollection = database.get('transactions');
        await transactionsCollection.create((transaction) => {
          transaction._raw.id = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
          // @ts-expect-error - WatermelonDB model properties
          transaction.serverId = null;
          // @ts-expect-error - WatermelonDB model properties
          transaction.date = getCurrentDate();
          // @ts-expect-error - WatermelonDB model properties
          transaction.time = getCurrentTime();
          // @ts-expect-error - WatermelonDB model properties
          transaction.amount = parseCurrency(amount);
          // @ts-expect-error - WatermelonDB model properties
          transaction.description = description.trim();
          // @ts-expect-error - WatermelonDB model properties
          transaction.notes = notes.trim() || null;
          // @ts-expect-error - WatermelonDB model properties
          transaction.categoryId = categoryId;
          // @ts-expect-error - WatermelonDB model properties
          transaction.accountId = accountId;
          // @ts-expect-error - WatermelonDB model properties
          transaction.type = 'expense';
          // @ts-expect-error - WatermelonDB model properties
          transaction.paymentMethod = 'debit_card';
          // @ts-expect-error - WatermelonDB model properties
          transaction.source = 'manual';
          // @ts-expect-error - WatermelonDB model properties
          transaction.confidence = 1.0;
          // @ts-expect-error - WatermelonDB model properties
          transaction.isSynced = false;
        });
      });

      Alert.alert('Éxito', 'Transacción agregada correctamente', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setAmount('');
            setDescription('');
            setNotes('');
            setCategoryId('');
            setAccountId('');
            // Navigate to home
            router.push('/');
          },
        },
      ]);
    } catch (error) {
      console.error('Error saving transaction:', error);
      Alert.alert('Error', 'No se pudo guardar la transacción');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Card>
        <Input
          label="Monto"
          value={amount}
          onChangeText={handleAmountChange}
          keyboardType="numeric"
          placeholder="0"
          leftIcon={<Text style={styles.currencySymbol}>$</Text>}
        />

        <Input
          label="Descripción"
          value={description}
          onChangeText={setDescription}
          placeholder="Ej: Almuerzo"
          autoCapitalize="sentences"
        />

        <Input
          label="Notas (opcional)"
          value={notes}
          onChangeText={setNotes}
          placeholder="Agregar detalles..."
          autoCapitalize="sentences"
          multiline
          numberOfLines={3}
          style={styles.notesInput}
        />

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.label}>Categoría</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScroll}
          >
            {categories.map((category) => (
              <Card
                key={category.id}
                style={[
                  styles.categoryCard,
                  categoryId === category.id && styles.categoryCardSelected,
                  { borderColor: category.color },
                ]}
                onPress={() => setCategoryId(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    categoryId === category.id && styles.categoryNameSelected,
                  ]}
                  numberOfLines={1}
                >
                  {category.name}
                </Text>
              </Card>
            ))}
          </ScrollView>
        </View>

        {/* Accounts */}
        <View style={styles.section}>
          <Text style={styles.label}>Cuenta</Text>
          {accounts.map((account) => (
            <Card
              key={account.id}
              style={[
                styles.accountCard,
                accountId === account.id && styles.accountCardSelected,
              ]}
              onPress={() => setAccountId(account.id)}
            >
              <Text style={styles.accountIcon}>{account.icon}</Text>
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>{account.name}</Text>
                <Text style={styles.accountDetails}>
                  {account.institution} • {account.maskedNumber}
                </Text>
              </View>
            </Card>
          ))}
        </View>

        <Button
          title="Guardar Transacción"
          onPress={handleSave}
          loading={loading}
          disabled={loading}
        />
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
  currencySymbol: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '600',
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginBottom: SPACING.sm,
  },
  categoriesScroll: {
    marginHorizontal: -SPACING.md,
    paddingHorizontal: SPACING.md,
  },
  categoryCard: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    marginRight: SPACING.sm,
    borderWidth: 2,
    borderColor: colors.transparent,
  },
  categoryCardSelected: {
    borderWidth: 2,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: SPACING.xs,
  },
  categoryName: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: colors.text,
    fontWeight: '600',
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 2,
    borderColor: colors.transparent,
  },
  accountCardSelected: {
    borderWidth: 2,
    borderColor: colors.primary,
  },
  accountIcon: {
    fontSize: 24,
    marginRight: SPACING.md,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  accountDetails: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
