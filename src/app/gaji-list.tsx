import { useFocusEffect, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function GajiListScreen() {
  const router = useRouter();
  const [gajis, setGajis] = useState([]);
  const [filteredGajis, setFilteredGajis] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("gaji");

  // Fetch gaji data saat screen fokus
  useFocusEffect(
    React.useCallback(() => {
      fetchGajis();
    }, []),
  );

  const fetchGajis = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("gaji_forms")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        Alert.alert("Error", `Gagal fetch data: ${error.message}`);
        return;
      }

      setGajis(data || []);
      setFilteredGajis(data || []);
    } catch (err) {
      Alert.alert("Error", `Terjadi kesalahan: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === "") {
      setFilteredGajis(gajis);
    } else {
      const filtered = gajis.filter(
        (gaji) =>
          gaji.nama?.toLowerCase().includes(text.toLowerCase()) ||
          gaji.alamat?.toLowerCase().includes(text.toLowerCase()) ||
          gaji.nohp?.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredGajis(filtered);
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Hapus Gaji",
      "Apakah Anda yakin ingin menghapus data gaji ini?",
      [
        { text: "Batal", onPress: () => {} },
        {
          text: "Hapus",
          onPress: async () => {
            try {
              const { error } = await supabase
                .from("gaji_forms")
                .delete()
                .eq("id", id);

              if (error) {
                Alert.alert("Error", `Gagal hapus: ${error.message}`);
                return;
              }

              Alert.alert("Berhasil", "Data gaji berhasil dihapus!");
              fetchGajis();
            } catch (err) {
              Alert.alert("Error", `Terjadi kesalahan: ${err}`);
            }
          },
          style: "destructive",
        },
      ],
    );
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
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
      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <View>
            <Text style={styles.pageTitle}>Gaji</Text>
            <Text style={styles.pageSubtitle}>Kelola data gaji teknisi</Text>
          </View>
          <Pressable style={styles.addBtn} onPress={() => router.push("/gaji")}>
            <Text style={styles.addBtnText}>+ Tambah</Text>
          </Pressable>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Cari gaji..."
            value={searchText}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
        </View>

        {/* Gaji List */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Memuat data...</Text>
          </View>
        ) : filteredGajis.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Belum ada data gaji</Text>
            <Text style={styles.emptySubtext}>
              Klik tombol "+ Tambah" untuk menambah data gaji baru
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.listCountText}>
              {filteredGajis.length} data
            </Text>

            {filteredGajis.map((gaji, index) => (
              <View key={gaji.id} style={styles.gajiCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardIconContainer}>
                    <Text style={styles.cardIcon}>💰</Text>
                  </View>
                  <View style={styles.cardTitleContainer}>
                    <Text style={styles.cardTitle}>
                      {gaji.nama ||
                        `Gaji #${String(index + 1).padStart(3, "0")}`}
                    </Text>
                    <Text style={styles.cardStatus}>
                      {formatDate(gaji.created_at)}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailIcon}>📞</Text>
                    <Text style={styles.detailText}>{gaji.nohp || "-"}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailIcon}>📍</Text>
                    <Text style={styles.detailText}>{gaji.alamat || "-"}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailIcon}>💵</Text>
                    <Text style={styles.detailTextAmount}>
                      Rp{" "}
                      {gaji.nominal
                        ? Number(gaji.nominal).toLocaleString("id-ID")
                        : "-"}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardActions}>
                  <Pressable
                    style={styles.detailBtn}
                    onPress={() => router.push(`/gaji?id=${gaji.id}`)}
                  >
                    <Text style={styles.detailBtnText}>Lihat Detail →</Text>
                  </Pressable>

                  <View style={styles.iconActions}>
                    <Pressable
                      style={styles.actionIcon}
                      onPress={() => router.push(`/gaji?id=${gaji.id}`)}
                    >
                      <Text style={styles.actionIconText}>✏️</Text>
                    </Pressable>
                    <Pressable
                      style={[styles.actionIcon, styles.deleteIcon]}
                      onPress={() => handleDelete(gaji.id)}
                    >
                      <Text style={styles.actionIconText}>🗑️</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Pressable
          style={[
            styles.navItem,
            activeTab === "utama" && styles.navItemActive,
          ]}
          onPress={() => {
            setActiveTab("utama");
            router.push("/");
          }}
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
            activeTab === "survey" && styles.navItemActive,
          ]}
          onPress={() => {
            setActiveTab("survey");
            router.push("/survey-list");
          }}
        >
          <Text style={styles.navIcon}>📋</Text>
          <Text
            style={[
              styles.navLabel,
              activeTab === "survey" && styles.navLabelActive,
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
          onPress={() => setActiveTab("gaji")}
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
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 16,
    color: "#999",
  },
  addBtn: {
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  addBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: "#333",
  },
  listCountText: {
    fontSize: 14,
    color: "#999",
    marginBottom: 12,
    marginTop: 10,
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  loadingText: {
    fontSize: 16,
    color: "#999",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: "#999",
    textAlign: "center",
  },
  gajiCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  cardIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#ecfdf5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardIcon: {
    fontSize: 24,
  },
  cardTitleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  cardStatus: {
    fontSize: 13,
    color: "#10b981",
    fontWeight: "600",
  },
  cardDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: "#666",
    flex: 1,
  },
  detailTextAmount: {
    fontSize: 14,
    color: "#10b981",
    fontWeight: "600",
    flex: 1,
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailBtn: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  detailBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  iconActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteIcon: {
    backgroundColor: "#ffe8e8",
  },
  actionIconText: {
    fontSize: 18,
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingBottom: 20,
    paddingTop: 10,
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },
  navItem: {
    alignItems: "center",
    paddingVertical: 8,
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  navItemActive: {
    backgroundColor: "#0052cc",
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 10,
    color: "#666",
    fontWeight: "600",
  },
  navLabelActive: {
    color: "#fff",
  },
});
