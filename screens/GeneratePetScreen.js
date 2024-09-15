import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function GeneratePetScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate a Custom Pet</Text>
      
      {/* Placeholder text for now */}
      <Text style={styles.description}>
        Use this screen to generate a unique custom pet!
      </Text>

      {/* Add a button to go back to CollectionScreen */}
      <Button
        title="Back to Collection"
        onPress={() => navigation.navigate('Collection')}
        color="#743FF2"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEAEC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#743FF2',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#5B464B',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
