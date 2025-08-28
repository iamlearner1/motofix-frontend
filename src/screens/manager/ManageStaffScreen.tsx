import React, { useState, useCallback } from 'react';
import { Text, StyleSheet, FlatList, ActivityIndicator, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { managerService } from '../../services/managerService';
import { User } from '../../types/types';

import Screen from '../../components/common/Screen';
import Card from '../../components/common/Card';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

const ManageStaffScreen = ({ navigation }: any) => {
  const [staff, setStaff] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStaff = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const allUsers = await managerService.getAllUsers();
      
      // Filter the full user list to get only staff members
      const staffMembers = allUsers.filter(user => 
        user && user.role && user.role.name === 'staff'
      );

      setStaff(staffMembers);
    } catch (err) {
      setError("Failed to load staff members.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // useFocusEffect re-loads the list every time the screen comes into view
  useFocusEffect(useCallback(() => { loadStaff(); }, []));

  if (isLoading) {
    return <Screen style={styles.center}><ActivityIndicator size="large" color={colors.primary} /></Screen>;
  }

  return (
    <Screen>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={staff}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            subTitle={item.email}
          />
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No staff members found.</Text>}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <AppButton
          title="Add New Staff"
          onPress={() => navigation.navigate('AddStaff')}
        />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 20 },
  errorText: { color: colors.danger, textAlign: 'center' },
  emptyText: { color: colors.medium, textAlign: 'center', marginTop: 50 },
  footer: { paddingHorizontal: 20 },
});

export default ManageStaffScreen;