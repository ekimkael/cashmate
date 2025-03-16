import React from "react"
import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { User } from "lucide-react-native"
import { Contact } from "@/types"
import Colors from "@/constants/colors"

interface ContactItemProps {
	contact: Contact
	onPress: (contact: Contact) => void
}

export default function ContactItem({ contact, onPress }: ContactItemProps) {
	return (
		<Pressable
			style={({ pressed }) => [styles.container, pressed && styles.pressed]}
			onPress={() => onPress(contact)}>
			<View style={styles.avatarContainer}>
				{contact.avatar ? (
					<Image source={{ uri: contact.avatar }} style={styles.avatar} />
				) : (
					<View style={styles.defaultAvatar}>
						<User size={20} color={Colors.dark.text} />
					</View>
				)}
			</View>
			<View style={styles.details}>
				<Text style={styles.name}>{contact.name}</Text>
				<Text style={styles.username}>@{contact.username}</Text>
			</View>
		</Pressable>
	)
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 12,
		paddingHorizontal: 16,
		borderRadius: 12,
	},
	pressed: {
		backgroundColor: Colors.dark.card,
	},
	avatarContainer: {
		marginRight: 12,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
	},
	defaultAvatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: Colors.dark.card,
		alignItems: "center",
		justifyContent: "center",
	},
	details: {
		flex: 1,
	},
	name: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	username: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
})
