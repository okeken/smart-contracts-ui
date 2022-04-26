import { useWeb3React } from '@web3-react/core'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Profile() {
  const router = useRouter()
  const { id } = router.query
  const {account} = useWeb3React()
  return (
    <div>
      <Head>
        <title>{account} </title>
        <meta key="description" name="description" content="" />
      </Head>
      <div className='h-screen bg-gradient-to-r from-cyan-100 to-blue-100'>
         
      Welcome - {id} 
      </div>
    </div>
  )
}
