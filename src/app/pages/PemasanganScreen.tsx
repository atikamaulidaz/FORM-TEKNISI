import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PemasanganScreen() {
    const [search, setSearch] = useState("");

    return (
        <SafeAreaView className="flex-1 bg-[#F6F7F9]">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                <View className="px-5 pt-5">

                    {/* HEADER */}
                    <View className="mb-6">
                        <Text className="text-gray-400 text-sm">
                            Instalasi
                        </Text>

                        <Text className="text-gray-900 text-2xl font-bold mt-1">
                            Pemasangan
                        </Text>

                        <Text className="text-gray-400 text-sm mt-2">
                            Kelola pemasangan dari hasil survey.
                        </Text>
                    </View>

                    {/* SEARCH & ADD */}
                    <View className="flex-row items-center gap-3 mb-6">
                        <View className="flex-1 h-12 bg-white rounded-xl flex-row items-center px-4 border border-gray-100">
                            <Ionicons name="search-outline" size={19} color="#9CA3AF" />
                            <TextInput
                                value={search}
                                onChangeText={setSearch}
                                placeholder="Cari pemasangan..."
                                placeholderTextColor="#9CA3AF"
                                className="flex-1 ml-3 text-sm text-gray-800"
                            />
                        </View>

                        <Pressable className="w-11 h-11 rounded-xl bg-[#003B72] items-center justify-center">
                            <Ionicons name="add" size={23} color="white" />
                        </Pressable>
                    </View>

                    {/* REMINDER */}
                    <View className="bg-orange-50 border border-orange-100 rounded-2xl p-4 mb-6">
                        <View className="flex-row items-start">
                            <View className="w-10 h-10 rounded-xl bg-orange-100 items-center justify-center">
                                <Ionicons name="notifications-outline" size={20} color="#F97316" />
                            </View>
                            <View className="flex-1 ml-3">
                                <Text className="text-sm font-bold text-orange-800">
                                    Pengingat Pemasangan
                                </Text>
                                <Text className="text-xs text-orange-700 mt-1 leading-5">
                                    Terdapat 2 survey yang belum memiliki pemasangan.
                                    Segera lakukan pemasangan sebelum tenggat waktu.
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* SECTION */}
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-base font-bold text-gray-900">
                            Daftar Pemasangan
                        </Text>
                        <Text className="text-xs text-gray-400">3 data</Text>
                    </View>

                    {/* CARD */}
                    <View className="bg-white rounded-2xl p-4 mb-4 border border-gray-100">

                        <View className="flex-row items-center">
                            <View className="w-11 h-11 rounded-xl bg-blue-50 items-center justify-center">
                                <Ionicons name="construct-outline" size={21} color="#003B72" />
                            </View>

                            <View className="flex-1 ml-3">
                                <Text className="text-[15px] font-bold text-gray-900">
                                    Pemasangan #001
                                </Text>
                                <Text className="text-xs text-gray-400 mt-1">
                                    Survey Tempat #001
                                </Text>
                            </View>

                            <View className="bg-orange-50 px-2.5 py-1 rounded-full">
                                <Text className="text-[10px] font-bold text-orange-600">Segera</Text>
                            </View>
                        </View>

                        {/* INFO */}
                        <View className="mt-4 bg-gray-50 rounded-xl p-3">
                            <View className="flex-row items-center">
                                <Ionicons name="location-outline" size={15} color="#9CA3AF" />
                                <Text className="text-xs text-gray-500 ml-2">Jl. Contoh Alamat No. 12</Text>
                            </View>
                            <View className="flex-row items-center mt-2">
                                <Ionicons name="time-outline" size={15} color="#F97316" />
                                <Text className="text-xs font-semibold text-orange-600 ml-2">
                                    Deadline: 12 September 2026
                                </Text>
                            </View>
                        </View>

                        {/* ACTION */}
                        <View className="flex-row items-center gap-2 mt-4">
                            <Pressable className="h-9 w-9 rounded-lg bg-[#e8f0f9] items-center justify-center">
                                <Ionicons name="create-outline" size={17} color="#003B72" />
                            </Pressable>

                            <Pressable className="h-9 w-9 rounded-lg bg-red-50 items-center justify-center">
                                <Ionicons name="trash-outline" size={17} color="#EF4444" />
                            </Pressable>

                            <View className="flex-1" />

                            <Pressable className="h-9 flex-row items-center justify-center rounded-lg bg-[#003B72] px-3">
                                <Ionicons name="arrow-forward-outline" size={15} color="white" />
                                <Text className="ml-1.5 text-xs font-semibold text-white">Lihat Detail</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </ScrollView>
            {/* <Navbar id="3" /> */}
        </SafeAreaView>
    );
}