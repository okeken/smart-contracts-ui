
const getNodeUrl = () => {
  return process.env.NEXT_PUBLIC_NODE || 'http://localhost:8545';
}

export default getNodeUrl
