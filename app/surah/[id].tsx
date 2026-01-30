import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ayah, suraList } from "../../lib/sura";

export default function SurahDetails() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const surah = suraList.find((s) => s.id === Number(id));

  useEffect(() => {
    if (surah) {
      navigation.setOptions({
        title: surah.nameBangla,
        headerTitleStyle: { fontFamily: "Galada_400Regular", fontSize: 20 },
      });
    }
  }, [surah, navigation]);

  if (!surah) {
    return (
      <View style={styles.center}>
        <Text>Surah not found</Text>
      </View>
    );
  }

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerDecor}>
        <Text style={styles.headerTitle}>{surah.nameBangla}</Text>
        <Text style={styles.headerArabicTitle}>{surah.nameArabic}</Text>
        <Text style={styles.headerSubtitle}>
          সূরা: {convertToBanglaNumber(surah.surahNumber || surah.id)}, আয়াত:{" "}
          {convertToBanglaNumber(surah.totalAyah)}
        </Text>
        {/* Bismillah - Showing for all except At-Tawbah (9) usually, but logic is simple here */}
        {surah.surahNumber !== 9 && (
          <View style={styles.bismillahContainer}>
            <Text style={styles.bismillahText}>
              بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderAyah = ({ item }: { item: Ayah }) => (
    <View style={styles.ayahContainer}>
      {/* Top markers */}
      <View style={styles.ayahHeader}>
        <Text style={styles.ayahNumber}>
          {convertToBanglaNumber(item.ayahNumber)}
        </Text>
        <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
      </View>

      {/* Arabic Text */}
      <Text style={styles.arabicText}>{item.arabic}</Text>

      {/* Bangla Pronunciation & Meaning */}
      <View style={styles.translationContainer}>
        <Text style={styles.banglaPronunciation}>{item.banglaUccaron}</Text>
        <Text style={styles.banglaTranslation}>{item.banglaMeaning}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={surah.ayahs}
        keyExtractor={(item) => item.ayahNumber.toString()}
        renderItem={renderAyah}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      {/* Player Bar Placeholder */}
      <View style={styles.playerBar}>
        <Ionicons name="play-skip-back" size={24} color="#666" />
        <Ionicons name="play" size={32} color="#000" />
        <Ionicons name="square" size={18} color="#666" />
        <Ionicons name="play-skip-forward" size={24} color="#666" />
      </View>
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
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingBottom: 100, // Space for player bar
  },
  headerContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#D8CFC0",
    backgroundColor: "#EDE5D4",
    alignItems: "center",
    marginBottom: 10,
  },
  headerDecor: {
    width: "100%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    padding: 16,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 22,
    color: "#000",
    fontFamily: "Galada_400Regular",
    marginBottom: 4,
  },
  headerArabicTitle: {
    fontSize: 24,
    color: "#000",
    fontFamily: "Amiri_700Bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#444",
    fontFamily: "Galada_400Regular",
    marginBottom: 16,
  },
  bismillahContainer: {
    marginTop: 8,
  },
  bismillahText: {
    fontSize: 24,
    fontFamily: "Amiri_700Bold", // Using Bold for Bismillah header
    color: "#000",
  },
  ayahContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E0D8C8",
  },
  ayahHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  ayahNumber: {
    fontSize: 14,
    fontFamily: "Galada_400Regular",
    color: "#444",
  },
  arabicText: {
    fontSize: 28,
    fontFamily: "Amiri_400Regular",
    color: "#000",
    textAlign: "right",
    marginBottom: 16,
    lineHeight: 45,
  },
  translationContainer: {
    backgroundColor: "#E8E0D0",
    padding: 12,
    borderRadius: 8,
  },
  banglaPronunciation: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Galada_400Regular",
    marginBottom: 6,
  },
  banglaTranslation: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Galada_400Regular",
  },
  playerBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: "#E6DDD0",
    borderTopWidth: 1,
    borderTopColor: "#D0C8B8",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 40,
  },
});
