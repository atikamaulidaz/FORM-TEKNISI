import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    Image,
    Pressable,
    ScrollView,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
    const router = useRouter();

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
                    <View className="flex-row items-center justify-between">

                        <Image
                            source={require("../../../assets/images/logo.png")}
                            className="w-28 h-14"
                            resizeMode="contain"
                        />

                        <View className="flex-row items-center gap-2">

                            {/* Notification */}
                            <Pressable
                                className="w-11 h-11 rounded-full bg-white items-center justify-center"
                                onPress={() => { }}
                            >
                                <Ionicons
                                    name="notifications-outline"
                                    size={21}
                                    color="#374151"
                                />
                            </Pressable>

                            {/* Profile */}
                            <Pressable
                                className="w-11 h-11 rounded-full bg-white items-center justify-center"
                                onPress={() =>
                                    router.push("/profile" as any)
                                }
                            >
                                <Ionicons
                                    name="person-outline"
                                    size={21}
                                    color="#374151"
                                />
                            </Pressable>

                        </View>
                    </View>


                    {/* ========================================
                        GREETING
                    ======================================== */}
                    <View className="mt-8">

                        <Text className="text-gray-400 text-sm">
                            Dashboard
                        </Text>

                        <View className="flex-row items-center mt-1">

                            <Text className="text-gray-900 text-2xl font-bold">
                                Selamat datang
                            </Text>

                            <Text className="text-2xl ml-2">
                                👋
                            </Text>

                        </View>

                        <Text className="text-gray-400 text-sm mt-2">
                            Kelola pekerjaan dan informasi Anda dengan mudah.
                        </Text>

                    </View>

                    {/* ========================================
                        RINGKASAN
                    ======================================== */}
                    <View className="mt-8">

                        <View className="flex-row items-center justify-between mb-4">

                            <Text className="text-gray-900 text-lg font-bold">
                                Ringkasan
                            </Text>

                            <Text className="text-gray-400 text-xs">
                                Bulan ini
                            </Text>

                        </View>


                        <View className="flex-row justify-between">

                            {/* Pekerjaan */}
                            <View className="bg-white rounded-2xl p-4 w-[31.5%]">

                                <View className="w-9 h-9 rounded-xl bg-orange-50 items-center justify-center">

                                    <Ionicons
                                        name="briefcase-outline"
                                        size={18}
                                        color="#F97316"
                                    />

                                </View>

                                <Text className="text-gray-900 text-xl font-bold mt-3">
                                    12
                                </Text>

                                <Text className="text-gray-400 text-xs mt-1">
                                    Pekerjaan
                                </Text>

                            </View>


                            {/* Formulir */}
                            <View className="bg-white rounded-2xl p-4 w-[31.5%]">

                                <View className="w-9 h-9 rounded-xl bg-purple-50 items-center justify-center">

                                    <Ionicons
                                        name="document-text-outline"
                                        size={18}
                                        color="#8B5CF6"
                                    />

                                </View>

                                <Text className="text-gray-900 text-xl font-bold mt-3">
                                    05
                                </Text>

                                <Text className="text-gray-400 text-xs mt-1">
                                    Formulir
                                </Text>

                            </View>


                            {/* Selesai */}
                            <View className="bg-white rounded-2xl p-4 w-[31.5%]">

                                <View className="w-9 h-9 rounded-xl bg-green-50 items-center justify-center">

                                    <Ionicons
                                        name="checkmark-circle-outline"
                                        size={18}
                                        color="#22C55E"
                                    />

                                </View>

                                <Text className="text-gray-900 text-xl font-bold mt-3">
                                    08
                                </Text>

                                <Text className="text-gray-400 text-xs mt-1">
                                    Selesai
                                </Text>

                            </View>

                        </View>

                    </View>

                    {/* ========================================
                        MENU UTAMA
                    ======================================== */}
                    <View className="mt-8">

                        <View className="flex-row items-center justify-between mb-4">

                            <Text className="text-gray-900 text-lg font-bold">
                                Menu Utama
                            </Text>

                            <View className="bg-gray-100 px-3 py-1 rounded-full">
                                <Text className="text-gray-500 text-xs font-medium">
                                    4 Menu
                                </Text>
                            </View>

                        </View>


                        <View className="flex-row flex-wrap justify-between">

                            {/* =================================
                                PENGGAJIAN
                            ================================= */}
                            <Pressable
                                onPress={() =>
                                    router.push("/pages/Payroll" as any)
                                }
                                className="w-[48%] bg-white rounded-2xl p-5 mb-4"
                            >

                                <View className="w-12 h-12 rounded-2xl bg-green-50 items-center justify-center">

                                    <Ionicons
                                        name="wallet-outline"
                                        size={24}
                                        color="#22C55E"
                                    />

                                </View>

                                <Text className="text-gray-900 font-bold text-base mt-4">
                                    Penggajian
                                </Text>

                                <Text className="text-gray-400 text-xs mt-1">
                                    Informasi gaji
                                </Text>

                            </Pressable>


                            {/* =================================
                                Kasbon
                            ================================= */}
                            <Pressable
                                onPress={() =>
                                    router.push("/pages/KasbonScreen" as any)
                                }
                                className="w-[48%] bg-white rounded-2xl p-5 mb-4"
                            >

                                <View className="w-12 h-12 rounded-2xl bg-blue-50 items-center justify-center">

                                    <Ionicons
                                        name="leaf-outline"
                                        size={24}
                                        color="#3B82F6"
                                    />

                                </View>

                                <Text className="text-gray-900 font-bold text-base mt-4">
                                    Kasbon
                                </Text>

                                <Text className="text-gray-400 text-xs mt-1">
                                    Informasi Kasbon
                                </Text>

                            </Pressable>


                            {/* =================================
                                RINCIAN KERJA
                            ================================= */}
                            <Pressable
                                onPress={() =>
                                    router.push("/pages/WorkDetail" as any)
                                }
                                className="w-[48%] bg-white rounded-2xl p-5 mb-4"
                            >

                                <View className="w-12 h-12 rounded-2xl bg-orange-50 items-center justify-center">

                                    <Ionicons
                                        name="briefcase-outline"
                                        size={24}
                                        color="#F97316"
                                    />

                                </View>

                                <Text className="text-gray-900 font-bold text-base mt-4">
                                    Rincian Kerja
                                </Text>

                                <Text className="text-gray-400 text-xs mt-1">
                                    Aktivitas pekerjaan
                                </Text>

                            </Pressable>


                            {/* =================================
                                FORMULIR
                            ================================= */}
                            <Pressable
                                onPress={() =>
                                    router.push("pages/FormulirScreen" as any)
                                }
                                className="w-[48%] bg-white rounded-2xl p-5 mb-4"
                            >

                                <View className="w-12 h-12 rounded-2xl bg-purple-50 items-center justify-center">

                                    <Ionicons
                                        name="document-text-outline"
                                        size={24}
                                        color="#8B5CF6"
                                    />

                                </View>

                                <Text className="text-gray-900 font-bold text-base mt-4">
                                    Formulir
                                </Text>

                                <Text className="text-gray-400 text-xs mt-1">
                                    Formulir dan pengajuan
                                </Text>

                            </Pressable>

                        </View>

                    </View>


                    {/* ========================================
                        PERLU PERHATIAN
                    ======================================== */}
                    <View className="mt-5">

                        <View className="flex-row items-center justify-between mb-4">

                            <Text className="text-gray-900 text-lg font-bold">
                                Perlu perhatian
                            </Text>

                            <View className="flex-row items-center">

                                <View className="w-2 h-2 rounded-full bg-orange-500 mr-2" />

                                <Text className="text-gray-400 text-xs">
                                    1 item
                                </Text>

                            </View>

                        </View>


                        <Pressable
                            onPress={() =>
                                router.push("/survey" as any)
                            }
                            className="bg-white rounded-2xl p-5"
                        >

                            <View className="flex-row items-center">

                                {/* Icon */}
                                <View className="w-12 h-12 rounded-2xl bg-orange-50 items-center justify-center">

                                    <Ionicons
                                        name="document-text-outline"
                                        size={23}
                                        color="#F97316"
                                    />

                                </View>


                                {/* Content */}
                                <View className="ml-4 flex-1">

                                    <View className="flex-row items-center">

                                        <Text className="text-gray-900 font-bold text-base">
                                            Dokumen Pengajuan
                                        </Text>

                                        <View className="bg-orange-100 px-2 py-1 rounded-full ml-2">

                                            <Text className="text-orange-600 text-[10px] font-semibold">
                                                Segera
                                            </Text>

                                        </View>

                                    </View>

                                    <Text className="text-gray-400 text-sm mt-1">
                                        Membutuhkan tindakan Anda
                                    </Text>

                                </View>


                                {/* Arrow */}
                                <View className="w-9 h-9 rounded-full bg-gray-50 items-center justify-center">

                                    <Ionicons
                                        name="chevron-forward"
                                        size={18}
                                        color="#6B7280"
                                    />

                                </View>

                            </View>


                            {/* Divider */}
                            <View className="h-px bg-gray-100 my-4" />


                            {/* Deadline */}
                            <View className="flex-row items-center">

                                <Ionicons
                                    name="time-outline"
                                    size={18}
                                    color="#9CA3AF"
                                />

                                <View className="ml-3">

                                    <Text className="text-gray-400 text-xs">
                                        Batas tindakan
                                    </Text>

                                    <Text className="text-gray-800 text-sm font-semibold mt-1">
                                        Hari ini
                                    </Text>

                                </View>

                            </View>

                        </Pressable>

                    </View>


                    {/* ========================================
                        SPACING BOTTOM
                    ======================================== */}
                    <View className="h-5" />

                </View>

            </ScrollView>


            {/* ========================================
                BOTTOM NAVBAR
            ======================================== */}
            {/* <Navbar id="1" /> */}

        </SafeAreaView>
    );
}
