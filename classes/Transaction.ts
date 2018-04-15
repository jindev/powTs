export default class Transaction {
  private from: string
  private to: string
  private amount: number
  private timestamp: string

  constructor ({from, to, amount, timestamp}) {
    this.from = from
    this.to = to
    this.amount = Number(amount)
    this.timestamp = timestamp
  }

  getFromAddress (): string {
    return this.from
  }

  getToAddress (): string {
    return this.to
  }

  getAmount (): number {
    return this.amount
  }
}
