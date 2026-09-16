import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAllUsers } from "../../../service/AuthService";
import { getAllDataKasbon } from "../../../service/KasbonService";

export default function RiwayatKasbonScreen() {
  const id = AsyncStorage.getItem("user_id");
  const Route = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [formDropdownStatus, setFormDropdownStatus] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [formDropdownKaryawan, setFormDropdownKaryawan] = useState(false);
  const [filter, setFilter] = useState({
    idUser: "",
    status: "",
    tgl_mulai: null,
    tgl_selesai: null,
  });

  const status = [
    { label: "Semua Status", value: "" },
    { label: "Disetujui", value: "disetujui" },
    { label: "Ditolak", value: "ditolak" },
  ];

  const handleGetUsers = async () => {
    setIsLoadingUsers(true);
    try {
      const result = await getAllUsers();
      setUsers(result.data);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const handleFilter = async (
    id?: string,
    status?: string[],
    tgl_mulai?: Date,
    tgl_selesai?: Date,
  ) => {
    await getAllDataKasbon(status, id, tgl_mulai, tgl_selesai).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    handleFilter();
    handleGetUsers();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      >
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900">
            Riwayat Kasbon
          </Text>

          <Text className="text-gray-500 mt-1">
            Lihat seluruh riwayat pengajuan kasbon karyawan
          </Text>
        </View>

        {/* Summary */}
        <View className="flex-row mb-5">
          <View className="flex-1 items-center flex-row gap-3 bg-white border border-gray-100 rounded-2xl p-4 mr-2">
            <View className="w-14 h-14 rounded-xl bg-indigo-50 items-center justify-center">
              <Ionicons
                name="document-text-outline"
                size={19}
                color="#4F46E5"
              />
            </View>

            <View>
              <Text className="text-gray-400 text-xs">Total Pengajuan</Text>

              <Text className="text-gray-900 text-xl font-bold mt-1">
                Rp{" "}
                {(
                  users.find((item) => item.id === filter.idUser)?.kasbon ??
                  users.reduce(
                    (total, user) => total + Number(user.kasbon ?? 0),
                    0,
                  )
                ).toLocaleString("id-ID")}
              </Text>
            </View>
          </View>
        </View>

        {/* Filter */}
        <View className="bg-white border border-gray-100 rounded-2xl p-4 mb-5">
          <View className="flex-row items-center mb-4">
            <View className="w-9 h-9 rounded-xl bg-indigo-50 items-center justify-center">
              <Ionicons name="filter-outline" size={19} color="#4F46E5" />
            </View>

            <View className="ml-3">
              <Text className="text-gray-900 font-semibold">
                Filter Riwayat
              </Text>

              <Text className="text-gray-400 text-xs mt-0.5">
                Sesuaikan data yang ingin ditampilkan
              </Text>
            </View>
          </View>

          {/* Filter Karyawan */}
          <Text className="text-gray-600 text-xs font-medium mb-2">
            Karyawan
          </Text>

          <Pressable
            onPress={() => {
              setFormDropdownKaryawan(!formDropdownKaryawan);
              setFormDropdownStatus(false);
            }}
            className="h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between mb-4"
          >
            <Text className="text-gray-400">
              {isLoadingUsers
                ? "Memuat karyawan..."
                : (users.find((item) => item.id === filter.idUser)?.nama_user ??
                  "Semua Karyawan")}
            </Text>

            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </Pressable>

          {formDropdownKaryawan && (
            <>
              {/* Semua Karyawan */}
              <Pressable
                onPress={() => {
                  setFilter({
                    ...filter,
                    idUser: "",
                  });

                  handleFilter(
                    undefined,
                    filter.status ? [filter.status] : undefined,
                    filter.tgl_mulai ?? undefined,
                    filter.tgl_selesai ?? undefined,
                  );

                  setFormDropdownKaryawan(false);
                }}
                className="h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between mb-2"
              >
                <Text className="text-gray-600 font-medium">
                  Semua Karyawan
                </Text>

                {filter.idUser === "" && (
                  <Ionicons name="checkmark" size={18} color="#6366F1" />
                )}
              </Pressable>

              {/* Daftar Karyawan */}
              {users.map((item) => (
                <Pressable
                  key={item.id}
                  onPress={() => {
                    setFilter({
                      ...filter,
                      idUser: item.id,
                    });

                    handleFilter(
                      item.id,
                      filter.status ? [filter.status] : undefined,
                      filter.tgl_mulai ?? undefined,
                      filter.tgl_selesai ?? undefined,
                    );

                    setFormDropdownKaryawan(false);
                  }}
                  className="h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between mb-2"
                >
                  <Text className="text-gray-400">{item.nama_user}</Text>

                  {filter.idUser === item.id && (
                    <Ionicons name="checkmark" size={18} color="#6366F1" />
                  )}
                </Pressable>
              ))}
            </>
          )}

          {/* Filter Status */}
          <Text className="text-gray-600 text-xs font-medium mb-2">Status</Text>

          <Pressable
            onPress={() => {
              setFormDropdownStatus(!formDropdownStatus);
              setFormDropdownKaryawan(false);
            }}
            className="h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between mb-4"
          >
            <Text className="text-gray-400">
              {status.find((item) => item.value === filter.status)?.label ??
                "Semua Status"}
            </Text>

            <Ionicons name="chevron-down" size={18} color="#9CA3AF" />
          </Pressable>

          {formDropdownStatus &&
            status.map((item) => (
              <Pressable
                key={item.value}
                onPress={() => {
                  setFilter({ ...filter, status: item.value });
                  handleFilter(
                    filter.idUser || undefined,
                    item.value ? [item.value] : undefined,
                    filter.tgl_mulai ?? undefined,
                    filter.tgl_selesai ?? undefined,
                  );
                  setFormDropdownStatus(false);
                }}
                className="h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between mb-2"
              >
                <Text className="text-gray-400">{item.label}</Text>
              </Pressable>
            ))}

          {/* Filter Tanggal */}
          <Text className="text-gray-600 text-xs font-medium mb-2">
            Rentang Tanggal
          </Text>

          <View className="flex-row">
            <Pressable className="flex-1 h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between mr-2">
              <Text className="text-gray-400">Tanggal mulai</Text>

              <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
            </Pressable>

            <Pressable className="flex-1 h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between ml-2">
              <Text className="text-gray-400">Tanggal akhir</Text>

              <Ionicons name="calendar-outline" size={18} color="#9CA3AF" />
            </Pressable>
          </View>

          {/* Reset */}
          <Pressable
            onPress={() => {
              setFilter({
                idUser: "",
                status: "",
                tgl_mulai: null,
                tgl_selesai: null,
              });
              setFormDropdownKaryawan(false);
              setFormDropdownStatus(false);
              handleFilter();
            }}
            className="mt-4 h-11 rounded-xl bg-gray-100 items-center justify-center"
          >
            <Text className="text-gray-600 font-medium">Reset Filter</Text>
          </Pressable>
        </View>

        {/* List Header */}
        <View className="flex-row items-center justify-between mb-3">
          <View>
            <Text className="text-gray-900 font-semibold text-base">
              Daftar Riwayat
            </Text>

            <Text className="text-gray-400 text-xs mt-1">
              Riwayat pengajuan kasbon
            </Text>
          </View>
        </View>

        {/* Empty State */}
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
                    Keterangan pemohon
                  </Text>

                  <TextInput
                    value={item.alasan}
                    editable={false}
                    placeholder="Tambahkan keterangan..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    className="border border-gray-200 rounded-xl px-4 py-3 text-gray-700 min-h-[80px]"
                    textAlignVertical="top"
                  />
                </View>
                <View className="border-t border-gray-100 mt-4 pt-4">
                  {/* KETERANGAN APPROVAL */}
                  <Text className="text-gray-500 text-xs font-medium mb-2">
                    Keterangan Approval
                  </Text>

                  <TextInput
                    value={item.catatan_atasan}
                    editable={false}
                    placeholder="Tambahkan keterangan..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    className="border border-gray-200 rounded-xl px-4 py-3 text-gray-700 min-h-[80px]"
                    textAlignVertical="top"
                  />
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
