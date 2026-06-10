import React from "react"
import { Stack } from "expo-router"
import { View, Text, StyleSheet, ScrollView } from "react-native"

import Colors, { useThemeColors } from "@/constants/colors"

export default function PrivacyPolicyScreen() {
  const C = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: C.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	lastUpdated: {
  		color: C.secondaryText,
  		fontSize: 14,
  		marginBottom: 24,
  	},
  	section: {
  		marginBottom: 24,
  	},
  	sectionTitle: {
  		color: C.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 12,
  	},
  	paragraph: {
  		color: C.text,
  		fontSize: 14,
  		lineHeight: 22,
  		marginBottom: 12,
  	},
  	bulletPoint: {
  		color: C.text,
  		fontSize: 14,
  		lineHeight: 22,
  		marginBottom: 8,
  		paddingLeft: 16,
  	},
  })
	return (
		<View style={styles.container}>
			<Stack.Screen options={{
				title: "Privacy Policy",
				headerLargeTitle: true,
				headerTransparent: true,
				headerShadowVisible: false,
				headerLargeTitleShadowVisible: false,
				headerLargeStyle: { backgroundColor: "transparent" },
				headerBlurEffect: "systemChromeMaterial",
			}} />

			<ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollContent}>
				<Text style={styles.lastUpdated}>Last Updated: June 1, 2023</Text>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>1. Introduction</Text>
					<Text style={styles.paragraph}>
						This Privacy Policy describes how Cash App collects, uses, and
						shares your personal information when you use our mobile
						application, website, and services (collectively, the "Services").
						We are committed to protecting your privacy and ensuring you have a
						positive experience using our Services.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>2. Information We Collect</Text>
					<Text style={styles.paragraph}>
						2.1 Information You Provide. We collect information you provide
						directly to us, including:
					</Text>
					<Text style={styles.bulletPoint}>
						• Personal information, such as your name, email address, phone
						number, date of birth, and government-issued ID
					</Text>
					<Text style={styles.bulletPoint}>
						• Financial information, such as bank account and payment card
						details
					</Text>
					<Text style={styles.bulletPoint}>
						• Profile information, such as your username, profile picture, and
						preferences
					</Text>
					<Text style={styles.bulletPoint}>
						• Communications you send to us
					</Text>

					<Text style={styles.paragraph}>
						2.2 Information We Collect Automatically. When you use our Services,
						we automatically collect certain information, including:
					</Text>
					<Text style={styles.bulletPoint}>
						• Device information, such as your IP address, device type,
						operating system, and browser type
					</Text>
					<Text style={styles.bulletPoint}>
						• Usage information, such as the pages or features you access, the
						time and duration of your visits, and your actions within the
						Services
					</Text>
					<Text style={styles.bulletPoint}>
						• Location information, such as your device's precise or approximate
						location
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						3. How We Use Your Information
					</Text>
					<Text style={styles.paragraph}>
						We use the information we collect to:
					</Text>
					<Text style={styles.bulletPoint}>
						• Provide, maintain, and improve our Services
					</Text>
					<Text style={styles.bulletPoint}>
						• Process transactions and send related information
					</Text>
					<Text style={styles.bulletPoint}>
						• Verify your identity and prevent fraud
					</Text>
					<Text style={styles.bulletPoint}>
						• Communicate with you about our Services
					</Text>
					<Text style={styles.bulletPoint}>• Personalize your experience</Text>
					<Text style={styles.bulletPoint}>
						• Comply with legal obligations
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						4. How We Share Your Information
					</Text>
					<Text style={styles.paragraph}>
						We may share your information with:
					</Text>
					<Text style={styles.bulletPoint}>
						• Other Cash App users as necessary to complete transactions
					</Text>
					<Text style={styles.bulletPoint}>
						• Service providers who perform services on our behalf
					</Text>
					<Text style={styles.bulletPoint}>
						• Financial institutions and payment processors
					</Text>
					<Text style={styles.bulletPoint}>
						• Law enforcement or government authorities when required by law
					</Text>
					<Text style={styles.bulletPoint}>
						• Other parties in connection with a merger, acquisition, or sale of
						assets
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>5. Your Choices</Text>
					<Text style={styles.paragraph}>
						You have several choices regarding your information:
					</Text>
					<Text style={styles.bulletPoint}>
						• Account Information: You can update your account information
						through the Cash App settings
					</Text>
					<Text style={styles.bulletPoint}>
						• Location Information: You can control whether Cash App collects
						precise location information through your device settings
					</Text>
					<Text style={styles.bulletPoint}>
						• Marketing Communications: You can opt out of receiving marketing
						emails by following the instructions in those emails
					</Text>
					<Text style={styles.bulletPoint}>
						• Cookies: You can manage cookies through your browser settings
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>6. Data Security</Text>
					<Text style={styles.paragraph}>
						We implement appropriate security measures to protect your personal
						information from unauthorized access, alteration, disclosure, or
						destruction. However, no method of transmission over the Internet or
						electronic storage is 100% secure, so we cannot guarantee absolute
						security.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>7. Children's Privacy</Text>
					<Text style={styles.paragraph}>
						Our Services are not directed to children under 18, and we do not
						knowingly collect personal information from children under 18. If we
						learn we have collected personal information from a child under 18,
						we will delete that information.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>
						8. Changes to This Privacy Policy
					</Text>
					<Text style={styles.paragraph}>
						We may update this Privacy Policy from time to time. If we make
						material changes, we will notify you by email or through the
						Services before the changes take effect.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>9. Contact Us</Text>
					<Text style={styles.paragraph}>
						If you have any questions about this Privacy Policy, please contact
						us at privacy@cashapp.com.
					</Text>
				</View>
			</ScrollView>
		</View>
	)
}

