import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function CollectionScreen() {
  const navigation = useNavigation();
  const route = useRoute(); // Hook to access route params
  const [selectedPet, setSelectedPet] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Simulated initial collection data with stats for each pet
  const [collection, setCollection] = useState([
    { id: '1', name: 'Pet 1', image: require('../assets/pet.png'), stats: 'Calorie burn: 14,329 kcal' },
    { id: '2', name: 'Pet 2', image: require('../assets/pet2.png'), stats: 'Steps: 78,310' },
    { id: '3', name: 'Pet 3', image: require('../assets/pet3.png'), stats: 'Bench PR: 285 lbs' },
    { id: '4', name: 'Pet 4', image: require('../assets/pet4.png'), stats: 'Run: 130 miles at 7:22/mile' },
    { id: '5', name: 'Pet 5', image: require('../assets/pet5.png'), stats: 'AVG Daily Intake: 2,300 kcal, 160g protein' },
  ]);

  // Update collection when a new pet is added
  useEffect(() => {
    if (route.params?.newPet) {
      setCollection((prevCollection) => [...prevCollection, route.params.newPet]);
    }
  }, [route.params?.newPet]);

  // Handle pet selection and open the modal
  const handlePetSelect = (pet) => {
    setSelectedPet(pet);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Pet Collection</Text>
      <FlatList
        data={collection}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.collectionItem} onPress={() => handlePetSelect(item)}>
            <Image source={item.image} style={styles.petImage} />
            <Text style={styles.petName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.collectionGrid}
      />

      {/* Modal for pet details */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedPet && (
              <>
                <Image source={selectedPet.image} style={styles.modalPetImage} />
                <Text style={styles.modalPetName}>{selectedPet.name}</Text>
                <Text style={styles.modalPetStats}>{selectedPet.stats}</Text>
                <Button title="Close" onPress={() => setModalVisible(false)} color="#FF6B6B" />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* Add Personalize Button */}
      <View style={styles.personalizeButtonContainer}>
        <Button
          title="Personalize"
          onPress={() => navigation.navigate('PersonalizeScreen')}
          color="#743FF2"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEAEC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#743FF2',
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
    backgroundColor: '#F8DCD3',
    borderRadius: 15,
    alignItems: 'center',
    padding: 15,
    elevation: 3,
  },
  petImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  petName: {
    fontSize: 16,
    color: '#5B464B',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#F8DCD3',
    borderRadius: 15,
    alignItems: 'center',
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
    color: '#5B464B',
    textAlign: 'center',
    marginBottom: 20,
  },
  personalizeButtonContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
