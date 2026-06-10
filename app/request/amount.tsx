import React, { useState, useEffect, useMemo } from "react"
import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter, useLocalSearchParams } from "expo-router"
import { User } from "lucide-react-native"
import { useAmountInput } from "@/hooks/use-amount-input"
import { contacts } from "@/mocks/data"
import { type Contact } from "@/types"
import NumPad from "@/components/ui/num-pad"
import { useThemeColors } from "@/constants/colors"

export default function RequestAmountScreen() {
	const colors = useThemeColors()
	const router = useRouter()
	const { contactId, name } = useLocalSearchParams()

	const { amount, handleNumberPress, handleDeletePress } = useAmountInput()
	const [contact, setContact] = useState<Contact | null>(null)

	const dynamic = useMemo(() => ({
		container: { backgroundColor: colors.background },
		defaultAvatar: { backgroundColor: colors.card },
		contactName: { color: colors.text },
		contactUsername: { color: colors.secondaryText },
		currencySymbol: { color: colors.text },
		amount: { color: colors.text },
		noteContainer: { backgroundColor: colors.card },
		noteLabel: { color: colors.secondaryText },
		noteText: { color: colors.secondaryText },
		actionButton: { backgroundColor: colors.primary },
		actionButtonText: { color: colors.background },
	}), [colors])

	useEffect(() => {
		if (contactId) {
			const foundContact = contacts.find((c) => c.id === contactId)
			if (foundContact) setContact(foundContact)
		}
	}, [contactId])

	const handleRequestPress = () => {
		if (!contact) return
		const numericAmount = parseFloat(amount)
		if (isNaN(numericAmount) || numericAmount <= 0) return

		router.push({ pathname: "/request/success", params: { amount, name: contact.name } })
	}

	return (
		<SafeAreaView style={[styles.container, dynamic.container]}>
			<Stack.Screen options={{ title: `Request from ${name}` }} />

			<View style={styles.content}>
				<View style={styles.contactContainer}>
					{contact?.avatar ? (
						<Image source={{ uri: contact.avatar }} style={styles.avatar} />
					) : (
						<View style={[styles.defaultAvatar, dynamic.defaultAvatar]}>
							<User size={32} color={colors.text} />
						</View>
					)}
					<Text style={[styles.contactName, dynamic.contactName]}>{contact?.name}</Text>
					<Text style={[styles.contactUsername, dynamic.contactUsername]}>@{contact?.username}</Text>
				</View>

				<View style={styles.amountContainer}>
					<Text style={[styles.currencySymbol, dynamic.currencySymbol]}>$</Text>
					<Text style={[styles.amount, dynamic.amount]}>{amount}</Text>
				</View>

				<View style={[styles.noteContainer, dynamic.noteContainer]}>
					<Text style={[styles.noteLabel, dynamic.noteLabel]}>For</Text>
					<Text style={[styles.noteText, dynamic.noteText]}>Add a note</Text>
				</View>
			</View>

			<View style={styles.numPadContainer}>
				<NumPad onNumberPress={handleNumberPress} onDeletePress={handleDeletePress} />
				<Pressable
					style={[styles.actionButton, dynamic.actionButton, parseFloat(amount) <= 0 && styles.actionButtonDisabled]}
					onPress={handleRequestPress}
					disabled={parseFloat(amount) <= 0}
				>
					<Text style={[styles.actionButtonText, dynamic.actionButtonText]}>Request</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},
	contactContainer: {
		alignItems: "center",
		marginBottom: 32,
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		marginBottom: 16,
	},
	defaultAvatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	contactName: {
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 4,
	},
	contactUsername: {
		fontSize: 16,
	},
	amountContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 32,
	},
	currencySymbol: {
		fontSize: 36,
		fontWeight: "600",
		marginRight: 4,
	},
	amount: {
		fontSize: 48,
		fontWeight: "600",
	},
	noteContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 12,
		padding: 16,
		width: "100%",
	},
	noteLabel: {
		fontSize: 16,
		marginRight: 8,
	},
	noteText: {
		fontSize: 16,
		flex: 1,
	},
	numPadContainer: {
		width: "100%",
	},
	actionButton: {
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
		margin: 16,
	},
	actionButtonDisabled: {
		opacity: 0.5,
	},
	actionButtonText: {
		fontSize: 18,
		fontWeight: "600",
	},
})
