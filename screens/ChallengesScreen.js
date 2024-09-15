import React, { useState } from 'react';
import { View, Text, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native';

export default function ChallengesScreen() {
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [stepsCompleted, setStepsCompleted] = useState(5422); // Example: current steps completed
  const [totalSteps] = useState(5000); // Total steps target
  const [modalVisible, setModalVisible] = useState(false);

  // Simulate completing the challenge
  const completeChallenge = () => {
    setChallengeCompleted(true);
    setModalVisible(true); // Show the custom modal when challenge is completed
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Challenge</Text>
      <Text style={styles.challengeText}>Walk 5,000 steps to earn a toy for your pet!</Text>

      {/* Display progress */}
      <Text style={styles.progressText}>{stepsCompleted}/{totalSteps} steps completed</Text>

      <View style={styles.buttonContainer}>
        <Button
          title={stepsCompleted >= totalSteps ? "Collect Rewards" : "Keep Walking!"}
          onPress={completeChallenge}
          disabled={stepsCompleted < totalSteps} // Disable button until challenge is completed
          color={challengeCompleted ? "#5B464B" : "#743FF2"} // Button color changes when completed
        />
      </View>

      {challengeCompleted && <Text style={styles.rewardText}>You earned 50 points!</Text>}

      {/* Custom Modal for the Alert */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Challenge Completed!</Text>
            <Text style={styles.modalText}>You earned 50 points.</Text>
            
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
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
    padding: 20,
    backgroundColor: '#FFEAEC', // Light pink background
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#743FF2', // Deep purple for title
  },
  challengeText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#5B464B', // Darker text for the challenge description
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4F6152', // Soft green for the progress text
    marginBottom: 20,
    textAlign: 'center',
  },
  rewardText: {
    fontSize: 18,
    color: '#4F6152', // Soft green for the reward text
    marginTop: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#FEDCE0', // Soft pink for button background
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent dark background for the modal
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#F8DCD3', // Light background for the modal
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#743FF2', // Deep purple for title
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#5B464B', // Darker text for modal content
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#743FF2', // Deep purple button
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#FFFFFF', // White text for the button
    fontSize: 16,
    fontWeight: 'bold',
  },
});
