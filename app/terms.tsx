import React from "react"
import { Stack } from "expo-router"
import { View, Text, StyleSheet, ScrollView } from "react-native"

import { useThemeColors } from "@/constants/colors"

export default function TermsOfServiceScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	lastUpdated: {
  		color: colors.secondaryText,
  		fontSize: 14,
  		marginBottom: 24,
  	},
  	section: {
  		marginBottom: 24,
  	},
  	sectionTitle: {
  		color: colors.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 12,
  	},
  	paragraph: {
  		color: colors.text,
  		fontSize: 14,
  		lineHeight: 22,
  		marginBottom: 12,
  	},
  })
	return (
		<View style={styles.container}>
			<Stack.Screen options={{
				title: "Terms of Service",
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
						Welcome to Cash App. These Terms of Service ("Terms") govern your
						access to and use of the Cash App mobile application, website, and
						services (collectively, the "Services"). Please read these Terms
						carefully.
					</Text>
					<Text style={styles.paragraph}>
						By creating an account or using any of our Services, you agree to be
						bound by these Terms. If you don't agree to these Terms, you may not
						use the Services.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>2. Using Cash App</Text>
					<Text style={styles.paragraph}>
						2.1 Eligibility. To use Cash App, you must be at least 18 years old
						and reside in the United States. By creating an account, you
						represent that you meet these requirements.
					</Text>
					<Text style={styles.paragraph}>
						2.2 Account Registration. When you create an account, you must
						provide accurate and complete information. You are responsible for
						maintaining the security of your account and password. Cash App
						cannot and will not be liable for any loss or damage from your
						failure to comply with this security obligation.
					</Text>
					<Text style={styles.paragraph}>
						2.3 Prohibited Activities. You agree not to engage in any of the
						following prohibited activities: (i) copying, distributing, or
						disclosing any part of the Services; (ii) using any automated system
						to access the Services; (iii) transmitting any viruses or other code
						that might harm the Services; (iv) attempting to interfere with,
						compromise the system integrity or security, or decipher any
						transmissions to or from the servers running the Services.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>3. Payments and Transfers</Text>
					<Text style={styles.paragraph}>
						3.1 Payment Processing. Cash App allows you to send payments to and
						receive payments from other Cash App users. By using our payment
						services, you authorize us to process transactions on your behalf.
					</Text>
					<Text style={styles.paragraph}>
						3.2 Transaction Limits. We may impose limits on the amount of money
						you can send, receive, or transfer. These limits may be adjusted
						from time to time at our discretion.
					</Text>
					<Text style={styles.paragraph}>
						3.3 Refunds and Cancellations. Payments are typically instant and
						cannot be canceled. However, if the recipient does not have a Cash
						App account, they will need to create one to accept the payment, and
						you may be able to cancel the payment before they do so.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>4. Cash Card</Text>
					<Text style={styles.paragraph}>
						4.1 Eligibility. To be eligible for a Cash Card, you must have a
						Cash App account in good standing and meet our additional
						eligibility criteria.
					</Text>
					<Text style={styles.paragraph}>
						4.2 Use of Cash Card. The Cash Card is a prepaid card that allows
						you to use your Cash App balance to make purchases. You agree to use
						the Cash Card only for lawful purposes and in compliance with all
						applicable laws.
					</Text>
					<Text style={styles.paragraph}>
						4.3 Lost or Stolen Cards. If your Cash Card is lost or stolen, you
						should report it immediately through the Cash App. You may be
						responsible for unauthorized transactions that occur before you
						report the card lost or stolen.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>5. Privacy</Text>
					<Text style={styles.paragraph}>
						Your privacy is important to us. Our Privacy Policy explains how we
						collect, use, and protect your personal information. By using our
						Services, you agree to our Privacy Policy.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>6. Changes to Terms</Text>
					<Text style={styles.paragraph}>
						We may modify these Terms at any time. If we make changes, we will
						provide notice, such as by sending an email, providing a notice
						through our Services, or updating the date at the top of these
						Terms. Your continued use of the Services after the changes take
						effect will indicate your acceptance of the revised Terms.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>7. Termination</Text>
					<Text style={styles.paragraph}>
						We may suspend or terminate your access to the Services at any time,
						for any reason, without notice. You may also terminate your account
						at any time by contacting customer support.
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>8. Contact Information</Text>
					<Text style={styles.paragraph}>
						If you have any questions about these Terms, please contact us at
						support@cashapp.com.
					</Text>
				</View>
			</ScrollView>
		</View>
	)
}

