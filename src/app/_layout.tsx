import { Stack, usePathname } from "expo-router";
import { LogBox, View } from "react-native";
import Navbar from "../../component/Navbar";
import "../global.css";

LogBox.ignoreAllLogs();

export default function RootLayout() {
  const pathname = usePathname();

  const hideNavbar =
    pathname === "/" ||
    pathname === "/auth/LoginScreen" ||
    pathname === "/auth/DaftarKaryawanScreen";

  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="general/HomeScreen" />
        <Stack.Screen name="admin/ResponseScreen" />
        <Stack.Screen name="admin/FormDetailScreen" />
        <Stack.Screen name="admin/CreateForm" />
        <Stack.Screen name="general/ActivityScreen" />
        <Stack.Screen name="general/ProfileScreen" />
        <Stack.Screen name="admin/FormulirScreen" />
        <Stack.Screen name="general/KasbonScreen" />
        <Stack.Screen name="auth/LoginScreen" />
        <Stack.Screen name="auth/DaftarKaryawanScreen" />
        <Stack.Screen name="admin/KasbonApprovalScreen" />
      </Stack>

      {!hideNavbar && <Navbar />}
    </View>
  );
}
