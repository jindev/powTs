import * as rp from 'request-promise'
import BlockChainService from './BlockChainService'
import Node from '../classes/Node'

const blockChain = BlockChainService.getBlockChain()

export default class NodeService {
  static registerNode ({password, port}): Promise<string> {
    return rp.get(`http://localhost:${port}/healthCheck`)
      .then(_ => {
        const node = new Node({password, port, blockChain})
        blockChain.addNode(node)
        return 'success to register node'
      })
      .catch(err => {
        throw err
      })
  }

  static changeNonce ({nonce, address}): void {
    blockChain.getNodeByAddress(address).setStartNonce(nonce)
  }

  static changeMiningStatus ({address, isMining}): void {
    (isMining === 'Y') ? blockChain.getNodeByAddress(address).startMine() : blockChain.getNodeByAddress(address).stopMine()
  }
}
