import { Pressable, Text, View } from "react-native";

interface CheckboxProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
}

export default function CheckboxButton({
    label,
    value,
    checked,
    onChange,
}: CheckboxProps) {
    return (
        <Pressable onPress={() => onChange(value)}>
            <View className="flex-row items-center py-2">
                <View
                    className={`w-5 h-5 rounded-md border-2 items-center justify-center ${checked
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-300 bg-white"
                        }`}
                >
                    {checked && (
                        <Text className="text-white text-xs font-bold">
                            ✓
                        </Text>
                    )}
                </View>

                <Text className="ml-3 text-gray-700">
                    {label}
                </Text>
            </View>
        </Pressable>
    );
}

