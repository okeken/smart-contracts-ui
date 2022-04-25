import {NextPage} from 'next'
import {useEffect, useState} from 'react'
import { fetchAllDomains } from '../../functions/fetchAllDomains'

interface Domain {
    id: string
    name: string
    initMint: string
    finalTokenUri: string
}
const AllDomains: NextPage = () => {
    const [domains, setDomains] = useState<Domain[]>([])

    useEffect(()=>{
        fetchAllDomains().then(d=> setDomains(d))
    },[])

    console.log(domains, 'all domains')

    const _domain = domains.map(i => <div key={i.id}>
        {i.name}

    </div>)

    return (
        <>
            <h1>All Domains</h1>
            {_domain}
        </>
    )

}

export default AllDomains