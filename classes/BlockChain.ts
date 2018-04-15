import Node from './Node'
import { Wallet } from './Wallet'
import CryptoUtil from '../utils/CryptoUtil'
import Block from './Block'
import Transaction from './Transaction'

export default class BlockChain {
  private blocks: Block[]
  private nodes: Node[]
  private doneTransactions: Transaction[]
  private pendingTransactions: Transaction[]
  private difficulty: number
  private reward: number

  constructor () {
    this.blocks = [this.getNewGenesisBlock()]
    this.nodes = []
    this.doneTransactions = []
    this.pendingTransactions = []
    this.difficulty = 3
    this.reward = 100
  }

  getNewGenesisBlock (): Block {
    return new Block({timestamp: new Date(), transactions: [], previousHash: 0})
  }

  getReward (): number {
    return this.reward
  }

  getDifficulty (): number {
    return this.difficulty
  }

  addNode (node: Node): void {
    this.nodes.push(node)
  }

  getNodes (): Node[] {
    return this.nodes
  }

  getNodeByAddress (address: string): Node {
    return this.nodes.find(node => node.getWalletAddress() === address)
  }

  getNodeByPassword (password: string): Node {
    return this.nodes.find(node => node.getWalletPassword() === password)
  }

  getBlocks (): Block[] {
    return this.blocks
  }

  getLatestBlock (): Block {
    return this.blocks[this.blocks.length - 1]
  }

  getDoneTransactions () {
    return this.doneTransactions
  }

  getPendingTransactions (): Transaction[] {
    return this.pendingTransactions
  }

  resetPendingTransaction () {
    this.pendingTransactions = []
  }

  addPendingTransaction (transaction: Transaction) {
    this.pendingTransactions.push(transaction)
  }

  addDoneTransaction (transaction: Transaction | Transaction[]) {
    (Array.isArray(transaction)) ? this.doneTransactions = this.doneTransactions.concat(transaction) : this.doneTransactions.push(transaction)
  }

  addNewBlock (block: Block) {
    this.blocks.push(block)
  }

  getNewWallet ({password}): Wallet {

    let address = CryptoUtil.randomBytes()
    const existsAddress: any = this.getNodes().map(node => node.getWalletAddress())

    while (existsAddress.includes(address)) {
      address = CryptoUtil.randomBytes()
    }

    return new Wallet({password, address})
  }

  getBalanceByAddress (address: string): number {
    let balance = 0
    this.blocks.forEach(block => {
      block.getTransactions().forEach(transaction => {
        if (transaction.getFromAddress() === address) balance -= transaction.getAmount()
        if (transaction.getToAddress() === address) balance += transaction.getAmount()
      })
    })

    return balance
  }
}
