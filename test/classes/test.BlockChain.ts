import { expect } from 'chai'
import BlockChain from '../../classes/BlockChain'
import Block from '../../classes/Block'
import Node from '../../classes/Node'
import Transaction from '../../classes/Transaction'

const blockChain = new BlockChain()

describe('BlockChain', function () {

  describe('getNewGenesisBlock', () => {
    it('should get new genesis block', done => {
      expect(blockChain.getNewGenesisBlock()).to.be.instanceOf(Block)
      done()
    })
  })

  describe('getReward', () => {
    it('should get reward', done => {
      expect(blockChain.getReward()).to.be.equal(100)
      done()
    })
  })

  describe('getDifficulty', () => {
    it('should get difficulty', done => {
      expect(blockChain.getDifficulty()).to.be.equal(3)
      done()
    })
  })

  describe('addNode', () => {
    it('should add node', done => {
      blockChain.addNode(new Node({password: '1234', port: 1234, blockChain}))
      expect(blockChain.getNodes().length).to.be.above(0)
      done()
    })
  })

  describe('getNodes', () => {
    it('should get Nodes', done => {
      blockChain.getNodes().forEach(node => {
        expect(node).to.be.instanceOf(Node)
      })
      done()
    })
  })

  describe('getNodeByAddress', () => {
    it('should get node by address', done => {
      const node = new Node({password: '1444', port: 3333, blockChain})
      blockChain.addNode(node)
      expect(blockChain.getNodeByAddress(node.getWalletAddress()).getWalletAddress()).to.be.equal(node.getWalletAddress())
      done()
    })
  })

  describe('getNodeByPassword', () => {
    it('should get node by password', done => {
      const node = new Node({password: '1443', port: 3333, blockChain})
      blockChain.addNode(node)
      expect(blockChain.getNodeByPassword(node.getWalletPassword()).getWalletAddress()).to.be.equal(node.getWalletAddress())
      done()
    })
  })

  describe('getLatestBlock', () => {
    it('should get latest block', done => {
      expect(blockChain.getLatestBlock()).to.be.equal(blockChain.getBlocks()[blockChain.getBlocks().length - 1])
      done()
    })
  })

  describe('getPendingTransctions', () => {
    const transaction = new Transaction({from: '1', to: '2', amount: 100, timestamp: new Date()})
    before(done => {
      blockChain.addPendingTransaction(transaction)
      done()
    })
    it('should get pending transactions', done => {
      expect(blockChain.getPendingTransactions()[0]).to.be.equal(transaction)
      done()
    })

    after(done => {
      blockChain.resetPendingTransaction()
      done()
    })
  })

  describe('addNewBlock', () => {
    it('should add new block', done => {
      blockChain.addNewBlock(new Block({timestamp: new Date(), transactions: [], previousHash: 0}))
      expect(blockChain.getBlocks().length).to.be.above(1)
      done()
    })
  })

  describe('getNewWallet', () => {
    it('should get new wallet', done => {
      expect(blockChain.getNewWallet({password: '1234'}).getPassword()).to.be.equal('1234')
      done()
    })
  })

  describe('getBalanceByAddress', () => {
    const fromNode = new Node({password: '1234', blockChain, port: 9999})
    const toNode = new Node({password: '4444', blockChain, port: 8888})
    const transaction = new Transaction({
      timestamp: new Date(),
      from: fromNode.getWalletAddress(),
      to: toNode.getWalletAddress(),
      amount: 1000
    })
    const transaction2 = new Transaction({
      timestamp: new Date(),
      from: toNode.getWalletAddress(),
      to: fromNode.getWalletAddress(),
      amount: 500
    })
    const transaction3 = new Transaction({
      timestamp: new Date(),
      from: toNode.getWalletAddress(),
      to: fromNode.getWalletAddress(),
      amount: 3000
    })

    before(done => {
      blockChain.addNode(fromNode)
      blockChain.addNode(toNode)
      blockChain.addNewBlock(new Block({
        transactions: [transaction, transaction2, transaction3],
        timestamp: new Date(),
        previousHash: 0
      }))
      done()
    })

    it('should get balance by address', done => {
      expect(blockChain.getBalanceByAddress(fromNode.getWalletAddress())).to.be.equal(2500)
      expect(blockChain.getBalanceByAddress(toNode.getWalletAddress())).to.be.equal(-2500)
      done()
    })
  })

})