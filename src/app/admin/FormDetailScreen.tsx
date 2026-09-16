import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import CheckboxButton from "../../../component/CheckboxButton";
import Inputfield from "../../../component/InputField";
import Navbar from "../../../component/Navbar";
import RadioButton from "../../../component/RadioButton";
import TextareaField from "../../../component/TextareaField";
import { getFieldOptionById } from "../../../service/FieldOption";

export default function FormDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [data, setData] = useState<any>();
  const [answersRadio, setAnswersRadio] = useState<Record<string, string>>({});
  const [answersCheck, setAnswersCheck] = useState<Record<string, string[]>>(
    {},
  );

  const handleGetDatabyID = async (id: string) => {
    const result = await getFieldOptionById(id);
    setData(result);
  };

  useEffect(() => {
    if (id) {
      handleGetDatabyID(id as string);
    }
  }, [id]);

  const questions = data?.data?.questions ?? [];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#F7F8FA",
      }}
    >
      <Navbar id="2" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <View className="px-5 pt-6 mb-10">
          {/* ================= HEADER ================= */}
          <View className="flex-row items-center mb-6">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-11 h-11 rounded-2xl bg-white border border-gray-100 items-center justify-center mr-4"
            >
              <Ionicons name="arrow-back" size={20} color="#111827" />
            </TouchableOpacity>

            <View className="flex-1">
              <Text
                className="text-2xl font-bold text-gray-900"
                numberOfLines={2}
              >
                {data?.data?.name ?? "Formulir"}
              </Text>

              {data?.data?.description && (
                <Text className="text-sm text-gray-500 mt-1" numberOfLines={2}>
                  {data.data.description}
                </Text>
              )}
            </View>
          </View>

          {/* ================= FORM INFO ================= */}
          <View className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-xl bg-indigo-50 items-center justify-center mr-3">
                <Ionicons
                  name="document-text-outline"
                  size={20}
                  color="#4F46E5"
                />
              </View>

              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-900">
                  Isi formulir
                </Text>

                <Text className="text-xs text-gray-400 mt-1">
                  Lengkapi seluruh pertanyaan sebelum mengirim.
                </Text>
              </View>
            </View>
          </View>

          {/* ================= QUESTIONS ================= */}
          <View className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {questions.length === 0 ? (
              <View className="items-center justify-center py-12 px-5">
                <Ionicons name="document-outline" size={42} color="#9CA3AF" />

                <Text className="text-base font-semibold text-gray-700 mt-4">
                  Belum ada pertanyaan
                </Text>

                <Text className="text-sm text-gray-400 text-center mt-1">
                  Formulir ini belum memiliki pertanyaan.
                </Text>
              </View>
            ) : (
              questions.map((item: any, index: number) => (
                <View
                  key={item.id}
                  className="px-5 py-6 border-b border-gray-100"
                >
                  {/* QUESTION NUMBER */}
                  <View className="flex-row items-start mb-4">
                    <View className="w-7 h-7 rounded-full bg-indigo-50 items-center justify-center mr-3">
                      <Text className="text-xs font-bold text-indigo-600">
                        {index + 1}
                      </Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-base font-semibold text-gray-900 leading-6">
                        {item.question}
                      </Text>

                      {item.required && (
                        <Text className="text-xs text-red-500 mt-1">
                          * Wajib diisi
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* ================= TEXT ================= */}
                  {item.type === "text" && (
                    <Inputfield
                      label={item.options?.[0]?.label ?? "Masukkan jawaban"}
                      onChangeText={() => {}}
                    />
                  )}

                  {/* ================= RADIO ================= */}
                  {item.type === "radio" && (
                    <View className="gap-3">
                      {item.options?.map((option: any) => (
                        <RadioButton
                          key={option.value}
                          label={option.label}
                          value={option.value}
                          checked={answersRadio[item.id] === option.value}
                          onChange={() =>
                            setAnswersRadio((prev) => ({
                              ...prev,
                              [item.id]: option.value,
                            }))
                          }
                        />
                      ))}
                    </View>
                  )}

                  {/* ================= CHECKBOX ================= */}
                  {item.type === "checkbox" && (
                    <View className="gap-3">
                      {item.options?.map((option: any) => (
                        <CheckboxButton
                          key={option.value}
                          label={option.label}
                          value={option.value}
                          checked={answersCheck[item.id]?.includes(
                            option.value,
                          )}
                          onChange={() => {
                            if (answersCheck[item.id]?.includes(option.value)) {
                              setAnswersCheck({
                                ...answersCheck,
                                [item.id]: answersCheck[item.id]?.filter(
                                  (v) => v !== option.value,
                                ),
                              });
                            } else {
                              setAnswersCheck({
                                ...answersCheck,
                                [item.id]: [
                                  ...(answersCheck[item.id] ?? []),
                                  option.value,
                                ],
                              });
                            }
                          }}
                        />
                      ))}
                    </View>
                  )}
                  {/* ================= TEXTAREA ================= */}
                  {(item.type === "radio" ||
                    item.type === "checkbox" ||
                    item.type === "select") && (
                    <TextareaField value="" onChangeText={() => {}} />
                  )}
                </View>
              ))
            )}
          </View>

          {/* ================= SUBMIT ================= */}
          {questions.length > 0 && (
            <TouchableOpacity
              activeOpacity={0.8}
              className="bg-indigo-600 rounded-2xl h-14 flex-row items-center justify-center mt-5"
            >
              <Ionicons name="send-outline" size={19} color="white" />

              <Text className="text-white font-semibold text-base ml-2">
                Kirim Formulir
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
