/**
 * Badge component
 */

import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '@/utils/colors';
import { BORDER_RADIUS, SPACING } from '@/utils/constants';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Badge({
  label,
  variant = 'default',
  size = 'md',
  style,
  textStyle,
}: BadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        styles[variant],
        styles[size],
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`${variant}Text`],
          styles[`${size}Text`],
          textStyle,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.sm,
    alignSelf: 'flex-start',
  },

  // Variants
  default: {
    backgroundColor: colors.backgroundSecondary,
  },
  success: {
    backgroundColor: `${colors.success}20`,
  },
  warning: {
    backgroundColor: `${colors.warning}20`,
  },
  error: {
    backgroundColor: `${colors.error}20`,
  },
  info: {
    backgroundColor: `${colors.info}20`,
  },

  // Sizes
  sm: {
    paddingHorizontal: SPACING.xs,
    paddingVertical: 2,
  },
  md: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
  },

  // Text styles
  text: {
    fontWeight: '600',
  },
  defaultText: {
    color: colors.text,
  },
  successText: {
    color: colors.success,
  },
  warningText: {
    color: colors.warning,
  },
  errorText: {
    color: colors.error,
  },
  infoText: {
    color: colors.info,
  },
  smText: {
    fontSize: 11,
  },
  mdText: {
    fontSize: 12,
  },
});
