import BlockChain from '../classes/BlockChain'
import Transaction from '../classes/Transaction'
import * as rp from 'request-promise'
import Block from '../classes/Block'

const blockChain = new BlockChain()

export default class BlockChainService {
  static getBlockChain () {
    return blockChain
  }


  static createTransaction (data) {
    const {from, to, amount} = data
    const fromNode = blockChain.getNodeByAddress(from)
    const toNode = blockChain.getNodeByAddress(to)

    if (!fromNode || !toNode) throw new Error('not valid node')
    // 처음 노드는 돈이 없기 때문에 validation 은 하지 않음
    // if (!fromNode.getWallet().isAvailableToSend(blockChain.getBalanceByAddress(fromNode.getWalletAddress()),
    // amount)) { throw new Error('not available to send') }
    const transaction = new Transaction(data)
    blockChain.addPendingTransaction(transaction)
    BlockChainService.broadCastTransactions(transaction)
  }

  static broadCastTransactions (transaction) {
    const tasks = []
    const options: any = {
      method: 'POST',
      body: {
        date: new Date(),
        transactions: blockChain.getPendingTransactions(),
        previousHash: blockChain.getLatestBlock().getNewHash(),
        difficulty: blockChain.getDifficulty()
      },
      json: true
    }

    blockChain.getNodes().forEach(node => {
      if (!node.isMiner()) return
      options.uri = `http://localhost:${node.getPort()}/transactions`
      options.body.baseAddress = node.getWalletAddress()
      options.body.nonce = node.getNonce()
      tasks.push(rp(options))
    })

    Promise.race(tasks)
      .then((result) => {
        BlockChainService.newBlockCreated(result, transaction)
      })
      .catch(err => {
        console.error('err ====================', err)
      })
  }

  static newBlockCreated ({block, baseAddress}, transaction) {
    if (!block || !baseAddress) throw new Error('invalid block or base address')
    let isValidBlock = true
    block.transactions = block.transactions.map(t => new Transaction(t))
    const newBlock = new Block(block)

    blockChain.getNodes().forEach(node => {
      if (!node.verify(newBlock)) isValidBlock = false
    })
    if (!isValidBlock) return
    blockChain.addNewBlock(newBlock)
    blockChain.addDoneTransaction(blockChain.getPendingTransactions())
    blockChain.resetPendingTransaction()
    blockChain.addPendingTransaction(new Transaction({
      from: null,
      to: baseAddress,
      amount: blockChain.getReward(),
      timestamp: new Date()
    }))
  }

}