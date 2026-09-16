import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import { addFieldOption, getFieldOptionById, updateFieldOption } from "../../../service/FieldOption";


export default function CreateForm() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id?: string }>();
    const [questions, setQuestions] = useState<any[]>([]);
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [showOptions, setShowOptions] = useState<number | null>(null);
    const types = [
        { value: 'text', label: 'Teks' },
        { value: 'number', label: 'Angka' },
        { value: 'radio', label: 'Radio' },
        { value: 'checkbox', label: 'Checkbox' },
    ] as const;


    const addQuestion = () => {
        setQuestions((prev) => [
            ...prev,
            {
                id: Date.now(),
                question: "",
                type: 'text',
                required: false,
                options: [],
            },
        ]);
    };

    const addOption = (questionId: number) => {
        const newOption = {
            id: Date.now(),
            label: "",
            value: "",
        };
        setQuestions((prev) =>
            prev.map((question) =>
                question.id === questionId
                    ? { ...question, options: [...(question.options || []), newOption] }
                    : question
            )
        );
    };

    const removeQuestion = (id: number) => {
        setQuestions((prev) =>
            prev.filter((question) => question.id !== id)
        );
    };

    const handleSaveForm = async () => {
        const formData = {
            id: id,
            name: name,
            description: description,
            questions: questions,
        }
        if (id) {
            const data = await updateFieldOption(formData);
            if (data) {
                Alert.alert("Success", "Form updated successfully");
            }

        } else {
            const data = await addFieldOption(formData);
            if (data) {
                Alert.alert("Success", "Form created successfully");
            }
        }
    }

    const handleGetDatabyID = async (id: string) => {
        const data = await getFieldOptionById(id)
        setName(data.data.name ?? "");
        setDescription(data.data.description ?? "");
        setQuestions(data.data.questions ?? []);
    }


    useEffect(() => {
        if (id) {
            handleGetDatabyID(id)
        }
    }, [id])
    return (
        <View className="flex-1 bg-[#F6F7F9]">
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 80 }}
            >
                {/* Header */}
                <View className="flex-row mt-10 gap-5 items-center">
                    <Pressable onPress={() => router.back()} className="w-11 h-11 rounded-full bg-[#003B72] items-center justify-center">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </Pressable>
                    <Text className="text-2xl text-center font-bold text-black-900">
                        Buat Survey
                    </Text>
                </View>

                {/* Informasi Form */}
                <View className="bg-white rounded-2xl p-5 mb-5">
                    <Text className="text-base font-semibold text-gray-900 mb-4">
                        Informasi Form
                    </Text>

                    <Text className="text-sm font-medium text-gray-700 mb-2">
                        Nama Form
                    </Text>

                    <TextInput
                        placeholder="Masukkan nama form"
                        className="h-12 border border-gray-200 rounded-xl px-4 text-gray-800 mb-4"
                        onChangeText={text => { setName(text) }}
                        value={name}
                    />

                    <Text className="text-sm font-medium text-gray-700 mb-2">
                        Deskripsi
                    </Text>

                    <TextInput
                        placeholder="Masukkan deskripsi form"
                        multiline
                        textAlignVertical="top"
                        className="h-24 border border-gray-200 rounded-xl px-4 py-3 text-gray-800"
                        onChangeText={text => { setDescription(text) }}
                        value={description}
                    />
                </View>

                {/* Pertanyaan */}
                <View className="mb-4">
                    <Text className="text-lg font-semibold text-gray-900">
                        Pertanyaan
                    </Text>

                    <Text className="text-sm text-gray-500 mt-1">
                        Tambahkan pertanyaan untuk form survey
                    </Text>
                </View>

                {/* Empty State */}
                {questions.length === 0 && (
                    <View className="bg-white rounded-2xl p-8 items-center border border-dashed border-gray-300 mb-5">
                        <View className="w-14 h-14 rounded-full bg-gray-100 items-center justify-center mb-4">
                            <Ionicons
                                name="document-text-outline"
                                size={26}
                                color="#9CA3AF"
                            />
                        </View>

                        <Text className="text-base font-semibold text-gray-700">
                            Belum ada pertanyaan
                        </Text>

                        <Text className="text-sm text-gray-400 text-center mt-1">
                            Tambahkan pertanyaan untuk membuat form survey
                        </Text>
                    </View>
                )}

                {/* Question List */}
                {questions.map((item, index) => (
                    <View
                        key={item.id}
                        className="bg-white rounded-2xl p-5 mb-4"
                    >
                        {/* Question Header */}
                        <View className="flex-row items-center justify-between mb-4">
                            <Text className="text-base font-semibold text-gray-900">
                                Pertanyaan {index + 1}
                            </Text>

                            <Pressable
                                onPress={() => removeQuestion(item.id)}
                                className="w-9 h-9 rounded-lg bg-red-50 items-center justify-center"
                            >
                                <Ionicons
                                    name="trash-outline"
                                    size={18}
                                    color="#EF4444"
                                />
                            </Pressable>
                        </View>

                        {/* Question */}
                        <Text className="text-sm font-medium text-gray-700 mb-2">
                            Pertanyaan
                        </Text>

                        <TextInput
                            placeholder="Masukkan pertanyaan"
                            className="h-12 border border-gray-200 rounded-xl px-4 mb-4"
                            onChangeText={(text) => {
                                setQuestions((prev) =>
                                    prev.map((qs) =>
                                        qs.id === item.id
                                            ? { ...qs, question: text }
                                            : qs
                                    )
                                );
                            }}
                            value={item.question}
                        />

                        {/* Type */}
                        <Text className="text-sm font-medium text-gray-700 mb-2">
                            Tipe Jawaban
                        </Text>

                        <Pressable onPress={() => setShowOptions(showOptions === item.id ? null : item.id)} className="h-12 border border-gray-200 rounded-xl px-4 flex-row items-center justify-between">
                            <Text className="text-gray-700">
                                {types.find((t) => t.value === item.type)?.label || 'Pilih Tipe'}
                            </Text>

                            {showOptions === item.id ? <Ionicons name="chevron-up" size={18} color="#6B7280" /> : <Ionicons name="chevron-down" size={18} color="#6B7280" />}
                        </Pressable>
                        {showOptions === item.id && (
                            <View className="mt-2 border border-gray-200 rounded-xl bg-white overflow-hidden">
                                {types.map((t) => (
                                    <Pressable
                                        key={t.value}
                                        onPress={() => {
                                            setQuestions((prev) =>
                                                prev.map((qs) =>
                                                    qs.id === item.id ? { ...qs, type: t.value } : qs
                                                )
                                            );
                                            setShowOptions(null);
                                        }}
                                        className="px-4 py-3 border-b border-gray-100"
                                    >
                                        <Text className="text-gray-700">
                                            {t.label}
                                        </Text>
                                    </Pressable>
                                ))}
                            </View>
                        )}

                        {item.type !== 'text' && (
                            <View className="mt-2 border border-gray-200 rounded-xl bg-white overflow-hidden p-5">
                                <Text className="text-sm font-medium text-gray-700 mb-2">
                                    Masukkan Opsi
                                </Text>
                                <View className="flex-row w-full items-center justify-between gap-5">
                                    <Pressable onPress={() => addOption(item.id)} className=" flex-1 h-10 bg-[#003B72] rounded-lg items-center justify-center">
                                        <Ionicons
                                            name="add"
                                            size={20}
                                            color="white"
                                        />
                                    </Pressable>
                                </View>
                                {item.options?.map((opt: any) => (
                                    <TextInput
                                        key={opt.id}
                                        value={opt.label}
                                        placeholder="Masukkan opsi"
                                        className="h-12 border border-gray-200 rounded-xl px-4 mb-4 mt-3"
                                        onChangeText={(text) => {
                                            setQuestions((prev) =>
                                                prev.map((qs) =>
                                                    qs.id === item.id
                                                        ? {
                                                            ...qs,
                                                            options: qs.options.map((o: any) =>
                                                                o.id === opt.id
                                                                    ? { ...o, label: text, value: text }
                                                                    : o
                                                            ),
                                                        }
                                                        : qs
                                                )
                                            );
                                        }}
                                    />
                                ))}
                            </View>
                        )}

                        {/* Required */}
                        <View className="flex-row items-center justify-between mt-5">
                            <View>
                                <Text className="text-sm font-medium text-gray-700">
                                    Wajib diisi
                                </Text>

                                <Text className="text-xs text-gray-400 mt-1">
                                    User harus menjawab pertanyaan ini
                                </Text>
                            </View>

                            <Pressable onPress={() => { setQuestions((prev) => prev.map((item) => item.id === questions[index].id ? { ...item, required: !item.required } : item)) }}>{item.required ? <Ionicons name="checkbox" size={18} color="#111827" /> : <Ionicons name="checkbox-outline" size={18} color="#111827" />}</Pressable>
                        </View>
                    </View>
                ))}

                {/* Add Question */}
                <Pressable
                    onPress={addQuestion}
                    className="h-12 rounded-xl border border-gray-300 bg-white flex-row items-center justify-center mb-4"
                >
                    <Ionicons
                        name="add"
                        size={20}
                        color="#111827"
                    />

                    <Text className="ml-2 font-medium text-gray-900">
                        Tambah Pertanyaan
                    </Text>
                </Pressable>

                {/* Save */}
                <Pressable onPress={handleSaveForm} className="h-12 rounded-xl bg-[#003B72] items-center justify-center">
                    <Text className="text-white font-semibold">
                        Simpan Form
                    </Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

