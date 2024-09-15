import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CollectionScreen() {
  const navigation = useNavigation(); // Use the navigation hook

  // Simulated collection data (images should be added to your assets folder)
  const collection = [
    { id: '1', name: 'Pet 1', image: require('../assets/pet.png') },
    { id: '2', name: 'Pet 2', image: require('../assets/pet.png') },
    { id: '3', name: 'Pet 3', image: require('../assets/pet.png') },
    { id: '4', name: 'Pet 4', image: require('../assets/pet.png') },
    { id: '5', name: 'Pet 5', image: require('../assets/pet.png') },
  ];

  // Handle pet selection and navigate to PetCustomization screen
  const handlePetSelect = (pet) => {
    navigation.navigate('PetCustomization', { selectedPet: pet });
  };

  // Render each item in the collection
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.collectionItem} onPress={() => handlePetSelect(item)}>
      <Image source={item.image} style={styles.petImage} />
      <Text style={styles.petName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Pet Collection</Text>
      <FlatList
        data={collection}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.collectionGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEAEC', // Light background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#743FF2', // Title color
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
  },
  collectionGrid: {
    justifyContent: 'center',
  },
  collectionItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#F8DCD3', // Card background color
    borderRadius: 15,
    alignItems: 'center',
    padding: 15,
    elevation: 3, // Shadow effect
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  petName: {
    fontSize: 16,
    color: '#5B464B', // Darker color for text
    fontWeight: 'bold',
  },
});
