import { Router } from 'express'
import BlockChainService from '../services/BlockChainService'
import NodeService from '../services/NodeService'

const router = Router()

const blockChain = BlockChainService.getBlockChain()

router.route('/')
  .get((req, res) => {
    res.format({
      html () {
        const nodes = blockChain.getNodes()
        nodes.forEach(node => {
          node.getWallet().setBalance(blockChain.getBalanceByAddress(node.getWalletAddress()))
        })

        res.render('nodes.ejs', {nodes})
      },
      json () {
        res.json(blockChain.getNodes())
      }
    })
  })

router.route('/:address/nonce')
  .put((req, res) => {
    const {nonce} = req.body
    const address = req.params.address
    NodeService.changeNonce({nonce, address})
    res.send({msg: 'success to change start nonce'})
  })

router.route('/:address/mine/status')
  .put((req, res) => {
    const {isMining} = req.body
    const address = req.params.address
    NodeService.changeMiningStatus({isMining, address})
    res.send({msg: 'success to change mining status'})
  })

router.route('/register')
  .post(async (req, res) => {
    const {port, password} = req.body
    if (!port || !password) res.status(400).send({msg: 'invalid request'})

    try {
      const resultMsg = await NodeService.registerNode({port, password})
      res.send({msg: resultMsg})
    }
    catch (err) {
      res.send({msg: `please start node server with ${port} port`})
    }
  })

export { router as nodeRouter }