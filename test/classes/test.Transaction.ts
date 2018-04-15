import { expect } from 'chai'
import Transaction from '../../classes/Transaction'

describe('Transaction', function() {
  const transaction = new Transaction({from: '1234', to:'4444', amount: 100, timestamp: new Date()})

  describe('getFromAddress', () => {
    it('should get from address', done => {
      expect(transaction.getFromAddress()).to.be.equal('1234')
      done()
    })
  })

  describe('getFromAddress', () => {
    it('should get to address', done => {
      expect(transaction.getToAddress()).to.be.equal('4444')
      done()
    })
  })

  describe('getAmount', () => {
    it('should get amount', done => {
      expect(transaction.getAmount()).to.be.equal(100)
      done()
    })
  })
})