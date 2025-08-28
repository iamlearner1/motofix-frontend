import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Screen from '../../components/common/Screen';
import colors from '../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const managementItems = [
  {
    title: 'Manage Staff',
    icon: 'account-group',
    targetScreen: 'StaffList',
  },
  {
    title: 'Manage Locations',
    icon: 'map-marker-radius',
    targetScreen: 'LocationList',
  },
  {
    title: 'Manage Services',
    icon: 'cogs',
    targetScreen: 'ServiceList',
  },
  {
    title: 'Manage Vehicles',
    icon: 'motorbike',
    targetScreen: 'VehicleModelList',
  },
];

const ManagementMenuScreen = ({ navigation }: any) => {
  const renderMenuItem = ({ item }: { item: typeof managementItems[0] }) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => navigation.navigate(item.targetScreen)}
    >
      <MaterialCommunityIcons name={item.icon} size={24} color={colors.primary} />
      <Text style={styles.menuItemText}>{item.title}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color={colors.medium} />
    </TouchableOpacity>
  );

  return (
    <Screen>
      <FlatList
        data={managementItems}
        keyExtractor={(item) => item.title}
        renderItem={renderMenuItem}
        style={styles.list}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  menuItem: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
    flex: 1, // This makes the text take up available space
    color: colors.dark,
  },
});

export default ManagementMenuScreen;