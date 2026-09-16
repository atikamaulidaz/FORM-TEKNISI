import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import DropdownButton from "../../../component/DropdownButton";
import { registerUser } from "../../../service/AuthService";

export default function DaftarKaryawanScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    nama_user: "",
    role: "",
    password: "",
    kasbon: 0,
  });

  const handleLogin = async () => {
    const result = await registerUser(form);
    if (form) {
      if (result.error == false) {
        Alert.alert("Berhasil", result.message);
        router.replace("/auth/LoginScreen");
        setForm({
          username: "",
          nama_user: "",
          role: "",
          password: "",
          kasbon: 0,
        });
      } else {
        Alert.alert("Gagal", result.message);
      }
    } else {
      Alert.alert("Gagal", "Ada data kosong");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 40,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center px-6">
          {/* Header */}
          <View className="mb-10">
            <View className="w-14 h-14 bg-indigo-600 rounded-2xl items-center justify-center mb-5">
              <Ionicons name="document-text-outline" size={28} color="white" />
            </View>

            <Text className="text-3xl font-bold text-gray-900">
              Daftar Karyawan
            </Text>

            <Text className="text-gray-500 mt-2 text-base">
              Silakan masukkan data untuk melanjutkan.
            </Text>
          </View>

          {/* Form */}
          <View className="gap-5">
            {/* Username */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Username</Text>

              <View className="h-14 bg-white border border-gray-200 rounded-xl flex-row items-center px-4">
                <Ionicons name="person-outline" size={20} color="#9CA3AF" />

                <TextInput
                  value={form.username}
                  onChangeText={(value) =>
                    setForm({ ...form, username: value })
                  }
                  placeholder="Masukkan username"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-gray-900"
                />
              </View>
            </View>

            <View>
              <Text className="text-gray-700 font-semibold mb-2">
                Nama User
              </Text>

              <View className="h-14 bg-white border border-gray-200 rounded-xl flex-row items-center px-4">
                <Ionicons name="person-outline" size={20} color="#9CA3AF" />

                <TextInput
                  value={form.nama_user}
                  onChangeText={(value) =>
                    setForm({ ...form, nama_user: value })
                  }
                  placeholder="Masukkan nama user"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  className="flex-1 ml-3 text-gray-900"
                />
              </View>
            </View>

            <DropdownButton
              label="Role"
              value={form.role}
              onChange={(value) => setForm({ ...form, role: value })}
              options={[
                {
                  label: "Admin",
                  value: "Admin",
                },
                {
                  label: "Teknisi",
                  value: "Teknisi",
                },
                {
                  label: "Sales",
                  value: "Sales",
                },
              ]}
            />

            {/* Password */}
            <View>
              <Text className="text-gray-700 font-semibold mb-2">Password</Text>

              <View className="h-14 bg-white border border-gray-200 rounded-xl flex-row items-center px-4">
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#9CA3AF"
                />

                <TextInput
                  value={form.password}
                  onChangeText={(value) =>
                    setForm({ ...form, password: value })
                  }
                  placeholder="Masukkan password"
                  placeholderTextColor="#9CA3AF"
                  secureTextEntry={!showPassword}
                  className="flex-1 ml-3 text-gray-900"
                />

                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                    size={21}
                    color="#6B7280"
                  />
                </Pressable>
              </View>
            </View>

            {/* Login */}
            <Pressable
              onPress={handleLogin}
              className="h-14 bg-indigo-600 rounded-xl items-center justify-center mt-2 active:opacity-80"
            >
              <Text className="text-white font-bold text-base">Masuk</Text>
            </Pressable>
            <Pressable
              onPress={() => router.replace("/auth/LoginScreen")}
              className="h-14 bg-white border border-gray-200 rounded-xl items-center justify-center active:opacity-80"
            >
              <Text className="text-indigo-600 font-bold text-base">
                Kembali
              </Text>
            </Pressable>
          </View>

          {/* Footer */}
          <View className="items-center mt-10">
            <Text className="text-gray-400 text-sm">FormTeknisi</Text>

            <Text className="text-gray-400 text-xs mt-1">
              Sistem Formulir Teknisi
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
