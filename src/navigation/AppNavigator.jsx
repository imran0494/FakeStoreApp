import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthStatus } from "../store/slices/authSlice";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { View, ActivityIndicator } from "react-native";

export default function AppNavigator() {
  const dispatch = useDispatch();
  const { isAuthenticated, isCheckingAuth } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, []);

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}
