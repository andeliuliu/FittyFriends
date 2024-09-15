import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Button, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function ProfileScreen() {
  // Simulating dynamic user data
  const [user, setUser] = useState({
    name: '@andrew',
    status: 'Active Fitness Enthusiast',
    workouts: 128,
    petsCollected: 5,
    achievements: 28,
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [friendResults, setFriendResults] = useState([]);

  // Simulate a search function
  const handleSearch = () => {
    // Example: Simulate friend search results
    const results = [
      { username: '@zhan', workouts: 75, pets: 4 },
      { username: '@kuba', workouts: 101, pets: 6 },
    ].filter((friend) =>
      friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFriendResults(results);
  };

  return (
    <View style={styles.container}>
      
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        {/* Profile Picture */}
        <Image
          source={require('../assets/pet.png')} // Add a placeholder image in assets
          style={styles.profilePic}
        />

        {/* Name and Status */}
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.status}>{user.status}</Text>
      </View>

      {/* Statistics Section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.workouts}</Text>
          <Text style={styles.statLabel}>Workouts</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.petsCollected}</Text>
          <Text style={styles.statLabel}>Pets Collected</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{user.achievements}</Text>
          <Text style={styles.statLabel}>Achievements</Text>
        </View>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search and add friends..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Search" onPress={handleSearch} />

      {/* Display search results */}
      {friendResults.length > 0 && (
        <View style={styles.resultsContainer}>
          {friendResults.map((friend, index) => (
            <View key={index} style={styles.resultItem}>
              <Image
                source={require('../assets/pet.png')} // Use pet.png as profile pic for friends
                style={styles.friendProfilePic}
              />
              <View style={styles.friendInfo}>
                <Text style={styles.friendUsername}>{friend.username}</Text>
                <Text style={styles.friendStats}>
                  Workouts: {friend.workouts} | Pets: {friend.pets}
                </Text>
              </View>
              <Button title="Add" onPress={() => Alert.alert(`Friend request to ${friend.username} sent!`)} />
            </View>
          ))}
        </View>
      )}

      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsText}>Edit Profile</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEAEC', // Main background color
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 40,
  },
  profileHeader: {
    alignItems: 'center',
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FEDCE0', // Placeholder color
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: '#743FF2', // Purple for the name
    fontWeight: 'bold',
  },
  status: {
    fontSize: 16,
    color: '#5B464B', // Darker text for the status
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    backgroundColor: '#E4F6DB', // Light green background for stats
    borderRadius: 20,
    padding: 20,
    elevation: 5, // For shadow effect
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    color: '#4F6152', // Dark green for numbers
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 16,
    color: '#5B464B', // Muted label color
  },
  searchBar: {
    backgroundColor: '#E4F6DB', // Light green background for search bar
    padding: 10,
    borderRadius: 10,
    borderColor: '#5B464B',
    borderWidth: 1,
    marginBottom: 20,
    color: '#5B464B', // Darker text color
  },
  resultsContainer: {
    marginTop: 20,
    width: '90%', // Widen the results container
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#FEDCE0', // Soft pink for result items
    marginBottom: 10,
    borderRadius: 10,
  },
  friendProfilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  friendInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  friendUsername: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#743FF2', // Deep purple for the username
  },
  friendStats: {
    fontSize: 14,
    color: '#5B464B', // Darker color for stats
  },
  settingsButton: {
    backgroundColor: '#D6B2F5', // Soft purple for the button
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  settingsText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
