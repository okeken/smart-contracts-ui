import { FC } from "react"
import Link from 'next/link'
import { useRouter } from "next/router"

const Header:FC = ()=>{
    const style = {
        backgroundColor: '#fff',
        position: 'fixed',
        top: 0,    
    }

    const router = useRouter()
    console.log(router.pathname)
    return (
        <div 
        className={`${router.pathname === '/' ? 'bg-linear text-white' : 'bg-gradient-to-r from-cyan-100 to-blue-100'}`}
        >
             <div className="flex items-center justify-between p-3 px-4">
             <div className="text-2xl">
                 Oke Domains
                 </div>
            <div >
                <ul className="flex text-xl">
                    <li className="ml-4">
                        <Link href='/'>
                        Mint
                        </Link>
                        </li>
                    <li className="ml-4">
                    <Link href='/domains'>
                        Domains
                        </Link>
                        </li>
                </ul>
            </div>
             </div>
        </div>
    )
}

export default Header