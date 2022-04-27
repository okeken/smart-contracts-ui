


interface ErrorBtnProps {
    fetchData: ()=>void
    text?:string
    loading:boolean
}
const ErrorBtn = ({fetchData, text='Something Happened', loading}:ErrorBtnProps)=> {
    return (
        <>
        
        <div className='flex items-center justify-center m-auto'> 
 <div>
{text}
 </div>
<button type="button" 
onClick={fetchData} 
className= "inline-block p-2 ml-2 text-white rounded-xl bg-gradient-to-r from-green-400 to-blue-500">
{
    loading ? 'Loading...' : 'Try Again'
}
</button>
</div>
        </>
    )
}


export default ErrorBtn