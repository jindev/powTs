import * as Express from 'express'
import * as bodyParser from 'body-parser'
import Block from '../classes/Block'

const app = Express()

const port = process.argv.slice(2)[0]

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.post('/transactions', (req, res, next) => {
  const {transactions, date, previousHash, difficulty, baseAddress, nonce} = req.body
  const block = new Block({timestamp: date, transactions, previousHash, nonce})
  block.startMine(difficulty)
  res.send({block, baseAddress})
})

app.get('/healthCheck', (req, res, next) => {
  res.status(200).send({msg: 'I am alive'})
})

app.listen(port, () => {
  console.log(`client is started on ${port} port`)
})
