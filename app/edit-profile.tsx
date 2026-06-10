import {
	View,
	Text,
	Image,
	TextInput,
	Pressable,
	StyleSheet,
} from "react-native"
import React, { useState } from "react"
import { Stack, useRouter } from "expo-router"
import * as ImagePicker from "expo-image-picker"
import { Camera, User, Mail, AtSign } from "lucide-react-native"

import { useThemeColors } from "@/constants/colors"
import Button from "@/components/ui/button"
import { useUserStore } from '@/store/user-store'

export default function EditProfileScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	content: {
  		flex: 1,
  		padding: 20,
  	},
  	avatarContainer: {
  		alignItems: "center",
  		marginBottom: 32,
  	},
  	avatar: {
  		width: 100,
  		height: 100,
  		borderRadius: 50,
  		marginBottom: 16,
  	},
  	defaultAvatar: {
  		width: 100,
  		height: 100,
  		borderRadius: 50,
  		backgroundColor: colors.card,
  		alignItems: "center",
  		justifyContent: "center",
  		marginBottom: 16,
  	},
  	changePhotoButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 20,
  		paddingVertical: 8,
  		paddingHorizontal: 16,
  	},
  	changePhotoText: {
  		color: colors.text,
  		fontSize: 14,
  		fontWeight: "500",
  		marginLeft: 8,
  	},
  	errorContainer: {
  		backgroundColor: "rgba(255, 67, 42, 0.1)",
  		borderRadius: 8,
  		padding: 12,
  		marginBottom: 20,
  	},
  	errorText: {
  		color: colors.error,
  		fontSize: 14,
  	},
  	form: {
  		marginBottom: 32,
  	},
  	inputGroup: {
  		marginBottom: 20,
  	},
  	inputLabel: {
  		color: colors.text,
  		fontSize: 14,
  		fontWeight: "500",
  		marginBottom: 8,
  	},
  	inputContainer: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.inputBackground,
  		borderRadius: 12,
  		paddingHorizontal: 16,
  	},
  	inputIcon: {
  		marginRight: 12,
  	},
  	input: {
  		flex: 1,
  		height: 56,
  		color: colors.text,
  		fontSize: 16,
  	},
  	footer: {
  		padding: 20,
  		borderTopWidth: 1,
  		borderTopColor: colors.border,
  	},
  })
	const router = useRouter()
	const { user, setUser } = useUserStore()

	const [name, setName] = useState(user?.name || "")
	const [username, setUsername] = useState(user?.username || "")
	const [email, setEmail] = useState(user?.email || "")
	const [avatar, setAvatar] = useState(user?.avatar || null)
	const [error, setError] = useState("")

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		})

		if (!result.canceled) {
			setAvatar(result.assets[0].uri)
		}
	}

	const handleSave = () => {
		if (!name || !username || !email) {
			setError("Please fill in all required fields")
			return
		}

		if (user) {
			setUser({
				...user,
				name,
				username,
				email,
				avatar,
			})

			router.back()
		}
	}

	if (!user) {
		return (
			<View style={styles.container}>
				<Text style={styles.errorText}>User not found</Text>
			</View>
		)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Edit Profile" }} />

			<View style={styles.content}>
				<View style={styles.avatarContainer}>
					{avatar ? (
						<Image source={{ uri: avatar }} style={styles.avatar} />
					) : (
						<View style={styles.defaultAvatar}>
							<User size={40} color={colors.text} />
						</View>
					)}
					<Pressable style={styles.changePhotoButton} onPress={pickImage}>
						<Camera size={20} color={colors.text} />
						<Text style={styles.changePhotoText}>Change Photo</Text>
					</Pressable>
				</View>

				{error ? (
					<View style={styles.errorContainer}>
						<Text style={styles.errorText}>{error}</Text>
					</View>
				) : null}

				<View style={styles.form}>
					<View style={styles.inputGroup}>
						<Text style={styles.inputLabel}>Full Name</Text>
						<View style={styles.inputContainer}>
							<User
								size={20}
								color={colors.secondaryText}
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder="Full Name"
								placeholderTextColor={colors.secondaryText}
								value={name}
								onChangeText={setName}
							/>
						</View>
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.inputLabel}>Username</Text>
						<View style={styles.inputContainer}>
							<AtSign
								size={20}
								color={colors.secondaryText}
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder="Username"
								placeholderTextColor={colors.secondaryText}
								value={username}
								onChangeText={setUsername}
								autoCapitalize="none"
							/>
						</View>
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.inputLabel}>Email</Text>
						<View style={styles.inputContainer}>
							<Mail
								size={20}
								color={colors.secondaryText}
								style={styles.inputIcon}
							/>
							<TextInput
								style={styles.input}
								placeholder="Email"
								placeholderTextColor={colors.secondaryText}
								value={email}
								onChangeText={setEmail}
								autoCapitalize="none"
								keyboardType="email-address"
							/>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.footer}>
				<Button label="Save Changes" onPress={handleSave} />
			</View>
		</View>
	)
}

