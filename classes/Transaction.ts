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

  getFromAddress () {
    return this.from
  }

  getToAddress () {
    return this.to
  }

  getAmount () {
    return this.amount
  }
}
