import { Text, TextInput, View } from "react-native";

export default function TextareaField({
    label,
    value,
    onChangeText,
}: {
    label?: string;
    value: string;
    onChangeText: (value: string) => void;
}) {
    return (
        <View className="w-full">
            <Text className="text-black font-semibold mb-2">{label}</Text>
            <TextInput
                className="border border-gray-300 text-black rounded-lg p-2"
                multiline
                placeholder="Silahkan input"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}