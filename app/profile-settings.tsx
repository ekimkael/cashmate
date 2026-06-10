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

import Colors, { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"
import { useUserStore } from '@/store/user-store'

export default function ProfileSettingsScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
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
  		backgroundColor: colors.card,
  		alignItems: "center",
  		justifyContent: "center",
  		marginBottom: 16,
  	},
  	changePhotoButton: {
  		padding: 8,
  	},
  	changePhotoText: {
  		color: colors.primary,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  	section: {
  		marginBottom: 32,
  	},
  	inputContainer: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 16,
  	},
  	inputIcon: {
  		width: 40,
  		height: 40,
  		borderRadius: 20,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 12,
  	},
  	input: {
  		flex: 1,
  		color: colors.text,
  		fontSize: 16,
  	},
  })
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
						<User size={40} color={colors.text} />
					</View>
					<Pressable style={styles.changePhotoButton}>
						<Text style={styles.changePhotoText}>Change Photo</Text>
					</Pressable>
				</View>

				<View style={styles.section}>
					<View style={styles.inputContainer}>
						<View style={styles.inputIcon}>
							<User size={20} color={colors.text} />
						</View>
						<TextInput
							style={styles.input}
							placeholder="Full Name"
							placeholderTextColor={colors.secondaryText}
							value={profile.name}
							onChangeText={(text) => handleChange("name", text)}
							selectionColor={colors.primary}
						/>
					</View>

					<View style={styles.inputContainer}>
						<View style={styles.inputIcon}>
							<Mail size={20} color={colors.text} />
						</View>
						<TextInput
							style={styles.input}
							placeholder="Email Address"
							placeholderTextColor={colors.secondaryText}
							value={profile.email}
							onChangeText={(text) => handleChange("email", text)}
							keyboardType="email-address"
							selectionColor={colors.primary}
						/>
					</View>

					<View style={styles.inputContainer}>
						<View style={styles.inputIcon}>
							<Phone size={20} color={colors.text} />
						</View>
						<TextInput
							style={styles.input}
							placeholder="Phone Number"
							placeholderTextColor={colors.secondaryText}
							value={profile.phone}
							onChangeText={(text) => handleChange("phone", text)}
							keyboardType="phone-pad"
							selectionColor={colors.primary}
						/>
					</View>

					<View style={styles.inputContainer}>
						<View style={styles.inputIcon}>
							<MapPin size={20} color={colors.text} />
						</View>
						<TextInput
							style={styles.input}
							placeholder="Address"
							placeholderTextColor={colors.secondaryText}
							value={profile.address}
							onChangeText={(text) => handleChange("address", text)}
							selectionColor={colors.primary}
						/>
					</View>

					<View style={styles.inputContainer}>
						<View style={styles.inputIcon}>
							<Calendar size={20} color={colors.text} />
						</View>
						<TextInput
							style={styles.input}
							placeholder="Date of Birth (MM/DD/YYYY)"
							placeholderTextColor={colors.secondaryText}
							value={profile.birthdate}
							onChangeText={(text) => handleChange("birthdate", text)}
							selectionColor={colors.primary}
						/>
					</View>
				</View>

				<Button label="Save Changes" onPress={handleSave} />
			</ScrollView>
		</View>
	)
}

