import CryptoUtil from '../utils/CryptoUtil'
import Transaction from './Transaction'

export default class Block {
  private transactions: Transaction[]
  private timestamp: string
  private previousHash: string
  private hash: string
  private nonce: number

  constructor ({timestamp, transactions, previousHash, hash = '', nonce = 0}) {
    this.transactions = transactions
    this.timestamp = timestamp
    this.previousHash = previousHash
    this.nonce = nonce
    this.hash = (hash) ? hash : this.getNewHash()
  }

  getHash (): string {
    return this.hash
  }

  getNewHash (): string {
    return CryptoUtil.createHash(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce)
  }

  getPreviousHash (): string {
    return this.previousHash
  }

  getTransactions (): Transaction[] {
    return this.transactions
  }

  startMine (difficulty: number): Block {
    while ((this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0'))) {
      this.nonce++
      this.hash = this.getNewHash()
    }
    return this
  }
}
