import { expect } from 'chai'
import BlockChainService from '../../services/BlockChainService'
import BlockChain from '../../classes/BlockChain'
import Node from '../../classes/Node'
import Block from '../../classes/Block'

describe('BlockChainService', function () {
  before(done => {
    blockChain.addNode(new Node({password: '1234', port: 7888, blockChain}))
    blockChain.addNode(new Node({password: '4444', port: 7889, blockChain}))
    done()
  })

  const blockChain = BlockChainService.getBlockChain()
  describe('getBlockChain', () => {
    it('should get blockChain instance', done => {
      expect(blockChain).to.be.instanceOf(BlockChain)
      done()
    })
  })

  describe('createTransaction', () => {
    it('should create transaction', done => {
      const from = blockChain.getNodeByPassword('1234').getWalletAddress()
      const to = blockChain.getNodeByPassword('4444').getWalletAddress()
      BlockChainService.createTransaction({from, to, amount: 100})
      expect(blockChain.getPendingTransactions().length).to.be.equal(1)
      done()
    })

    it('should throw Error when not valid node', done => {
      expect(function () {
        BlockChainService.createTransaction({
          from: '5555',
          to: '3535',
          amount: 100
        })
      }).to.throw('not valid node')
      done()
    })
  })

  describe('newBlockCreated', () => {
    it('should add new block', done => {
      const baseAddress = blockChain.getNodeByPassword('1234').getWalletAddress()
      const previousHash = blockChain.getLatestBlock().getHash()
      BlockChainService.newBlockCreated({block: new Block({
        timestamp: new Date(),
        transactions: [],
        previousHash
      }), baseAddress})

      expect(blockChain.getLatestBlock().getPreviousHash()).to.be.equal(previousHash)
      expect(blockChain.getPendingTransactions().length).to.be.equal(1)
      expect(blockChain.getPendingTransactions()[0].getToAddress()).to.be.equal(baseAddress)
      done()
    })
  })
})