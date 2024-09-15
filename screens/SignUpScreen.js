import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const navigation = useNavigation();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');

  // Handle sign-up and initiate email verification
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // Prepare email verification with email_code strategy
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      setPendingVerification(true); // Move to verification step
    } catch (err) {
      console.error('SignUp Error:', JSON.stringify(err, null, 2));
      Alert.alert('Sign Up Failed', 'Please check your credentials and try again.');
    }
  };

  // Handle verification with the email code
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      const trimmedCode = code.trim(); // Ensure no leading/trailing spaces
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: trimmedCode,
      });

      if (completeSignUp.status === 'complete') {
        // Set the active session and navigate to Home screen
        await setActive({ session: completeSignUp.createdSessionId });
        navigation.replace('Home');
      } else {
        console.error('Verification Error:', JSON.stringify(completeSignUp, null, 2));
        Alert.alert('Verification Failed', 'The verification code is incorrect or expired.');
      }
    } catch (err) {
      console.error('Verification Error:', JSON.stringify(err, null, 2));
      Alert.alert('Verification Error', 'Something went wrong. Please try again.');
    }
  };

  // Resend the verification code
  const onResendCodePress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      Alert.alert('Verification Code Resent', 'Please check your email.');
    } catch (err) {
      console.error('Resend Code Error:', JSON.stringify(err, null, 2));
      Alert.alert('Error', 'Failed to resend the verification code. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {!pendingVerification ? (
        <>
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
          <Button title="Sign Up" onPress={onSignUpPress} />
        </>
      ) : (
        <>
          <TextInput
            value={code}
            placeholder="Verification Code..."
            onChangeText={setCode}
            style={styles.input}
          />
          <Button title="Verify Email" onPress={onVerifyPress} />
          <Button title="Resend Code" onPress={onResendCodePress} />
        </>
      )}
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
});
