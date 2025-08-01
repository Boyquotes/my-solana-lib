'use client'

import { useState } from 'react'
import { CyberGoldSDK, addNumbers, Addition, computePoolUR, PoolService } from 'my-solana-lib'

export default function Home() {
  const [tokenAccount, setTokenAccount] = useState('HYRYA9qpEUqPJ8rZ7hVdnhQy8iKYUvngvHUaiHQbAVy4')
  const [rpcUrl, setRpcUrl] = useState(process.env.NEXT_PUBLIC_RPC || 'https://api.mainnet-beta.solana.com')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [poolServiceUR, setPoolServiceUR] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [programId, setProgramId] = useState<string>('')
  const [adminPda, setAdminPda] = useState<string>('')
  const [poolStateAddr, setPoolStateAddr] = useState<string>('')
  const [poolParamsAddr, setPoolParamsAddr] = useState<string>('')
  const [synthMintAddr, setSynthMintAddr] = useState<string>('')
  const [collatMintAddr, setCollatMintAddr] = useState<string>('')
  const [collatTokenProgramAddr, setCollatTokenProgramAddr] = useState<string>('')
  const [synthTokenProgramAddr, setSynthTokenProgramAddr] = useState<string>('')
  const [userPk, setUserPk] = useState<string>('')
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false)
  // WASM addNumbers demo state
  const [num1, setNum1] = useState<string>('')
  const [num2, setNum2] = useState<string>('')
  const [sum, setSum] = useState<number | null>(null)
  // Pool utilization rate state
  const [collateralAmount, setCollateralAmount] = useState<string>('1')
  const [syntheticAmount, setSyntheticAmount] = useState<string>('1')
  const [utilizationRate, setUtilizationRate] = useState<number | null>(null)
  // Addition class method results
  const [jsSum, setJsSum] = useState<number | null>(null)
  const [wasmSum, setWasmSum] = useState<number | null>(null)

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

  const handleGetUserPk = async () => {
    try {
      setError('')
      const { CyberGoldSDK } = await import('my-solana-lib')
      // Use the new async initialization pattern
      const sdk = await CyberGoldSDK.initialize()
      const publicKey = sdk.userPk?.toString() || 'No wallet connected'
      setUserPk(publicKey)
    } catch (err: any) {
      setError(err?.message || 'Failed to get user public key')
    }
  }

  // Handle connecting to a wallet
  const handleConnectWallet = async () => {
    try {
      setError('')
      const { CyberGoldSDK } = await import('my-solana-lib')
      const sdk = await CyberGoldSDK.initialize()
      
      // Use SDK methods directly instead of accessing provider service
      if (isWalletConnected) {
        // Disconnect if already connected
        await sdk.disconnectWallet()
        setIsWalletConnected(false)
        setUserPk('Disconnected')
      } else {
        // Connect to wallet
        const publicKey = await sdk.connectWallet()
        if (publicKey) {
          setUserPk(publicKey.toString())
          setIsWalletConnected(true)
        } else {
          setUserPk('Failed to connect')
        }
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to connect/disconnect wallet')
    }
  }

  // Handler: add two numbers via WASM addNumbers
  const handleAddNumbers = async () => {
    try {
      setError('')
      const n1 = parseFloat(num1)
      const n2 = parseFloat(num2)
      if (isNaN(n1) || isNaN(n2)) {
        setError('Please enter valid numbers')
        return
      }
      const sum = await addNumbers(n1, n2)
      setSum(sum)
    } catch (err: any) {
      setError(err?.message || 'Failed to add numbers')
    }
  }

  // Handler: compute pool utilization rate via WASM computePoolUR
  const handleComputePoolUR = async () => {
    try {
      setError('')
      const collateral = parseFloat(collateralAmount)
      const synthetic = parseFloat(syntheticAmount)
      if (isNaN(collateral) || isNaN(synthetic)) {
        setError('Please enter valid amounts')
        return
      }
      const ur = await computePoolUR(collateral, synthetic)
      setUtilizationRate(ur)
    } catch (err: any) {
      setError(err?.message || 'Failed to compute utilization rate')
    }
  }
  
  // Handler: use PoolService class to compute pool utilization rate
  const handlePoolServiceUR = async () => {
    try {
      setError('')
      const collateral = parseFloat(collateralAmount)
      const synthetic = parseFloat(syntheticAmount)
      if (isNaN(collateral) || isNaN(synthetic)) {
        setError('Please enter valid amounts')
        return
      }
      
      // Create instance of PoolService
      const poolService = new PoolService()
      
      // Print hello message to console
      poolService.sayHello()
      
      // Compute utilization rate using the service
      const ur = await poolService.appel_compute_pool_ur(collateral, synthetic)
      
      // Format the result as a percentage
      const formattedUR = poolService.formatUtilizationRate(ur)
      setPoolServiceUR(formattedUR)
    } catch (err: any) {
      setError(err?.message || 'Failed to compute utilization rate with PoolService')
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

  // Handler: add two numbers using Addition.addJSNumbers
  const handleAddJSNumbers = async () => {
    try {
      setError('')
      const a = Number(num1)
      const b = Number(num2)
      if (Number.isNaN(a) || Number.isNaN(b)) {
        setError('Please enter valid numbers')
        return
      }
      const addition = new Addition()
      const result = await addition.addJSNumbers(a, b)
      setJsSum(result)
    } catch (err: any) {
      setError(err?.message || 'Failed to add numbers with JS')
    }
  }

  // Handler: add two numbers using Addition.additionNumbers
  const handleAdditionNumbers = async () => {
    try {
      setError('')
      const a = Number(num1)
      const b = Number(num2)
      if (Number.isNaN(a) || Number.isNaN(b)) {
        setError('Please enter valid numbers')
        return
      }
      const addition = new Addition()
      const result = await addition.additionNumbers(a, b)
      setWasmSum(result)
    } catch (err: any) {
      setError(err?.message || 'Failed to add numbers with WASM via Addition class')
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
          <button type="button" className="button" onClick={handleGetProgramId}>
            Get Program ID
          </button>
          <button type="button" className="button" onClick={handleGetAdminPda}>
            Get Admin PDA
          </button>
          <button type="button" className="button" onClick={handleGetPoolStateAddr}>
            Get Pool State
          </button>
          <button type="button" className="button" onClick={handleGetPoolParamsAddr}>
            Get Pool Params
          </button>
          <button type="button" className="button" onClick={handleGetSynthMintAddr}>
            Get Synth Mint
          </button>
          <button type="button" className="button" onClick={handleGetCollatMintAddr}>
            Get Collat Mint
          </button>
          <button type="button" className="button" onClick={handleGetCollatTokenProgramAddr}>
            Get Collat Token Program
          </button>
          <button type="button" className="button" onClick={handleGetSynthTokenProgramAddr}>
            Get Synth Token Program
          </button>
          <button type="button" className="button" onClick={handleGetUserPk}>
            Get User Public Key
          </button>
          <button type="button" className="button" onClick={handleConnectWallet}>
            {isWalletConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
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
        {userPk && (
          <div className="result">
            <strong>User Public Key:</strong> {userPk}
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

      {/* Pool Utilization Rate demo */}
      <div className="card">
        <h3>Pool Utilization Rate Demo</h3>
        <div>
          <label htmlFor="collateralAmount">Collateral Amount:</label>
          <input
            id="collateralAmount"
            type="number"
            className="input"
            value={collateralAmount}
            onChange={(e) => setCollateralAmount(e.target.value)}
            placeholder="Enter collateral amount"
          />
        </div>
        <div>
          <label htmlFor="syntheticAmount">Synthetic Amount:</label>
          <input
            id="syntheticAmount"
            type="number"
            className="input"
            value={syntheticAmount}
            onChange={(e) => setSyntheticAmount(e.target.value)}
            placeholder="Enter synthetic amount"
          />
        </div>
        <div className="button-group">
          <button type="button" className="button" onClick={handleComputePoolUR}>
            Compute with Direct WASM call
          </button>
          <button type="button" className="button" onClick={handlePoolServiceUR}>
            Compute with PoolService
          </button>
        </div>
        {utilizationRate !== null && (
          <div className="result">
            <strong>Direct WASM Result:</strong> {(utilizationRate * 100).toFixed(2)}%
          </div>
        )}
        {poolServiceUR !== null && (
          <div className="result">
            <strong>PoolService Result:</strong> {poolServiceUR}
          </div>
        )}
      </div>

      {/* Addition Class Methods Demo */}
      <div className="card">
        <h3>Addition Class Methods Demo</h3>
        <p>Use the same numbers from above inputs</p>
        <div className="button-group">
          <button type="button" className="button" onClick={handleAddJSNumbers}>
            Add with JS (Addition class)
          </button>
          <button type="button" className="button" onClick={handleAdditionNumbers}>
            Add with WASM (Addition class)
          </button>
        </div>
        {jsSum !== null && (
          <div className="result">
            <strong>JS Sum:</strong> {jsSum}
          </div>
        )}
        {wasmSum !== null && (
          <div className="result">
            <strong>WASM Sum via Addition class:</strong> {wasmSum}
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
