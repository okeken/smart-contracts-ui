import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from "@ethersproject/providers";
import Web3ReactManager from '../components/Web3ReactManager';
import Header from '../components/Header';
// import getLibrary from '../functions/getLibrary';

const Web3ProviderNetwork = dynamic(() => import('../components/Web3ProviderNetwork'), { ssr: false })

interface LayoutProps  {
  children: React.ReactNode
}
const Layout = ({children}:LayoutProps) =>{
  return (
    <div >
      <Header  />
      {children}
    </div>
  )
}


function getLibrary(provider:any) {
  return new Web3Provider(provider);
}

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary} >
        <Web3ReactManager>
          <Layout>
      <Component {...pageProps} />
            
          </Layout>
        </Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </>
}

export default MyApp
