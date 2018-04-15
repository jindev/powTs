import { Router } from 'express'
import BlockChainService from '../services/BlockChainService'

const router = Router()

const blockChain = BlockChainService.getBlockChain()

router.route('/')
  .get((req, res) => {
    res.format({
      html () {
        res.render('transactions.ejs', {transactions: {pending: blockChain.getPendingTransactions(), done: blockChain.getDoneTransactions()}})
      }
    })
  })
  .post((req, res) => {
    const {from, to, amount} = req.body
    if (!from || !to || !amount) return res.status(400).send({msg: 'invalid request'})

    BlockChainService.createTransaction(req.body)
    res.send({msg: 'transaction is created.'})
  })

export {router as transactionRouter}
