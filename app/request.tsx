import React, { useState } from "react"
import { Search } from "lucide-react-native"
import { Stack, useRouter } from "expo-router"
import { View, Text, StyleSheet, FlatList, TextInput } from "react-native"

import { contacts } from "@/mocks/data"
import Colors from "@/constants/colors"

import ContactItem from "@/components/ContactItem"

export default function RequestScreen() {
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
			pathname: "/request/amount",
			params: { contactId: contact.id, name: contact.name },
		})
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Request Money" }} />

			<View style={styles.searchContainer}>
				<Search
					size={20}
					color={Colors.dark.secondaryText}
					style={styles.searchIcon}
				/>
				<TextInput
					style={styles.searchInput}
					placeholder="Search name or $cashtag"
					placeholderTextColor={Colors.dark.secondaryText}
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.dark.background,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.inputBackground,
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
		color: Colors.dark.text,
		fontSize: 16,
	},
	recentSection: {
		marginBottom: 24,
	},
	sectionTitle: {
		color: Colors.dark.text,
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
		color: Colors.dark.secondaryText,
		fontSize: 16,
	},
})
