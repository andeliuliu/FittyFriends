import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Animated } from 'react-native';

export default function HomeScreen() {
  const [dropAnim] = useState(new Animated.Value(0)); // Animation state for cookie drop
  const [bubbleVisible, setBubbleVisible] = useState(true); // Track if the bubble is visible
  const [cookieDropped, setCookieDropped] = useState(false); // Track if the cookie has dropped
  const [showDroppingCookie, setShowDroppingCookie] = useState(false); // Track if the dropping cookie is visible

  // Handle tapping the bubble
  const handleBubbleTap = () => {
    if (!cookieDropped) {
      setShowDroppingCookie(true); // Show the dropping cookie
      setBubbleVisible(false); // Hide the bubble immediately after tap

      // Start the cookie drop animation
      Animated.timing(dropAnim, {
        toValue: 1, // Final drop position
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        // Once the animation is done, hide the dropping cookie
        setCookieDropped(true);
        setShowDroppingCookie(false);
        dropAnim.setValue(0); // Reset animation for future interactions
      });
    }
  };

  // Interpolate the drop position for the cookie
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
      {/* Bubble with Cookie Emoji (only visible before tap) */}
      {bubbleVisible && (
        <TouchableOpacity onPress={handleBubbleTap} style={styles.bubbleContainer}>
          <View style={styles.bubble}>
            <Text style={styles.cookieEmoji}>🍪</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Pet Display Area */}
      <View style={styles.petDisplay}>
        <Image
          source={require('../assets/pet.png')}  // Placeholder for pet image or 3D model
          style={styles.petImage}
        />
        
        {/* Dropping Cookie animation */}
        {showDroppingCookie && (
          <Animated.View style={[styles.cookieDrop, { transform: [{ translateY: dropTranslateY }] }]}>
            <Text style={styles.cookieEmoji}>🍪</Text>
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
  bubbleContainer: {
    position: 'absolute',
    top: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFEAEC',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#F5B041',
    borderWidth: 3,
  },
  cookieEmoji: {
    fontSize: 40,
  },
  petDisplay: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 310,
  },
  petImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  cookieDrop: {
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
