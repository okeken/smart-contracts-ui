import { useWeb3React } from '@web3-react/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { fetchDomain } from '../../api'
import CardDomain from '../../components/CardDomain'
import ErrorBtn from '../../components/ErrorBtn'

interface PrevData {
  id: string
  name: string
  initMint: string
  finalTokenUri: string
  description: string
}

const prevData = {
  id:  '',
  name: '',
  initMint: '0',
  finalTokenUri: '',
  description:'',
} as PrevData

export default function Profile() {
  const router = useRouter()
  const { id } = router.query
  const {account} = useWeb3React()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const [domain, setDomain] = useState<PrevData>(prevData)
   
  const AsyncfetchDomain = () =>{
    fetchDomain(Number(id))
    .then(d => setDomain(d))
    .then(()=> setLoading(false))
    .catch(()=>setError(true))
  }
  
  useEffect(()=>{
    AsyncfetchDomain()

  },  [])

  const _loading = loading && 'Loading...'
  const _error = error && <ErrorBtn fetchData={AsyncfetchDomain}  loading={loading} />
  const  _domain = domain?.id && <div className=' flex text-center flex-col justify-center'>
    <h1 className='text-3xl'>#{domain?.id}</h1>
    <CardDomain {...domain} showDescription />
  </div>
  return (
    <div>
      <Head>
        <title>{account} </title>
        <meta key="description" name="description" content="" />
      </Head>
      <div className='h-screen bg-gradient-to-r from-cyan-100 to-blue-100'>
         
  
      {
        _error
      }
      {
        _loading
      }
      {
        _domain
      }
      </div>
    </div>
  )
}
