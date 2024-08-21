import React, { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MoviesScreen from "./screens/MoviesScreen";
import { COLORS } from "./theme"; // Temayı buraya da import edebiliriz

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      "SFProDisplay-Semibold": require("../assets/fonts/FontsFree-Net-SFProDisplay-Semibold.ttf"),
      "SFProDisplay-Medium": require("../assets/fonts/FontsFree-Net-SFProDisplay-Medium.ttf"),
      "SFProDisplay-Regular": require("../assets/fonts/FontsFree-Net-SFProDisplay-Regular.ttf"),
    });
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: COLORS.primary }}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Movies"
          component={MoviesScreen}
          options={{ title: "Popular Movies" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
