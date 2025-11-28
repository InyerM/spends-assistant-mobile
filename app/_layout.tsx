/**
 * Root layout with providers
 */

import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { QueryClientProvider } from '@tanstack/react-query';
import { DatabaseProvider } from '@/providers/DatabaseProvider';
import { queryClient } from '@/providers/QueryProvider';

export default function RootLayout() {
  return (
    <DatabaseProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="transaction/[id]"
            options={{
              headerShown: true,
              title: 'Detalle de Transacción',
              presentation: 'modal',
            }}
          />
        </Stack>
      </QueryClientProvider>
    </DatabaseProvider>
  );
}
