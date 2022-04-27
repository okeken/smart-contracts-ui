import {NextPage} from 'next'
import {useEffect, useState} from 'react'
import { fetchAllDomains,  fetchDomain} from '../../api'
import Link from 'next/link'
import CardDomain from '../../components/CardDomain'
import ErrorBtn from '../../components/ErrorBtn'


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

        fetchDomain(1)
        
    }
    useEffect(()=>{
        fetchDomains()
    },[])

    const _domain = domains.map(i => <Link href ={`/domains/${i.id}`} > 

    <a className='block m-auto'>
     <CardDomain {...i} key={i.id}/> 
        </a>
      </Link>)

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
     error && <ErrorBtn 
     fetchData={fetchDomains} 
     loading={loading}
     />

 }
        </div>
    )

}

export default AllDomains