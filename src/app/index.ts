import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert } from "react-native";

export default function Index() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const id = await AsyncStorage.getItem("user_id");

        setUserId(id);
      } catch (error) {
        console.error("Gagal mengecek login:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLogin();
  }, []);

  if (loading) {
    return null;
  }

  if (userId) {
    router.replace("/pages/HomeScreen");
  } else {
    router.replace("/pages/LoginScreen");
    Alert.alert("Anda belum login. Silakan login terlebih dahulu.");
  }
}
