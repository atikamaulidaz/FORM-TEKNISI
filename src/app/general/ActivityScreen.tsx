import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ActivityScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#F6F7F9]">

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 120,
                }}
            >
                <View className="px-5 pt-5">

                    {/* ========================================
                        HEADER
                    ======================================== */}
                    <View className="mb-7">

                        <Text className="text-gray-400 text-sm">
                            Riwayat
                        </Text>

                        <Text className="text-gray-900 text-2xl font-bold mt-1">
                            Aktivitas
                        </Text>

                        <Text className="text-gray-400 text-sm mt-2">
                            Lihat seluruh aktivitas dan pekerjaan Anda.
                        </Text>

                    </View>


                    {/* ========================================
                        FILTER TANGGAL
                    ======================================== */}
                    <View className="mb-7">

                        <View className="flex-row items-center justify-between mb-3">

                            <Text className="text-gray-900 text-lg font-bold">
                                Filter
                            </Text>

                            <Pressable
                                onPress={() => { }}
                            >
                                <Text className="text-gray-500 text-xs font-medium">
                                    Reset
                                </Text>
                            </Pressable>

                        </View>


                        <View className="bg-white rounded-2xl p-4">

                            <View className="flex-row items-center mb-4">

                                <View className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">

                                    <Ionicons
                                        name="calendar-outline"
                                        size={20}
                                        color="#6B7280"
                                    />

                                </View>

                                <View className="ml-3">

                                    <Text className="text-gray-800 text-sm font-semibold">
                                        Rentang tanggal
                                    </Text>

                                    <Text className="text-gray-400 text-xs mt-1">
                                        Pilih periode aktivitas
                                    </Text>

                                </View>

                            </View>


                            {/* ================================
                                TANGGAL
                            ================================= */}

                            <View className="flex-row items-center justify-between">

                                {/* Tanggal mulai */}
                                <View className="w-[44%]">

                                    <Text className="text-gray-400 text-xs mb-2">
                                        Dari
                                    </Text>

                                    <Pressable
                                        onPress={() => { }}
                                        className="h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between"
                                    >

                                        <Text className="text-gray-700 text-sm">
                                            01 Sep 2026
                                        </Text>

                                        <Ionicons
                                            name="calendar-outline"
                                            size={17}
                                            color="#9CA3AF"
                                        />

                                    </Pressable>

                                </View>


                                {/* Separator */}
                                <View className="w-[8%] items-center pt-5">

                                    <View className="w-4 h-px bg-gray-300" />

                                </View>


                                {/* Tanggal akhir */}
                                <View className="w-[44%]">

                                    <Text className="text-gray-400 text-xs mb-2">
                                        Sampai
                                    </Text>

                                    <Pressable
                                        onPress={() => { }}
                                        className="h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between"
                                    >

                                        <Text className="text-gray-700 text-sm">
                                            10 Sep 2026
                                        </Text>

                                        <Ionicons
                                            name="calendar-outline"
                                            size={17}
                                            color="#9CA3AF"
                                        />

                                    </Pressable>

                                </View>

                            </View>


                            {/* ================================
                                BUTTON FILTER
                            ================================= */}

                            <Pressable
                                onPress={() => { }}
                                className="h-12 bg-[#003B72] rounded-xl items-center justify-center mt-4"
                            >

                                <View className="flex-row items-center">

                                    <Ionicons
                                        name="filter-outline"
                                        size={17}
                                        color="white"
                                    />

                                    <Text className="text-white text-sm font-semibold ml-2">
                                        Terapkan Filter
                                    </Text>

                                </View>

                            </Pressable>

                        </View>

                    </View>


                    {/* ========================================
                        HASIL AKTIVITAS
                    ======================================== */}
                    <View>

                        <View className="flex-row items-center justify-between mb-4">

                            <Text className="text-gray-900 text-lg font-bold">
                                Aktivitas
                            </Text>

                            <View className="bg-gray-100 px-3 py-1 rounded-full">

                                <Text className="text-gray-500 text-xs font-medium">
                                    5 aktivitas
                                </Text>

                            </View>

                        </View>


                        {/* ====================================
                            CARD 1
                        ==================================== */}
                        <View className="bg-white rounded-2xl p-5 mb-4">

                            <View className="flex-row items-start">

                                <View className="w-11 h-11 rounded-2xl bg-purple-50 items-center justify-center">

                                    <Ionicons
                                        name="document-text-outline"
                                        size={21}
                                        color="#8B5CF6"
                                    />

                                </View>


                                <View className="ml-4 flex-1">

                                    <View className="flex-row items-center justify-between">

                                        <Text className="text-gray-900 font-bold text-sm">
                                            Formulir dibuat
                                        </Text>

                                        <Text className="text-gray-400 text-xs">
                                            10 Sep
                                        </Text>

                                    </View>

                                    <Text className="text-gray-500 text-sm mt-1">
                                        Formulir survey lokasi berhasil dibuat.
                                    </Text>

                                    <View className="flex-row items-center mt-3">

                                        <View className="w-2 h-2 rounded-full bg-green-500" />

                                        <Text className="text-gray-400 text-xs ml-2">
                                            Berhasil
                                        </Text>

                                    </View>

                                </View>

                            </View>

                        </View>


                        {/* ====================================
                            CARD 2
                        ==================================== */}
                        <View className="bg-white rounded-2xl p-5 mb-4">

                            <View className="flex-row items-start">

                                <View className="w-11 h-11 rounded-2xl bg-orange-50 items-center justify-center">

                                    <Ionicons
                                        name="create-outline"
                                        size={21}
                                        color="#F97316"
                                    />

                                </View>


                                <View className="ml-4 flex-1">

                                    <View className="flex-row items-center justify-between">

                                        <Text className="text-gray-900 font-bold text-sm">
                                            Formulir diperbarui
                                        </Text>

                                        <Text className="text-gray-400 text-xs">
                                            09 Sep
                                        </Text>

                                    </View>

                                    <Text className="text-gray-500 text-sm mt-1">
                                        Data formulir survey telah diperbarui.
                                    </Text>

                                    <View className="flex-row items-center mt-3">

                                        <View className="w-2 h-2 rounded-full bg-blue-500" />

                                        <Text className="text-gray-400 text-xs ml-2">
                                            Diperbarui
                                        </Text>

                                    </View>

                                </View>

                            </View>

                        </View>


                        {/* ====================================
                            CARD 3
                        ==================================== */}
                        <View className="bg-white rounded-2xl p-5 mb-4">

                            <View className="flex-row items-start">

                                <View className="w-11 h-11 rounded-2xl bg-blue-50 items-center justify-center">

                                    <Ionicons
                                        name="briefcase-outline"
                                        size={21}
                                        color="#3B82F6"
                                    />

                                </View>


                                <View className="ml-4 flex-1">

                                    <View className="flex-row items-center justify-between">

                                        <Text className="text-gray-900 font-bold text-sm">
                                            Pekerjaan selesai
                                        </Text>

                                        <Text className="text-gray-400 text-xs">
                                            08 Sep
                                        </Text>

                                    </View>

                                    <Text className="text-gray-500 text-sm mt-1">
                                        Pekerjaan pemasangan telah diselesaikan.
                                    </Text>

                                    <View className="flex-row items-center mt-3">

                                        <View className="w-2 h-2 rounded-full bg-green-500" />

                                        <Text className="text-gray-400 text-xs ml-2">
                                            Selesai
                                        </Text>

                                    </View>

                                </View>

                            </View>

                        </View>


                        {/* ====================================
                            CARD 4
                        ==================================== */}
                        <View className="bg-white rounded-2xl p-5 mb-4">

                            <View className="flex-row items-start">

                                <View className="w-11 h-11 rounded-2xl bg-green-50 items-center justify-center">

                                    <Ionicons
                                        name="wallet-outline"
                                        size={21}
                                        color="#22C55E"
                                    />

                                </View>


                                <View className="ml-4 flex-1">

                                    <View className="flex-row items-center justify-between">

                                        <Text className="text-gray-900 font-bold text-sm">
                                            Data penggajian
                                        </Text>

                                        <Text className="text-gray-400 text-xs">
                                            07 Sep
                                        </Text>

                                    </View>

                                    <Text className="text-gray-500 text-sm mt-1">
                                        Informasi penggajian telah diperbarui.
                                    </Text>

                                    <View className="flex-row items-center mt-3">

                                        <View className="w-2 h-2 rounded-full bg-green-500" />

                                        <Text className="text-gray-400 text-xs ml-2">
                                            Berhasil
                                        </Text>

                                    </View>

                                </View>

                            </View>

                        </View>


                        {/* ====================================
                            CARD 5
                        ==================================== */}
                        <View className="bg-white rounded-2xl p-5 mb-4">

                            <View className="flex-row items-start">

                                <View className="w-11 h-11 rounded-2xl bg-gray-100 items-center justify-center">

                                    <Ionicons
                                        name="leaf-outline"
                                        size={21}
                                        color="#6B7280"
                                    />

                                </View>


                                <View className="ml-4 flex-1">

                                    <View className="flex-row items-center justify-between">

                                        <Text className="text-gray-900 font-bold text-sm">
                                            Perhitungan carbon
                                        </Text>

                                        <Text className="text-gray-400 text-xs">
                                            06 Sep
                                        </Text>

                                    </View>

                                    <Text className="text-gray-500 text-sm mt-1">
                                        Data carbon berhasil dicatat.
                                    </Text>

                                    <View className="flex-row items-center mt-3">

                                        <View className="w-2 h-2 rounded-full bg-green-500" />

                                        <Text className="text-gray-400 text-xs ml-2">
                                            Berhasil
                                        </Text>

                                    </View>

                                </View>

                            </View>

                        </View>

                    </View>

                </View>

            </ScrollView>


            {/* ========================================
                NAVBAR
            ======================================== */}
            {/* <Navbar id="2" /> */}

        </SafeAreaView>
    );
}
