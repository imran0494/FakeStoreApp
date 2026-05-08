import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";

const Stack = createStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#6bbef3" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "bold" },

        cardStyle: { backgroundColor: "#fff" },
        cardOverlayEnabled: false,
        cardShadowEnabled: false,

        transitionSpec: {
          open: {
            animation: "timing",
            config: { duration: 300 },
          },
          close: {
            animation: "timing",
            config: { duration: 250 },
          },
        },
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            opacity: current.progress,
          },
        }),
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
