import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import colors from '../../config/colors';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean; // <-- The only new prop
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false, // <-- The only new prop
}) => {
  // A button is disabled if either the isLoading flag is true or the disabled flag is true
  const isDisabled = isLoading || disabled;

  return (
    <TouchableOpacity
      // The style now depends on whether the button is disabled
      style={[styles.button, { backgroundColor: isDisabled ? colors.medium : colors.primary }]}
      onPress={onPress}
      disabled={isDisabled}
    >
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
    backgroundColor: colors.primary, // This is the default color
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