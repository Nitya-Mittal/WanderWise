import { Stack } from "expo-router";
import { CreateTripContext } from './../context/CreateTripContext';
import { useState } from "react";

export default function RootLayout() {
  const [tripData, setTripData] = useState([]);

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack screenOptions={{ headerShown: false
        
       }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CreateTripContext.Provider>
  );
}
