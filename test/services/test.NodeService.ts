import { expect } from 'chai'
import Node from '../../classes/Node'
import BlockChainService from '../../services/BlockChainService'
import NodeService from '../../services/NodeService'

describe('NodeService', function () {
  const blockChain = BlockChainService.getBlockChain()

  before(done => {
    blockChain.addNode(new Node({password: '1234', port: 7888, blockChain}))
    blockChain.addNode(new Node({password: '4444', port: 7889, blockChain}))
    done()
  })
  describe('changeNonce', () => {
    it('should change nonce of node', done => {
      const node = blockChain.getNodeByPassword('1234')
      NodeService.changeNonce({nonce: 1000, address: node.getWalletAddress()})
      expect(node.getNonce()).to.be.equal(1000)
      done()
    })
  })

  describe('changeMiningStatus', () => {
    it('should change mining status of node to true', done => {
      const node = blockChain.getNodeByPassword('1234')
      NodeService.changeMiningStatus({isMining: 'Y', address: node.getWalletAddress()})
      expect(node.isMiner()).to.be.true
      done()
    })

    it('should change mining status of node to false', done => {
      const node = blockChain.getNodeByPassword('1234')
      NodeService.changeMiningStatus({isMining: 'N', address: node.getWalletAddress()})
      expect(node.isMiner()).to.be.false
      done()
    })
  })
})