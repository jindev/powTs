import CryptoUtil from '../utils/CryptoUtil'

export default class Block {
  private transactions
  private timestamp
  private previousHash
  private hash
  private nonce
  private isOnMiningFlag

  constructor ({timestamp, transactions, previousHash, hash = '', nonce = 0}) {
    this.transactions = transactions
    this.timestamp = timestamp
    this.previousHash = previousHash
    this.nonce = nonce
    this.hash = (hash) ? hash : this.getNewHash()
    this.isOnMiningFlag = false
  }

  getHash () {
    return this.hash
  }

  getNewHash () {
    return CryptoUtil.createHash(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce)
  }

  getPreviousHash () {
    return this.previousHash
  }

  getTransactions () {
    return this.transactions
  }

  startMine (difficulty): Block {
    this.isOnMiningFlag = true

    while ((this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0'))) {
      this.nonce++
      this.hash = this.getNewHash()
    }
    return this
  }

  stopMine () {
    this.isOnMiningFlag = false
  }
}
