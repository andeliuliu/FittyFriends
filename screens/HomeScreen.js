import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Animated } from 'react-native';

export default function HomeScreen() {
  const [dropAnim] = useState(new Animated.Value(0)); // Animation state for cookie drop
  const [activeTreat, setActiveTreat] = useState(null); // Track which treat is dropping
  const [bubbleVisible, setBubbleVisible] = useState(true); // Track if the bubble is visible

  // Treats mapped to each pet
  const treats = [
    { id: 'pet1', emoji: '🍪', pet: 'pet1.png' }, // Cookie
    { id: 'pet2', emoji: '🦴', pet: 'pet2.png' }, // Bone
    { id: 'pet3', emoji: '🍰', pet: 'pet3.png' }, // Cake
    { id: 'pet4', emoji: '🥗', pet: 'pet4.png' }, // Salad
    { id: 'pet5', emoji: '🥐', pet: 'pet5.png' }, // Croissant
  ];

  // Handle tapping the treat emoji
  const handleTreatTap = (treat) => {
    if (!activeTreat) {
      setActiveTreat(treat.id); // Set the active treat for the animation

      // Start the treat drop animation
      Animated.timing(dropAnim, {
        toValue: 1, // Final drop position
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setActiveTreat(null); // Reset after animation
        dropAnim.setValue(0); // Reset animation for future interactions
      });
    }
  };

  // Interpolate the drop position for the treat
  const dropTranslateY = dropAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200], // Adjust to control the drop distance
  });

  return (
    <ImageBackground
      source={require('../assets/background.png')} // Background image path
      style={styles.background}
      imageStyle={{ resizeMode: 'cover', blurRadius: 1 }}
    >
      {/* Treats positioned above each pet */}
      <View style={styles.treatContainer}>
        {treats.map((treat, index) => (
          <TouchableOpacity key={treat.id} onPress={() => handleTreatTap(treat)} style={styles.treatBubble}>
            <Text style={styles.treatEmoji}>{treat.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pet Display Area */}
      <View style={styles.petDisplay}>
        {/* Back Row (3 pets) */}
        <View style={styles.backRow}>
          <Image source={require('../assets/pet3.png')} style={styles.petImageSmall} />
          <Image source={require('../assets/pet4.png')} style={styles.petImageSmall} />
          <Image source={require('../assets/pet5.png')} style={styles.petImageSmall} />
        </View>

        {/* Front Row (2 pets) */}
        <View style={styles.frontRow}>
          <Image source={require('../assets/pet.png')} style={styles.petImageLarge} />
          <Image source={require('../assets/pet2.png')} style={styles.petImageLarge} />
        </View>

        {/* Dropping Treat animation */}
        {activeTreat && (
          <Animated.View style={[styles.treatDrop, { transform: [{ translateY: dropTranslateY }] }]}>
            <Text style={styles.treatEmoji}>{treats.find(treat => treat.id === activeTreat).emoji}</Text>
          </Animated.View>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treatContainer: {
    position: 'absolute',
    top: 150, // Position the treats 50px above pets
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%', // Spacing for the treats
  },
  treatBubble: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treatEmoji: {
    fontSize: 40,
  },
  petDisplay: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 310,
  },
  frontRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -180,
  },
  backRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
  },
  petImageSmall: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  petImageLarge: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  treatDrop: {
    position: 'absolute',
    top: 150, // Same position as the treat container
    justifyContent: 'center',
    alignItems: 'center',
  },
});
