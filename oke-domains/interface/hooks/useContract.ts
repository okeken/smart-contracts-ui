import { useMemo } from "react"
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import { Contract } from '@ethersproject/contracts'// import { isAddress } from '../functions/validate'
import { AddressZero } from '@ethersproject/constants'
import { getAddress } from '@ethersproject/address'
import useActiveWeb3React from "./useActiveWeb3React"
import { getContract } from "../functions/contract"

// returns null on errors
export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
    const { library, account } = useActiveWeb3React()
    
    return useMemo(() => {
      if (!address || address === AddressZero || !ABI || !library) return null
      try {
        return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
      } catch (error) {
        console.error('Failed to get contract', error)
        return null
      }
    }, [address, ABI, library, withSignerIfPossible, account])
  }