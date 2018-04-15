import { Wallet } from './Wallet'
import BlockChain from './BlockChain'
import Block from './Block'

export default class Node {
  private isMinerFlag: boolean
  private isParticipating: boolean
  private wallet: Wallet
  private blockChain: BlockChain
  private port: number
  private startNonce: number

  constructor ({password, port, blockChain, startNonceNum = 0}) {
    this.isMinerFlag = false
    this.isParticipating = false
    this.wallet = blockChain.getNewWallet({password})
    this.blockChain = blockChain
    this.port = port
    this.startNonce = startNonceNum
  }

  verify (block: Block): boolean {
    return this.blockChain.getLatestBlock().getHash() === block.getPreviousHash()
  }

  getWallet (): Wallet {
    return this.wallet
  }

  getPort (): number {
    return this.port
  }

  getWalletAddress (): string {
    return this.wallet.getAddress()
  }

  getWalletPassword (): string {
    return this.wallet.getPassword()
  }

  startMine (): void {
    this.isMinerFlag = true
  }

  stopMine (): void {
    this.isMinerFlag = false
  }

  isMiner (): boolean {
    return this.isMinerFlag
  }

  setStartNonce (startNonce: number): void {
    this.startNonce = startNonce
  }

  getNonce (): number {
    return this.startNonce
  }
}
