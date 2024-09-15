import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Modal, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PersonalizeScreen() {
  const [petName, setPetName] = useState(''); // Track the pet name input
  const [timer, setTimer] = useState(0); // Track the timer
  const [generating, setGenerating] = useState(false); // Track whether the timer is running
  const [adoptModalVisible, setAdoptModalVisible] = useState(false); // Track the adopt modal
  const navigation = useNavigation(); // Navigation hook to navigate to other screens

  // Start the timer when 'Generate' is pressed
  const startTimer = () => {
    setGenerating(true);
    setTimer(0);
  };

  // Timer effect, counting up to 15 seconds
  useEffect(() => {
    let interval;
    if (generating && timer < 5) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 0.1);
      }, 100);
    } else if (timer >= 5) {
      clearInterval(interval);
      setGenerating(false);
      setAdoptModalVisible(true); // Show the adopt modal after 15 seconds
    }
    return () => clearInterval(interval);
  }, [generating, timer]);

  // Handle adoption and navigate back to CollectionScreen with the new pet
  const adoptPet = () => {
    setAdoptModalVisible(false);
    navigation.navigate('Collection', {
      newPet: {
        id: Math.random().toString(), // Generate a random ID
        name: petName || 'New Pet',   // Use the pet name or default
        image: require('../assets/bu.png'), // bu.png image
        stats: 'Newly Adopted Pet',
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Generate Your Own Pet</Text>

      {/* Text input for pet name */}
      <TextInput
        style={styles.input}
        placeholder="Enter a pet name"
        value={petName}
        onChangeText={setPetName}
      />

      {/* Generate button */}
      <Button
        title="Generate"
        onPress={startTimer}
        color="#743FF2"
        disabled={generating} // Disable while generating
      />

      {/* Display the timer */}
      {generating && (
        <Text style={styles.timerText}>{(timer).toFixed(1)}/5.0 seconds</Text>
      )}

      {/* Adopt Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={adoptModalVisible}
        onRequestClose={() => setAdoptModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('../assets/bu.png')} style={styles.adoptPetImage} />
            <Button
              title="Adopt this pet"
              onPress={adoptPet}
              color="#743FF2"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFEAEC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#743FF2',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#743FF2',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  timerText: {
    fontSize: 18,
    color: '#743FF2',
    marginVertical: 20,
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
  adoptPetImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
