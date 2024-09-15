import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function PetCustomizationScreen({ route }) {
  const { selectedPet } = route.params; // Get the selected pet from route params
  const [selectedItems, setSelectedItems] = useState([]); // Track selected swag items

  const swagItems = [
    { id: 'hat', name: 'Hat', image: require('../assets/hat.png') }, // Add more swag items here
  ];

  // Toggle item selection (add/remove swag from pet)
  const toggleItem = (item) => {
    setSelectedItems((prevItems) =>
      prevItems.includes(item) ? prevItems.filter((i) => i !== item) : [...prevItems, item]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Customize Your Pet</Text>

      {/* Display the selected pet */}
      <View style={styles.petContainer}>
        <Image source={selectedPet.image} style={styles.petImage} />
        {/* Display selected swag items on the pet */}
        {selectedItems.map((item) => (
          <Image key={item.id} source={item.image} style={styles.swagItem} />
        ))}
      </View>

      {/* Inventory: Display swag items */}
      <Text style={styles.subtitle}>Choose Items to Add:</Text>
      <View style={styles.inventory}>
        {swagItems.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => toggleItem(item)} style={styles.inventoryItem}>
            <Image source={item.image} style={styles.inventoryItemImage} />
            <Text style={styles.inventoryItemText}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEAEC', // Light pink background
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#743FF2', // Deep purple for the title
    marginBottom: 20,
  },
  petContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  petImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  swagItem: {
    position: 'absolute',
    width: 120,
    height: 120,
    top: -30,
    left: 115,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5B464B', // Muted brown for the subtitle
    marginBottom: 10,
    textAlign: 'center',
  },
  inventory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E4F6DB', // Light green background for the inventory
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
    elevation: 3, // Shadow effect for the inventory
  },
  inventoryItem: {
    alignItems: 'center',
    backgroundColor: '#FEDCE0', // Soft pink for the item container
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2, // Shadow effect for items
  },
  inventoryItemImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  inventoryItemText: {
    fontSize: 16,
    color: '#743FF2', // Deep purple for item text
    fontWeight: 'bold',
  },
});
