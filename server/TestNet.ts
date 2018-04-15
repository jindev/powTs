import * as Express from 'express'
import * as path from 'path'
import * as bodyParser from 'body-parser'

import { transactionRouter } from '../routes/transactionRouter'
import { indexRouter } from '../routes/indexRouter'
import { nodeRouter } from '../routes/nodeRouter'
import { Application } from 'express'

const app = Express()
const PORT = 3000

const setServerSettings = (app: Application) => {
  app.set('view engine', 'ejs')
  app.set('views', path.resolve(`${__dirname}/../../views`))
  app.use(bodyParser.urlencoded({extended: false}))
  app.use(bodyParser.json())
}

const setRouters = (app) => {
  app.use('/', indexRouter)
  app.use('/transactions', transactionRouter)
  app.use('/nodes', nodeRouter)
}

setServerSettings(app)
setRouters(app)

app.listen(PORT, () => {
  console.log(`test net stared on ${PORT}`)
})
