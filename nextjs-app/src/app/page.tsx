'use client'

import { useState } from 'react'

export default function Home() {
  const [tokenAccount, setTokenAccount] = useState('HYRYA9qpEUqPJ8rZ7hVdnhQy8iKYUvngvHUaiHQbAVy4')
  const [rpcUrl, setRpcUrl] = useState(process.env.NEXT_PUBLIC_RPC || 'https://api.mainnet-beta.solana.com')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [programId, setProgramId] = useState<string>('')

  const handleGetProgramId = async () => {
    try {
      const { CyberGoldSDK } = await import('my-solana-lib')
      const sdk = new CyberGoldSDK()
      const id = sdk.getProgramId().toString()
      setProgramId(id)
    } catch (err: any) {
      setError(err?.message || 'Failed to get program ID')
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!tokenAccount.trim()) return

    setLoading(true)
    setError('')
    setResult(null)

    try {
      // Dynamic import to avoid build issues and use the new CyberGoldSDK
      const { CyberGoldSDK } = await import('my-solana-lib')
      const sdk = new CyberGoldSDK()
      const data = await sdk.getTokenAccountInfo(rpcUrl, tokenAccount.trim())
      setResult(data)
      console.log('Token Account Info:', data)
    } catch (err: any) {
      setError(err?.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>CyberGold Solana SDK Demo</h1>
      <p>This demo uses the CyberGoldSDK from my-solana-lib to fetch token account information.</p>
      
      <div className="card">
        <h3>Program Information</h3>
        <button 
          type="button" 
          className="button" 
          onClick={handleGetProgramId}
          style={{ marginBottom: '1rem' }}
        >
          Get Program ID
        </button>
        {programId && (
          <div className="result">
            <strong>Program ID:</strong> {programId}
          </div>
        )}
      </div>
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="rpcUrl">RPC URL:</label>
            <input
              id="rpcUrl"
              type="text"
              className="input"
              value={rpcUrl}
              onChange={(e: any) => setRpcUrl(e.target.value)}
              placeholder={process.env.NEXT_PUBLIC_RPC || "https://api.mainnet-beta.solana.com"}
            />
          </div>
          
          <div>
            <label htmlFor="tokenAccount">Token Account Address:</label>
            <input
              id="tokenAccount"
              type="text"
              className="input"
              value={tokenAccount}
              onChange={(e: any) => setTokenAccount(e.target.value)}
              placeholder="HYRYA9qpEUqPJ8rZ7hVdnhQy8iKYUvngvHUaiHQbAVy4"
              required
            />
          </div>
          
          <button type="submit" className="button" disabled={loading}>
            {loading ? 'Loading...' : 'Get Token Info with CyberGold SDK'}
          </button>
        </form>
      </div>

      {error && (
        <div className="error">
          <h3>Error:</h3>
          {error}
        </div>
      )}

      {result && (
        <div className="card">
          <h2>Results from CyberGold SDK:</h2>
          
          <h3>Account Info:</h3>
          <div className="result">
            {JSON.stringify({
              address: result.accountInfo.address.toString(),
              mint: result.accountInfo.mint.toString(),
              owner: result.accountInfo.owner.toString(),
              amount: result.accountInfo.amount.toString(),
              delegateOption: result.accountInfo.delegateOption,
              delegate: result.accountInfo.delegate?.toString(),
              state: result.accountInfo.state,
              isNativeOption: result.accountInfo.isNativeOption,
              isNative: result.accountInfo.isNative?.toString(),
              delegatedAmount: result.accountInfo.delegatedAmount.toString(),
              closeAuthorityOption: result.accountInfo.closeAuthorityOption,
              closeAuthority: result.accountInfo.closeAuthority?.toString(),
            }, null, 2)}
          </div>

          <h3>Mint Info:</h3>
          <div className="result">
            {JSON.stringify({
              address: result.mintInfo.address.toString(),
              mintAuthority: result.mintInfo.mintAuthority?.toString(),
              supply: result.mintInfo.supply.toString(),
              decimals: result.mintInfo.decimals,
              isInitialized: result.mintInfo.isInitialized,
              freezeAuthority: result.mintInfo.freezeAuthority?.toString(),
            }, null, 2)}
          </div>
        </div>
      )}
    </div>
  )
}
