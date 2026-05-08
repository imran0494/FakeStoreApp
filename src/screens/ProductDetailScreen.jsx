import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  clearSelectedProduct,
} from "../store/slices/productsSlice";

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const dispatch = useDispatch();

  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );

  const [isLiked, setIsLiked] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    dispatch(fetchProductById(productId));

    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, productId]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6bbef3" />
      </View>
    );
  }

  if (error || !selectedProduct) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || "Product not found"}</Text>
      </View>
    );
  }

  const { image, title, price, description, rating, category } =
    selectedProduct;

  const handleAddToCart = () => {
    setIsAdded((prev) => !prev);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
        nestedScrollEnabled
      >
        <View style={styles.topContainer}>
          <View style={styles.circleOne} pointerEvents="none" />
          <View style={styles.circleTwo} pointerEvents="none" />
          <View style={styles.circleThree} pointerEvents="none" />

          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back-outline" size={22} color="#1d1a1a" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconBtn}
              activeOpacity={0.8}
              onPress={() => setIsLiked((prev) => !prev)}
            >
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={22}
                color={isLiked ? "#ff4d4f" : "#1d1a1a"}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.imageCard}>
            <Image
              source={{ uri: image }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.content}>
          <Text style={styles.category}>{category?.toUpperCase()}</Text>

          <Text style={styles.title}>{title}</Text>

          <View style={styles.row}>
            <Text style={styles.price}>${price?.toFixed(2)}</Text>

            <View style={styles.ratingWrap}>
              <Ionicons name="star" size={13} color="#F59E0B" />
              <Text style={styles.ratingText}>
                {rating?.rate} ({rating?.count})
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <Text style={styles.descHeading}>Description</Text>
          <Text style={styles.description}>{description}</Text>

          <TouchableOpacity
            style={[styles.cartButton, isAdded && styles.cartButtonAdded]}
            activeOpacity={0.85}
            onPress={handleAddToCart}
          >
            <Ionicons name="cart-outline" size={20} color="#fff" />

            <Text style={styles.cartButtonText}>
              {isAdded ? "Added" : "Add to Cart"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#6bbef3",
  },

  scroll: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },

  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  topContainer: {
    height: 380,
    backgroundColor: "#6bbef3",
    position: "relative",
    overflow: "hidden",
    paddingHorizontal: 20,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 10,
  },

  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(255,255,255,0.35)",
    justifyContent: "center",
    alignItems: "center",
  },

  imageCard: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 10,
  },

  image: {
    width: "100%",
    height: 240,
  },

  content: {
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 40,
    marginTop: -10,
  },

  category: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6bbef3",
    letterSpacing: 1,
    marginBottom: 10,
  },

  title: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontSize: 28,
    fontWeight: "800",
    color: "#6bbef3",
  },

  ratingWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#FFF7E6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
  },

  ratingText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#92400E",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF2F7",
    marginVertical: 12,
  },

  descHeading: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 12,
  },

  description: {
    fontSize: 15,
    lineHeight: 26,
    color: "#6B7280",
  },

  cartButton: {
    marginTop: 34,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#6bbef3",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#6bbef3",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },

  cartButtonAdded: {
    backgroundColor: "#22c55e",
  },

  cartButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },

  errorText: {
    color: "#D62839",
    fontSize: 14,
    fontWeight: "600",
  },

  circleOne: {
    position: "absolute",
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(255,255,255,0.06)",
    top: -60,
    left: -90,
  },

  circleTwo: {
    position: "absolute",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(255,255,255,0.07)",
    top: 50,
    right: -40,
  },

  circleThree: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.05)",
    top: 180,
    left: 130,
  },
});
