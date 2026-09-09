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

export default function SurveyForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: "",
    nohp: "",
    alamat: "",
    typeunit: "",
    typeunitlainnya: "",
    pemakaianorang: "",
    jumlahkamarmandi: "",
    peletakanunit: "",
    tipeatap: "",
    rangkaatap: "",
    panjangdak: "",
    lebardak: "",
    tandon: "",
    jenistandon: "",
    pompaair: "",
    pipaairpanas: "",
    tipepipapanas: "",
    ukuranpipapanas: "",
    estimasipipapanas: "",
    pipaairdingin: "",
    tipepipadingin: "",
    ukuranpipadingin: "",
    estimasipipadingin: "",
    backuplistrik: "",
    akseshandling: "",
    jumlahteknisi: "",
    dayalistrik: "",
    lingkungan: "",
    rumahtampak: "",
    kamarmandi: "",
    atap: "",
    dak: "",
    pipaairpanasphoto: "",
    pipaairdinginphoto: "",
    kabelbackup: "",
    catatantambahan: "",
  });

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = () => {
    const requiredFields = [
      { field: "nama", label: "Nama" },
      { field: "nohp", label: "No. HP" },
      { field: "alamat", label: "Alamat" },
      { field: "typeunit", label: "Type Unit" },
      { field: "pemakaianorang", label: "Pemakaian Orang" },
      { field: "jumlahkamarmandi", label: "Jumlah Kamar Mandi" },
      { field: "peletakanunit", label: "Peletakan Unit" },
      { field: "tandon", label: "Tandon" },
      { field: "pompaair", label: "Pompa Air" },
      { field: "pipaairpanas", label: "Pipa Air Panas" },
      { field: "pipaairdingin", label: "Pipa Air Dingin" },
      { field: "backuplistrik", label: "Backup Listrik" },
      { field: "akseshandling", label: "Akses Handling" },
      { field: "jumlahteknisi", label: "Jumlah Teknisi" },
      { field: "dayalistrik", label: "Daya Listrik" },
      { field: "lingkungan", label: "Lingkungan Sekitar" },
      { field: "rumahtampak", label: "Rumah Tampak Depan" },
      { field: "kamarmandi", label: "Kamar Mandi" },
      { field: "atap", label: "Atap" },
      { field: "dak", label: "Dak" },
      { field: "pipaairpanasphoto", label: "Pipa Air Panas Photo" },
      { field: "pipaairdinginphoto", label: "Pipa Air Dingin Photo" },
      { field: "kabelbackup", label: "Kabel Backup Photo" },
    ];

    const emptyFields = requiredFields.filter((item) => !formData[item.field]);

    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map((item) => item.label).join(", ");
      Alert.alert(
        "Validasi",
        `Pertanyaan berikut wajib dijawab:\n\n${fieldNames}`,
      );
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Clean numeric fields - hanya kirim jika valid number
      const cleanData = { ...formData };

      // Convert numeric strings to actual numbers
      const numericFields = [
        "pemakaianorang",
        "jumlahkamarmandi",
        "panjangdak",
        "lebardak",
        "estimasipipapanas",
        "estimasipipadingin",
        "backuplistrik",
        "jumlahteknisi",
        "dayalistrik",
      ];

      numericFields.forEach((field) => {
        if (cleanData[field]) {
          const num = parseFloat(cleanData[field].toString().replace(",", "."));
          cleanData[field] = isNaN(num) ? null : num;
        } else {
          cleanData[field] = null;
        }
      });

      const { data, error } = await supabase
        .from("survey_forms")
        .insert([cleanData]);

      if (error) {
        Alert.alert("Error", `Gagal simpan: ${error.message}`);
        return;
      }

      Alert.alert(
        "Berhasil",
        "Data formulir survey telah disimpan ke database!",
        [
          {
            text: "OK",
            onPress: () => {
              router.back();
            },
          },
        ],
      );
    } catch (err) {
      Alert.alert("Error", `Terjadi kesalahan: ${err}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📋 FORMULIR SURVEY</Text>
      </View>

      {/* INFORMASI UMUM (1-15) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Informasi Umum</Text>

        {/* 1. Nama & No. HP */}
        <Text style={styles.label}>1. Nama & No. HP *</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan nama"
          value={formData.nama}
          onChangeText={(value) => handleInputChange("nama", value)}
        />

        <TextInput
          style={[styles.input, { marginTop: 15 }]}
          placeholder="Masukkan nomor HP"
          keyboardType="phone-pad"
          value={formData.nohp}
          onChangeText={(value) => handleInputChange("nohp", value)}
        />

        {/* 2. Alamat */}
        <Text style={styles.label}>2. Alamat *</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          placeholder="Alamat lengkap"
          multiline
          value={formData.alamat}
          onChangeText={(value) => handleInputChange("alamat", value)}
        />

        {/* 3. Type Unit */}
        <Text style={styles.label}>3. Type Unit *</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan type unit (ex: SR100S1, SR150L1, H151E)"
          value={formData.typeunit}
          onChangeText={(value) => handleInputChange("typeunit", value)}
        />

        {/* 4. Pemakaian Orang */}
        <Text style={styles.label}>4. Pemakaian Berapa Orang *</Text>
        <TextInput
          style={styles.input}
          placeholder="Jumlah orang"
          keyboardType="number-pad"
          value={formData.pemakaianorang}
          onChangeText={(value) => handleInputChange("pemakaianorang", value)}
        />

        {/* 5. Jumlah Kamar Mandi */}
        <Text style={styles.label}>5. Jumlah Kamar Mandi *</Text>
        <TextInput
          style={styles.input}
          placeholder="Jumlah kamar mandi"
          keyboardType="number-pad"
          value={formData.jumlahkamarmandi}
          onChangeText={(value) => handleInputChange("jumlahkamarmandi", value)}
        />

        {/* 6. Peletakan Unit */}
        <Text style={styles.label}>6. Peletakan Unit (Atap / Dak) *</Text>

        <View style={styles.checkboxGroup}>
          <Pressable
            style={[
              styles.checkboxBtn,
              formData.peletakanunit === "Atap" && styles.checkboxBtnActive,
            ]}
            onPress={() => handleInputChange("peletakanunit", "Atap")}
          >
            <Text
              style={
                formData.peletakanunit === "Atap"
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {formData.peletakanunit === "Atap" ? "☑" : "☐"} Atap
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.checkboxBtn,
              formData.peletakanunit === "Dak" && styles.checkboxBtnActive,
            ]}
            onPress={() => handleInputChange("peletakanunit", "Dak")}
          >
            <Text
              style={
                formData.peletakanunit === "Dak"
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {formData.peletakanunit === "Dak" ? "☑" : "☐"} Dak
            </Text>
          </Pressable>
        </View>

        {formData.peletakanunit === "Atap" && (
          <>
            <Text style={styles.label}>Tipe Atap</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Genteng, Asbes"
              value={formData.tipeatap}
              onChangeText={(value) => handleInputChange("tipeatap", value)}
            />

            <Text style={styles.label}>Rangka Atap</Text>
            <View style={styles.checkboxGroup}>
              <Pressable
                style={[
                  styles.checkboxBtn,
                  formData.rangkaatap === "Kayu" && styles.checkboxBtnActive,
                ]}
                onPress={() => handleInputChange("rangkaatap", "Kayu")}
              >
                <Text
                  style={
                    formData.rangkaatap === "Kayu"
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {formData.rangkaatap === "Kayu" ? "☑" : "☐"} Kayu
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.checkboxBtn,
                  formData.rangkaatap === "Baja Ringan" &&
                    styles.checkboxBtnActive,
                ]}
                onPress={() => handleInputChange("rangkaatap", "Baja Ringan")}
              >
                <Text
                  style={
                    formData.rangkaatap === "Baja Ringan"
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {formData.rangkaatap === "Baja Ringan" ? "☑" : "☐"} Baja
                  Ringan
                </Text>
              </Pressable>
            </View>
          </>
        )}

        {formData.peletakanunit === "Dak" && (
          <>
            <Text style={styles.label}>Panjang Dak (meter)</Text>
            <TextInput
              style={styles.input}
              placeholder="Panjang"
              keyboardType="decimal-pad"
              value={formData.panjangdak}
              onChangeText={(value) => handleInputChange("panjangdak", value)}
            />

            <Text style={styles.label}>Lebar Dak (meter)</Text>
            <TextInput
              style={styles.input}
              placeholder="Lebar"
              keyboardType="decimal-pad"
              value={formData.lebardak}
              onChangeText={(value) => handleInputChange("lebardak", value)}
            />
          </>
        )}

        {/* 7. Tandon */}
        <Text style={styles.label}>7. Tandon *</Text>

        <View style={styles.checkboxGroup}>
          <Pressable
            style={[
              styles.checkboxBtn,
              formData.tandon === "Ada" && styles.checkboxBtnActive,
            ]}
            onPress={() => handleInputChange("tandon", "Ada")}
          >
            <Text
              style={
                formData.tandon === "Ada"
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {formData.tandon === "Ada" ? "☑" : "☐"} Ada
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.checkboxBtn,
              formData.tandon === "Tidak ada" && styles.checkboxBtnActive,
            ]}
            onPress={() => handleInputChange("tandon", "Tidak ada")}
          >
            <Text
              style={
                formData.tandon === "Tidak ada"
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {formData.tandon === "Tidak ada" ? "☑" : "☐"} Tidak ada
            </Text>
          </Pressable>
        </View>

        {formData.tandon === "Ada" && (
          <>
            <Text style={styles.label}>Jenis Tandon</Text>
            <View style={styles.checkboxGroup}>
              <Pressable
                style={[
                  styles.checkboxBtn,
                  formData.jenistandon === "Plastik" &&
                    styles.checkboxBtnActive,
                ]}
                onPress={() => handleInputChange("jenistandon", "Plastik")}
              >
                <Text
                  style={
                    formData.jenistandon === "Plastik"
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {formData.jenistandon === "Plastik" ? "☑" : "☐"} Plastik
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.checkboxBtn,
                  formData.jenistandon === "Stainless" &&
                    styles.checkboxBtnActive,
                ]}
                onPress={() => handleInputChange("jenistandon", "Stainless")}
              >
                <Text
                  style={
                    formData.jenistandon === "Stainless"
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {formData.jenistandon === "Stainless" ? "☑" : "☐"} Stainless
                </Text>
              </Pressable>
            </View>
          </>
        )}

        {/* 8. Pompa Air */}
        <Text style={styles.label}>8. Pompa Air (Merk / Tipe) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Shimizu, Wilo"
          value={formData.pompaair}
          onChangeText={(value) => handleInputChange("pompaair", value)}
        />

        {/* 9. Pipa Air Panas */}
        <Text style={styles.label}>9. Pipa Air Panas *</Text>
        <View style={styles.checkboxGroup}>
          <Pressable
            style={[
              styles.checkboxBtn,
              formData.pipaairpanas === "Ada" && styles.checkboxBtnActive,
            ]}
            onPress={() => handleInputChange("pipaairpanas", "Ada")}
          >
            <Text
              style={
                formData.pipaairpanas === "Ada"
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {formData.pipaairpanas === "Ada" ? "☑" : "☐"} Ada
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.checkboxBtn,
              formData.pipaairpanas === "Tidak ada" && styles.checkboxBtnActive,
            ]}
            onPress={() => handleInputChange("pipaairpanas", "Tidak ada")}
          >
            <Text
              style={
                formData.pipaairpanas === "Tidak ada"
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {formData.pipaairpanas === "Tidak ada" ? "☑" : "☐"} Tidak ada
            </Text>
          </Pressable>
        </View>

        {formData.pipaairpanas === "Ada" && (
          <>
            <Text style={styles.label}>Tipe Pipa</Text>
            <View style={styles.checkboxGroup}>
              <Pressable
                style={[
                  styles.checkboxBtn,
                  formData.tipepipapanas === "Pex" && styles.checkboxBtnActive,
                ]}
                onPress={() => handleInputChange("tipepipapanas", "Pex")}
              >
                <Text
                  style={
                    formData.tipepipapanas === "Pex"
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {formData.tipepipapanas === "Pex" ? "☑" : "☐"} Pex
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.checkboxBtn,
                  formData.tipepipapanas === "PPR" && styles.checkboxBtnActive,
                ]}
                onPress={() => handleInputChange("tipepipapanas", "PPR")}
              >
                <Text
                  style={
                    formData.tipepipapanas === "PPR"
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {formData.tipepipapanas === "PPR" ? "☑" : "☐"} PPR
                </Text>
              </Pressable>
            </View>

            <Text style={styles.label}>Ukuran</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1/2 inch, 3/4 inch"
              value={formData.ukuranpipapanas}
              onChangeText={(value) =>
                handleInputChange("ukuranpipapanas", value)
              }
            />
          </>
        )}

        {formData.pipaairpanas === "Tidak ada" && (
          <>
            <Text style={styles.label}>
              Estimasi pipa yang dibutuhkan (meter)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Meter"
              keyboardType="decimal-pad"
              value={formData.estimasipipapanas}
              onChangeText={(value) =>
                handleInputChange("estimasipipapanas", value)
              }
            />
          </>
        )}

        {/* 10. Pipa Air Dingin */}
        <Text style={styles.label}>10. Pipa Air Dingin *</Text>
        <View style={styles.checkboxGroup}>
          <Pressable
            style={[
              styles.checkboxBtn,
              formData.pipaairdingin === "Ada" && styles.checkboxBtnActive,
            ]}
            onPress={() => handleInputChange("pipaairdingin", "Ada")}
          >
            <Text
              style={
                formData.pipaairdingin === "Ada"
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {formData.pipaairdingin === "Ada" ? "☑" : "☐"} Ada
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.checkboxBtn,
              formData.pipaairdingin === "Tidak ada" &&
                styles.checkboxBtnActive,
            ]}
            onPress={() => handleInputChange("pipaairdingin", "Tidak ada")}
          >
            <Text
              style={
                formData.pipaairdingin === "Tidak ada"
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {formData.pipaairdingin === "Tidak ada" ? "☑" : "☐"} Tidak ada
            </Text>
          </Pressable>
        </View>

        {formData.pipaairdingin === "Ada" && (
          <>
            <Text style={styles.label}>Tipe Pipa</Text>
            <View style={styles.checkboxGroup}>
              <Pressable
                style={[
                  styles.checkboxBtn,
                  formData.tipepipadingin === "Pex" && styles.checkboxBtnActive,
                ]}
                onPress={() => handleInputChange("tipepipadingin", "Pex")}
              >
                <Text
                  style={
                    formData.tipepipadingin === "Pex"
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {formData.tipepipadingin === "Pex" ? "☑" : "☐"} Pex
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.checkboxBtn,
                  formData.tipepipadingin === "PPR" && styles.checkboxBtnActive,
                ]}
                onPress={() => handleInputChange("tipepipadingin", "PPR")}
              >
                <Text
                  style={
                    formData.tipepipadingin === "PPR"
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {formData.tipepipadingin === "PPR" ? "☑" : "☐"} PPR
                </Text>
              </Pressable>
            </View>

            <Text style={styles.label}>Ukuran</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 1/2 inch, 3/4 inch"
              value={formData.ukuranpipadingin}
              onChangeText={(value) =>
                handleInputChange("ukuranpipadingin", value)
              }
            />
          </>
        )}

        {formData.pipaairdingin === "Tidak ada" && (
          <>
            <Text style={styles.label}>
              Estimasi pipa yang dibutuhkan (meter)
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Meter"
              keyboardType="decimal-pad"
              value={formData.estimasipipadingin}
              onChangeText={(value) =>
                handleInputChange("estimasipipadingin", value)
              }
            />
          </>
        )}

        {/* 11. Backup Listrik */}
        <Text style={styles.label}>11. Backup Listrik (meter) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Meter"
          keyboardType="decimal-pad"
          value={formData.backuplistrik}
          onChangeText={(value) => handleInputChange("backuplistrik", value)}
        />

        {/* 12. Akses Handling */}
        <Text style={styles.label}>12. Akses Handling Unit *</Text>
        <TextInput
          style={styles.input}
          placeholder="Dalam / Luar / Lainnya"
          value={formData.akseshandling}
          onChangeText={(value) => handleInputChange("akseshandling", value)}
        />

        {/* 13. Jumlah Teknisi */}
        <Text style={styles.label}>13. Jumlah Teknisi *</Text>
        <TextInput
          style={styles.input}
          placeholder="Jumlah orang"
          keyboardType="number-pad"
          value={formData.jumlahteknisi}
          onChangeText={(value) => handleInputChange("jumlahteknisi", value)}
        />

        {/* 14. Daya Listrik */}
        <Text style={styles.label}>14. Daya Listrik Rumah (Watt) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1300, 2200, 3500"
          keyboardType="number-pad"
          value={formData.dayalistrik}
          onChangeText={(value) => handleInputChange("dayalistrik", value)}
        />

        {/* 15. Lingkungan Sekitar */}
        <Text style={styles.label}>15. Lingkungan Sekitar *</Text>
        <View style={styles.checkboxGroup}>
          <Pressable
            style={[
              styles.checkboxBtn,
              formData.lingkungan === "Rumah" && styles.checkboxBtnActive,
            ]}
            onPress={() => handleInputChange("lingkungan", "Rumah")}
          >
            <Text
              style={
                formData.lingkungan === "Rumah"
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {formData.lingkungan === "Rumah" ? "☑" : "☐"} Rumah
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.checkboxBtn,
              formData.lingkungan === "Tanah kosong" &&
                styles.checkboxBtnActive,
            ]}
            onPress={() => handleInputChange("lingkungan", "Tanah kosong")}
          >
            <Text
              style={
                formData.lingkungan === "Tanah kosong"
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {formData.lingkungan === "Tanah kosong" ? "☑" : "☐"} Tanah kosong
            </Text>
          </Pressable>
        </View>
      </View>

      {/* FOTO & VIDEO (16-22) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>16-22. Foto & Video *</Text>

        {[
          { id: "rumahtampak", label: "16. Rumah Tampak Depan" },
          { id: "kamarmandi", label: "17. Kamar Mandi" },
          { id: "atap", label: "18. Atap" },
          { id: "dak", label: "19. Dak" },
          { id: "pipaairpanasphoto", label: "20. Pipa Air Panas" },
          { id: "pipaairdinginphoto", label: "21. Pipa Air Dingin" },
          { id: "kabelbackup", label: "22. Kabel Backup" },
        ].map((item) => (
          <View key={item.id} style={{ marginBottom: 12 }}>
            <Text style={styles.label}>{item.label}</Text>
            <View style={styles.checkboxGroup}>
              <Pressable
                style={[
                  styles.checkboxBtn,
                  formData[item.id] === "Sudah" && styles.checkboxBtnActive,
                ]}
                onPress={() => handleInputChange(item.id, "Sudah")}
              >
                <Text
                  style={
                    formData[item.id] === "Sudah"
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {formData[item.id] === "Sudah" ? "☑" : "☐"} Sudah
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.checkboxBtn,
                  formData[item.id] === "Belum" && styles.checkboxBtnActive,
                ]}
                onPress={() => handleInputChange(item.id, "Belum")}
              >
                <Text
                  style={
                    formData[item.id] === "Belum"
                      ? styles.checkboxTextActive
                      : styles.checkboxText
                  }
                >
                  {formData[item.id] === "Belum" ? "☑" : "☐"} Belum
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>

      {/* CATATAN TAMBAHAN (23) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>23. Catatan Tambahan (Opsional)</Text>

        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Tulis catatan atau kendala tambahan jika ada..."
          multiline
          value={formData.catatantambahan}
          onChangeText={(value) => handleInputChange("catatantambahan", value)}
        />
      </View>

      {/* TOMBOL SUBMIT */}
      <View style={styles.buttonGroup}>
        <Pressable
          style={[
            styles.submitBtn,
            { flex: 1, marginRight: 10, backgroundColor: "#666" },
          ]}
          onPress={() => router.back()}
        >
          <Text style={styles.submitBtnText}>← Kembali</Text>
        </Pressable>

        <Pressable
          style={[styles.submitBtn, { flex: 1 }]}
          onPress={handleSubmit}
        >
          <Text style={styles.submitBtnText}>💾 Simpan</Text>
        </Pressable>
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
    backgroundColor: "#003da5",
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
  section: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#003da5",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#003da5",
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
  },
  checkboxGroup: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  checkboxBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
  },
  checkboxBtnActive: {
    backgroundColor: "#003da5",
    borderColor: "#003da5",
  },
  checkboxText: {
    color: "#333",
    fontSize: 13,
  },
  checkboxTextActive: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: "#003da5",
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
