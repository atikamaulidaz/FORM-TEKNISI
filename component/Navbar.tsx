import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function Navbar({ id }: { id?: string }) {
  const router = useRouter();
  const [active, setActive] = useState(id);

  const navbar = [
    {
      id: "1",
      title: "UTAMA",
      color: "#003B72",
      icon: "home-outline",
      route: "/general/HomeScreen",
    },
    {
      id: "2",
      title: "AKTIFITAS",
      color: "#003B72",
      icon: "time-outline",
      route: "/general/ActivityScreen",
    },
    {
      id: "3",
      title: "PROFILE",
      color: "#003B72",
      icon: "person-outline",
      route: "/general/ProfileScreen",
    },
  ];

  const handlePress = (item: (typeof navbar)[number]) => {
    setActive(item.id);
    router.push(item.route as any);
  };

  return (
    <View className="absolute bottom-6 left-5 right-5 z-50">
      <View className="h-16 flex-row items-center rounded-full bg-white px-2 shadow-lg">
        {navbar.map((item) => {
          const isActive = active === item.id;

          return (
            <Pressable
              key={item.id}
              onPress={() => handlePress(item)}
              className={
                isActive
                  ? "flex-1 flex-row items-center justify-center rounded-full bg-[#003B72] py-3 mx-1"
                  : "h-12 w-12 items-center justify-center mx-auto"
              }
            >
              <Ionicons
                name={item.icon as any}
                size={22}
                color={isActive ? "white" : item.color}
              />
              {isActive && (
                <Text
                  numberOfLines={1}
                  className="ml-2 text-xs font-semibold tracking-wide text-white"
                >
                  {item.title}
                </Text>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
