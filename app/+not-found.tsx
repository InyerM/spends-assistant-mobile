/**
 * 404 Not Found screen
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';
import { colors } from '@/utils/colors';
import { SPACING } from '@/utils/constants';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Página no encontrada' }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Página no encontrada</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Volver al inicio</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.primary,
  },
  subtitle: {
    fontSize: 20,
    marginTop: SPACING.md,
    color: colors.textSecondary,
  },
  link: {
    marginTop: SPACING.xl,
  },
  linkText: {
    fontSize: 16,
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
