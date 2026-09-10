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

export default function GajiForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    bulan: "",
    tahun: "",
    gaji_pokok: 0,
    tunjangan: 0,
    bonus_pekerjaan: 0,
    bonus_penjualan: 0,
    uang_makan: 0,
    kasbon: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]:
        field === "bulan" || field === "tahun" ? value : parseFloat(value) || 0,
    });
  };

  // Calculate total gaji
  const totalGaji =
    (formData.gaji_pokok || 0) +
    (formData.tunjangan || 0) +
    (formData.bonus_pekerjaan || 0) +
    (formData.bonus_penjualan || 0) +
    (formData.uang_makan || 0);

  // Calculate sisa gaji
  const sisaGaji = totalGaji - (formData.kasbon || 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const validateForm = () => {
    if (!formData.bulan.trim()) {
      Alert.alert("Validasi", "Bulan wajib diisi!");
      return false;
    }
    if (!formData.tahun.trim()) {
      Alert.alert("Validasi", "Tahun wajib diisi!");
      return false;
    }
    if (formData.gaji_pokok === 0) {
      Alert.alert("Validasi", "Gaji Pokok harus lebih dari 0!");
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
        gaji_pokok: formData.gaji_pokok,
        tunjangan: formData.tunjangan,
        bonus_pekerjaan: formData.bonus_pekerjaan,
        bonus_penjualan: formData.bonus_penjualan,
        uang_makan: formData.uang_makan,
        total_gaji: totalGaji,
        kasbon: formData.kasbon,
        sisa_gaji: sisaGaji,
      };

      const { data, error } = await supabase
        .from("gaji_forms")
        .insert([dataToSubmit]);

      if (error) {
        Alert.alert("Error", `Gagal simpan: ${error.message}`);
        return;
      }

      Alert.alert("Berhasil", "Data gaji berhasil disimpan!", [
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
        <Text style={styles.headerTitle}>Form Gaji</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Form Content */}
      <ScrollView style={styles.scrollContent}>
        {/* Periode Gaji */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Periode Gaji</Text>

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

        {/* Komponen Gaji */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Komponen Gaji</Text>

          <Text style={styles.label}>Gaji Pokok *</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="decimal-pad"
            value={formData.gaji_pokok ? formData.gaji_pokok.toString() : ""}
            onChangeText={(value) => handleInputChange("gaji_pokok", value)}
          />

          <Text style={styles.label}>Tunjangan</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="decimal-pad"
            value={formData.tunjangan ? formData.tunjangan.toString() : ""}
            onChangeText={(value) => handleInputChange("tunjangan", value)}
          />

          <Text style={styles.label}>Bonus Pekerjaan</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="decimal-pad"
            value={
              formData.bonus_pekerjaan
                ? formData.bonus_pekerjaan.toString()
                : ""
            }
            onChangeText={(value) =>
              handleInputChange("bonus_pekerjaan", value)
            }
          />

          <Text style={styles.label}>Bonus Penjualan</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="decimal-pad"
            value={
              formData.bonus_penjualan
                ? formData.bonus_penjualan.toString()
                : ""
            }
            onChangeText={(value) =>
              handleInputChange("bonus_penjualan", value)
            }
          />

          <Text style={styles.label}>Uang Makan</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="decimal-pad"
            value={formData.uang_makan ? formData.uang_makan.toString() : ""}
            onChangeText={(value) => handleInputChange("uang_makan", value)}
          />
        </View>

        {/* Total Gaji */}
        <View style={styles.section}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total Gaji</Text>
            <Text style={styles.totalAmount}>{formatCurrency(totalGaji)}</Text>
          </View>
        </View>

        {/* Kasbon & Sisa Gaji */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Potongan & Sisa</Text>

          <Text style={styles.label}>Kasbon</Text>
          <TextInput
            style={styles.input}
            placeholder="0"
            keyboardType="decimal-pad"
            value={formData.kasbon ? formData.kasbon.toString() : ""}
            onChangeText={(value) => handleInputChange("kasbon", value)}
          />

          <View style={styles.sisaGajiBox}>
            <Text style={styles.sisaGajiLabel}>Sisa Gaji (Total - Kasbon)</Text>
            <Text style={styles.sisaGajiAmount}>
              {formatCurrency(sisaGaji)}
            </Text>
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
    borderLeftColor: "#10b981",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#10b981",
    marginBottom: 12,
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
  totalBox: {
    backgroundColor: "#ecfdf5",
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
  },
  totalLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10b981",
  },
  sisaGajiBox: {
    backgroundColor: "#f0fdf4",
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
    marginTop: 12,
  },
  sisaGajiLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 8,
  },
  sisaGajiAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#10b981",
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
    backgroundColor: "#10b981",
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
