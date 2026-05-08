import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/slices/authSlice";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const passwordRef = useRef(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    password: "",
  });

  const clearFieldError = (field) => {
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleLogin = async () => {
    const errors = { username: "", password: "" };
    if (!username.trim()) errors.username = "Please enter the username";
    if (!password.trim()) errors.password = "Please enter the password";
    setFieldErrors(errors);
    setAuthError("");
    if (errors.username || errors.password) return;

    try {
      await dispatch(
        loginUser({
          username: username.trim(),
          password: password.trim(),
        }),
      ).unwrap();
    } catch (error) {
      setAuthError(
        typeof error === "string" && error.includes("401")
          ? "Credentials are incorrect. Please fill correct username or password."
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* BLUE TOP SECTION */}
          <View style={styles.topContainer}>
            <View style={styles.circleOne} pointerEvents="none" />
            <View style={styles.circleTwo} pointerEvents="none" />
            <View style={styles.circleThree} pointerEvents="none" />
            <View style={styles.topContent}>
              <Text style={styles.heading}>Sign in</Text>
              <Text style={styles.subHeading}>
                Welcome back! Login to continue shopping.
              </Text>
            </View>
            <Svg
              pointerEvents="none"
              viewBox="0 0 1440 320"
              style={styles.wave}
            >
              <Path
                fill="#fff"
                d="M0,224L48,218.7C96,213,192,203,288,224C384,245,480,299,576,298.7C672,299,768,245,864,218.7C960,192,1056,192,1152,208C1248,224,1344,256,1392,272L1440,288L1440,320L0,320Z"
              />
            </Svg>
          </View>

          {/* WHITE FORM SECTION */}
          <View style={styles.formContainer}>
            {authError ? (
              <View style={styles.authErrorBox}>
                <Ionicons name="warning-outline" size={18} color="#D62839" />
                <Text style={styles.authErrorText}>{authError}</Text>
              </View>
            ) : null}

            <Text style={styles.label}>Username</Text>
            <View
              style={[
                styles.inputContainer,
                fieldErrors.username ? styles.inputContainerError : null,
              ]}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color={fieldErrors.username ? "#ff4d4f" : "#6bbef3"}
              />
              <TextInput
                placeholder={fieldErrors.username || "Enter username"}
                placeholderTextColor={
                  fieldErrors.username ? "#ff4d4f" : "#B5B5B5"
                }
                style={styles.input}
                value={username}
                onFocus={() => {
                  clearFieldError("username");
                  setAuthError("");
                }}
                onChangeText={setUsername}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                blurOnSubmit={false}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>

            <Text style={styles.label}>Password</Text>
            <View
              style={[
                styles.inputContainer,
                fieldErrors.password ? styles.inputContainerError : null,
              ]}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={fieldErrors.password ? "#ff4d4f" : "#6bbef3"}
              />
              <TextInput
                ref={passwordRef}
                placeholder={fieldErrors.password || "Enter password"}
                placeholderTextColor={
                  fieldErrors.password ? "#ff4d4f" : "#B5B5B5"
                }
                style={styles.input}
                value={password}
                onFocus={() => {
                  clearFieldError("password");
                  setAuthError("");
                }}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, loading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#6bbef3",
  },
  keyboardView: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    height: 320,
    backgroundColor: "#6bbef3",
    position: "relative",
    overflow: "hidden",
  },
  topContent: {
    paddingHorizontal: 28,
    paddingTop: 140,
    zIndex: 10,
  },
  heading: {
    fontSize: 38,
    fontWeight: "800",
    color: "#1d1a1a",
    marginBottom: 12,
  },
  subHeading: {
    fontSize: 17,
    lineHeight: 24,
    color: "#1d1a1a",
    maxWidth: 280,
  },
  wave: {
    position: "absolute",
    bottom: -15,
    width: "100%",
    height: 110,
  },
  formContainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 60,
    marginTop: -4,
  },
  authErrorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FFE5E7",
    borderWidth: 1,
    borderColor: "#F7B7BD",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginBottom: 18,
  },
  authErrorText: {
    flex: 1,
    color: "#D62839",
    fontSize: 13,
    fontWeight: "600",
  },
  label: {
    fontSize: 17,
    fontWeight: "500",
    color: "#444",
    marginBottom: 10,
    marginTop: 18,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1.2,
    borderBottomColor: "#90d1f9",
    paddingBottom: 10,
  },
  inputContainerError: {
    borderBottomColor: "#ff4d4f",
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#222",
    paddingVertical: 4,
  },
  loginButton: {
    backgroundColor: "#6bbef3",
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 36,
    shadowColor: "#6bbef3",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  disabledButton: { opacity: 0.7 },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  circleOne: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -40,
    left: -80,
  },
  circleTwo: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.07)",
    top: 70,
    right: -40,
  },
  circleThree: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.05)",
    top: 170,
    left: 120,
  },
});
