import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";

export default function PemasanganForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    tanggal: "",
    merk: "",
    customer: "",
    alamat: "",
    catatanTambahan: "",
    barang: {
      tangkiSWH: { ada: "", keterangan: "" },
      panelSWH: { pilihan: [], keterangan: "" },
      tubeSWH: { ada: "", keterangan: "" },
      aksesoris: { ada: "", keterangan: "" },
      boxElcb: { ada: "", keterangan: "" },
      dudukanBajaRingan: { ada: "", keterangan: "" },
      sekrupBajaRingan: { ada: "", keterangan: "" },
      doubleNepel: { ada: "", keterangan: "" },
      vRing: { ada: "", keterangan: "" },
      stopKran: { ada: "", keterangan: "" },
      kabelListrik: { ada: "", keterangan: "" },
      pipaListrik: { ada: "", keterangan: "" },
      platStainless: { ada: "", keterangan: "" },
      fitting: { ada: "", keterangan: "" },
      lemSilikon: { ada: "", keterangan: "" },
      tali: { ada: "", keterangan: "" },
      pompaAirCadangan: { ada: "", keterangan: "" },
    },
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleBarangAda = (barang, value) => {
    setFormData({
      ...formData,
      barang: {
        ...formData.barang,
        [barang]: { ...formData.barang[barang], ada: value },
      },
    });
  };

  const handleBarangPilihan = (barang, value) => {
    const currentPilihan = formData.barang[barang].pilihan;
    let newPilihan;

    if (currentPilihan.includes(value)) {
      newPilihan = currentPilihan.filter((item) => item !== value);
    } else {
      if (currentPilihan.length < 2) {
        newPilihan = [...currentPilihan, value];
      } else {
        newPilihan = currentPilihan;
      }
    }

    setFormData({
      ...formData,
      barang: {
        ...formData.barang,
        [barang]: { ...formData.barang[barang], pilihan: newPilihan },
      },
    });
  };

  const handleBarangKeterangan = (barang, value) => {
    setFormData({
      ...formData,
      barang: {
        ...formData.barang,
        [barang]: { ...formData.barang[barang], keterangan: value },
      },
    });
  };

  const validateForm = () => {
    const requiredFields = [
      { field: "tanggal", label: "Tanggal Pemasangan" },
      { field: "merk", label: "Merk / Tipe Water Heater" },
      { field: "customer", label: "Nama Customer" },
      { field: "alamat", label: "Alamat / Lokasi Pemasangan" },
    ];

    // Validasi field umum
    const emptyFields = requiredFields.filter((item) => !formData[item.field]);

    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map((item) => item.label).join(", ");
      Alert.alert("Validasi", `Field berikut wajib diisi:\n\n${fieldNames}`);
      return false;
    }

    // Validasi tabel barang
    const emptyBarang = [];
    for (const barang of barangList) {
      if (barang.type === "checkbox" && !formData.barang[barang.id].ada) {
        emptyBarang.push(barang.label);
      } else if (
        barang.type === "pilihan" &&
        formData.barang[barang.id].pilihan.length === 0
      ) {
        emptyBarang.push(barang.label);
      }
    }

    if (emptyBarang.length > 0) {
      const barangNames = emptyBarang.join(", ");
      Alert.alert("Validasi", `Barang berikut wajib diisi:\n\n${barangNames}`);
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    Alert.alert("Berhasil", "Data formulir pemasangan telah disimpan!", [
      {
        text: "OK",
        onPress: () => {
          console.log("Pemasangan Data:", formData);
        },
      },
    ]);
  };

  const barangList = [
    { id: "tangkiSWH", no: "1", label: "Tangki SWH", type: "checkbox" },
    {
      id: "panelSWH",
      no: "2",
      label: "Panel SWH",
      type: "pilihan",
      options: ["A", "B", "C", "E", "P"],
    },
    { id: "tubeSWH", no: "3", label: "Tube SWH", type: "checkbox" },
    { id: "aksesoris", no: "4", label: "Aksesoris", type: "checkbox" },
    { id: "boxElcb", no: "5", label: "Box ELCB + ELCB", type: "checkbox" },
    {
      id: "dudukanBajaRingan",
      no: "6",
      label: "Dudukan Baja Ringan",
      type: "checkbox",
    },
    {
      id: "sekrupBajaRingan",
      no: "7",
      label: "Sekrup Baja Ringan",
      type: "checkbox",
    },
    {
      id: "doubleNepel",
      no: "8",
      label: "Double Nepel (1/2-3/4)",
      type: "checkbox",
    },
    { id: "vRing", no: "9", label: "V-Ring", type: "checkbox" },
    { id: "stopKran", no: "10", label: "Stop Kran Kuningan", type: "checkbox" },
    {
      id: "kabelListrik",
      no: "11",
      label: "Kabel Listrik (Backup)",
      type: "checkbox",
    },
    {
      id: "pipaListrik",
      no: "12",
      label: "Pipa Listrik/Spiral",
      type: "checkbox",
    },
    {
      id: "platStainless",
      no: "13",
      label: "Plat Stainless",
      type: "checkbox",
    },
    { id: "fitting", no: "14", label: "Fitting In & Out", type: "checkbox" },
    { id: "lemSilikon", no: "15", label: "Lem Silikon", type: "checkbox" },
    { id: "tali", no: "16", label: "Tali", type: "checkbox" },
    {
      id: "pompaAirCadangan",
      no: "17",
      label: "Pompa Air Cadangan",
      type: "checkbox",
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔧 FORMULIR PEMASANGAN</Text>
        {/* <Text style={styles.subtitle}>WIKA Water Heater</Text> */}
      </View>

      {/* INFO UMUM */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informasi Pemasangan</Text>

        <Text style={styles.label}>Tanggal Pemasangan *</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          value={formData.tanggal}
          onChangeText={(value) => handleInputChange("tanggal", value)}
        />

        <Text style={styles.label}>Merk / Tipe Water Heater *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: WIKA SR100S1, Ariston, dll"
          value={formData.merk}
          onChangeText={(value) => handleInputChange("merk", value)}
        />

        <Text style={styles.label}>Nama Customer *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama customer"
          value={formData.customer}
          onChangeText={(value) => handleInputChange("customer", value)}
        />

        <Text style={styles.label}>Alamat / Lokasi Pemasangan *</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Alamat lengkap"
          multiline
          value={formData.alamat}
          onChangeText={(value) => handleInputChange("alamat", value)}
        />
      </View>

      {/* DAFTAR BARANG */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daftar Barang & Material *</Text>
        <Text style={styles.instructionText}>
          Geser ke samping untuk melihat kolom lengkap
        </Text>

        <ScrollView
          style={styles.tableContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
        >
          {/* HEADER */}
          <View style={styles.tableWrapper}>
            <View style={styles.tableHeader}>
              <Text style={[styles.headerCell, styles.noCol]}>NO</Text>
              <Text style={[styles.headerCell, styles.nameCol]}>
                NAMA BARANG
              </Text>
              <Text style={[styles.headerCell, styles.actionCol]}>
                YA/TIDAK
              </Text>
              <Text style={[styles.headerCell, styles.ketCol]}>KETERANGAN</Text>
            </View>

            {/* ROWS */}
            {barangList.map((barang, index) => (
              <View
                key={barang.id}
                style={[styles.tableRow, index % 2 === 0 && styles.tableRowAlt]}
              >
                <View style={[styles.tableCell, styles.noCol]}>
                  <Text style={styles.noCellText}>{barang.no}</Text>
                </View>

                <View style={[styles.tableCell, styles.nameCol]}>
                  <Text style={styles.nameCellText}>{barang.label}</Text>
                </View>

                {/* YA/TIDAK COLUMN */}
                <View
                  style={[
                    styles.tableCell,
                    styles.actionCol,
                    styles.actionCellContent,
                  ]}
                >
                  {barang.type === "checkbox" && (
                    <View style={styles.checkboxGroup}>
                      <TouchableOpacity
                        style={[
                          styles.checkbox,
                          formData.barang[barang.id].ada === "Ya" &&
                            styles.checkboxActive,
                        ]}
                        onPress={() =>
                          handleBarangAda(
                            barang.id,
                            formData.barang[barang.id].ada === "Ya" ? "" : "Ya",
                          )
                        }
                      >
                        <Text style={styles.checkboxLabel}>Ya</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.checkbox,
                          formData.barang[barang.id].ada === "Tidak" &&
                            styles.checkboxActive,
                        ]}
                        onPress={() =>
                          handleBarangAda(
                            barang.id,
                            formData.barang[barang.id].ada === "Tidak"
                              ? ""
                              : "Tidak",
                          )
                        }
                      >
                        <Text style={styles.checkboxLabel}>Tidak</Text>
                      </TouchableOpacity>
                    </View>
                  )}

                  {barang.type === "pilihan" && (
                    <View style={styles.pilihanGroup}>
                      {barang.options.map((option) => (
                        <TouchableOpacity
                          key={option}
                          style={[
                            styles.pilihanBtn,
                            formData.barang[barang.id].pilihan.includes(
                              option,
                            ) && styles.pilihanBtnActive,
                          ]}
                          onPress={() => handleBarangPilihan(barang.id, option)}
                        >
                          <Text
                            style={[
                              styles.pilihanLabel,
                              formData.barang[barang.id].pilihan.includes(
                                option,
                              ) && styles.pilihanLabelActive,
                            ]}
                          >
                            {option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* KETERANGAN COLUMN */}
                <View style={[styles.tableCell, styles.ketCol]}>
                  <TextInput
                    style={styles.ketInput}
                    placeholder="Catatan"
                    placeholderTextColor="#ccc"
                    value={formData.barang[barang.id].keterangan}
                    onChangeText={(value) =>
                      handleBarangKeterangan(barang.id, value)
                    }
                  />
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* CATATAN TAMBAHAN */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Catatan Tambahan (Opsional)</Text>

        {/* <Text style={styles.label}>Catatan / Kendala di Lokasi</Text> */}
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Tulis catatan atau kendala tambahan jika ada..."
          multiline
          value={formData.catatanTambahan}
          onChangeText={(value) => handleInputChange("catatanTambahan", value)}
        />
      </View>

      {/* KETERANGAN WAJIB */}
      {/* <View style={styles.noticeBox}>
        <Text style={styles.noticeText}>
          * Semua field wajib diisi, kecuali Keterangan di tabel dan Catatan
          Tambahan.
        </Text>
      </View> */}

      {/* TOMBOL SUBMIT */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.submitBtn,
            { flex: 1, marginRight: 10, backgroundColor: "#666" },
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.submitBtnText}>← Kembali</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.submitBtn, { flex: 1 }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>💾 Simpan</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 80 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 50,
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  header: {
    backgroundColor: "#ff9900",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  subtitle: {
    fontSize: 13,
    color: "#555",
    marginBottom: 10,
    fontStyle: "italic",
  },
  section: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ff9900",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#ff9900",
    marginBottom: 8,
  },
  instructionText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
    fontStyle: "italic",
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
  },
  tableContainer: {
    marginVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  tableWrapper: {
    backgroundColor: "#fff",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#ff9900",
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderBottomWidth: 2,
    borderBottomColor: "#e67e00",
  },
  headerCell: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 11,
    textAlign: "center",
    paddingHorizontal: 8,
  },
  noCol: {
    width: 35,
  },
  nameCol: {
    width: 130,
  },
  actionCol: {
    width: 190,
  },
  ketCol: {
    width: 140,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    minHeight: 50,
  },
  tableRowAlt: {
    backgroundColor: "#f9f9f9",
  },
  tableCell: {
    paddingVertical: 8,
    paddingHorizontal: 6,
    justifyContent: "center",
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
  },
  noCellText: {
    fontSize: 12,
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  nameCellText: {
    fontSize: 11,
    color: "#333",
    textAlign: "left",
  },
  actionCellContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxGroup: {
    flexDirection: "row",
    gap: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  checkbox: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
    minWidth: 50,
    alignItems: "center",
  },
  checkboxActive: {
    backgroundColor: "#ff9900",
    borderColor: "#ff9900",
  },
  checkboxLabel: {
    fontSize: 10,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  pilihanGroup: {
    flexDirection: "row",
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "nowrap",
  },
  pilihanBtn: {
    paddingVertical: 6,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 3,
    backgroundColor: "#f5f5f5",
    minWidth: 28,
    alignItems: "center",
  },
  pilihanBtnActive: {
    backgroundColor: "#ff9900",
    borderColor: "#ff9900",
  },
  pilihanLabel: {
    fontSize: 10,
    color: "#333",
    fontWeight: "600",
    textAlign: "center",
  },
  pilihanLabelActive: {
    color: "#fff",
  },
  ketInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    fontSize: 11,
    height: 32,
    backgroundColor: "#fff",
  },
  noticeBox: {
    backgroundColor: "#e8f4f8",
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#ff9900",
  },
  noticeText: {
    fontSize: 12,
    color: "#ff9900",
    fontWeight: "500",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: "#ff9900",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitBtnText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
});
