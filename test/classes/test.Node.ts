import { expect } from 'chai'
import BlockChain from '../../classes/BlockChain'
import Block from '../../classes/Block'
import Node from '../../classes/Node'

describe('Node', function () {
  const blockChain = new BlockChain()
  const node = new Node({password: '1234', port: 1234, blockChain})
  describe('verify', () => {
    it('should get true when valid block', done => {
      const block = new Block({
        timestamp: new Date(),
        transactions: [],
        previousHash: blockChain.getLatestBlock().getHash()
      })
      expect(node.verify(block)).to.be.equal(true)
      done()
    })

    it('should get false when invalid block', done => {
      const block = new Block({
        timestamp: new Date(),
        transactions: [],
        previousHash: 1234
      })
      expect(node.verify(block)).to.be.equal(false)
      done()
    })
  })

  describe('startMine', () => {
    it('should be miner true when call start mine', done => {
      node.startMine()
      expect(node.isMiner()).to.be.true
      done()
    })
  })

  describe('stopMine', () => {
    it('should not be miner true when call stop mine', done => {
      node.stopMine()
      expect(node.isMiner()).to.be.false
      done()
    })
  })

  describe('setStartNonce', () => {
    it('should set start nonce', done => {
      node.setStartNonce(100)
      expect(node.getNonce()).to.be.equal(100)
      done()
    })
  })


})