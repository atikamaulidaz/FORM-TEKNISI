import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function ResponseScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const router = useRouter();
    return (
        <View className="flex-1 bg-slate-50">

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 120,
                }}
            >
                {/* Header */}
                <View className="px-5 pt-14">

                    <View className="flex-row items-center">

                        <Pressable
                            onPress={router.back}
                            className="w-10 h-10 rounded-xl bg-gray-100 items-center justify-center mr-3"
                        >
                            <Ionicons
                                name="arrow-back"
                                size={20}
                                color="#374151"
                            />
                        </Pressable>

                        <View className="flex-1">
                            <Text className="text-xl font-bold text-gray-900">
                                Respon Formulir
                            </Text>

                            <Text className="text-sm text-gray-500 mt-1">
                                Form Survey Teknisi
                            </Text>
                        </View>

                    </View>

                </View>


                {/* Content */}
                <View className="px-5 pt-5">

                    {/* Search */}
                    <View className="h-12 bg-white border border-gray-200 rounded-xl px-4 flex-row items-center">

                        <Ionicons
                            name="search-outline"
                            size={19}
                            color="#9CA3AF"
                        />

                        <TextInput
                            placeholder="Cari nama responden..."
                            placeholderTextColor="#9CA3AF"
                            className="flex-1 ml-3 text-gray-800"
                        />

                    </View>


                    {/* Filter */}
                    <View className="flex-row mt-4 gap-2">

                        <Pressable className="px-4 py-2.5 rounded-xl bg-indigo-600">
                            <Text className="text-sm font-medium text-white">
                                Semua
                            </Text>
                        </Pressable>

                        <Pressable className="px-4 py-2.5 rounded-xl bg-white border border-gray-200">
                            <Text className="text-sm font-medium text-gray-600">
                                Sudah Dikirim
                            </Text>
                        </Pressable>

                        <Pressable className="px-4 py-2.5 rounded-xl bg-white border border-gray-200">
                            <Text className="text-sm font-medium text-gray-600">
                                Draft
                            </Text>
                        </Pressable>

                    </View>


                    {/* Section Header */}
                    <View className="flex-row items-center justify-between mt-7 mb-3">

                        <View>
                            <Text className="text-base font-bold text-gray-900">
                                Daftar Respon
                            </Text>

                            <Text className="text-xs text-gray-500 mt-1">
                                Respon yang masuk dari teknisi
                            </Text>
                        </View>

                    </View>


                    {/* Empty State */}
                    <View className="bg-white border border-gray-100 rounded-2xl px-6 py-12 items-center">

                        <View className="w-16 h-16 rounded-2xl bg-indigo-50 items-center justify-center mb-4">

                            <Ionicons
                                name="document-text-outline"
                                size={30}
                                color="#4F46E5"
                            />

                        </View>

                        <Text className="text-base font-semibold text-gray-900 text-center">
                            Belum Ada Respon
                        </Text>

                        <Text className="text-sm text-gray-500 text-center mt-2 leading-5">
                            Respon dari formulir yang sudah dikirim
                            akan muncul di sini.
                        </Text>

                    </View>

                </View>

            </ScrollView>

        </View>
    );
}