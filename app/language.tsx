import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { Check, Search } from "lucide-react-native"
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native"

import { useThemeColors } from "@/constants/colors"

export default function LanguageScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	search: { padding: 16, paddingTop: 0 },
  	searchBar: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 12,
  	},
  	searchPlaceholder: {
  		color: colors.secondaryText,
  		fontSize: 16,
  		marginLeft: 12,
  	},
  	list: { padding: 16 },
  	languageItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		justifyContent: "space-between",
  		paddingVertical: 16,
  		borderBottomWidth: 1,
  		borderBottomColor: colors.border,
  	},
  	languageName: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  })
	const router = useRouter()
	const [selectedLanguage, setSelectedLanguage] = useState("en-US")

	const languages = [
		{ code: "en-US", name: "English (US)" },
		{ code: "en-GB", name: "English (UK)" },
		{ code: "es", name: "Español (Spanish)" },
		{ code: "fr", name: "Français (French)" },
		{ code: "de", name: "Deutsch (German)" },
		{ code: "it", name: "Italiano (Italian)" },
		{ code: "pt", name: "Português (Portuguese)" },
		{ code: "ru", name: "Русский (Russian)" },
		{ code: "ja", name: "日本語 (Japanese)" },
		{ code: "zh-CN", name: "中文 (Chinese Simplified)" },
		{ code: "zh-TW", name: "中文 (Chinese Traditional)" },
		{ code: "ko", name: "한국어 (Korean)" },
		{ code: "ar", name: "العربية (Arabic)" },
		{ code: "hi", name: "हिन्दी (Hindi)" },
		{ code: "tr", name: "Türkçe (Turkish)" },
	]

	const handleSelect = (languageCode: React.SetStateAction<string>) => {
		setSelectedLanguage(languageCode)
		// In a real app, you would update this in a global state or user preferences
		setTimeout(() => {
			router.back()
		}, 500)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "Language",
					headerTintColor: colors.text,
					headerBackButtonDisplayMode: "minimal",
					headerStyle: { backgroundColor: colors.background },
				}}
			/>

			<View style={styles.search}>
				<View style={styles.searchBar}>
					<Search size={20} color={colors.secondaryText} />
					<Text style={styles.searchPlaceholder}>Search languages</Text>
				</View>
			</View>

			<FlatList
				data={languages}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<Pressable
						key={item.code}
						style={styles.languageItem}
						onPress={() => handleSelect(item.code)}>
						<Text style={styles.languageName}>{item.name}</Text>
						{selectedLanguage === item.code && (
							<Check size={24} color={colors.primary} />
						)}
					</Pressable>
				)}
			/>
		</View>
	)
}

