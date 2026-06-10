import React, { useState } from "react"
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Pressable,
	TextInput,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Stack, useRouter } from "expo-router"
import { ArrowLeft, User, Search, X } from "lucide-react-native"
import Colors, { useThemeColors } from "@/constants/colors"

export default function BlockedUsersScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	searchContainer: {
  		padding: 16,
  		borderBottomWidth: 1,
  		borderBottomColor: C.border,
  	},
  	searchBar: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 12,
  	},
  	searchInput: {
  		flex: 1,
  		color: C.text,
  		fontSize: 16,
  		marginLeft: 12,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	description: {
  		color: C.secondaryText,
  		fontSize: 16,
  		marginBottom: 24,
  	},
  	section: {
  		marginBottom: 24,
  	},
  	userItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	userAvatar: {
  		width: 48,
  		height: 48,
  		borderRadius: 24,
  		backgroundColor: C.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 16,
  	},
  	userInfo: {
  		flex: 1,
  	},
  	userName: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginBottom: 4,
  	},
  	userUsername: {
  		color: C.secondaryText,
  		fontSize: 14,
  	},
  	unblockButton: {
  		backgroundColor: C.inputBackground,
  		borderRadius: 8,
  		paddingHorizontal: 12,
  		paddingVertical: 8,
  	},
  	unblockButtonText: {
  		color: C.primary,
  		fontSize: 14,
  		fontWeight: "600",
  	},
  	emptyState: {
  		alignItems: "center",
  		justifyContent: "center",
  		padding: 32,
  	},
  	emptyStateText: {
  		color: C.secondaryText,
  		fontSize: 16,
  		textAlign: "center",
  	},
  	infoBox: {
  		backgroundColor: C.card,
  		borderRadius: 12,
  		padding: 16,
  	},
  	infoTitle: {
  		color: C.text,
  		fontSize: 16,
  		fontWeight: "600",
  		marginBottom: 12,
  	},
  	infoText: {
  		color: C.secondaryText,
  		fontSize: 14,
  		lineHeight: 22,
  	},
  })
	const router = useRouter()

	const [blockedUsers, setBlockedUsers] = useState([
		{ id: "1", name: "John Smith", username: "@johnsmith" },
		{ id: "2", name: "Sarah Johnson", username: "@sarahj" },
		{ id: "3", name: "Michael Brown", username: "@mikebrown" },
	])

	const handleUnblock = (userId) => {
		setBlockedUsers(blockedUsers.filter((user) => user.id !== userId))
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Blocked Users" }} />

			<View style={styles.searchContainer}>
				<View style={styles.searchBar}>
					<Search size={20} color={C.secondaryText} />
					<TextInput
						style={styles.searchInput}
						placeholder="Search blocked users"
						placeholderTextColor={C.secondaryText}
						selectionColor={C.primary}
					/>
				</View>
			</View>

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Text style={styles.description}>
					Blocked users cannot send you money, request money from you, or see
					your activity.
				</Text>

				<View style={styles.section}>
					{blockedUsers.length > 0 ? (
						blockedUsers.map((user) => (
							<View key={user.id} style={styles.userItem}>
								<View style={styles.userAvatar}>
									<User size={24} color={C.text} />
								</View>
								<View style={styles.userInfo}>
									<Text style={styles.userName}>{user.name}</Text>
									<Text style={styles.userUsername}>{user.username}</Text>
								</View>
								<Pressable
									style={styles.unblockButton}
									onPress={() => handleUnblock(user.id)}>
									<Text style={styles.unblockButtonText}>Unblock</Text>
								</Pressable>
							</View>
						))
					) : (
						<View style={styles.emptyState}>
							<Text style={styles.emptyStateText}>
								You haven't blocked any users
							</Text>
						</View>
					)}
				</View>

				<View style={styles.infoBox}>
					<Text style={styles.infoTitle}>How blocking works</Text>
					<Text style={styles.infoText}>
						• Blocked users won't be able to find you in search{"\n"}• They
						can't send you money or payment requests{"\n"}• They won't see your
						activity or profile{"\n"}• You won't receive notifications from them
						{"\n"}• You can unblock a user at any time
					</Text>
				</View>
			</ScrollView>
		</View>
	)
}

