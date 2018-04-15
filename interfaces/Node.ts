import BlockChain from '../classes/BlockChain'

export interface NodeConstructParams {
  password: string;
  port: number;
  blockChain: BlockChain,
  startNonceNum?: number
}
