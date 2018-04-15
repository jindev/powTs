import { expect } from 'chai'
import { Wallet } from '../../classes/Wallet'

describe('Wallet', function () {
  describe('constructor', () => {
    it('should create Wallet instance', done => {
      expect(new Wallet({password: '1234', address: '44444'})).instanceOf(Wallet)
      done()
    })
  })

  describe('getAddress', () => {
    it('should get address', done => {
      const address = '4444'
      const wallet = new Wallet({password: '1234', address})
      expect(wallet.getAddress()).to.be.equal(address)
      done()
    })
  })

  describe('isAvailableToSend', () => {
    const wallet = new Wallet({password: '1234', address: '44444'})
    it('should available to send when balance is over amount to send', done => {
      expect(wallet.isAvailableToSend(3000, 500)).to.be.true
      done()
    })
    it('should not available to send when balance is under amount to send', done => {
      expect(wallet.isAvailableToSend(200, 500)).to.be.false
      done()
    })
  })

})