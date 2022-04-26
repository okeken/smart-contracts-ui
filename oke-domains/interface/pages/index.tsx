import type { NextPage } from 'next'
import Head from 'next/head'
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import { useEffect, useState } from 'react';
import { parseEther } from '@ethersproject/units'
import getDomainPrice from '../functions/getDomainPrice';
import { useContract } from '../hooks/useContract';
import DomainAbi from "../constants/domains.json"
import { ToastContainer, toast } from 'react-toastify';
import {injected, supportedChainIds} from '../connectors'

const checkChainId = async(supportedChains:number[])=>{
  const c = window?.ethereum?.request({ method: 'eth_chainId' })
  const d = await c
  if(supportedChains.some(id => id === Number(d))){
    return true
  } else {
    return false
  }
}

const Home: NextPage = () => {
  const [supported, setSupported]  = useState(false)
  const [loading, setLoading] = useState(true)

  
  useEffect(()=>{
    (async ()=>{
      const chains = await checkChainId(supportedChainIds)
      setSupported(chains)
      setLoading(false)
    })()

  },[])

  if (typeof window !== 'undefined' && !!window.ethereum) {
    window.ethereum.autoRefreshOnNetworkChange = false
    window.ethereum.on('chainChanged', (chainId:any) => {
    const supportCheck  =  supportedChainIds.some(id => id === Number(chainId))
    setSupported(supportCheck)
    });
  }

  return (
    <div className='h-screen'>
    <div className='flex items-center justify-center h-screen bg-linear'>
      <Head>
        <title>All Domains</title>
        <meta name="description" content="oke domain name service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        loading && 'Loading...'
      }
      {
         <MintComponent supported={supported} />
      }
        
    </div>
    </div>
  )
}

export default Home

const ConnectButton = ()=>{
  const {activate, deactivate, account, ...others} = useActiveWeb3React()
  const [supported, setSupported]  = useState(false)
  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      return console.log(ex)
    }
  }

  // switch network metamask
  async function switchNetwork(){
    if(!window.ethereum){
      return
    }
    const id  = '0x'+ supportedChainIds[0].toString(16)
    await window.ethereum.request({ method: 'wallet_switchEthereumChain', params:[{
      chainId: id
    }] }, )

  }


  const connectNetwork = async ()=>{
    if(!window.ethereum){
      return
    }

    if(supported){
      await connect()
    }
    await switchNetwork()

  }
  useEffect(()=>{
    (async ()=>{
      const chains = await checkChainId(supportedChainIds)
      setSupported(chains) 
    })()

  },[])

  return <>

<div 

 onClick={connectNetwork}
className='mt-3 text-white border border-red-500 cursor-pointer hover:hover:bg-red-500 hover:border-0' style={{
    borderRadius:"10px",
    padding:"10px",

  }}>
  
    {
      supported ? ' Connect with Metamask' : 'Switch to Rinkeby'
    }
  </div>

  </>
}

const NotConnected = ()=>{
  if(!window.ethereum) return  <a 
  className=''
  href="https://metamask.io/download/" target="_blank" rel="noreferrer">
  <div className='mt-3 text-white border border-red-500 hover:hover:bg-red-500 hover:border-0 ' style={{
    borderRadius:"10px",
    padding:"10px",
  }}>

     Please Install Metamask
  
   
  </div>
     </a>

  return <></>
}


interface MintProps {
  supported: boolean
}
const MintComponent = ({supported}:MintProps)=>{
 
  const contract = useContract('0x2F571591435AB71083E43EB84156343b41304dd8', DomainAbi , true)
  const disable = !supported
  const [domain, setDomain] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target
    if(name==='domain'){
      setDomain(value)
    }
  }

  interface Value {
    value: string,
    name:string
  }
   const notify = (msg:string, hash?:string, typ:string='info')=>{
     // @ts-ignore
     return toast[typ](<div>
      <p>{msg} </p>
     {
       hash &&  <p>
       <a href={`https://rinkeby.etherscan.io/tx/${hash}`} rel="noreferrer" target="_blank" className='underline' >
       click here for more details
       </a>
       </p>
     }
    </div>);
   }

  const mintDomain = async (value:Value )=>{
    setLoading(true)
    try{
    const register = await contract!.register(value.name, {value: parseEther(value.value)})
    notify('Transaction  Submitted',register.hash, 'info')
    setDomain('')
    setLoading(false)
    await register.wait()
    notify(`Domain ${domain}.oke has been minted`, register.hash,'success')
    }catch(e:any){
      notify(e.message, '', 'error')
    }
    setLoading(false)
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const price = getDomainPrice(domain)
    const data= {
      name:domain,
      value: String(price)
    }
    e.preventDefault()
   mintDomain(data)
  }
  return (<>
   <div className=''>
     <ToastContainer
      position="top-center" />    
       <form onSubmit={handleSubmit}
       autoComplete="off"
       >
     <div>
       {
         (window?.ethereum &&  disable )&& <div className='p-2 mb-4 text-center text-white border border-red-500 rounded-md'>
           Wrong network, pls switch to Rinkeby Network
           </div>
       }
     </div>
      <h1 className="mb-1 text-xl font-bold text-yellow-50">
   Mint Your Domains in Seconds 🚀
    </h1>

  <div className="relative">
      
  {
    domain.length > 0 && <div className="absolute p-1 right-1" style=
    {{
      bottom:'-2.2rem',
      border:'1px solid red',
      color:'white',
      borderRadius:'10px',
      fontSize:'0.8rem',
    }}
     > 
    cost: {getDomainPrice(domain)} Eth
    </div>
  }
  <div className="absolute text-2xl top-3 right-3"> 
  
<span className="scale-150">.
  </span>
  oke
  </div> <input value={domain} onChange={handleChange} name='domain'  disabled={disable} type="text" className="z-0 pl-10 pr-20 rounded-lg h-14 w-96 focus:shadow focus:outline-none" placeholder="Start minting..." />

</div>
<div className='text-center'>
{ supported && <button disabled={disable ||loading} className={`mt-3 h-10 w-20 text-white rounded-lg    ${ disable || loading ? 'cursor-not-allowed bg-red-400': 'cursor-pointer bg-red-500 hover:bg-red-600'}  `}>
  {
    loading ? 'Minting' : 'Mint'
  }

  </button>}

{
  ( window?.ethereum &&  !supported) &&  <ConnectButton />
}
  {
    !window?.ethereum && <NotConnected />
  }

  




</div>
</form>
      </div>
  </>)
}