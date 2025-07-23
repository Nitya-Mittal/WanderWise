import { View, Text, TouchableOpacity, ToastAndroid, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/firebaseconfig';

const Colors = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
};

export default function signin() {
  const [email, setEmail] = useState(''); // Hooks must be declared inside the component
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIN = () => {
    if (!email || !password) {
      ToastAndroid.show('Please enter email and password', ToastAndroid.LONG);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        router.replace('/mytrip')
        console.log('Signed in:', user);
        ToastAndroid.show('Sign-in successful!', ToastAndroid.LONG);

        // Navigate to the home page or dashboard
        router.replace('/home');
      })
      .catch((error) => {
        // const errorMessage = error.message;
        // console.error('Sign-in failed:', errorMessage);
        // ToastAndroid.show(errorMessage, ToastAndroid.LONG); // Show error to the user
        const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorMessage,error.code)
      if(errorCode=='auth/invalid-credential')
        ToastAndroid.show("Invalid credential",ToastAndroid.LONG)



      
  });
  };

  return (
    <View style={{ backgroundColor: Colors.WHITE }}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={{ height: '100%', padding: 25, marginTop: 60 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', margin: 15, textAlign: 'center' }}>
          LET SIGN YOU IN
        </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 15, textAlign: 'center' }}>
          WELCOME BACK
        </Text>
        <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 15, textAlign: 'center' }}>
          YOU HAVE BEEN MISSED!
        </Text>
        <View>
          <Text>Email</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 15, borderRadius: 15 }}
            onChangeText={(value) => setEmail(value)}
            placeholder="Enter email"
          />
        </View>
        <View>
          <Text>Password</Text>
          <TextInput
            style={{ borderWidth: 1, padding: 15, borderRadius: 15 }}
            secureTextEntry={true}
            onChangeText={(value) => setPassword(value)}
            placeholder="Enter password"
          />
        </View>
        <TouchableOpacity onPress={onSignIN}>
          <Text
            style={{
              borderRadius: 70,
              padding: 15,
              textAlign: 'center',
              backgroundColor: Colors.BLACK,
              color: Colors.WHITE,
              fontSize: 17,
              marginTop: 30,
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('auth/signup')}>
          <Text
            style={{
              borderRadius: 70,
              padding: 15,
              textAlign: 'center',
              backgroundColor: Colors.BLACK,
              color: Colors.WHITE,
              fontSize: 17,
              marginTop: 30,
            }}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
