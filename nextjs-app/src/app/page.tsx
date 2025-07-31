'use client'

import { useState } from 'react'

export default function Home() {
  const [tokenAccount, setTokenAccount] = useState('HYRYA9qpEUqPJ8rZ7hVdnhQy8iKYUvngvHUaiHQbAVy4')
  const [rpcUrl, setRpcUrl] = useState(process.env.NEXT_PUBLIC_RPC || 'https://api.mainnet-beta.solana.com')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [programId, setProgramId] = useState<string>('')
  const [adminPda, setAdminPda] = useState<string>('')
  const [poolStateAddr, setPoolStateAddr] = useState<string>('')
  const [poolParamsAddr, setPoolParamsAddr] = useState<string>('')
  const [synthMintAddr, setSynthMintAddr] = useState<string>('')
  const [collatMintAddr, setCollatMintAddr] = useState<string>('')
  const [collatTokenProgramAddr, setCollatTokenProgramAddr] = useState<string>('')
  const [synthTokenProgramAddr, setSynthTokenProgramAddr] = useState<string>('')
  // WASM addNumbers demo state
  const [num1, setNum1] = useState<string>('')
  const [num2, setNum2] = useState<string>('')
  const [sum, setSum] = useState<number | null>(null)

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

  const handleGetAdminPda = async () => {
    try {
      const { CyberGoldSDK } = await import('my-solana-lib')
      const sdk = new CyberGoldSDK()
      const adminPdaAddress = sdk.adminAddr.toString()
      setAdminPda(adminPdaAddress)
    } catch (err: any) {
      setError(err?.message || 'Failed to get admin PDA')
    }
  }

  const handleGetPoolStateAddr = async () => {
    try {
      const { CyberGoldSDK } = await import('my-solana-lib')
      const sdk = new CyberGoldSDK()
      const address = sdk.poolStateAddr.toString()
      setPoolStateAddr(address)
    } catch (err: any) {
      setError(err?.message || 'Failed to get pool state address')
    }
  }

  const handleGetPoolParamsAddr = async () => {
    try {
      const { CyberGoldSDK } = await import('my-solana-lib')
      const sdk = new CyberGoldSDK()
      const address = sdk.poolParamsAddr.toString()
      setPoolParamsAddr(address)
    } catch (err: any) {
      setError(err?.message || 'Failed to get pool params address')
    }
  }

  const handleGetSynthMintAddr = async () => {
    try {
      const { CyberGoldSDK } = await import('my-solana-lib')
      const sdk = new CyberGoldSDK()
      const address = sdk.synthMintAddr.toString()
      setSynthMintAddr(address)
    } catch (err: any) {
      setError(err?.message || 'Failed to get synth mint address')
    }
  }

  const handleGetCollatMintAddr = async () => {
    try {
      const { CyberGoldSDK } = await import('my-solana-lib')
      const sdk = new CyberGoldSDK()
      const address = sdk.collatMintAddr.toString()
      setCollatMintAddr(address)
    } catch (err: any) {
      setError(err?.message || 'Failed to get collat mint address')
    }
  }

  const handleGetCollatTokenProgramAddr = async () => {
    try {
      const { CyberGoldSDK } = await import('my-solana-lib')
      const sdk = new CyberGoldSDK()
      const address = sdk.collatTokenProgramAddr.toString()
      setCollatTokenProgramAddr(address)
    } catch (err: any) {
      setError(err?.message || 'Failed to get collat token program address')
    }
  }

  // Handler: add two numbers via WASM addNumbers
  const handleAddNumbers = async () => {
    try {
      setError('')
      const { addNumbers } = await import('my-solana-lib')
      const a = Number(num1)
      const b = Number(num2)
      if (Number.isNaN(a) || Number.isNaN(b)) {
        setError('Please enter valid numbers')
        return
      }
      const result = await addNumbers(a, b)
      setSum(result)
    } catch (err: any) {
      setError(err?.message || 'Failed to add numbers')
    }
  }

  const handleGetSynthTokenProgramAddr = async () => {
    try {
      const { CyberGoldSDK } = await import('my-solana-lib')
      const sdk = new CyberGoldSDK()
      const address = sdk.synthTokenProgramAddr.toString()
      setSynthTokenProgramAddr(address)
    } catch (err: any) {
      setError(err?.message || 'Failed to get synth token program address')
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <button 
            type="button" 
            className="button" 
            onClick={handleGetProgramId}
          >
            Get Program ID
          </button>
          <button 
            type="button" 
            className="button" 
            onClick={handleGetAdminPda}
          >
            Get Admin PDA
          </button>
          <button 
            type="button" 
            className="button" 
            onClick={handleGetPoolStateAddr}
          >
            Get Pool State
          </button>
          <button 
            type="button" 
            className="button" 
            onClick={handleGetPoolParamsAddr}
          >
            Get Pool Params
          </button>
          <button 
            type="button" 
            className="button" 
            onClick={handleGetSynthMintAddr}
          >
            Get Synth Mint
          </button>
          <button 
            type="button" 
            className="button" 
            onClick={handleGetCollatMintAddr}
          >
            Get Collat Mint
          </button>
          <button 
            type="button" 
            className="button" 
            onClick={handleGetCollatTokenProgramAddr}
          >
            Get Collat Token Program
          </button>
          <button 
            type="button" 
            className="button" 
            onClick={handleGetSynthTokenProgramAddr}
          >
            Get Synth Token Program
          </button>
        </div>
        
        {/* Results Display */}
        {programId && (
          <div className="result">
            <strong>Program ID:</strong> {programId}
          </div>
        )}
        {adminPda && (
          <div className="result">
            <strong>Admin PDA:</strong> {adminPda}
          </div>
        )}
        {poolStateAddr && (
          <div className="result">
            <strong>Pool State Address:</strong> {poolStateAddr}
          </div>
        )}
        {poolParamsAddr && (
          <div className="result">
            <strong>Pool Params Address:</strong> {poolParamsAddr}
          </div>
        )}
        {synthMintAddr && (
          <div className="result">
            <strong>Synth Mint Address:</strong> {synthMintAddr}
          </div>
        )}
        {collatMintAddr && (
          <div className="result">
            <strong>Collat Mint Address:</strong> {collatMintAddr}
          </div>
        )}
        {collatTokenProgramAddr && (
          <div className="result">
            <strong>Collat Token Program:</strong> {collatTokenProgramAddr}
          </div>
        )}
        {synthTokenProgramAddr && (
          <div className="result">
            <strong>Synth Token Program:</strong> {synthTokenProgramAddr}
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

      {/* WASM addNumbers demo */}
      <div className="card">
        <h3>WASM addNumbers Demo</h3>
        <div>
          <label htmlFor="num1">Number A:</label>
          <input
            id="num1"
            type="number"
            className="input"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            placeholder="Enter first number"
          />
        </div>
        <div>
          <label htmlFor="num2">Number B:</label>
          <input
            id="num2"
            type="number"
            className="input"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            placeholder="Enter second number"
          />
        </div>
        <button type="button" className="button" onClick={handleAddNumbers}>
          Add with WASM
        </button>
        {sum !== null && (
          <div className="result">
            <strong>Sum:</strong> {sum}
          </div>
        )}
      </div>

      {/* Existing error/result sections */}

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
