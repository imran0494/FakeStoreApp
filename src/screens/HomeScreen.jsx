import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSearchQuery } from "../store/slices/productsSlice";
import { logoutUser } from "../store/slices/authSlice";
import ProductCard from "../components/ProductCard";

export default function HomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const { list, loading, error, searchQuery } = useSelector(
    (state) => state.products,
  );

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchProducts());
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const filteredProducts = useMemo(() => {
    const products = Array.isArray(list) ? list : [];
    const query = searchQuery.trim().toLowerCase();

    if (!query) return products;

    return products.filter((p) => {
      if (!p.title) return false;
      const title = p.title.toLowerCase();
      const words = title.split(" ");
      return words.some((word) => word.startsWith(query));
    });
  }, [list, searchQuery]);

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6bbef3" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryBtn}
          onPress={() => dispatch(fetchProducts())}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.container}>
          <View style={styles.topContainer}>
            <View style={styles.circleOne} pointerEvents="none" />
            <View style={styles.circleTwo} pointerEvents="none" />
            <View style={styles.circleThree} pointerEvents="none" />

            <View style={styles.headerRow}>
              <View>
                <Text style={styles.heading}>Products</Text>
                <Text style={styles.subHeading}>
                  Discover something you will love
                </Text>
              </View>

              <TouchableOpacity
                style={styles.logoutIconBtn}
                onPress={handleLogout}
                activeOpacity={0.8}
              >
                <Ionicons name="log-out-outline" size={22} color="#1d1a1a" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.searchWrap}>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color="#6bbef3" />
              <TextInput
                style={styles.searchInput}
                placeholder="Search products..."
                placeholderTextColor="#9BA3AF"
                value={searchQuery}
                onChangeText={(text) => dispatch(setSearchQuery(text))}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {searchQuery ? (
                <TouchableOpacity onPress={() => dispatch(setSearchQuery(""))}>
                  <Ionicons name="close-circle" size={20} color="#C7CED8" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>

          <FlatList
            data={filteredProducts}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.list}
            keyboardShouldPersistTaps="handled"
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#6bbef3"]}
                tintColor="#6bbef3"
              />
            }
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                onPress={() =>
                  navigation.navigate("ProductDetail", { productId: item.id })
                }
              />
            )}
            ListEmptyComponent={
              <View style={styles.centeredEmpty}>
                <Text style={styles.emptyText}>No products found</Text>
              </View>
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#6bbef3",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topContainer: {
    height: 140,
    backgroundColor: "#6bbef3",
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingTop: 18,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 10,
  },
  heading: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1d1a1a",
    marginBottom: 8,
  },
  subHeading: {
    fontSize: 15,
    lineHeight: 21,
    color: "#1d1a1a",
    maxWidth: 240,
  },
  logoutIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.35)",
    alignItems: "center",
    justifyContent: "center",
  },
  circleOne: {
    position: "absolute",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -60,
    left: -80,
  },
  circleTwo: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "rgba(255,255,255,0.07)",
    top: 40,
    right: -50,
  },
  circleThree: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.05)",
    top: 110,
    left: 140,
  },
  searchWrap: {
    marginTop: -24,
    paddingHorizontal: 20,
    marginBottom: 10,
    zIndex: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 14,
    height: 54,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#1f1f1f",
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
  },
  row: {
    justifyContent: "space-between",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  centeredEmpty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  errorText: {
    color: "#D62839",
    fontSize: 14,
    marginBottom: 12,
    fontWeight: "600",
  },
  retryBtn: {
    backgroundColor: "#6bbef3",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  retryText: {
    color: "#fff",
    fontWeight: "700",
  },
  emptyText: {
    color: "#94A3B8",
    fontSize: 14,
    fontWeight: "500",
  },
});
