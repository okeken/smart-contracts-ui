import { FC, } from "react"
import { useRouter } from "next/router"

import ActiveLink from '../ActiveLink'



  

const Header:FC = ()=>{
    const style = {
        backgroundColor: '#fff',
        position: 'fixed',
        top: 0,    
    }
  
    const router = useRouter()
    const { pathname } = router

    return (
    
        <div 
        className={`${pathname === '/' ? 'bg-linear text-white' : 'bg-gradient-to-r from-cyan-100 to-blue-100'}`}
        >
             <div className="flex items-center justify-between p-3 px-4">
             <div className="text-2xl">
                 Oke Domains
                 </div>
            <div >
                <ul className="flex text-xl" >
                    <li className={`${router.pathname == "/" ? "opacity-75" : ""} ml-4`}>
                    <ActiveLink activeClassName="opacity-75" href="/">
                    <a className="nav-link">Home</a>              
                    
                    </ActiveLink>
                        </li>
                    <li className="ml-4">
                    <ActiveLink activeClassName="opacity-75" href="/domains">
                    <a className="nav-link">
                        Domains
                        </a>
                     </ActiveLink>
                        </li>
                </ul>
            </div>
             </div>
        </div>
    )
}

export default Header