import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Sura, suraList } from "../lib/sura";

export default function Home() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Sura }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      onPress={() =>
        router.push({ pathname: "/surah/[id]", params: { id: item.id } } as any)
      }
    >
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>
          {convertToBanglaNumber(item.surahNumber || item.id)}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.surahName}>{item.nameBangla}</Text>
        <View style={styles.subInfo}>
          <Ionicons
            name="cube-outline"
            size={14}
            color="#666"
            style={{ marginRight: 4 }}
          />
          <Text style={styles.subText}>
            {convertToBanglaNumber(item.totalAyah)}
          </Text>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons name="heart-outline" size={24} color="#000" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={suraList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const convertToBanglaNumber = (num: number | null) => {
  if (num === null) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .split("")
    .map((digit) => banglaDigits[parseInt(digit)] || digit)
    .join("");
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFE8D8",
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D8CFC0",
  },
  numberContainer: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontSize: 18,
    color: "#333",
    fontFamily: "Galada_400Regular",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  surahName: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Galada_400Regular",
    marginBottom: 4,
  },
  subInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  subText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Galada_400Regular",
  },
});
