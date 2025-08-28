import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import colors from '../../config/colors';

// Define a generic type for picker items
export interface PickerItem {
  label: string;
  value: string | number;
}

interface AppPickerProps {
  items: PickerItem[];
  onValueChange: (value: any) => void;
  selectedValue: any;
  placeholder: string;
}

const AppPicker: React.FC<AppPickerProps> = ({
  items,
  onValueChange,
  selectedValue,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => onValueChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label={placeholder} value={null} color={colors.medium} />
        {items.map((item) => (
          <Picker.Item label={item.label} value={item.value} key={item.label} />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    width: '100%',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  picker: {
    color: colors.dark,
  },
});

export default AppPicker;