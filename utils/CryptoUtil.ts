import { createHash, randomBytes } from 'crypto'

export default class CryptoUtil {

  static createHash (data: string): string {
    return createHash('sha256').update(data, 'utf8').digest().toString('hex')
  }

  static randomBytes () {
    return randomBytes(20).toString('hex')
  }
}
