import { useState } from "react"

interface AmountInput {
  amount: string
  handleNumberPress: (digit: string) => void
  handleDeletePress: () => void
}

/**
 * Manages numeric amount input state with decimal validation.
 * Enforces a single decimal point and resets to "0" on full delete.
 */
export function useAmountInput(initial = "0"): AmountInput {
  const [amount, setAmount] = useState(initial)

  const handleNumberPress = (digit: string) => {
    if (digit === "." && amount.includes(".")) return
    setAmount((prev) => (prev === "0" && digit !== "." ? digit : prev + digit))
  }

  const handleDeletePress = () => {
    setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"))
  }

  return { amount, handleNumberPress, handleDeletePress }
}
