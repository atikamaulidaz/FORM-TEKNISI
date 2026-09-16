import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRole = async () => {
  return await AsyncStorage.getItem("role");
};

export const hasRole = (role: string | null, allowedRoles: string[]) => {
  const roleKecil = role?.toLowerCase();
  const allowedRolesKecil = allowedRoles.map((r) => r.toLowerCase());
  return roleKecil !== null && allowedRolesKecil.includes(roleKecil ?? "");
};
