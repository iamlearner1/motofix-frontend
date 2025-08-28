import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../config/colors';

interface CardProps {
  title: string;
  subTitle: string;
}

const Card: React.FC<CardProps> = ({ title, subTitle }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    elevation: 3, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 7,
    color: colors.dark,
  },
  subTitle: {
    fontSize: 16,
    color: colors.medium,
  },
});

export default Card;