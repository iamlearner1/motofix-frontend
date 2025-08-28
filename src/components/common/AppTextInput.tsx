import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import colors from '../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface AppTextInputProps extends TextInputProps {
  icon?: string;
}

const AppTextInput: React.FC<AppTextInputProps> = ({ icon, ...otherProps }) => {
  return (
    <View style={styles.container}>
      {icon && <MaterialCommunityIcons name={icon} size={22} color={colors.medium} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.placeholder}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white, // <-- CHANGE: Use pure white for the container
    borderRadius: 25,            // <-- ADD: Give it rounded corners
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,                 // <-- ADD: Add padding
    marginVertical: 10,          // <-- CHANGE: Adjust vertical margin
    elevation: 2,                // <-- ADD: Subtle shadow for Android
    shadowColor: '#000',         // <-- ADD: Subtle shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: colors.dark,
  },
});

export default AppTextInput;