import { expect } from 'chai'
import Block from '../../classes/Block'
import BlockChain from '../../classes/BlockChain'

describe('Block', function () {

  const blockChain = new BlockChain()
  const previousBlock = blockChain.getLatestBlock()
  const block = new Block({
    timestamp: new Date(),
    transactions: [],
    previousHash: previousBlock.getHash()
  })

  describe('getPreviousHash', () => {
    it('should get previous hash', done => {
      expect(block.getPreviousHash()).to.be.equal(previousBlock.getHash())
      done()
    })
  })

  describe('startMine', () => {
    it('should start mine', done => {
      block.startMine(3)
      expect(block.getHash().substring(0, 3)).to.be.equal('000')
      done()
    })
  })
})
