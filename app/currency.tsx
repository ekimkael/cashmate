import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { Check, Search } from "lucide-react-native"
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native"

import Colors, { useThemeColors } from "@/constants/colors"

export default function CurrencyScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	search: {
  		padding: 16,
  		paddingTop: 0,
  	},
  	searchBar: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 12,
  	},
  	searchPlaceholder: {
  		color: C.secondaryText,
  		fontSize: 16,
  		marginLeft: 12,
  	},
  	list: { padding: 16 },
  	currencyItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		justifyContent: "space-between",
  		paddingVertical: 16,
  		borderBottomWidth: 1,
  		borderBottomColor: C.border,
  	},
  	currencyInfo: {
  		gap: 16,
  		flexDirection: "row",
  		alignItems: "center",
  	},
  	currencySymbol: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		alignItems: "center",
  		justifyContent: "center",
  		backgroundColor: C.card,
  	},
  	currencySymbolText: {
  		textAlign: "center",
  		fontSize: 18,
  		fontWeight: "600",
  		color: C.text,
  	},
  	currencyName: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	currencyCode: {
  		color: C.secondaryText,
  		fontSize: 14,
  		marginTop: 4,
  	},
  })
	const router = useRouter()
	const [selectedCurrency, setSelectedCurrency] = useState("USD")

	const currencies = [
		{ code: "USD", name: "US Dollar", symbol: "$" },
		{ code: "EUR", name: "Euro", symbol: "€" },
		{ code: "GBP", name: "British Pound", symbol: "£" },
		{ code: "JPY", name: "Japanese Yen", symbol: "¥" },
		{ code: "CAD", name: "Canadian Dollar", symbol: "C$" },
		{ code: "AUD", name: "Australian Dollar", symbol: "A$" },
		{ code: "CHF", name: "Swiss Franc", symbol: "Fr" },
		{ code: "CNY", name: "Chinese Yuan", symbol: "¥" },
		{ code: "INR", name: "Indian Rupee", symbol: "₹" },
		{ code: "BRL", name: "Brazilian Real", symbol: "R$" },
		{ code: "RUB", name: "Russian Ruble", symbol: "₽" },
		{ code: "KRW", name: "South Korean Won", symbol: "₩" },
		{ code: "SGD", name: "Singapore Dollar", symbol: "S$" },
		{ code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
		{ code: "MXN", name: "Mexican Peso", symbol: "Mex$" },
	]

	const handleSelect = (currencyCode: React.SetStateAction<string>) => {
		setSelectedCurrency(currencyCode)
		// In a real app, you would update this in a global state or user preferences
		setTimeout(() => {
			router.back()
		}, 500)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen
				options={{
					title: "Currency",
					headerTintColor: C.text,
					headerBackButtonDisplayMode: "minimal",
					headerStyle: { backgroundColor: C.background },
				}}
			/>

			<View style={styles.search}>
				<View style={styles.searchBar}>
					<Search size={20} color={C.secondaryText} />
					<Text style={styles.searchPlaceholder}>Search currencies</Text>
				</View>
			</View>

			<FlatList
				data={currencies}
				contentContainerStyle={styles.list}
				renderItem={({ item }) => (
					<Pressable
						key={item.code}
						style={styles.currencyItem}
						onPress={() => handleSelect(item.code)}>
						<View style={styles.currencyInfo}>
							<View style={styles.currencySymbol}>
								<Text style={styles.currencySymbolText}>{item.symbol}</Text>
							</View>

							<View>
								<Text style={styles.currencyName}>{item.name}</Text>
								<Text style={styles.currencyCode}>{item.code}</Text>
							</View>
						</View>

						{selectedCurrency === item.code && (
							<Check size={24} color={C.primary} />
						)}
					</Pressable>
				)}
			/>
		</View>
	)
}

