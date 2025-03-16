export type User = {
	id: string
	name: string
	username: string
	email: string
	avatar?: string
	balance: number
}

export type Transaction = {
	id: string
	type: "send" | "receive" | "payment" | "deposit" | "withdrawal"
	amount: number
	date: string
	user: {
		id: string
		name: string
		username: string
		avatar?: string
	}
	note?: string
	status: "completed" | "pending" | "failed"
}

export type Contact = {
	id: string
	name: string
	username: string
	avatar?: string
	recentlyUsed?: boolean
}
