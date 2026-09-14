import { Text, TextInput, View } from "react-native";

interface TextQuestionProps {
    label: string;
    value?: string;
    onChangeText: (value: string) => void;
    placeholder?: string;
    multiline?: boolean;
}

export default function InputField({
    label,
    value,
    onChangeText,
    placeholder = "Masukkan jawaban",
    multiline = false,
}: TextQuestionProps) {
    return (
        <View>
            <Text className="mb-2 text-sm font-medium text-gray-700">
                {label}
            </Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                multiline={multiline}
                textAlignVertical={multiline ? "top" : "center"}
                className={`border border-gray-300 rounded-xl px-4 bg-white text-gray-800 ${multiline ? "h-28 py-3" : "h-12"
                    }`}
            />
        </View>
    );
}

