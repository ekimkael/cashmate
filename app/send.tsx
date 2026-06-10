import React, { useState } from "react"
import { Search } from "lucide-react-native"
import { Stack, useRouter } from "expo-router"
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native"

import { contacts } from "@/mocks/data"
import Colors, { useThemeColors } from "@/constants/colors"

import ContactItem from "@/components/ui/contact-item"

export default function SendScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	searchContainer: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: C.inputBackground,
  		borderRadius: 12,
  		margin: 16,
  		paddingHorizontal: 12,
  	},
  	searchIcon: {
  		marginRight: 8,
  	},
  	searchInput: {
  		flex: 1,
  		height: 48,
  		color: C.text,
  		fontSize: 16,
  	},
  	recentSection: {
  		marginBottom: 24,
  	},
  	sectionTitle: {
  		color: C.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginHorizontal: 16,
  		marginBottom: 12,
  		marginTop: 8,
  	},
  	recentList: {
  		paddingHorizontal: 16,
  	},
  	emptyContainer: {
  		padding: 20,
  		alignItems: "center",
  	},
  	emptyText: {
  		color: C.secondaryText,
  		fontSize: 16,
  	},
  })
	const router = useRouter()
	const [searchQuery, setSearchQuery] = useState("")

	const filteredContacts = contacts.filter(
		(contact) =>
			contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			contact.username.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const recentContacts = contacts.filter((contact) => contact.recentlyUsed)

	const handleContactPress = (contact: { id: string; name: string }) => {
		router.push({
			pathname: "/send/amount",
			params: { contactId: contact.id, name: contact.name },
		})
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Send Money" }} />

			<View style={styles.searchContainer}>
				<Search
					size={20}
					color={C.secondaryText}
					style={styles.searchIcon}
				/>
				<TextInput
					style={styles.searchInput}
					placeholder="Search name or $cashtag"
					placeholderTextColor={C.secondaryText}
					value={searchQuery}
					onChangeText={setSearchQuery}
					autoCapitalize="none"
				/>
			</View>

			{searchQuery.length === 0 && (
				<View style={styles.recentSection}>
					<Text style={styles.sectionTitle}>Recent</Text>
					<FlatList
						data={recentContacts}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<ContactItem contact={item} onPress={handleContactPress} />
						)}
						horizontal
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.recentList}
					/>
				</View>
			)}

			<FlatList
				data={filteredContacts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ContactItem contact={item} onPress={handleContactPress} />
				)}
				ListHeaderComponent={
					<Text style={styles.sectionTitle}>
						{searchQuery.length > 0 ? "Search Results" : "All Contacts"}
					</Text>
				}
				ListEmptyComponent={
					<View style={styles.emptyContainer}>
						<Text style={styles.emptyText}>No contacts found</Text>
					</View>
				}
			/>
		</View>
	)
}

