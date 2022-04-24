import type { NextPage } from 'next'
import Head from 'next/head'
import useActiveWeb3React from '../hooks/useActiveWeb3React';
import { useState } from 'react';
import { parseEther } from '@ethersproject/units'
import getDomainPrice from '../functions/getDomainPrice';
import { useContract } from '../hooks/useContract';
import DomainAbi from "../constants/domains.json"
import { ToastContainer, toast } from 'react-toastify';
import {injected} from '../connectors'

const Home: NextPage = () => {
  const  {  account } = useActiveWeb3React()

  return (
    <div className='flex items-center justify-center h-screen bg-linear'>
      <Head>
        <title>All Domains</title>
        <meta name="description" content="oke domain name service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        account && <MintComponent />
      }
      <NotConnected />
    </div>
  )
}

export default Home


const NotConnected = ()=>{
  const {activate, deactivate, account, ...others} = useActiveWeb3React()

  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
      return console.log(ex)
    }
  }

  async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }


  if(!window.ethereum) return <div className='flex text-white border border-red-500 hover:hover:bg-red-500 hover:border-0 ' style={{
    borderRadius:"10px",
    padding:"10px",

  }}>
   <div className='mx-1'>
    <button>
    <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">
     Please Install Metamask
     </a>
     </button>
      </div>
  </div>
  if(!account) return <>
  <div className='flex text-white border border-red-500 hover:hover:bg-red-500 hover:border-0 ' style={{
    borderRadius:"10px",
    padding:"10px",

  }}>
    {/* {account} */}
   <div className='mx-1'>
    <button onClick={connect}>
     Connect with
      Metamask</button>
      </div>
  </div>
  </>
  return <></>
}


const MintComponent = ()=>{
  
  const { chainId} = useActiveWeb3React()
  const contract = useContract('0x2F571591435AB71083E43EB84156343b41304dd8', DomainAbi , true)
  const disable = chainId !== 4
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
         disable && <div className='p-2 mb-4 text-center text-white border border-red-500 rounded-md'>
           Wrong network, pls switch to Ropsten
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
<button disabled={disable ||loading} className={`mt-3 h-10 w-20 text-white rounded-lg    ${ disable || loading ? 'cursor-not-allowed bg-red-400': 'cursor-pointer bg-red-500 hover:bg-red-600'}  `}>
  {
    loading ? 'Minting' : 'Mint'
  }

  </button>




</div>
</form>
      </div>
  </>)
}