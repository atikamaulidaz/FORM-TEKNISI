import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function RincianForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bulan: "",
    tahun: "",
  });

  const [rincianPekerjaan, setRincianPekerjaan] = useState([]);
  const [tabelAbsen, setTabelAbsen] = useState({
    jumlah_hari: 0,
    uang_makan: 0,
  });
  const [loading, setLoading] = useState(false);

  // State untuk modal tambah rincian pekerjaan
  const [showAddRincian, setShowAddRincian] = useState(false);
  const [newRincian, setNewRincian] = useState({
    nama_pekerjaan: "",
    harga: 0,
  });

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleAbsenChange = (field, value) => {
    setTabelAbsen({
      ...tabelAbsen,
      [field]: parseFloat(value) || 0,
    });
  };

  // RINCIAN PEKERJAAN FUNCTIONS
  const addRincianPekerjaan = () => {
    if (!newRincian.nama_pekerjaan.trim()) {
      Alert.alert("Validasi", "Nama pekerjaan wajib diisi!");
      return;
    }
    if (newRincian.harga === 0) {
      Alert.alert("Validasi", "Harga harus lebih dari 0!");
      return;
    }

    setRincianPekerjaan([
      ...rincianPekerjaan,
      {
        id: Date.now().toString(),
        nama_pekerjaan: newRincian.nama_pekerjaan,
        harga: newRincian.harga,
      },
    ]);

    setNewRincian({ nama_pekerjaan: "", harga: 0 });
    setShowAddRincian(false);
  };

  const deleteRincianPekerjaan = (id) => {
    setRincianPekerjaan(rincianPekerjaan.filter((item) => item.id !== id));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate total absen
  const totalAbsen = tabelAbsen.jumlah_hari * tabelAbsen.uang_makan;

  const validateForm = () => {
    if (!formData.bulan.trim()) {
      Alert.alert("Validasi", "Bulan wajib diisi!");
      return false;
    }
    if (!formData.tahun.trim()) {
      Alert.alert("Validasi", "Tahun wajib diisi!");
      return false;
    }
    if (rincianPekerjaan.length === 0) {
      Alert.alert("Validasi", "Minimal ada 1 rincian pekerjaan!");
      return false;
    }
    if (tabelAbsen.jumlah_hari === 0 || tabelAbsen.uang_makan === 0) {
      Alert.alert("Validasi", "Jumlah hari dan uang makan harus diisi!");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const dataToSubmit = {
        bulan: formData.bulan,
        tahun: formData.tahun,
        rincian_pekerjaan: JSON.stringify(rincianPekerjaan),
        jumlah_hari: tabelAbsen.jumlah_hari,
        uang_makan: tabelAbsen.uang_makan,
        total_absen: totalAbsen,
      };

      const { error } = await supabase
        .from("rincian_forms")
        .insert([dataToSubmit]);

      if (error) {
        Alert.alert("Error", `Gagal simpan: ${error.message}`);
        return;
      }

      Alert.alert("Berhasil", "Data rincian berhasil disimpan!", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    } catch (err) {
      Alert.alert("Error", `Terjadi kesalahan: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backBtn}>← Kembali</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Form Rincian</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Form Content */}
      <ScrollView style={styles.scrollContent}>
        {/* Periode */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Periode</Text>

          <View style={styles.rowInputs}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Bulan *</Text>
              <TextInput
                style={styles.input}
                placeholder="Januari, Februari, dst"
                value={formData.bulan}
                onChangeText={(value) => handleInputChange("bulan", value)}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.label}>Tahun *</Text>
              <TextInput
                style={styles.input}
                placeholder="2026"
                keyboardType="number-pad"
                value={formData.tahun}
                onChangeText={(value) => handleInputChange("tahun", value)}
              />
            </View>
          </View>
        </View>

        {/* Rincian Pekerjaan */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rincian Pekerjaan *</Text>
            <Pressable
              style={styles.addSmallBtn}
              onPress={() => setShowAddRincian(true)}
            >
              <Text style={styles.addSmallBtnText}>+ Tambah</Text>
            </Pressable>
          </View>

          {rincianPekerjaan.length === 0 ? (
            <Text style={styles.emptyText}>Belum ada rincian pekerjaan</Text>
          ) : (
            rincianPekerjaan.map((item) => (
              <View key={item.id} style={styles.listItem}>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>
                    {item.nama_pekerjaan}
                  </Text>
                  <Text style={styles.listItemSubtitle}>
                    {formatCurrency(item.harga)}
                  </Text>
                </View>
                <Pressable
                  style={styles.deleteSmallBtn}
                  onPress={() => deleteRincianPekerjaan(item.id)}
                >
                  <Text style={styles.deleteSmallBtnText}>✕</Text>
                </Pressable>
              </View>
            ))
          )}
        </View>

        {/* Modal Add Rincian */}
        {showAddRincian && (
          <View style={styles.modalSection}>
            <Text style={styles.modalTitle}>Tambah Rincian Pekerjaan</Text>

            <Text style={styles.label}>Nama Pekerjaan</Text>
            <TextInput
              style={styles.input}
              placeholder="Cth: Instalasi, Servis, dll"
              value={newRincian.nama_pekerjaan}
              onChangeText={(value) =>
                setNewRincian({ ...newRincian, nama_pekerjaan: value })
              }
            />

            <Text style={styles.label}>Harga</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              keyboardType="decimal-pad"
              value={newRincian.harga ? newRincian.harga.toString() : ""}
              onChangeText={(value) =>
                setNewRincian({
                  ...newRincian,
                  harga: parseFloat(value) || 0,
                })
              }
            />

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.btn, styles.btnSecondary]}
                onPress={() => setShowAddRincian(false)}
              >
                <Text style={styles.btnSecondaryText}>Batal</Text>
              </Pressable>
              <Pressable
                style={[styles.btn, styles.btnPrimary]}
                onPress={addRincianPekerjaan}
              >
                <Text style={styles.btnPrimaryText}>Simpan</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Tabel Absen - SIMPLIFIED */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Absen</Text>

          <Text style={styles.label}>Jumlah Hari *</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="number-pad"
            value={
              tabelAbsen.jumlah_hari ? tabelAbsen.jumlah_hari.toString() : ""
            }
            onChangeText={(value) => handleAbsenChange("jumlah_hari", value)}
          />

          <Text style={styles.label}>Uang Makan per Hari *</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="decimal-pad"
            value={
              tabelAbsen.uang_makan ? tabelAbsen.uang_makan.toString() : ""
            }
            onChangeText={(value) => handleAbsenChange("uang_makan", value)}
          />

          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total (Hari × Makan)</Text>
            <Text style={styles.totalAmount}>{formatCurrency(totalAbsen)}</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <Pressable
            style={[styles.btn, styles.btnSecondary]}
            onPress={() => router.back()}
          >
            <Text style={styles.btnSecondaryText}>Batal</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.btnPrimary]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.btnPrimaryText}>
              {loading ? "Menyimpan..." : "💾 Simpan"}
            </Text>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
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
  backBtn: {
    fontSize: 14,
    color: "#0052cc",
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#8b5cf6",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#8b5cf6",
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    fontSize: 13,
    backgroundColor: "#fff",
    color: "#333",
  },
  rowInputs: {
    flexDirection: "row",
    gap: 10,
  },
  addSmallBtn: {
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  addSmallBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  emptyText: {
    fontSize: 13,
    color: "#999",
    fontStyle: "italic",
  },
  listItem: {
    flexDirection: "row",
    backgroundColor: "#f9f3ff",
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
    justifyContent: "space-between",
    alignItems: "center",
  },
  listItemContent: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
  },
  listItemSubtitle: {
    fontSize: 12,
    color: "#8b5cf6",
    marginTop: 4,
  },
  deleteSmallBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ffe8e8",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteSmallBtnText: {
    color: "#ff4444",
    fontWeight: "bold",
    fontSize: 16,
  },
  modalSection: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#fbbf24",
  },
  modalTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  totalBox: {
    backgroundColor: "#f3e8ff",
    padding: 12,
    borderRadius: 6,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#8b5cf6",
  },
  totalLabel: {
    fontSize: 12,
    color: "#666",
    marginBottom: 6,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8b5cf6",
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  btnPrimary: {
    backgroundColor: "#8b5cf6",
  },
  btnPrimaryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  btnSecondary: {
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  btnSecondaryText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
});
