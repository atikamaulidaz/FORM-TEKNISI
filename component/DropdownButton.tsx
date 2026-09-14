import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";

interface DropdownProps {
    label: string;
    value: string;
    options: {
        label: string;
        value: string;
    }[];
    onChange: (value: string) => void;
}

export default function DropdownButton({
    label,
    value,
    options,
    onChange,
}: DropdownProps) {
    const [visible, setVisible] = useState(false);

    const selected = options.find((item) => item.value === value);

    return (
        <View>
            <Text className="mb-2 text-sm font-medium text-gray-700">
                {label}
            </Text>

            <Pressable
                onPress={() => setVisible(true)}
                className="h-12 px-4 rounded-xl border border-gray-300 bg-white flex-row items-center justify-between"
            >
                <Text className={selected ? "text-gray-800" : "text-gray-400"}>
                    {selected?.label ?? "Pilih"}
                </Text>

                <Text>⌄</Text>
            </Pressable>

            <Modal
                visible={visible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >
                <Pressable
                    onPress={() => setVisible(false)}
                    className="flex-1 bg-black/30 justify-center px-6"
                >
                    <Pressable
                        onPress={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl p-4"
                    >
                        <Text className="text-lg font-semibold mb-4">
                            {label}
                        </Text>

                        {options.map((option) => (
                            <Pressable
                                key={option.value}
                                onPress={() => {
                                    onChange(option.value);
                                    setVisible(false);
                                }}
                                className="py-3"
                            >
                                <Text
                                    className={`text-base ${value === option.value
                                            ? "text-blue-500 font-semibold"
                                            : "text-gray-700"
                                        }`}
                                >
                                    {option.label}
                                </Text>
                            </Pressable>
                        ))}
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    );
}

