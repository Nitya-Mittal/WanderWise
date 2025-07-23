import { View, Text, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
const Colors = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
};
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './../../../configs/firebaseconfig' // Adjust the path to your Firebase config file


export default function Index() {
  const navigation = useNavigation(); // Used to remove the header
  const router=useRouter();//use for ,ovong from one page to anothe rpage

  const[email,setEmail]=useState();
  const[password,setPassword]=useState();
  const[fullName,setFullName]=useState();
  useEffect(() => {
    navigation.setOptions({//use to off the header
      headerShown: false,
    });
  }, [navigation]);

  const OnCreateAccount=()=>{
    if(!email&&!password&&!fullName)
    { ToastAndroid.show('Please enter all details',ToastAndroid.BOTTOM);
      return ;
    }
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    router.replace('/mytrip')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);
    // ..
  });

  }

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: Colors.WHITE }}>
      <TouchableOpacity onPress={()=>router.back()}>//use to move back to another page
      <Ionicons name="arrow-back" size={24} color="black" />//add back icon
      </TouchableOpacity>//give quality of being clicked 
      <Text
        style={{
          marginTop: 15,
          fontWeight: 'bold',
          fontSize: 30,
          textAlign: 'center',
        }}
      >
        Create New Account
      </Text>

      <View style={{ marginTop: 30 }}>
        <Text style={{ marginBottom: 5 ,fontWeight:'bold'}}>Enter Full Name</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            borderColor: '#ccc',
          }}
          placeholder="Enter full name"
          onChangeText={(value)=>setFullName(value)}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ marginBottom: 5,fontWeight:'bold' }}>Email</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            borderColor: '#ccc',
          }}
          placeholder="Enter email"
          onChangeText={(value)=>setEmail(value)}
          keyboardType="email-address"
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ marginBottom: 5 ,fontWeight:'bold'}}>Password</Text>
        <TextInput
          style={{
            borderWidth: 1,
            padding: 15,
            borderRadius: 15,
            borderColor: '#ccc',
          }}
          secureTextEntry={true}
          onChangeText={(value)=>setPassword(value)}
          placeholder="Enter password"
        />
      </View>

      <TouchableOpacity onPress={OnCreateAccount}
        style={{
          borderRadius: 70,
          padding: 15,
          alignItems: 'center',
          backgroundColor: Colors.BLACK,
          marginTop: 30,
        }}
      >
        <Text style={{ color: Colors.WHITE, fontSize: 17 }}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>router.replace('auth/signin')}
        style={{
          borderRadius: 70,
          padding: 15,
          alignItems: 'center',
          backgroundColor: Colors.BLACK,
          marginTop: 20,
        }}
      >
        <Text style={{ color: Colors.WHITE, fontSize: 17 }}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
}
