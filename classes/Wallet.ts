export class Wallet {
  private address: string
  private password: string
  private balance: number

  constructor ({password, address}) {
    if (!password || !address) throw new Error('password and address required')
    this.password = password
    this.address = address
    this.balance = 0
  }

  getAddress (): string {
    return this.address
  }

  setBalance (balance): void {
    this.balance = balance
  }

  isAvailableToSend (balance, amount): boolean {
    return (balance < amount) ? false : true
  }

  getPassword (): string {
    return this.password
  }
}
