import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import colors from '../../config/colors';

interface PillProps {
  label: string;
  onPress: () => void;
  isActive: boolean; // To highlight the active filter
  style?: StyleProp<ViewStyle>;
}

const Pill: React.FC<PillProps> = ({ label, onPress, isActive, style }) => {
  return (
    <TouchableOpacity
      style={[styles.pill, isActive && styles.activePill, style]}
      onPress={onPress}
    >
      <Text style={[styles.pillText, isActive && styles.activePillText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  pill: {
    backgroundColor: colors.light,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: colors.medium,
  },
  activePill: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  pillText: {
    color: colors.dark,
    fontSize: 14,
    fontWeight: '500',
  },
  activePillText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});

export default Pill;