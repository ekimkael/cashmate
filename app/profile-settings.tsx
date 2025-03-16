import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Pressable,
	TextInput,
} from "react-native"
import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react-native"

import Colors from "@/constants/colors"
import { useUserStore } from "@/store/userStore"

export default function ProfileSettingsScreen() {
	const router = useRouter()
	const { user, updateUser } = useUserStore()

	const [profile, setProfile] = useState({
		name: user?.name || "",
		email: user?.email || "",
		phone: user?.phone || "",
		address: user?.address || "",
		birthdate: user?.birthdate || "",
	})

	const handleChange = (field, value) => {
		setProfile({
			...profile,
			[field]: value,
		})
	}

	const handleSave = () => {
		updateUser({
			...user,
			...profile,
		})
		router.back()
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Profile Information" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.profileImageContainer}>
					<View style={styles.profileImage}>
						<User size={40} color={Colors.dark.text} />
					</View>
					<Pressable style={styles.changePhotoButton}>
						<Text style={styles.changePhotoText}>Change Photo</Text>
					</Pressable>
				</View>

				<View style={styles.section}>
					<View style={styles.inputContainer}>
						<View style={styles.inputIcon}>
							<User size={20} color={Colors.dark.text} />
						</View>
						<TextInput
							style={styles.input}
							placeholder="Full Name"
							placeholderTextColor={Colors.dark.secondaryText}
							value={profile.name}
							onChangeText={(text) => handleChange("name", text)}
							selectionColor={Colors.dark.primary}
						/>
					</View>

					<View style={styles.inputContainer}>
						<View style={styles.inputIcon}>
							<Mail size={20} color={Colors.dark.text} />
						</View>
						<TextInput
							style={styles.input}
							placeholder="Email Address"
							placeholderTextColor={Colors.dark.secondaryText}
							value={profile.email}
							onChangeText={(text) => handleChange("email", text)}
							keyboardType="email-address"
							selectionColor={Colors.dark.primary}
						/>
					</View>

					<View style={styles.inputContainer}>
						<View style={styles.inputIcon}>
							<Phone size={20} color={Colors.dark.text} />
						</View>
						<TextInput
							style={styles.input}
							placeholder="Phone Number"
							placeholderTextColor={Colors.dark.secondaryText}
							value={profile.phone}
							onChangeText={(text) => handleChange("phone", text)}
							keyboardType="phone-pad"
							selectionColor={Colors.dark.primary}
						/>
					</View>

					<View style={styles.inputContainer}>
						<View style={styles.inputIcon}>
							<MapPin size={20} color={Colors.dark.text} />
						</View>
						<TextInput
							style={styles.input}
							placeholder="Address"
							placeholderTextColor={Colors.dark.secondaryText}
							value={profile.address}
							onChangeText={(text) => handleChange("address", text)}
							selectionColor={Colors.dark.primary}
						/>
					</View>

					<View style={styles.inputContainer}>
						<View style={styles.inputIcon}>
							<Calendar size={20} color={Colors.dark.text} />
						</View>
						<TextInput
							style={styles.input}
							placeholder="Date of Birth (MM/DD/YYYY)"
							placeholderTextColor={Colors.dark.secondaryText}
							value={profile.birthdate}
							onChangeText={(text) => handleChange("birthdate", text)}
							selectionColor={Colors.dark.primary}
						/>
					</View>
				</View>

				<Pressable style={styles.saveButton} onPress={handleSave}>
					<Text style={styles.saveButtonText}>Save Changes</Text>
				</Pressable>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.dark.background,
	},
	scrollContent: {
		padding: 20,
	},
	profileImageContainer: {
		alignItems: "center",
		marginBottom: 32,
	},
	profileImage: {
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: Colors.dark.card,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 16,
	},
	changePhotoButton: {
		padding: 8,
	},
	changePhotoText: {
		color: Colors.dark.primary,
		fontSize: 16,
		fontWeight: "500",
	},
	section: {
		marginBottom: 32,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
	},
	inputIcon: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.dark.inputBackground,
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	input: {
		flex: 1,
		color: Colors.dark.text,
		fontSize: 16,
	},
	saveButton: {
		backgroundColor: Colors.dark.primary,
		borderRadius: 12,
		padding: 16,
		alignItems: "center",
		justifyContent: "center",
	},
	saveButtonText: {
		color: Colors.dark.background,
		fontSize: 16,
		fontWeight: "600",
	},
})
