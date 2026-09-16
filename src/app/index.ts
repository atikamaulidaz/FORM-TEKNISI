import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Alert } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const userId = await AsyncStorage.getItem("user_id");

        if (userId) {
          router.replace("/general/HomeScreen");
        } else {
          Alert.alert("Belum Login", "Silakan login terlebih dahulu.", [
            {
              text: "OK",
              onPress: () => {
                router.replace("/auth/LoginScreen");
              },
            },
          ]);
        }
      } catch (error) {
        console.error("Gagal mengecek login:", error);
      }
    };

    checkLogin();
  }, []);

  return null;
}
