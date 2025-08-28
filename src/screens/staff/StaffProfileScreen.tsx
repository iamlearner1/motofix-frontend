import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Screen from '../../components/common/Screen';
import AppButton from '../../components/common/AppButton';
import colors from '../../config/colors';

const StaffProfileScreen = () => {
  const { user, logout } = useAuth();

  return (
    <Screen style={styles.container}>
      <View style={styles.profileInfoContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user?.name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text style={styles.nameText}>{user?.name}</Text>
        <Text style={styles.emailText}>{user?.email}</Text>
      </View>
      <View style={styles.logoutButtonContainer}>
        <AppButton title="Logout" onPress={logout} style={{ backgroundColor: colors.medium }} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: colors.light },
  profileInfoContainer: { alignItems: 'center', paddingVertical: 40 },
  avatar: {
    width: 100, height: 100, borderRadius: 50, backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center', marginBottom: 20,
  },
  avatarText: { color: colors.white, fontSize: 50, fontWeight: 'bold' },
  nameText: { fontSize: 22, fontWeight: 'bold', color: colors.dark },
  emailText: { fontSize: 16, color: colors.medium, marginTop: 5 },
  logoutButtonContainer: { marginTop: 'auto', padding: 20 },
});

export default StaffProfileScreen;