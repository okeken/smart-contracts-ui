import { NetworkConnector } from './NetworkConnector'
import {RPC} from './rpc'
import { defaultChainId } from '../constants'


export const network = new NetworkConnector({
    defaultChainId,
    urls: RPC,
  })