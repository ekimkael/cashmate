import { Stack, useRouter } from "expo-router"
import { QrCode, Scan } from "lucide-react-native"
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, Pressable, Platform } from "react-native"

import Colors, { useThemeColors } from "@/constants/colors"

export default function ScanScreen() {
  const colors = useThemeColors()
  const styles = StyleSheet.create({
  	container: {
  		flex: 1,
  		backgroundColor: colors.background,
  	},
  	content: {
  		flex: 1,
  		alignItems: "center",
  		justifyContent: "center",
  		padding: 20,
  	},
  	webPlaceholder: {
  		alignItems: "center",
  		justifyContent: "center",
  	},
  	webPlaceholderText: {
  		color: colors.secondaryText,
  		fontSize: 16,
  		textAlign: "center",
  		marginTop: 20,
  		marginBottom: 40,
  	},
  	scannerContainer: {
  		flex: 1,
  		width: "100%",
  		alignItems: "center",
  		justifyContent: "center",
  	},
  	scanner: {
  		width: 280,
  		height: 280,
  		backgroundColor: "rgba(0, 0, 0, 0.3)",
  		borderRadius: 16,
  		overflow: "hidden",
  		marginBottom: 24,
  	},
  	scannerOverlay: {
  		flex: 1,
  		alignItems: "center",
  		justifyContent: "center",
  	},
  	scannerMarker: {
  		width: 200,
  		height: 200,
  		borderWidth: 2,
  		borderColor: colors.primary,
  		borderRadius: 12,
  	},
  	scannerText: {
  		color: colors.secondaryText,
  		fontSize: 16,
  		textAlign: "center",
  		marginBottom: 40,
  	},
  	permissionText: {
  		color: colors.secondaryText,
  		fontSize: 16,
  		textAlign: "center",
  	},
  	simulateButton: {
  		backgroundColor: colors.primary,
  		borderRadius: 12,
  		padding: 16,
  		alignItems: "center",
  		justifyContent: "center",
  		width: "80%",
  	},
  	simulateButtonText: {
  		color: colors.background,
  		fontSize: 16,
  		fontWeight: "600",
  	},
  	footer: {
  		padding: 16,
  		borderTopWidth: 1,
  		borderTopColor: colors.border,
  	},
  	footerButton: {
  		flexDirection: "row",
  		alignItems: "center",
  		justifyContent: "center",
  		backgroundColor: colors.card,
  		borderRadius: 12,
  		padding: 16,
  	},
  	footerButtonText: {
  		color: colors.text,
  		fontSize: 16,
  		fontWeight: "500",
  		marginLeft: 8,
  	},
  })
	const router = useRouter()
	const [scanned, setScanned] = useState(false)
	const [hasPermission, setHasPermission] = useState(null)

	// In a real app, we would request camera permissions here
	useEffect(() => {
		// Simulate permission request
		const timer = setTimeout(() => {
			setHasPermission(true)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	const handleBarCodeScanned = ({ type, data }) => {
		setScanned(true)
		// In a real app, we would process the QR code data here
		// For now, let's simulate a successful scan
		setTimeout(() => {
			router.push({
				pathname: "/send/amount",
				params: {
					contactId: "contact-1",
					name: "Sarah Johnson",
				},
			})
		}, 1000)
	}

	// Simulate scanning a QR code
	const simulateScan = () => {
		setScanned(true)
		setTimeout(() => {
			router.push({
				pathname: "/send/amount",
				params: {
					contactId: "contact-1",
					name: "Sarah Johnson",
				},
			})
		}, 1000)
	}

	return (
		<View style={styles.container}>
			<Stack.Screen options={{ title: "Scan Code" }} />

			<View style={styles.content}>
				{Platform.OS === "web" ? (
					// On web, show a placeholder since camera access is limited
					<View style={styles.webPlaceholder}>
						<Scan size={80} color={colors.secondaryText} />
						<Text style={styles.webPlaceholderText}>
							QR code scanning is not available on web.
						</Text>
						<Pressable style={styles.simulateButton} onPress={simulateScan}>
							<Text style={styles.simulateButtonText}>Simulate Scan</Text>
						</Pressable>
					</View>
				) : (
					// On mobile, we would use the camera
					<View style={styles.scannerContainer}>
						{hasPermission === null ? (
							<Text style={styles.permissionText}>
								Requesting camera permission...
							</Text>
						) : hasPermission === false ? (
							<Text style={styles.permissionText}>No access to camera</Text>
						) : (
							<>
								{/* This would be a real camera view in a real app */}
								<View style={styles.scanner}>
									<View style={styles.scannerOverlay}>
										<View style={styles.scannerMarker} />
									</View>
								</View>
								<Text style={styles.scannerText}>
									Position the QR code within the frame to scan
								</Text>
								{/* For demo purposes, add a simulate button */}
								<Pressable style={styles.simulateButton} onPress={simulateScan}>
									<Text style={styles.simulateButtonText}>Simulate Scan</Text>
								</Pressable>
							</>
						)}
					</View>
				)}
			</View>

			<View style={styles.footer}>
				<Pressable
					style={styles.footerButton}
					onPress={() => router.push("/qr-code")}>
					<QrCode size={24} color={colors.text} />
					<Text style={styles.footerButtonText}>Your QR Code</Text>
				</Pressable>
			</View>
		</View>
	)
}

