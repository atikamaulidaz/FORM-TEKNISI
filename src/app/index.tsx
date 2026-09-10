import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("utama");

  return (
    <View style={styles.container}>
      {/* Header dengan Logo */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logoImage}
        />
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconBtn}>
            <Text style={styles.icon}>🔔</Text>
          </Pressable>
          <Pressable style={styles.iconBtn}>
            <Text style={styles.icon}>👤</Text>
          </Pressable>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollContent}>
        {/* Dashboard Label */}
        <Text style={styles.dashboardLabel}>Dashboard</Text>

        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeTitle}>Selamat datang</Text>
          <Text style={styles.welcomeSubtitle}>
            Pantau dokumen dan pekerjaan kamu di sini.
          </Text>
        </View>

        {/* Perlu Perhatian Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Perlu perhatian</Text>
            <Pressable>
              <Text style={styles.seeAllBtn}>Terdekat</Text>
            </Pressable>
          </View>

          {/* Card Dokumen Pengajuan */}
          <Pressable
            style={styles.card}
            onPress={() => router.push("/survey-list")}
          >
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>📄</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Dokumen Pengajuan</Text>
              <Text style={styles.cardSubtitle}>Membutuhkan tindakan</Text>
            </View>
            <Text style={styles.cardAction}>Segera</Text>
          </Pressable>

          {/* Card Batas Tindakan */}
          <Pressable style={styles.card}>
            <View style={styles.cardIcon}>
              <Text style={styles.cardIconText}>⏰</Text>
            </View>
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Batas tindakan</Text>
              <Text style={styles.cardSubtitle}>Hari ini</Text>
            </View>
          </Pressable>
        </View>

        {/* Aktivitas Terakhir Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Aktivitas terakhir</Text>

          {/* Activity Item 1 */}
          <Pressable style={styles.activityItem}>
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>✓</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>
                Dokumen berhasil diperbarui
              </Text>
              <Text style={styles.activityTime}>Beberapa saat yang lalu</Text>
            </View>
          </Pressable>

          {/* Activity Item 2 */}
          <Pressable
            style={styles.activityItem}
            onPress={() => router.push("/survey")}
          >
            <View style={styles.activityIcon}>
              <Text style={styles.activityIconText}>📋</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>Formulir baru dibuat</Text>
              <Text style={styles.activityTime}>Hari ini</Text>
            </View>
          </Pressable>
        </View>

        {/* Spacing untuk bottom nav */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Pressable
          style={[
            styles.navItem,
            activeTab === "utama" && styles.navItemActive,
          ]}
          onPress={() => setActiveTab("utama")}
        >
          <Text style={styles.navIcon}>🏠</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === "utama" && styles.navLabelActive,
            ]}
          >
            UTAMA
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.navItem,
            activeTab === "forms" && styles.navItemActive,
          ]}
          onPress={() => {
            setActiveTab("forms");
            router.push("/survey-list");
          }}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === "forms" && styles.navLabelActive,
            ]}
          >
            SURVEY
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.navItem,
            activeTab === "pemasangan" && styles.navItemActive,
          ]}
          onPress={() => {
            setActiveTab("pemasangan");
            router.push("/pemasangan-list");
          }}
        >
          <Text style={styles.navIcon}>🔧</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === "pemasangan" && styles.navLabelActive,
            ]}
          >
            PASANG
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.navItem,
            activeTab === "rincian" && styles.navItemActive,
          ]}
          onPress={() => {
            setActiveTab("rincian");
            router.push("/rincian-list");
          }}
        >
          <Text style={styles.navIcon}>📝</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === "rincian" && styles.navLabelActive,
            ]}
          >
            RINCIAN
          </Text>
        </Pressable>
        <Pressable
          style={[styles.navItem, activeTab === "gaji" && styles.navItemActive]}
          onPress={() => {
            setActiveTab("gaji");
            router.push("/gaji-list");
          }}
        >
          <Text style={styles.navIcon}>💰</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === "gaji" && styles.navLabelActive,
            ]}
          >
            GAJI
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  logoImage: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 10,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  dashboardLabel: {
    fontSize: 14,
    color: "#999",
    marginBottom: 10,
  },
  welcomeSection: {
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#999",
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  seeAllBtn: {
    fontSize: 14,
    color: "#ff6600",
    fontWeight: "600",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: "center",
    gap: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#ff6600",
  },
  cardIcon: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#fff5f0",
    justifyContent: "center",
    alignItems: "center",
  },
  cardIconText: {
    fontSize: 24,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#999",
  },
  cardAction: {
    fontSize: 14,
    color: "#ff6600",
    fontWeight: "600",
  },
  activityItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: "flex-start",
    gap: 15,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  activityIconText: {
    fontSize: 20,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 13,
    color: "#999",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 8,
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  navItemActive: {
    backgroundColor: "#0052cc",
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 11,
    color: "#666",
    fontWeight: "600",
  },
  navLabelActive: {
    color: "#fff",
  },
});
