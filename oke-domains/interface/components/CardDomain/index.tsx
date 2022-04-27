import { formatEther } from '@ethersproject/units'

interface CardDomainProps {
    name:string,
    initMint:string,
    id:string,
    description?:string,
    showDescription?:boolean,
}

export const CardDomain = ({name='nill', initMint='0', id='0', description='', showDescription=false}:CardDomainProps)=>{
    return <div className='m-auto'>
         <div key={id} className="flex items-center justify-center w-48 h-48 p-2 text-white break-all bg-gradient-to-r from-cyan-500 to-blue-500 justi rounded-xl" 
    >
        
      <span className='text-4xl'>
      {name} 
      </span>
      </div>
      <div className='mt-3 text-center '> 
      {
       formatEther((initMint))
      } ETH</div>

      
        {
            (!!description && showDescription) && <div className='text-left' style={{
              maxWidth:'12rem',
            }}> {description} </div>
        }  
        </div>
    
}

export default CardDomain