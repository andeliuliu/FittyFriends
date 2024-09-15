import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

export default function ShopScreen() {
  // Simulated shop data (images should be added to your assets folder)
  const shopItems = [
    { id: '1', name: 'Sombrero Hat', price: '10 Points', image: require('../assets/sombrero.png') },
    { id: '2', name: 'Sun Glasses', price: '10 Points', image: require('../assets/glasses.png') },
    { id: '3', name: 'Golden Chain', price: '15 Points', image: require('../assets/pet.png') },
    { id: '4', name: 'Air Jordans', price: '20 Points', image: require('../assets/pet.png') },
    { id: '5', name: 'Pet 5', price: '20 Points', image: require('../assets/pet.png') },
    { id: '6', name: 'Pet 6', price: '25 Points', image: require('../assets/pet.png') },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.shopItem}>
      <Image source={item.image} style={styles.petImage} />
      <Text style={styles.petName}>{item.name}</Text>
      <Text style={styles.petPrice}>{item.price}</Text>
      <TouchableOpacity style={styles.buyButton}>
        <Text style={styles.buyButtonText}>Buy</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pet Shop</Text>
      <FlatList
        data={shopItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.shopGrid}
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
  shopGrid: {
    justifyContent: 'center',
  },
  shopItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#FEDCE0', // Card background color
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
  petPrice: {
    fontSize: 14,
    color: '#4F6152', // Price color
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#743FF2', // Button color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
