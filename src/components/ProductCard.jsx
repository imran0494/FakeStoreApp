import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 40 - 16) / 2;

export default function ProductCard({ product, onPress }) {
  const rating = product?.rating?.rate ?? 4.2;
  const category = product?.category ?? "Product";

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.88}
    >
      <View style={styles.imageWrap}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.category} numberOfLines={1}>
          {category}
        </Text>

        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>

        <View style={styles.footerRow}>
          <Text style={styles.price}>${product.price.toFixed(2)}</Text>

          <View style={styles.ratingWrap}>
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#fff",
    borderRadius: 22,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  imageWrap: {
    backgroundColor: "#F5FBFF",
    padding: 12,
  },
  image: {
    width: "100%",
    height: 140,
  },
  info: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 14,
  },
  category: {
    fontSize: 11,
    color: "#6bbef3",
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 6,
  },
  title: {
    fontSize: 13,
    lineHeight: 18,
    color: "#1f2937",
    fontWeight: "600",
    minHeight: 36,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: "800",
    color: "#6bbef3",
  },
  ratingWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#FFF7E6",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 999,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#92400E",
  },
});
