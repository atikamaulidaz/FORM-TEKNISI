import { Pressable, Text, View } from "react-native";

interface RadioButtonProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
}

export default function RadioButton({ label, value, checked, onChange }: RadioButtonProps) {
    return (
        <Pressable onPress={() => onChange(value)}>
            <View className="flex-row items-center my-2">
                <View
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${checked ? "border-blue-500" : "border-gray-300"
                        }`}
                >
                    {checked && <View className="w-5 h-5 rounded-full bg-blue-500" />}
                </View>

                <Text className="ml-2 text-md">{label}</Text>
            </View>
        </Pressable>
    );
}