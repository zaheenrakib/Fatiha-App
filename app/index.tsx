import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { suraList as ojifaList } from "../lib/ojifa";
import { Sura, suraList as quranSuraList } from "../lib/sura";

export default function Home() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"surah" | "ojifa">("surah");

  const suraData = activeTab === "surah" ? quranSuraList : ojifaList;

  const renderItem = ({ item }: { item: Sura }) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.card}
      onPress={() =>
        router.push({ pathname: "/surah/[id]", params: { id: item.id } } as any)
      }
    >
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{convertToBanglaNumber(item.id)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.surahName}>{item.nameBangla}</Text>
        <View style={styles.subInfo}>
          {item.surahNumber && (
            <>
              <Text style={styles.subText}>
                {convertToBanglaNumber(item.surahNumber)}
              </Text>
              <Ionicons name="cube-outline" size={14} color="#666" />
            </>
          )}
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
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "surah" && styles.activeTab]}
          onPress={() => setActiveTab("surah")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "surah" && styles.activeTabText,
            ]}
          >
            সূরা
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "ojifa" && styles.activeTab]}
          onPress={() => setActiveTab("ojifa")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "ojifa" && styles.activeTabText,
            ]}
          >
            আজিফা
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={suraData}
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
    backgroundColor: "#efebd8ff",
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: "#efebd8ff",
    borderBottomWidth: 1,
    borderBottomColor: "#D8CFC0",
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#8B4513", // Earthy brown for active state
  },
  tabText: {
    fontSize: 18,
    color: "#666",
    fontFamily: "Amiri_700Bold",
  },
  activeTabText: {
    color: "#000",
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
    fontFamily: "Amiri_700Bold",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  surahName: {
    fontSize: 18,
    color: "#000",
    fontFamily: "Amiri_400Regular",
    marginBottom: 4,
  },
  subInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  subText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Amiri_400Regular",
  },
});
