import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Cardbuttton from "../../../component/CardButton";
import {
  deleteFieldOption,
  getFieldOption,
} from "../../../service/FieldOption";

export default function FormulirScreen() {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const [data, setData] = useState<any[]>([]);

  const getData = async () => {
    const result = await getFieldOption();
    if (result.error) {
      console.log(result.error);
    } else {
      setData(result.survey_forms || []);
    }
  };

  const deleteData = async (id: string) => {
    const result = await deleteFieldOption(id);
    if (result.error) {
      console.log(result.error);
    } else {
      getData();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View className="flex-1 bg-[#F6F7F9] ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
      >
        {/* ================= HEADER ================= */}
        <View className="px-5 pt-5 mt-10">
          <View className="flex-row items-center justify-between">
            <View className="flex-1">
              <Text className="text-2xl font-bold text-gray-900">Formulir</Text>

              <Text className="mt-1 text-sm text-gray-500">
                Kelola formulir dan lihat respon teknisi
              </Text>
            </View>

            <Pressable
              onPress={() => router.push("/admin/CreateForm")}
              className="ml-4 h-11 w-11 items-center justify-center rounded-xl bg-[#003B72]"
              hitSlop={8}
            >
              <Ionicons name="add" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* ================= SEARCH ================= */}
        <View className="mt-5 px-5">
          <View className="h-12 flex-row items-center rounded-xl border border-gray-200 bg-white px-4">
            <Ionicons name="search-outline" size={19} color="#9CA3AF" />

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Cari formulir..."
              placeholderTextColor="#9CA3AF"
              className="ml-3 flex-1 text-sm text-gray-800"
            />
          </View>
        </View>

        {/* ================= SUMMARY ================= */}
        <View className="mt-5 px-5">
          <View className="flex-row gap-3">
            {/* TOTAL */}
            <View className="flex-1 rounded-2xl border border-gray-100 bg-white p-4">
              <View className="h-9 w-9 items-center justify-center rounded-xl bg-indigo-50">
                <Ionicons
                  name="document-text-outline"
                  size={19}
                  color="#4F46E5"
                />
              </View>

              <Text className="mt-3 text-2xl font-bold text-gray-900">
                {data.length}
              </Text>

              <Text className="mt-1 text-xs text-gray-500">Total Formulir</Text>
            </View>

            {/* ACTIVE */}
            <View className="flex-1 rounded-2xl border border-gray-100 bg-white p-4">
              <View className="h-9 w-9 items-center justify-center rounded-xl bg-green-50">
                <Ionicons
                  name="checkmark-circle-outline"
                  size={19}
                  color="#16A34A"
                />
              </View>

              <Text className="mt-3 text-2xl font-bold text-gray-900">
                {data.filter((item: any) => item.is_active).length}
              </Text>

              <Text className="mt-1 text-xs text-gray-500">Formulir Aktif</Text>
            </View>
          </View>
        </View>

        {/* ================= SECTION ================= */}
        <View className="mt-7 px-5">
          <View className="flex-row items-center justify-between">
            <Text className="text-base font-bold text-gray-900">
              Daftar Formulir
            </Text>

            <Text className="text-xs font-medium text-gray-400">
              {data.length} formulir
            </Text>
          </View>
        </View>

        {/* ================= FORM CARD ================= */}
        {data.map((item: any) => (
          <Cardbuttton
            key={item.id}
            name={item.name}
            description={item.description}
            status={item.is_active ? "Aktif" : "Tidak Aktif"}
            id={item.id}
            onPressDelete={() => deleteData(item.id)}
            onPressDetail={() =>
              router.push({
                pathname: "/admin/FormDetailScreen",
                params: { id: item.id },
              })
            }
            onPressResponse={() =>
              router.push({ pathname: "/admin/ResponseScreen" })
            }
            onPressEdit={() =>
              router.push({
                pathname: "/admin/CreateForm",
                params: { id: item.id },
              })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}
