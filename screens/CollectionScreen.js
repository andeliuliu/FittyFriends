import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CollectionScreen() {
  const navigation = useNavigation(); // Use the navigation hook
  const [selectedPet, setSelectedPet] = useState(null); // Track the selected pet for the modal
  const [modalVisible, setModalVisible] = useState(false); // Track modal visibility

  // Simulated collection data with stats for each pet
  const collection = [
    { id: '1', name: 'Pet 1', image: require('../assets/pet.png'), stats: 'Calorie burn: 14,329 kcal' },
    { id: '2', name: 'Pet 2', image: require('../assets/pet2.png'), stats: 'Steps: 78,310' },
    { id: '3', name: 'Pet 3', image: require('../assets/pet3.png'), stats: 'Bench PR: 285 lbs' },
    { id: '4', name: 'Pet 4', image: require('../assets/pet4.png'), stats: 'Run: 130 miles at 7:22/mile' },
    { id: '5', name: 'Pet 5', image: require('../assets/pet5.png'), stats: 'AVG Daily Intake: 2,300 kcal, 160g protein' },
  ];

  // Handle pet selection and open the modal
  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
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
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.collectionGrid}
      />

      {/* Modal for pet details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal when back is pressed
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPet && (
              <>
                <Image source={selectedPet.image} style={styles.modalPetImage} />
                <Text style={styles.modalPetName}>{selectedPet.name}</Text>
                <Text style={styles.modalPetStats}>{selectedPet.stats}</Text>

                {/* Customize Button */}
                <Button
                  title="Customize"
                  onPress={() => {
                    setModalVisible(false); // Close the modal
                    navigation.navigate('PetCustomization', { selectedPet: selectedPet });
                  }}
                  color="#743FF2" // Button color to match the theme
                />

                {/* Close Button */}
                <Button
                  title="Close"
                  onPress={() => setModalVisible(false)} // Close the modal
                  color="#FF6B6B" // Red button for closing
                />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Button to navigate to GeneratePetScreen */}
      <View style={styles.buttonContainer}>
        <Button
          title="Generate Custom Pet"
          onPress={() => navigation.navigate('GeneratePetScreen')} // Navigate to GeneratePetScreen
          color="#743FF2" // Button color to match the theme
        />
      </View>
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
  buttonContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#FEDCE0', // Soft pink background for the button container
    borderRadius: 15,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#F8DCD3', // Soft pink for modal content
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5, // Shadow for the modal
  },
  modalPetImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  modalPetName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#743FF2',
    marginBottom: 10,
  },
  modalPetStats: {
    fontSize: 16,
    color: '#5B464B', // Darker color for stats
    marginBottom: 20,
    textAlign: 'center',
  },
});
