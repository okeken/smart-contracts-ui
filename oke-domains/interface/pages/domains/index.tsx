import {FC} from 'react'
import {NextPage} from 'next'
import {useEffect, useState} from 'react'
import { fetchAllDomains } from '../../functions/fetchAllDomains'
import { formatEther } from '@ethersproject/units'


interface CardDomainProps {
    name:string,
    initMint:string,
    id:string,
}
export const CardDomain = ({name='nill', initMint='0.0', id='0'}:CardDomainProps)=>{
    return <div className='m-auto'>
         <div key={id} className="flex items-center justify-center w-48 h-48 p-2 text-white break-all bg-gradient-to-r from-cyan-500 to-blue-500 justi rounded-xl" 
    >
        
      <span className='text-4xl'>
      {name} 
      </span>
      </div>
      <div className='mt-1 text-center'> 
      {
       formatEther((initMint))
      } ETH</div>
        </div>
    
}
interface Domain {
    id: string
    name: string
    initMint: string
    finalTokenUri: string
}
const AllDomains: NextPage = () => {
    const [domains, setDomains] = useState<Domain[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    
    const fetchDomains = ()=>{
        setLoading(true)
        fetchAllDomains()
        .then(d=> setDomains(d))
        .then(()=> setLoading(false))
        .catch(e=>setError(true))
        
    }
    useEffect(()=>{
        fetchDomains()
    },[])

    const _domain = domains.map(i => <CardDomain {...i} key={i.id}/>)

    return (
        <div className='h-screen bg-gradient-to-r from-cyan-100 to-blue-100'>
            <h1 className='pt-6 text-4xl font-bold text-center '>All Minted Domains</h1>
       <div className="container mx-auto">
  <div className="max-w-4xl mx-auto mt-20 md:place-items-center ">
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 rounded-xl'>
            {_domain}     
      </div>
    
  </div>
</div>

{
    loading &&  <div className='flex items-center justify-center p-2 mb-4'>
    Loading...
    </div>
}

 {
     error && <>
     <div className='flex items-center justify-center m-auto'> 
 <div>
 Something Happened
 </div>
<button type="button" 
onClick={fetchDomains} 
className= "inline-block p-2 ml-2 text-white rounded-xl bg-gradient-to-r from-green-400 to-blue-500">
{
    loading ? 'Loading...' : 'Try Again'
}
</button>
</div>
     </>
 }
        </div>
    )

}

export default AllDomains