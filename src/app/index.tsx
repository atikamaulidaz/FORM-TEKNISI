import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { supabase } from "../../database/supabase";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    async function checkSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        router.replace("/pages/HomeScreen");
      } else {
        router.replace("/pages/LoginScreen");
      }
    }

    checkSession();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <ActivityIndicator size="large" />
    </View>
  );
}
