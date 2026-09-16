import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import {
  approveKasbon,
  getAllDataKasbon,
} from "../../../service/KasbonService";

export default function KasbonApprovalScreen() {
  const Route = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [form, setForm] = useState({
    description: "",
    status: "",
  });

  const handleApproval = async (id: string, status: string) => {
    const id_atasan = await AsyncStorage.getItem("user_id");
    if (!form.description.trim()) {
      Alert.alert("Peringatan", "Keterangan wajib diisi");
      return;
    }
    const result = await approveKasbon(
      id,
      status,
      form.description,
      id_atasan || "",
    );
    Alert.alert("Berhasil", result.message);
  };

  const handleFilterStatus = async (status: string[]) => {
    const result = await getAllDataKasbon(status);
    setData(result.data);
  };

  useEffect(() => {
    handleFilterStatus(["diajukan"]);
  }, [data]);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 100,
        }}
      >
        {/* HEADER */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Approval Kasbon
          </Text>

          <Text className="text-gray-500 mt-1">
            Kelola pengajuan kasbon karyawan
          </Text>
        </View>

        {/* RIWAYAT KASBON */}
        <Pressable
          onPress={() => Route.push("admin/RiwayatKasbonScreen" as any)}
          className="bg-white border border-gray-100 rounded-2xl p-4 mb-6 flex-row items-center justify-between"
        >
          <View className="flex-row items-center">
            <View className="w-11 h-11 rounded-xl bg-indigo-50 items-center justify-center">
              <Ionicons name="time-outline" size={21} color="#4F46E5" />
            </View>

            <View className="ml-3">
              <Text className="text-gray-900 font-semibold">
                Riwayat Kasbon
              </Text>

              <Text className="text-gray-400 text-xs mt-1">
                Lihat seluruh riwayat kasbon
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </Pressable>

        {/* SECTION PENGAJUAN */}
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-lg font-bold text-gray-900">
              Pengajuan Kasbon
            </Text>

            <Text className="text-gray-400 text-xs mt-1">
              Pengajuan yang perlu diproses
            </Text>
          </View>
        </View>

        {/* EMPTY STATE */}
        {data.length === 0 ? (
          <View className="bg-white border border-gray-100 rounded-2xl px-6 py-10 items-center">
            <View className="w-16 h-16 rounded-full bg-gray-50 items-center justify-center mb-4">
              <Ionicons
                name="document-text-outline"
                size={28}
                color="#9CA3AF"
              />
            </View>

            <Text className="text-gray-900 font-semibold text-base">
              Belum ada pengajuan
            </Text>

            <Text className="text-gray-400 text-sm text-center mt-2">
              Belum terdapat pengajuan kasbon yang perlu diproses.
            </Text>
          </View>
        ) : (
          data.map((item) => {
            return (
              <View
                key={item.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 mb-4"
              >
                {/* HEADER CARD */}
                <View className="flex-row items-start justify-between">
                  <View className="flex-row items-center flex-1">
                    <View className="w-11 h-11 rounded-xl bg-indigo-50 items-center justify-center">
                      <Ionicons
                        name="person-outline"
                        size={20}
                        color="#4F46E5"
                      />
                    </View>

                    <View className="ml-3 flex-1">
                      <Text className="text-gray-900 font-semibold text-base">
                        {item.users?.nama_user}
                      </Text>

                      <Text className="text-gray-400 text-xs mt-1">
                        {item.users?.role}
                      </Text>
                    </View>
                  </View>

                  {/* STATUS */}
                  <View className="px-3 py-1.5 rounded-full bg-yellow-50">
                    <Text className="text-yellow-600 text-xs font-semibold">
                      {item.status}
                    </Text>
                  </View>
                </View>

                {/* NOMINAL */}
                <View className="mt-4 bg-gray-50 rounded-xl p-3">
                  <Text className="text-gray-400 text-xs">Nominal Kasbon</Text>

                  <Text className="text-gray-900 text-lg font-bold mt-1">
                    Rp {item.nominal.toLocaleString("id-ID")}
                  </Text>
                </View>

                {/* DETAIL */}
                <View className="mt-4">
                  <View className="flex-row mb-3">
                    <Ionicons
                      name="document-text-outline"
                      size={17}
                      color="#9CA3AF"
                    />

                    <View className="ml-3 flex-1">
                      <Text className="text-gray-400 text-xs">Alasan</Text>

                      <Text className="text-gray-700 text-sm mt-1">
                        {item.alasan}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row">
                    <Ionicons
                      name="calendar-outline"
                      size={17}
                      color="#9CA3AF"
                    />

                    <View className="ml-3 flex-1">
                      <Text className="text-gray-400 text-xs">
                        Tanggal Pengajuan
                      </Text>

                      <Text className="text-gray-700 text-sm mt-1">
                        {new Date(item.tanggal_pengajuan).toLocaleDateString(
                          "id-ID",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          },
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* DIVIDER */}
                <View className="border-t border-gray-100 mt-4 pt-4">
                  {/* KETERANGAN APPROVAL */}
                  <Text className="text-gray-500 text-xs font-medium mb-2">
                    Keterangan Approval
                  </Text>

                  <TextInput
                    onChangeText={(text) =>
                      setForm({ ...form, description: text })
                    }
                    placeholder="Tambahkan keterangan..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    className="border border-gray-200 rounded-xl px-4 py-3 text-gray-700 min-h-[80px]"
                    textAlignVertical="top"
                  />

                  {/* BUTTON */}
                  <View className="flex-row mt-3">
                    <Pressable
                      onPress={() => handleApproval(item.id, "ditolak")}
                      className="flex-1 h-11 rounded-xl border border-red-200 bg-red-50 items-center justify-center mr-2"
                    >
                      <View className="flex-row items-center">
                        <Ionicons
                          name="close-outline"
                          size={18}
                          color="#DC2626"
                        />

                        <Text className="text-red-600 font-semibold ml-1">
                          Tolak
                        </Text>
                      </View>
                    </Pressable>

                    <Pressable
                      onPress={() => handleApproval(item.id, "disetujui")}
                      className="flex-1 h-11 rounded-xl bg-indigo-600 items-center justify-center ml-2"
                    >
                      <View className="flex-row items-center">
                        <Ionicons
                          name="checkmark-outline"
                          size={18}
                          color="white"
                        />

                        <Text className="text-white font-semibold ml-1">
                          Setujui
                        </Text>
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
