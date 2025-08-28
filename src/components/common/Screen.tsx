import React, { ReactNode } from 'react';
import { StyleSheet, SafeAreaView, View, StyleProp, ViewStyle } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

interface ScreenProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Screen: React.FC<ScreenProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  view: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Screen;