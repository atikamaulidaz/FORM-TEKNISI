import { Ionicons } from "@expo/vector-icons";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
    return (
        <SafeAreaView className="flex-1 bg-[#F6F7F9]">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120 }}
            >
                <View className="px-5 pt-5">

                    {/* HEADER */}
                    <View className="mb-7">
                        <Text className="text-gray-400 text-sm">
                            Akun
                        </Text>

                        <Text className="text-gray-900 text-2xl font-bold mt-1">
                            Profil
                        </Text>

                        <Text className="text-gray-400 text-sm mt-2">
                            Kelola informasi akun dan pengaturan Anda.
                        </Text>
                    </View>

                    {/* PROFILE CARD */}
                    <View className="bg-white rounded-2xl p-5 mb-7">
                        <View className="flex-row items-center">

                            {/* AVATAR */}
                            <View className="w-16 h-16 rounded-full bg-[#003B72] items-center justify-center">
                                <Text className="text-white text-xl font-bold">
                                    RF
                                </Text>
                            </View>

                            <View className="ml-4 flex-1">
                                <Text className="text-gray-900 text-lg font-bold">
                                    Risky Farhan
                                </Text>

                                <Text className="text-gray-400 text-sm mt-1">
                                    Teknisi
                                </Text>

                                <View className="flex-row items-center mt-2">
                                    <View className="w-2 h-2 rounded-full bg-green-500" />

                                    <Text className="text-green-600 text-xs ml-2 font-medium">
                                        Akun aktif
                                    </Text>
                                </View>
                            </View>

                            <Pressable
                                onPress={() => { }}
                                className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center"
                            >
                                <Ionicons
                                    name="create-outline"
                                    size={19}
                                    color="#4B5563"
                                />
                            </Pressable>
                        </View>
                    </View>

                    {/* INFORMASI AKUN */}
                    <View className="mb-7">
                        <Text className="text-gray-900 text-lg font-bold mb-3">
                            Informasi Akun
                        </Text>

                        <View className="bg-white rounded-2xl p-5">

                            <View className="flex-row items-center mb-5">
                                <View className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">
                                    <Ionicons
                                        name="person-outline"
                                        size={19}
                                        color="#6B7280"
                                    />
                                </View>

                                <View className="ml-3">
                                    <Text className="text-gray-400 text-xs">
                                        Nama Lengkap
                                    </Text>

                                    <Text className="text-gray-800 text-sm font-semibold mt-1">
                                        Risky Farhan
                                    </Text>
                                </View>
                            </View>

                            <View className="h-px bg-gray-100 mb-5" />

                            <View className="flex-row items-center mb-5">
                                <View className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">
                                    <Ionicons
                                        name="call-outline"
                                        size={19}
                                        color="#6B7280"
                                    />
                                </View>

                                <View className="ml-3">
                                    <Text className="text-gray-400 text-xs">
                                        Nomor Telepon
                                    </Text>

                                    <Text className="text-gray-800 text-sm font-semibold mt-1">
                                        0812 3456 7890
                                    </Text>
                                </View>
                            </View>

                            <View className="h-px bg-gray-100 mb-5" />

                            <View className="flex-row items-center">
                                <View className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center">
                                    <Ionicons
                                        name="briefcase-outline"
                                        size={19}
                                        color="#6B7280"
                                    />
                                </View>

                                <View className="ml-3">
                                    <Text className="text-gray-400 text-xs">
                                        Jabatan
                                    </Text>

                                    <Text className="text-gray-800 text-sm font-semibold mt-1">
                                        Teknisi
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    {/* PENGATURAN */}
                    <View className="mb-7">
                        <Text className="text-gray-900 text-lg font-bold mb-3">
                            Pengaturan
                        </Text>

                        <View className="bg-white rounded-2xl overflow-hidden">

                            {/* EDIT PROFILE */}
                            <Pressable
                                onPress={() => { }}
                                className="flex-row items-center px-5 py-4"
                            >
                                <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center">
                                    <Ionicons
                                        name="person-circle-outline"
                                        size={20}
                                        color="#3B82F6"
                                    />
                                </View>

                                <View className="ml-3 flex-1">
                                    <Text className="text-gray-800 text-sm font-semibold">
                                        Edit Profil
                                    </Text>

                                    <Text className="text-gray-400 text-xs mt-1">
                                        Ubah informasi profil Anda
                                    </Text>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={18}
                                    color="#9CA3AF"
                                />
                            </Pressable>

                            <View className="h-px bg-gray-100 ml-16" />

                            {/* NOTIFIKASI */}
                            <Pressable
                                onPress={() => { }}
                                className="flex-row items-center px-5 py-4"
                            >
                                <View className="w-10 h-10 rounded-xl bg-orange-50 items-center justify-center">
                                    <Ionicons
                                        name="notifications-outline"
                                        size={20}
                                        color="#F97316"
                                    />
                                </View>

                                <View className="ml-3 flex-1">
                                    <Text className="text-gray-800 text-sm font-semibold">
                                        Notifikasi
                                    </Text>

                                    <Text className="text-gray-400 text-xs mt-1">
                                        Atur pemberitahuan aplikasi
                                    </Text>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={18}
                                    color="#9CA3AF"
                                />
                            </Pressable>

                            <View className="h-px bg-gray-100 ml-16" />

                            {/* TENTANG */}
                            <Pressable
                                onPress={() => { }}
                                className="flex-row items-center px-5 py-4"
                            >
                                <View className="w-10 h-10 rounded-xl bg-purple-50 items-center justify-center">
                                    <Ionicons
                                        name="information-circle-outline"
                                        size={20}
                                        color="#8B5CF6"
                                    />
                                </View>

                                <View className="ml-3 flex-1">
                                    <Text className="text-gray-800 text-sm font-semibold">
                                        Tentang Aplikasi
                                    </Text>

                                    <Text className="text-gray-400 text-xs mt-1">
                                        Informasi aplikasi dan versi
                                    </Text>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={18}
                                    color="#9CA3AF"
                                />
                            </Pressable>

                        </View>
                    </View>

                    {/* LOGOUT */}
                    <Pressable
                        onPress={() => { }}
                        className="h-14 bg-white border border-red-100 rounded-2xl flex-row items-center justify-center mb-5"
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={20}
                            color="#EF4444"
                        />

                        <Text className="text-red-500 text-sm font-semibold ml-2">
                            Keluar
                        </Text>
                    </Pressable>

                    <Text className="text-center text-gray-300 text-xs mb-5">
                        FormTeknisi v1.0.0
                    </Text>

                </View>
            </ScrollView>

            {/* <Navbar id="3" /> */}
        </SafeAreaView>
    );
}
