import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import CollectionScreen from './screens/CollectionScreen';
import PetCustomizationScreen from './screens/PetCustomizationScreen';
import ShopScreen from './screens/ShopScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChallengesScreen from './screens/ChallengesScreen';
import GeneratePetScreen from './screens/GeneratePetScreen'; // Import GeneratePetScreen
import Icon from 'react-native-vector-icons/Ionicons'; // Use Ionicons for icons

const Tab = createBottomTabNavigator();
const CollectionStack = createNativeStackNavigator(); // Stack navigator for Collection

// Create a stack navigator for Collection and Pet Customization
function CollectionStackScreen() {
  return (
    <CollectionStack.Navigator>
      <CollectionStack.Screen name="Collection" component={CollectionScreen} />
      <CollectionStack.Screen name="PetCustomization" component={PetCustomizationScreen} />
      <CollectionStack.Screen name="GeneratePetScreen" component={GeneratePetScreen} /> {/* Add GeneratePetScreen to the stack */}
    </CollectionStack.Navigator>
  );
}

// Main App
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false, // Hide the top bar
          tabBarIcon: ({ color, size }) => {
            let iconName;

            // Assign icons based on the route name
            if (route.name === 'Home') {
              iconName = 'home-outline'; // Home icon
            } else if (route.name === 'Collection') {
              iconName = 'cube-outline'; // Collection icon
            } else if (route.name === 'Shop') {
              iconName = 'cart-outline'; // Shop icon
            } else if (route.name === 'Profile') {
              iconName = 'person-outline'; // Profile icon
            } else if (route.name === 'Challenges') {
              iconName = 'trophy-outline'; // Challenges icon
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#743FF2', // Active tab color
          tabBarInactiveTintColor: '#5B464B', // Inactive tab color
          tabBarStyle: {
            backgroundColor: '#E4F6DB', // Custom background for the bottom tab
            borderTopWidth: 0, // Remove border if necessary
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="Shop" component={ShopScreen} options={{ tabBarLabel: 'Shop' }} />
        <Tab.Screen name="Challenges" component={ChallengesScreen} options={{ tabBarLabel: 'Challenges' }} />
        {/* Use CollectionStack for Collection and PetCustomization */}
        <Tab.Screen name="Collection" component={CollectionStackScreen} options={{ tabBarLabel: 'Collection' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
