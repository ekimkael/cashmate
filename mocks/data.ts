import { User, Transaction, Contact } from "@/types"

export const currentUser: User = {
	id: "user-1",
	name: "John Doe",
	username: "johndoe",
	email: "john@example.com",
	balance: 786.75,
}

export const contacts: Contact[] = [
	{
		id: "contact-1",
		name: "Sarah Johnson",
		username: "sarahj",
		avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
		recentlyUsed: true,
	},
	{
		id: "contact-2",
		name: "Michael Chen",
		username: "mikechen",
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
		recentlyUsed: true,
	},
	{
		id: "contact-3",
		name: "Emma Wilson",
		username: "emmaw",
		avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
		recentlyUsed: true,
	},
	{
		id: "contact-4",
		name: "David Kim",
		username: "davidk",
		avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
	},
	{
		id: "contact-5",
		name: "Lisa Rodriguez",
		username: "lisar",
		avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
	},
	{
		id: "contact-6",
		name: "James Smith",
		username: "jamessmith",
		avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
	},
]

const daysAgo = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString()

export const transactions: Transaction[] = [
	{
		id: "tx-1",
		type: "receive",
		amount: 50.0,
		date: daysAgo(0),
		user: {
			id: "contact-1",
			name: "Sarah Johnson",
			username: "sarahj",
			avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
		},
		note: "Dinner last night",
		status: "completed",
	},
	{
		id: "tx-2",
		type: "send",
		amount: 25.5,
		date: daysAgo(1),
		user: {
			id: "contact-2",
			name: "Michael Chen",
			username: "mikechen",
			avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
		},
		note: "Coffee and snacks",
		status: "completed",
	},
	{
		id: "tx-3",
		type: "payment",
		amount: 120.0,
		date: daysAgo(3),
		user: {
			id: "merchant-1",
			name: "Grocery Store",
			username: "grocerystore",
		},
		status: "completed",
	},
	{
		id: "tx-4",
		type: "deposit",
		amount: 500.0,
		date: daysAgo(5),
		user: {
			id: "bank-1",
			name: "Bank Transfer",
			username: "bank",
		},
		status: "completed",
	},
	{
		id: "tx-5",
		type: "send",
		amount: 75.0,
		date: daysAgo(7),
		user: {
			id: "contact-3",
			name: "Emma Wilson",
			username: "emmaw",
			avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
		},
		note: "Concert tickets",
		status: "completed",
	},
	{
		id: "tx-6",
		type: "withdrawal",
		amount: 200.0,
		date: daysAgo(10),
		user: {
			id: "atm-1",
			name: "ATM Withdrawal",
			username: "atm",
		},
		status: "completed",
	},
	{
		id: "tx-7",
		type: "receive",
		amount: 35.25,
		date: daysAgo(12),
		user: {
			id: "contact-4",
			name: "David Kim",
			username: "davidk",
			avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
		},
		note: "Lunch",
		status: "completed",
	},
	{
		id: "tx-8",
		type: "payment",
		amount: 45.99,
		date: daysAgo(14),
		user: {
			id: "merchant-2",
			name: "Online Store",
			username: "onlinestore",
		},
		status: "completed",
	},
]
