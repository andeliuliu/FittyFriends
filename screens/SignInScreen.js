import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const navigation = useNavigation();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        navigation.replace('Home');
      }
    } catch (err) {
      console.error('SignIn Error:', err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={setEmailAddress}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Password..."
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Sign In" onPress={onSignInPress} />
      <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
        Don't have an account? Sign Up
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  link: {
    color: 'blue',
    marginTop: 10,
    textAlign: 'center',
  },
});
