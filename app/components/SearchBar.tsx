import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";
import { useTheme } from "../src/theme/ThemeContext";
import { useLanguage } from "../src/locales/languange";

export default function SearchBar({ value, onChange }: { value: string; onChange: (text: string) => void }) {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <View
      style={{
        marginTop: 20,
        paddingBottom: 15,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.card,
          borderRadius: 25,
          paddingHorizontal: 15,
          height: 48,
          elevation: 2,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 2,
          shadowOffset: { width: 0, height: 2 },
        }}
      >
        <Ionicons name="search" size={20} color={theme.subtext} />

        <TextInput
          placeholder={t("search_task")}
          placeholderTextColor={theme.subtext}
          value={value}
          onChangeText={onChange}
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 16,
            fontWeight: "400",
            color: theme.text,
          }}
        />
      </View>
    </View>
  );
}
