import React from "react"
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Pressable,
	TextInput,
} from "react-native"
import { Stack, useRouter } from "expo-router"
import {
	ArrowLeft,
	Search,
	HelpCircle,
	MessageCircle,
	Phone,
	Mail,
	FileText,
	User,
	DollarSign,
	CreditCard,
	Shield,
} from "lucide-react-native"
import { useThemeColors } from "@/constants/colors"

export default function HelpScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	scrollContent: {
  		padding: 20,
  	},
  	searchContainer: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.inputBackground,
  		borderRadius: 12,
  		paddingHorizontal: 12,
  		marginBottom: 24,
  	},
  	searchIcon: {
  		marginRight: 8,
  	},
  	searchInput: {
  		flex: 1,
  		height: 48,
  		color: colors.text,
  		fontSize: 16,
  	},
  	section: {
  		marginBottom: 32,
  	},
  	sectionTitle: {
  		color: colors.text,
  		fontSize: 18,
  		fontWeight: "600",
  		marginBottom: 16,
  	},
  	contactItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	contactIcon: {
  		width: 48,
  		height: 48,
  		borderRadius: 24,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 16,
  	},
  	contactContent: {
  		flex: 1,
  	},
  	contactTitle: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "600",
  		marginBottom: 4,
  	},
  	contactDescription: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	faqCategory: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	faqCategoryIcon: {
  		width: 48,
  		height: 48,
  		borderRadius: 24,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 16,
  	},
  	faqCategoryContent: {
  		flex: 1,
  	},
  	faqCategoryTitle: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "600",
  		marginBottom: 4,
  	},
  	faqCategoryCount: {
  		color: colors.secondaryText,
  		fontSize: 14,
  	},
  	resourceItem: {
  		flexDirection: "row",
  		alignItems: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  		marginBottom: 12,
  	},
  	resourceIcon: {
  		width: 48,
  		height: 48,
  		borderRadius: 24,
  		backgroundColor: colors.inputBackground,
  		alignItems: "center",
  		justifyContent: "center",
  		marginRight: 16,
  	},
  	resourceTitle: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  	},
  })
	const router = useRouter()
	const [searchQuery, setSearchQuery] = React.useState("")

	const faqCategories = [
		{
			title: "Account",
			icon: User,
			questions: [
				"How do I change my password?",
				"How do I update my email address?",
				"How do I close my account?",
			],
		},
		{
			title: "Payments",
			icon: DollarSign,
			questions: [
				"Why was my payment declined?",
				"How long do transfers take?",
				"Is there a fee for sending money?",
			],
		},
		{
			title: "Cash Card",
			icon: CreditCard,
			questions: [
				"How do I activate my Cash Card?",
				"How do I report a lost or stolen card?",
				"Where can I use my Cash Card?",
			],
		},
		{
			title: "Security",
			icon: Shield,
			questions: [
				"How do I enable two-factor authentication?",
				"What should I do if I suspect fraud?",
				"How does Cash App protect my information?",
			],
		},
	]

	return (
		<View style={styles.container}>
			<Stack.Screen options={{
				title: "Help",
				headerLargeTitle: true,
				headerTransparent: true,
				headerShadowVisible: false,
				headerLargeTitleShadowVisible: false,
				headerLargeStyle: { backgroundColor: "transparent" },
				headerBlurEffect: "systemChromeMaterial",
			}} />

			<ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.scrollContent}>
				<View style={styles.searchContainer}>
					<Search
						size={20}
						color={colors.secondaryText}
						style={styles.searchIcon}
					/>
					<TextInput
						style={styles.searchInput}
						placeholder="Search for help"
						placeholderTextColor={colors.secondaryText}
						value={searchQuery}
						onChangeText={setSearchQuery}
					/>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Contact Support</Text>

					<Pressable style={styles.contactItem} onPress={() => null}>
						<View style={styles.contactIcon}>
							<MessageCircle size={24} color={colors.text} />
						</View>
						<View style={styles.contactContent}>
							<Text style={styles.contactTitle}>Chat with Support</Text>
							<Text style={styles.contactDescription}>
								Start a conversation with our support team
							</Text>
						</View>
					</Pressable>

					<Pressable style={styles.contactItem} onPress={() => null}>
						<View style={styles.contactIcon}>
							<Phone size={24} color={colors.text} />
						</View>
						<View style={styles.contactContent}>
							<Text style={styles.contactTitle}>Call Support</Text>
							<Text style={styles.contactDescription}>
								Speak directly with a support agent
							</Text>
						</View>
					</Pressable>

					<Pressable style={styles.contactItem} onPress={() => null}>
						<View style={styles.contactIcon}>
							<Mail size={24} color={colors.text} />
						</View>
						<View style={styles.contactContent}>
							<Text style={styles.contactTitle}>Email Support</Text>
							<Text style={styles.contactDescription}>
								Send us an email with your question
							</Text>
						</View>
					</Pressable>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

					{faqCategories.map((category, index) => (
						<Pressable
							key={index}
							style={styles.faqCategory}
							onPress={() => null}>
							<View style={styles.faqCategoryIcon}>
								<HelpCircle size={24} color={colors.text} />
							</View>
							<View style={styles.faqCategoryContent}>
								<Text style={styles.faqCategoryTitle}>{category.title}</Text>
								<Text style={styles.faqCategoryCount}>
									{category.questions.length} articles
								</Text>
							</View>
							<ArrowLeft
								size={20}
								color={colors.secondaryText}
								style={{ transform: [{ rotate: "180deg" }] }}
							/>
						</Pressable>
					))}
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Resources</Text>

					<Pressable
						style={styles.resourceItem}
						onPress={() => router.push("/terms")}>
						<View style={styles.resourceIcon}>
							<FileText size={24} color={colors.text} />
						</View>
						<Text style={styles.resourceTitle}>Terms of Service</Text>
					</Pressable>

					<Pressable
						style={styles.resourceItem}
						onPress={() => router.push("/privacy-policy")}>
						<View style={styles.resourceIcon}>
							<FileText size={24} color={colors.text} />
						</View>
						<Text style={styles.resourceTitle}>Privacy Policy</Text>
					</Pressable>

					<Pressable style={styles.resourceItem} onPress={() => null}>
						<View style={styles.resourceIcon}>
							<FileText size={24} color={colors.text} />
						</View>
						<Text style={styles.resourceTitle}>Licenses</Text>
					</Pressable>
				</View>
			</ScrollView>
		</View>
	)
}

