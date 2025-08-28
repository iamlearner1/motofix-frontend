import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../config/colors';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
}

const AppButton: React.FC<AppButtonProps> = ({ title, onPress, isLoading = false }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default AppButton;