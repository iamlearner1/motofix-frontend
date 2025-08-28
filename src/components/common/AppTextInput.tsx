import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import colors from '../../config/colors';

// We can extend the default TextInputProps to get all the standard props
const AppTextInput: React.FC<TextInputProps> = ({ ...otherProps }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholderTextColor={colors.medium}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: colors.dark,
  },
});

export default AppTextInput;