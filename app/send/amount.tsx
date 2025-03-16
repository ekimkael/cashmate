import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Pressable, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter, useLocalSearchParams } from "expo-router"
import { ArrowLeft, User } from "lucide-react-native"
import { contacts } from "@/mocks/data"
import { useTransactionStore } from "@/store/transactionStore"
import NumPad from "@/components/NumPad"
import Colors from "@/constants/colors"

export default function SendAmountScreen() {
	const router = useRouter()
	const { contactId, name } = useLocalSearchParams()
	const { addTransaction } = useTransactionStore()

	const [amount, setAmount] = useState("0")
	const [contact, setContact] = useState(null)

	useEffect(() => {
		if (contactId) {
			const foundContact = contacts.find((c) => c.id === contactId)
			if (foundContact) {
				setContact(foundContact)
			}
		}
	}, [contactId])

	const handleNumberPress = (number) => {
		if (amount === "0" && number !== ".") {
			setAmount(number)
		} else if (number === "." && amount.includes(".")) {
			// Don't add another decimal point
			return
		} else {
			setAmount(amount + number)
		}
	}

	const handleDeletePress = () => {
		if (amount.length > 1) {
			setAmount(amount.slice(0, -1))
		} else {
			setAmount("0")
		}
	}

	const handleSendPress = () => {
		if (!contact) return

		const numericAmount = parseFloat(amount)
		if (isNaN(numericAmount) || numericAmount <= 0) return

		addTransaction({
			type: "send",
			amount: numericAmount,
			user: {
				id: contact.id,
				name: contact.name,
				username: contact.username,
				avatar: contact.avatar,
			},
		})

		router.push({
			pathname: "/send/success",
			params: { amount, name: contact.name },
		})
	}

	return (
		<SafeAreaView style={styles.container}>
			<Stack.Screen options={{ title: `Send to ${name}` }} />

			<View style={styles.content}>
				<View style={styles.contactContainer}>
					{contact?.avatar ? (
						<Image source={{ uri: contact.avatar }} style={styles.avatar} />
					) : (
						<View style={styles.defaultAvatar}>
							<User size={32} color={Colors.dark.text} />
						</View>
					)}
					<Text style={styles.contactName}>{contact?.name}</Text>
					<Text style={styles.contactUsername}>@{contact?.username}</Text>
				</View>

				<View style={styles.amountContainer}>
					<Text style={styles.currencySymbol}>$</Text>
					<Text style={styles.amount}>{amount}</Text>
				</View>

				<View style={styles.noteContainer}>
					<Text style={styles.noteLabel}>For</Text>
					<Text style={styles.noteText}>Add a note</Text>
				</View>
			</View>

			<View style={styles.numPadContainer}>
				<NumPad
					onNumberPress={handleNumberPress}
					onDeletePress={handleDeletePress}
				/>

				<Pressable
					style={[
						styles.sendButton,
						parseFloat(amount) <= 0 && styles.sendButtonDisabled,
					]}
					onPress={handleSendPress}
					disabled={parseFloat(amount) <= 0}>
					<Text style={styles.sendButtonText}>Send</Text>
				</Pressable>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.dark.background,
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
		backgroundColor: Colors.dark.card,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	contactName: {
		color: Colors.dark.text,
		fontSize: 20,
		fontWeight: "600",
		marginBottom: 4,
	},
	contactUsername: {
		color: Colors.dark.secondaryText,
		fontSize: 16,
	},
	amountContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 32,
	},
	currencySymbol: {
		color: Colors.dark.text,
		fontSize: 36,
		fontWeight: "600",
		marginRight: 4,
	},
	amount: {
		color: Colors.dark.text,
		fontSize: 48,
		fontWeight: "600",
	},
	noteContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		width: "100%",
	},
	noteLabel: {
		color: Colors.dark.secondaryText,
		fontSize: 16,
		marginRight: 8,
	},
	noteText: {
		color: Colors.dark.secondaryText,
		fontSize: 16,
		flex: 1,
	},
	numPadContainer: {
		width: "100%",
	},
	sendButton: {
		backgroundColor: Colors.dark.primary,
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
		margin: 16,
	},
	sendButtonDisabled: {
		opacity: 0.5,
	},
	sendButtonText: {
		color: Colors.dark.background,
		fontSize: 18,
		fontWeight: "600",
	},
})
