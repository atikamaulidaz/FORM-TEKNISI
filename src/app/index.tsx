import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const handleNavigateToSurvey = () => {
    router.push("survey");
  };

  const handleNavigateToPemasangan = () => {
    router.push("pemasangan");
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📋 FORMULIR TEKNISI</Text>
        {/* <Text style={styles.subtitle}>ANEKA WATER HEATER</Text> */}
      </View>

      {/* Deskripsi */}
      {/* <View style={styles.descriptionBox}>
        <Text style={styles.descriptionText}>
          Pilih formulir yang ingin Anda isi untuk mencatat data pemasangan atau
          survey unit water heater.
        </Text>
      </View> */}

      {/* Formulir Survey Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={handleNavigateToSurvey}
        activeOpacity={0.7}
      >
        <Text style={styles.cardIcon}>📝</Text>
        <Text style={styles.cardTitle}>Formulir Survey</Text>
        <Text style={styles.cardDescription}>
          Isi data survey unit water heater sebelum pemasangan
        </Text>
        <Text style={styles.cardArrow}>Buka →</Text>
      </TouchableOpacity>

      {/* Formulir Pemasangan Card */}
      <TouchableOpacity
        style={[styles.card, styles.cardSecondary]}
        onPress={handleNavigateToPemasangan}
        activeOpacity={0.7}
      >
        <Text style={styles.cardIcon}>🔧</Text>
        <Text style={styles.cardTitle}>Formulir Pemasangan</Text>
        <Text style={styles.cardDescription}>
          Catat komponen dan barang yang digunakan saat pemasangan
        </Text>
        <Text style={styles.cardArrow}>Buka →</Text>
      </TouchableOpacity>

      {/* Info Box */}
      {/* <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 Petunjuk:</Text>
        <Text style={styles.infoText}>
          • Formulir Survey: Isi sebelum melakukan pemasangan{"\n"}• Formulir
          Pemasangan: Isi saat/setelah pemasangan
        </Text>
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 60,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  header: {
    backgroundColor: "#003da5",
    padding: 30,
    borderRadius: 12,
    marginBottom: 25,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 8,
  },
  descriptionBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: "#ff9900",
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 5,
    borderLeftColor: "#003da5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardSecondary: {
    borderLeftColor: "#ff9900",
  },
  cardIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 12,
  },
  cardArrow: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#003da5",
  },
  infoBox: {
    backgroundColor: "#e8f4f8",
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 30,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#003da5",
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: "#555",
    lineHeight: 20,
  },
});
