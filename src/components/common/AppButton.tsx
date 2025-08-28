import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';
import colors from '../../config/colors';

// --- THIS IS THE UPDATED INTERFACE ---
interface AppButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>; // <-- ADD THIS LINE
}

const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  style, // <-- RECEIVE THE PROP HERE
}) => {
  const isDisabled = isLoading || disabled;

  return (
    <TouchableOpacity
      // --- THIS IS THE UPDATED STYLE PROP ---
      // It now correctly combines the base styles with any passed-in styles
      style={[
        styles.button,
        { backgroundColor: isDisabled ? colors.medium : colors.primary },
        style // Apply the custom style last so it can override
      ]}
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
    // The default backgroundColor is still here, but it can now be overridden
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