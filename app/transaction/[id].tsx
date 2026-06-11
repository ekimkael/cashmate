import { Wallet, CreditCard, DollarSign, ArrowUpRight, ArrowDownLeft, User } from "lucide-react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, ScrollView, Share } from "react-native";
import * as Haptics from "expo-haptics";

import { useThemeColors } from "@/constants/colors";
import { useTransactionStore } from "@/store/transaction-store";

const STATUS_COLORS = {
	completed: { bg: "rgba(0, 214, 50, 0.15)", text: "#00D632" },
	pending: { bg: "rgba(255, 149, 0, 0.15)", text: "#FF9500" },
	failed: { bg: "rgba(255, 67, 42, 0.15)", text: "#FF432A" },
};

export default function TransactionDetailScreen() {
	const colors = useThemeColors();
	const { id } = useLocalSearchParams();
	const { transactions } = useTransactionStore();
	const router = useRouter();

	const transaction = transactions.find((tx) => tx.id === id);

	if (!transaction) {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 20 }}>
				<Stack.Screen options={{ title: "Transaction" }} />
				<Text style={{ fontSize: 16, color: colors.text, textAlign: "center" }}>Transaction not found</Text>
			</View>
		);
	}

	const { type, amount, date, user, note, status } = transaction;
	const isDebit = type === "send" || type === "payment" || type === "withdrawal";
	const amountColor = isDebit ? colors.error : colors.success;
	const amountPrefix = isDebit ? "-" : "+";
	const statusStyle = STATUS_COLORS[status] ?? STATUS_COLORS.completed;

	const getIcon = () => {
		const size = 24;
		switch (type) {
			case "send":
				return <ArrowUpRight size={size} color={amountColor} />;
			case "receive":
				return <ArrowDownLeft size={size} color={amountColor} />;
			case "payment":
				return <CreditCard size={size} color={amountColor} />;
			case "deposit":
				return <Wallet size={size} color={amountColor} />;
			case "withdrawal":
				return <DollarSign size={size} color={amountColor} />;
			default:
				return null;
		}
	};

	const getDirectionLabel = () => {
		switch (type) {
			case "send":
				return "To";
			case "receive":
				return "From";
			case "payment":
				return "To";
			case "deposit":
				return "Via";
			case "withdrawal":
				return "From";
			default:
				return "";
		}
	};

	const handleSendAgain = () => {
		if (process.env.EXPO_OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		router.back();
		setTimeout(() => router.push("/send"), 100);
	};

	const handleShare = async () => {
		if (process.env.EXPO_OS === "ios") Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		try {
			await Share.share({
				message: `${amountPrefix}$${amount.toFixed(2)} ${getDirectionLabel().toLowerCase()} ${user.name} · ${new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`,
			});
		} catch {}
	};

	const detailRows = [
		{
			label: "Date",
			value: new Date(date).toLocaleDateString("en-US", {
				weekday: "long",
				year: "numeric",
				month: "long",
				day: "numeric",
			}),
		},
		{
			label: "Time",
			value: new Date(date).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
		},
		{ label: "Transaction ID", value: transaction.id },
	];

	const showSendAgain = type === "send" || type === "payment";

	return (
		<View style={{ flex: 1 }}>
			<Stack.Screen options={{ title: "" }} />

			{/* Toolbar: close left, actions right */}
			<Stack.Toolbar placement="left">
				<Stack.Toolbar.Button icon="xmark" onPress={() => router.back()} />
			</Stack.Toolbar>
			<Stack.Toolbar placement="right">
				{showSendAgain && (
					<Stack.Toolbar.Button icon="paperplane" onPress={handleSendAgain} />
				)}
				<Stack.Toolbar.Button icon="square.and.arrow.up" onPress={handleShare} />
			</Stack.Toolbar>

			<ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={{ paddingHorizontal: 16, gap: 12, paddingBottom: 12 }}>
				{/* Hero */}
				<View style={{ alignItems: "center", gap: 14, paddingBottom: 8 }}>
					<View
						style={{
							width: 64,
							height: 64,
							borderRadius: 32,
							borderCurve: "continuous",
							backgroundColor: `${amountColor}20`,
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						{getIcon()}
					</View>

					<Text
						selectable
						style={{
							fontSize: 52,
							fontWeight: "700",
							color: amountColor,
							letterSpacing: -1.5,
							fontVariant: ["tabular-nums"],
						}}
					>
						{amountPrefix}${amount.toFixed(2)}
					</Text>

					<View
						style={{
							paddingHorizontal: 14,
							paddingVertical: 6,
							borderRadius: 20,
							borderCurve: "continuous",
							backgroundColor: statusStyle.bg,
						}}
					>
						<Text style={{ fontSize: 13, fontWeight: "600", color: statusStyle.text }}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
					</View>
				</View>

				{/* User card */}
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 12,
						padding: 16,
						borderRadius: 16,
						borderCurve: "continuous",
						backgroundColor: colors.card,
					}}
				>
					{user.avatar ? (
						<Image source={{ uri: user.avatar }} style={{ width: 44, height: 44, borderRadius: 22 }} />
					) : (
						<View
							style={{
								width: 44,
								height: 44,
								borderRadius: 22,
								backgroundColor: colors.inputBackground,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<User size={20} color={colors.secondaryText} />
						</View>
					)}
					<View style={{ flex: 1 }}>
						<Text style={{ fontSize: 16, fontWeight: "600", color: colors.text }}>{user.name}</Text>
						{user.username && <Text style={{ fontSize: 14, color: colors.secondaryText }}>@{user.username}</Text>}
					</View>
					<Text style={{ fontSize: 11, fontWeight: "600", color: colors.secondaryText, textTransform: "uppercase", letterSpacing: 0.5 }}>{getDirectionLabel()}</Text>
				</View>

				{/* Note */}
				{note && (
					<View
						style={{
							padding: 16,
							borderRadius: 16,
							borderCurve: "continuous",
							backgroundColor: colors.card,
							gap: 6,
						}}
					>
						<Text
							style={{
								fontSize: 11,
								fontWeight: "600",
								color: colors.secondaryText,
								textTransform: "uppercase",
								letterSpacing: 0.6,
							}}
						>
							Note
						</Text>
						<Text selectable style={{ fontSize: 15, color: colors.text, lineHeight: 22 }}>
							{note}
						</Text>
					</View>
				)}

				{/* Details */}
				<View
					style={{
						borderRadius: 16,
						borderCurve: "continuous",
						backgroundColor: colors.card,
						overflow: "hidden",
					}}
				>
					{detailRows.map((row, i) => (
						<View
							key={row.label}
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								alignItems: "center",
								paddingHorizontal: 16,
								paddingVertical: 14,
								borderBottomWidth: i < detailRows.length - 1 ? 1 : 0,
								borderBottomColor: colors.border,
							}}
						>
							<Text style={{ fontSize: 14, color: colors.secondaryText }}>{row.label}</Text>
							<Text
								selectable
								style={{
									fontSize: 14,
									color: colors.text,
									maxWidth: "60%",
									textAlign: "right",
								}}
							>
								{row.value}
							</Text>
						</View>
					))}
				</View>
			</ScrollView>

		</View>
	);
}
