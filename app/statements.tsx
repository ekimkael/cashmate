import { Stack } from "expo-router"
import React, { useState } from "react"
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native"
import { Download, Calendar, ChevronDown, ChevronUp } from "lucide-react-native"

import Colors from "@/constants/colors"

export default function StatementsScreen() {
	const [expandedMonth, setExpandedMonth] = useState(null)

	const statements = [
		{
			month: "October 2023",
			statements: [
				{ id: "1", type: "Monthly", date: "Oct 1 - Oct 31, 2023" },
				{ id: "2", type: "Weekly", date: "Oct 24 - Oct 31, 2023" },
				{ id: "3", type: "Weekly", date: "Oct 17 - Oct 23, 2023" },
				{ id: "4", type: "Weekly", date: "Oct 10 - Oct 16, 2023" },
				{ id: "5", type: "Weekly", date: "Oct 3 - Oct 9, 2023" },
			],
		},
		{
			month: "September 2023",
			statements: [
				{ id: "6", type: "Monthly", date: "Sep 1 - Sep 30, 2023" },
				{ id: "7", type: "Weekly", date: "Sep 24 - Sep 30, 2023" },
				{ id: "8", type: "Weekly", date: "Sep 17 - Sep 23, 2023" },
				{ id: "9", type: "Weekly", date: "Sep 10 - Sep 16, 2023" },
				{ id: "10", type: "Weekly", date: "Sep 3 - Sep 9, 2023" },
			],
		},
		{
			month: "August 2023",
			statements: [
				{ id: "11", type: "Monthly", date: "Aug 1 - Aug 31, 2023" },
				{ id: "12", type: "Weekly", date: "Aug 24 - Aug 31, 2023" },
				{ id: "13", type: "Weekly", date: "Aug 17 - Aug 23, 2023" },
				{ id: "14", type: "Weekly", date: "Aug 10 - Aug 16, 2023" },
				{ id: "15", type: "Weekly", date: "Aug 3 - Aug 9, 2023" },
			],
		},
	]

	const toggleMonth = (month: string | React.SetStateAction<null>) => {
		if (expandedMonth === month) {
			setExpandedMonth(null)
		} else {
			setExpandedMonth(month)
		}
	}

	const handleDownloadStatement = (statement: {
		id?: string
		type: any
		date: any
	}) => {
		// In a real app, this would download the statement
		console.log(`Downloading statement: ${statement.type} - ${statement.date}`)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Statements" }} />

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.infoCard}>
					<Text style={styles.infoTitle}>Account Statements</Text>
					<Text style={styles.infoText}>
						Download your monthly and weekly statements for your records.
					</Text>
				</View>

				<View style={styles.section}>
					{statements.map((monthData) => (
						<View key={monthData.month} style={styles.monthContainer}>
							<Pressable
								style={styles.monthHeader}
								onPress={() => toggleMonth(monthData.month)}>
								<View style={styles.monthTitleContainer}>
									<Calendar size={20} color={Colors.dark.text} />
									<Text style={styles.monthTitle}>{monthData.month}</Text>
								</View>
								{expandedMonth === monthData.month ? (
									<ChevronUp size={20} color={Colors.dark.text} />
								) : (
									<ChevronDown size={20} color={Colors.dark.text} />
								)}
							</Pressable>

							{expandedMonth === monthData.month && (
								<View style={styles.statementsContainer}>
									{monthData.statements.map((statement) => (
										<View key={statement.id} style={styles.statementItem}>
											<View style={styles.statementInfo}>
												<Text style={styles.statementType}>
													{statement.type} Statement
												</Text>
												<Text style={styles.statementDate}>
													{statement.date}
												</Text>
											</View>
											<Pressable
												style={styles.downloadButton}
												onPress={() => handleDownloadStatement(statement)}>
												<Download size={20} color={Colors.dark.primary} />
											</Pressable>
										</View>
									))}
								</View>
							)}
						</View>
					))}
				</View>

				<View style={styles.section}>
					<Text style={styles.noteText}>
						Statements are available for download for up to 7 years. For older
						statements, please contact customer support.
					</Text>
				</View>
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
	infoCard: {
		backgroundColor: Colors.dark.card,
		borderRadius: 16,
		padding: 20,
		marginBottom: 24,
	},
	infoTitle: {
		color: Colors.dark.text,
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 8,
	},
	infoText: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		lineHeight: 20,
	},
	section: {
		marginBottom: 24,
	},
	monthContainer: {
		marginBottom: 16,
		backgroundColor: Colors.dark.card,
		borderRadius: 12,
		overflow: "hidden",
	},
	monthHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
	},
	monthTitleContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	monthTitle: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginLeft: 12,
	},
	statementsContainer: {
		borderTopWidth: 1,
		borderTopColor: Colors.dark.border,
	},
	statementItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 16,
		borderBottomWidth: 1,
		borderBottomColor: Colors.dark.border,
	},
	statementInfo: {
		flex: 1,
	},
	statementType: {
		color: Colors.dark.text,
		fontSize: 16,
		fontWeight: "500",
		marginBottom: 4,
	},
	statementDate: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
	},
	downloadButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: "rgba(0, 214, 50, 0.1)",
		alignItems: "center",
		justifyContent: "center",
	},
	noteText: {
		color: Colors.dark.secondaryText,
		fontSize: 14,
		textAlign: "center",
	},
})
