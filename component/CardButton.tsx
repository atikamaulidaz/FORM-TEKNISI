import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

interface CardButtonProps {
    name: string;
    description: string;
    status: string;
    id: string;
    onPressDelete: () => void;
    onPressDetail: () => void;
    onPressResponse: () => void;
    onPressEdit: () => void;
}

export default function Cardbuttton({ name, description, status, id, onPressDelete, onPressDetail, onPressResponse, onPressEdit }: CardButtonProps) {
    return (
        <View className="mb-3 px-5">
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white">

                {/* TOP */}
                <View className="p-4">

                    <View className="flex-row items-center">

                        {/* ICON */}
                        <View className="h-11 w-11 items-center justify-center rounded-xl bg-[#003B72]">
                            <Ionicons
                                name="document-text-outline"
                                size={21}
                                color="#FFFFFF"
                            />
                        </View>

                        {/* TITLE */}
                        <View className="ml-3 flex-1">
                            <Text
                                className="text-[15px] font-bold text-gray-900"
                                numberOfLines={1}
                            >
                                {name}
                            </Text>

                            <Text
                                className="mt-1 text-xs text-gray-400"
                                numberOfLines={1}
                            >
                                {description}
                            </Text>
                        </View>

                        {/* STATUS */}
                        <View className="ml-2 rounded-full bg-green-50 px-2.5 py-1">
                            <Text className="text-[10px] font-semibold text-green-600">
                                {status}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* ACTION BAR */}
                <View className="flex-row border-t border-gray-100 px-4 py-3">

                    {/* EDIT */}
                    <Pressable
                        onPress={onPressEdit}
                        className="h-9 w-9 items-center justify-center rounded-lg bg-[#e8f0f9]"
                        hitSlop={6}
                    >
                        <Ionicons
                            name="create-outline"
                            size={17}
                            color="#003B72"
                        />
                    </Pressable>

                    {/* DELETE */}
                    <Pressable
                        onPress={onPressDelete}
                        className="ml-2 h-9 w-9 items-center justify-center rounded-lg bg-red-50"
                        hitSlop={6}
                    >
                        <Ionicons
                            name="trash-outline"
                            size={17}
                            color="#EF4444"
                        />
                    </Pressable>

                    <View className="flex-1" />

                    {/* VIEW FORM */}
                    <Pressable
                        onPress={onPressDetail}
                        className="h-9 flex-row items-center justify-center rounded-lg border border-gray-200 px-3"
                        hitSlop={4}
                    >
                        <Ionicons
                            name="eye-outline"
                            size={16}
                            color="#4B5563"
                        />

                        <Text className="ml-1.5 text-xs font-semibold text-gray-700">
                            Lihat Form
                        </Text>
                    </Pressable>

                    {/* RESPONSE */}
                    <Pressable
                        onPress={onPressResponse}
                        className="ml-2 h-9 flex-row items-center justify-center rounded-lg bg-[#003B72] px-3"
                        hitSlop={4}
                    >
                        <Ionicons
                            name="people-outline"
                            size={16}
                            color="#FFFFFF"
                        />

                        <Text className="ml-1.5 text-xs font-semibold text-white">
                            Respon
                        </Text>
                    </Pressable>

                </View>
            </View>
        </View>
    )
}