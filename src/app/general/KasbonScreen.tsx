import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Navbar from "../../../component/Navbar";
import {
  addKasbon,
  filterDataKasbon,
  getDataKasbonByIdUser,
} from "../../../service/KasbonService";

export default function KasbonScreen() {
  const router = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const [tanggalMulai, setTanggalMulai] = useState<Date | undefined>(undefined);
  const [tanggalAkhir, setTanggalAkhir] = useState<Date | undefined>(undefined);
  const [showDateTimeMulai, setShowDateTimeMulai] = useState(false);
  const [showDateTimeAkhir, setShowDateTimeAkhir] = useState(false);
  const [status, setStatus] = useState("");
  const [pengajuan, setPengajuan] = useState(0);
  const [disetujui, setDisetujui] = useState(0);
  const [dataKasbon, setDataKasbon] = useState<any>([]);
  const [form, setForm] = useState({
    user_id: "",
    nominal: 0,
    keterangan: "",
  });

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Pilih tanggal";

    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const handleSubmit = async () => {
    const userId = await AsyncStorage.getItem("user_id");

    if (!userId) {
      console.log("User ID tidak ditemukan");
      return;
    }

    const formData = {
      ...form,
      user_id: userId,
    };

    const data = await addKasbon(formData);

    if (data.status === 200) {
      Alert.alert("Success", "Kasbon submitted successfully");
      setOpenForm(false);
    } else {
      Alert.alert("Failed", "Kasbon submission failed");
    }
  };

  const handleFilter = async () => {
    const id_user = (await AsyncStorage.getItem("user_id")) as string;
    const data_filter = await filterDataKasbon(
      id_user ?? undefined,
      tanggalMulai ?? new Date("2000-01-01"),
      tanggalAkhir ?? new Date(),
      status ?? "semua",
    );
    const data_pengajuan = await getDataKasbonByIdUser(id_user, "diajukan");
    const data_disetujui = await getDataKasbonByIdUser(id_user, "disetujui");
    setPengajuan(data_pengajuan.data?.length || 0);
    setDisetujui(data_disetujui.data?.length || 0);
    setDataKasbon(data_filter.data ?? []);
  };

  useEffect(() => {
    handleFilter();
  }, [tanggalMulai, tanggalAkhir, status]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F7F8FA",
      }}
    >
      <Navbar id="5" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <View className="px-5 pt-6">
          {/* ================= HEADER ================= */}
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text className="text-2xl font-bold text-gray-900">Kasbon</Text>

              <Text className="text-sm text-gray-500 mt-1">
                Kelola pengajuan dan riwayat kasbon
              </Text>
            </View>

            <View className="w-11 h-11 rounded-2xl bg-indigo-50 items-center justify-center">
              <Ionicons name="wallet-outline" size={23} color="#4F46E5" />
            </View>
          </View>

          {/* ================= TOTAL KASBON ================= */}
          <View className="bg-indigo-600 rounded-2xl p-5 mb-5">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-indigo-100 text-sm">Total Kasbon</Text>

                <Text className="text-white text-3xl font-bold mt-2">Rp 0</Text>
              </View>

              <View className="w-12 h-12 rounded-2xl bg-white/15 items-center justify-center">
                <Ionicons name="cash-outline" size={25} color="white" />
              </View>
            </View>

            <View className="h-[1px] bg-white/20 my-4" />

            <View className="flex-row items-center">
              <Ionicons
                name="information-circle-outline"
                size={16}
                color="#E0E7FF"
              />

              <Text className="text-indigo-100 text-xs ml-2">
                Total kasbon yang masih berjalan
              </Text>
            </View>
          </View>

          {/* ================= SUMMARY ================= */}
          <View className="flex-row gap-3 mb-5">
            {/* Pengajuan */}
            <View className="flex-1 bg-white rounded-2xl p-4 border border-gray-100">
              <View className="w-9 h-9 rounded-xl bg-orange-50 items-center justify-center mb-3">
                <Ionicons
                  name="document-text-outline"
                  size={19}
                  color="#F97316"
                />
              </View>

              <Text className="text-xs text-gray-400">Pengajuan</Text>

              <Text className="text-xl font-bold text-gray-900 mt-1">
                {pengajuan}
              </Text>
            </View>

            {/* Disetujui */}
            <View className="flex-1 bg-white rounded-2xl p-4 border border-gray-100">
              <View className="w-9 h-9 rounded-xl bg-green-50 items-center justify-center mb-3">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={19}
                  color="#16A34A"
                />
              </View>

              <Text className="text-xs text-gray-400">Disetujui</Text>

              <Text className="text-xl font-bold text-gray-900 mt-1">
                {disetujui}
              </Text>
            </View>
          </View>

          {/* ================= AJUKAN KASBON ================= */}
          <Pressable
            onPress={() => {
              setOpenForm(true);
            }}
            className="bg-gray-900 rounded-2xl h-14 flex-row items-center justify-center mb-6"
          >
            <Ionicons name="add-circle-outline" size={21} color="white" />

            <Text className="text-white font-semibold text-base ml-2">
              Ajukan Kasbon
            </Text>
          </Pressable>

          {/* ================= RIWAYAT ================= */}
          <View className="flex-row items-center justify-between mb-3">
            <View>
              <Text className="text-lg font-bold text-gray-900">
                Riwayat Kasbon
              </Text>

              <Text className="text-xs text-gray-400 mt-1">
                Daftar pengajuan kasbon kamu
              </Text>
            </View>
          </View>

          {/* ================= FILTER ================= */}
          <View className="bg-white rounded-2xl border border-gray-100 p-4 mb-4">
            {/* HEADER */}
            <View className="flex-row items-center mb-3">
              <Ionicons name="filter-outline" size={18} color="#4B5563" />

              <Text className="text-sm font-semibold text-gray-800 ml-2">
                Filter
              </Text>
            </View>

            {/* FILTER TANGGAL */}
            <View className="flex-row gap-3">
              <View className="flex-row gap-3 w-full">
                <Pressable
                  onPress={() => setShowDateTimeMulai(true)}
                  className="flex-1 h-14 border border-gray-300 rounded-xl px-3 flex-row items-center bg-white"
                >
                  <Ionicons name="calendar-outline" size={20} color="#374151" />

                  <View className="ml-2 flex-1">
                    <Text className="text-xs text-gray-500">Mulai</Text>

                    <Text className="text-xs text-gray-900">
                      {formatDate(tanggalMulai)}
                    </Text>
                  </View>
                </Pressable>

                <Pressable
                  onPress={() => setShowDateTimeAkhir(true)}
                  className="flex-1 h-14 border border-gray-300 rounded-xl px-3 flex-row items-center bg-white"
                >
                  <Ionicons name="calendar-outline" size={20} color="#374151" />

                  <View className="ml-2 flex-1">
                    <Text className="text-xs text-gray-500">Sampai</Text>

                    <Text className="text-xs text-gray-900">
                      {formatDate(tanggalAkhir)}
                    </Text>
                  </View>
                </Pressable>
              </View>

              {showDateTimeMulai && (
                <DateTimePicker
                  value={tanggalMulai ?? new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowDateTimeMulai(false);

                    if (date) {
                      setTanggalMulai(date);
                    }
                  }}
                />
              )}

              {showDateTimeAkhir && (
                <DateTimePicker
                  value={tanggalAkhir ?? new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, date) => {
                    setShowDateTimeAkhir(false);

                    if (date) {
                      setTanggalAkhir(date);
                    }
                  }}
                />
              )}
            </View>

            {/* FILTER STATUS */}
            <View className="mt-3">
              <Text className="text-xs text-gray-500 mb-2">Status</Text>

              <Pressable className="h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="funnel-outline" size={17} color="#9CA3AF" />

                  <Text className="text-sm text-gray-700 ml-2">
                    Semua status
                  </Text>
                </View>

                <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
              </Pressable>
            </View>
          </View>

          {/* ================= RIWAYAT LIST ================= */}
          <View className="mb-10 bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {/* ITEM 1 */}
            {dataKasbon.length === 0 ? (
              <View className="items-center justify-center py-10 px-5">
                <View className="w-14 h-14 rounded-2xl bg-gray-50 items-center justify-center">
                  <Ionicons name="receipt-outline" size={25} color="#9CA3AF" />
                </View>

                <Text className="text-sm font-semibold text-gray-700 mt-4">
                  Belum ada riwayat
                </Text>

                <Text className="text-xs text-gray-400 text-center mt-1">
                  Pengajuan kasbon kamu akan muncul di sini.
                </Text>
              </View>
            ) : (
              dataKasbon.map((item: any) => (
                <View key={item.id} className="p-5 border-b border-gray-100">
                  {/* HEADER */}
                  <View className="flex-row items-start justify-between">
                    <View className="flex-row flex-1">
                      <View className="w-10 h-10 rounded-xl bg-indigo-50 items-center justify-center mr-3">
                        <Ionicons
                          name="cash-outline"
                          size={19}
                          color="#4F46E5"
                        />
                      </View>

                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-gray-900">
                          Pengajuan Kasbon
                        </Text>

                        <Text className="text-xs text-gray-400 mt-1">
                          {item.tanggal_pengajuan?.slice(0, 10) || "-"}
                        </Text>
                      </View>
                    </View>

                    {/* STATUS */}
                    <View className="bg-yellow-50 px-3 py-1.5 rounded-full">
                      <Text className="text-xs font-medium text-yellow-600">
                        {item.status}
                      </Text>
                    </View>
                  </View>

                  {/* NOMINAL */}
                  <View className="mt-4">
                    <Text className="text-xs text-gray-400">Nominal</Text>

                    <Text className="text-lg font-bold text-gray-900 mt-1">
                      Rp {item.nominal}
                    </Text>
                  </View>

                  {/* KETERANGAN */}
                  <View className="mt-4 bg-gray-50 rounded-xl p-3">
                    <View className="flex-row items-center mb-1.5">
                      <Ionicons
                        name="document-text-outline"
                        size={15}
                        color="#6B7280"
                      />

                      <Text className="text-xs font-semibold text-gray-500 ml-2">
                        Keterangan
                      </Text>
                    </View>

                    <Text className="text-sm text-gray-700 leading-5">
                      {item.alasan}
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
      {openForm && (
        <View className="absolute inset-0 bg-black/50 items-center justify-center px-5">
          <View className="w-full bg-white rounded-3xl p-6">
            {/* HEADER */}
            <View className="flex-row items-center mb-6">
              <View className="w-11 h-11 rounded-2xl bg-indigo-50 items-center justify-center mr-3">
                <Ionicons name="cash-outline" size={23} color="#4F46E5" />
              </View>

              <View className="flex-1">
                <Text className="text-xl font-bold text-gray-900">
                  Ajukan Kasbon
                </Text>

                <Text className="text-xs text-gray-400 mt-1">
                  Isi data pengajuan kasbon kamu
                </Text>
              </View>

              <Pressable
                onPress={() => setOpenForm(false)}
                className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
              >
                <Ionicons name="close" size={20} color="#6B7280" />
              </Pressable>
            </View>

            {/* NOMINAL */}
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Jumlah Uang
              </Text>

              <View className="h-14 border border-gray-200 bg-gray-50 rounded-2xl flex-row items-center px-4">
                <Text className="text-base font-semibold text-gray-500 mr-2">
                  Rp
                </Text>

                <TextInput
                  onChangeText={(value) =>
                    setForm({ ...form, nominal: Number(value) })
                  }
                  className="flex-1 text-base text-gray-900"
                  placeholder="Masukkan jumlah kasbon"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* KETERANGAN */}
            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Keterangan
              </Text>

              <TextInput
                onChangeText={(value) =>
                  setForm({ ...form, keterangan: value })
                }
                className="border border-gray-200 bg-gray-50 rounded-2xl px-4 py-3 text-base text-gray-900"
                placeholder="Contoh: Keperluan operasional"
                placeholderTextColor="#9CA3AF"
                multiline
                textAlignVertical="top"
                numberOfLines={4}
                style={{
                  minHeight: 100,
                }}
              />
            </View>

            {/* BUTTON */}
            <View className="gap-3">
              <Pressable
                className="h-14 bg-indigo-600 rounded-2xl items-center justify-center flex-row"
                onPress={() => {
                  setOpenForm(false);
                  handleSubmit();
                }}
              >
                <Ionicons name="send-outline" size={19} color="white" />

                <Text className="text-white font-semibold text-base ml-2">
                  Ajukan Kasbon
                </Text>
              </Pressable>

              <Pressable
                className="h-12 bg-gray-100 rounded-2xl items-center justify-center"
                onPress={() => setOpenForm(false)}
              >
                <Text className="text-gray-600 font-semibold text-sm">
                  Batal
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
